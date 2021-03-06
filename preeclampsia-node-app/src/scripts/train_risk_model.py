import warnings
import sys
import logging
import re
import os
import pickle


class StderrFilter:
    def __init__(self, original_stderr):
        self.original_stderr = original_stderr

    def write(self, s):
        ignore_teano = (
            'WARNING (theano.tensor.blas)',
            'Auto-assigning NUTS sampler...',
            'Initializing NUTS using jitter+adapt_diag...',
            'Multiprocess sampling (2 chains in 4 jobs)',
            'NUTS: ['
        )

        if s.startswith(ignore_teano)\
                or re.search("\sSampling", s) is not None\
                or re.search("\sNUTS: ]", s) is not None:
            pass
        else:
            if len(s.strip()) > 0:
                self.original_stderr.write(s)
                self.original_stderr.flush()


original_stderr = sys.stderr  # keep a reference to STDOUT
sys.stderr = StderrFilter(original_stderr)  # redirect the real STDOUT

logger = logging.getLogger("pymc3")
logger.setLevel(logging.ERROR)
logger.propagate = False

import pymc3 as pm
import seaborn as sns
import numpy as np
import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['font.size'] = 16
matplotlib.rcParams['figure.figsize'] = (9, 9)

DATE_FORMAT = "%Y-%m-%d"


def parse_float_values(x):
    return float(str(x).replace(',', '.'))


def parse_gestational_age(x):
    if "/" in x:
        return int(x.split("/")[1])
    elif "+" in x:
        return int(x.split("+")[0])
    return int(x)


def calculate_blood_test_gestation(blood_test_date,
                                   ultrasound_date=None,
                                   gestational_age_ultrasound_weeks=None,
                                   gestational_age_ultrasound_days=None,
                                   last_period_date=None):
    if ultrasound_date is None or gestational_age_ultrasound_weeks is None:
        a = datetime.strptime(last_period_date, DATE_FORMAT)
        b = datetime.strptime(blood_test_date, DATE_FORMAT)
        delta = b - a
        return int(np.ceil(delta.days / 7))
    else:
        a = datetime.strptime(ultrasound_date, DATE_FORMAT)
        b = datetime.strptime(blood_test_date, DATE_FORMAT)
        delta = b - a
        return int(np.ceil(
            (gestational_age_ultrasound_weeks * 7 + gestational_age_ultrasound_days
                + delta.days) / 7))


# Body Mass Index
def calulate_BMI(weight, height):
    return weight / pow(height / 100, 2)


# Mean Arterial Pressure
def calculate_MAP(sys_bp, dys_bpp):
    return 1/3 * (sys_bp - dys_bpp) + dys_bpp


def calculateMoMs(df):
    PAPP_A_data_by_weeks = {}
    PLGF_data_by_weeks = {}

    for index, row in df.iterrows():
        # Calculate gestational age on blood test date
        gestational_age_at_blood_test = calculate_blood_test_gestation(
            row['bloodTestDate'],
            row['ultrasoundDate'], row['gestationalAgeByUltrasoundWeeks'], row['gestationalAgeByUltrasoundDays'],
            row['lastPeriodDate']
        )

        # PAPP-A
        if gestational_age_at_blood_test not in PAPP_A_data_by_weeks:
            PAPP_A_data_by_weeks[gestational_age_at_blood_test] = []
        PAPP_A_data_by_weeks[gestational_age_at_blood_test].append(float(row['PAPP_A']))

        # PLGF
        if gestational_age_at_blood_test not in PLGF_data_by_weeks:
            PLGF_data_by_weeks[gestational_age_at_blood_test] = []
        PLGF_data_by_weeks[gestational_age_at_blood_test].append(float(row['PLGF']))

    PAPP_A_MoM = {}
    PLGF_MoM = {}
    for key in PAPP_A_data_by_weeks:
        PAPP_A_MoM[key] = np.median(PAPP_A_data_by_weeks[key])
        PLGF_MoM[key] = np.median(PLGF_data_by_weeks[key])

    for index, row in df.iterrows():
        gestational_age_at_blood_test = calculate_blood_test_gestation(
            row['bloodTestDate'],
            row['ultrasoundDate'], row['gestationalAgeByUltrasoundWeeks'], row['gestationalAgeByUltrasoundDays'],
            row['lastPeriodDate']
        )

        df.at[index, 'PAPP_A'] = row['PAPP_A'] / PAPP_A_MoM[gestational_age_at_blood_test]
        df.at[index, 'PLGF'] = row['PLGF'] / PLGF_MoM[gestational_age_at_blood_test]

    return df

    
# #######################################################################################################


def plot_test_estimates(estimates, actual, mean_loc):
    # Plot all the estimates
    plt.figure(figsize=(8, 8))
    sns.distplot(estimates, hist=True, kde=True, bins=19,
                 hist_kws={'edgecolor': 'k', 'color': 'darkblue'},
                 kde_kws={'linewidth': 4},
                 label='Estimated Dist.')
    # Plot the actual gestationalAgeAtDelivery
    plt.vlines(x=actual, ymin=0, ymax=0.5,
               linestyles='--', colors='red',
               label='True Gestational Age At Delivery',
               linewidth=2.5)

    # Plot the mean estimate
    plt.vlines(x=mean_loc, ymin=0, ymax=0.5,
               linestyles='-', colors='orange',
               label='Mean Estimate',
               linewidth=2.5)

    plt.legend(loc=1)
    plt.title('Density Plot for Test Observation')
    plt.xlabel('Gestational Age At Delivery')
    plt.ylabel('Density')


def plot_query_estimates(estimates, mean_loc):
    # Plot the estimate distribution
    plt.figure(figsize=(8, 8))
    sns.distplot(estimates, hist=True, kde=True, bins=19,
                 hist_kws={'edgecolor': 'k', 'color': 'darkblue'},
                 kde_kws={'linewidth': 4},
                 label='Estimated Dist.')
    # Plot the mean estimate
    plt.vlines(x=mean_loc, ymin=0, ymax=0.5,
               linestyles='-', colors='orange', linewidth=2.5)
    plt.title('Density Plot for New Observation')
    plt.xlabel('Gestational Age At Delivery')
    plt.ylabel('Density')


def print_test_estimates(test_observation, estimates, actual, mean_loc):
    print('Test Observation:')
    print(test_observation)

    # Prediction information
    print('True Gestational Age At Delivery = %d' % actual)
    print('Average Estimate = %0.4f' % mean_loc)
    print('5%% Estimate = %0.4f    95%% Estimate = %0.4f' % (np.percentile(estimates, 5),
                                                             np.percentile(estimates, 95)))
    print()


def print_query_estimates(new_observation, estimates, mean_loc):
    # Print information about the new observation
    print('New Observation')
    print(new_observation)

    # Estimate information
    print('Average Estimate = %0.4f' % mean_loc)
    print('5%% Estimate = %0.4f    95%% Estimate = %0.4f' % (np.percentile(estimates, 5),
                                                             np.percentile(estimates, 95)))
    print()


# #######################################################################################################


def format_data(df):
    # Filter out data
    df = df[df['resultedWithPE'].notnull()]
    df = df[df['weight'].notnull()]
    df = df[df['height'].notnull()]
    df = df[df['SysBP'].notnull()]
    df = df[df['DysBP'].notnull()]
    df = df[df['PAPP_A'].notnull()]
    df = df[df['PLGF'].notnull()]
    df = df[df['gestationalAgeAtDeliveryWeeks'].notnull()]

    df = df[~(((df['ultrasoundDate'].isnull()) | (df['gestationalAgeByUltrasoundWeeks'].isnull()))
              & (df['lastPeriodDate'].isnull()))]

    df = df.replace(np.nan, None, regex=True)

    df = df.rename(columns={'gestationalAgeAtDeliveryWeeks': 'gestationalAgeAtDelivery'})

    # Modify data
    df['gestationalAgeAtDelivery'] = df['gestationalAgeAtDelivery'].apply(lambda x: parse_gestational_age(x))
    df['PLGF'] = df['PLGF'].apply(lambda x: parse_float_values(x))
    df['PAPP_A'] = df['PAPP_A'].apply(lambda x: parse_float_values(x))
    df['weight'] = df['weight'].apply(lambda x: parse_float_values(x))
    df['height'] = df['height'].apply(lambda x: parse_float_values(x))
    df['SysBP'] = df['SysBP'].apply(lambda x: parse_float_values(x))
    df['DysBP'] = df['DysBP'].apply(lambda x: parse_float_values(x))

    df['nulliparity'] = df['numberOfPreviousPregnancies'].apply(lambda x: 1 if x == '0' else 0)
    df['IVF'] = df['IVF'].apply(lambda x: int(x))
    df['diabetes'] = df['diabetes'].apply(lambda x: int(x))
    df['smokingDuringPregnancy'] = df['smokingDuringPregnancy'].apply(lambda x: int(x))
    df['ageOver30'] = df['age'].apply(lambda x: 1 if int(x) > 30 else 0)

    df['BMI'] = df.apply(lambda row: calulate_BMI(row['weight'], row['height']), axis=1)
    df['MAP'] = df.apply(lambda row: calculate_MAP(row['SysBP'], row['DysBP']), axis=1)
    df = calculateMoMs(df)

    # Pick columns
    df = df[[
        'gestationalAgeAtDelivery',
        'PLGF',
        'PAPP_A',
        'BMI',
        'MAP',
        'smokingDuringPregnancy',
        'diabetes',
        'IVF',
        'ageOver30',
        'nulliparity'
    ]]

    labels = df['gestationalAgeAtDelivery']

    # One-Hot Encoding of Categorical Variables
    df = pd.get_dummies(df)

    # Split into training/testing sets with 25% split
    X_train, X_test, y_train, y_test = train_test_split(df, labels,
                                                        test_size=0.25,
                                                        random_state=42)

    return df, X_train, X_test, y_train, y_test


# Shows the trace with a vertical line at the mean of the trace
def plot_trace(trace):
    # Traceplot with vertical lines at the mean value
    ax = pm.traceplot(trace, figsize=(14, len(trace.varnames) * 1.8),
                      lines={k: v['mean'] for k, v in pm.summary(trace).iterrows()})

    matplotlib.rcParams['font.size'] = 16

    # Labels with the median value
    for i, mn in enumerate(pm.summary(trace)['mean']):
        ax[i, 0].annotate('{:0.2f}'.format(mn), xy=(mn, 0), xycoords='data', size=8,
                          xytext=(-18, 18), textcoords='offset points', rotation=90,
                          va='bottom', fontsize='large', color='red')


# Make a new prediction from the test set and compare to actual value
def test_model(trace, test_observation):
    var_dict = {}
    for variable in trace.varnames:
        var_dict[variable] = trace[variable]

    # Results into a dataframe
    var_weights = pd.DataFrame(var_dict)

    # Standard deviation of the likelihood
    sd_value = var_weights['sd'].mean()

    # Actual Value
    actual = test_observation['gestationalAgeAtDelivery']

    # Add in intercept term
    test_observation['Intercept'] = 1
    test_observation = test_observation.drop('gestationalAgeAtDelivery')

    # Align weights and test observation
    var_weights = var_weights[test_observation.index]

    # Means for all the weights
    var_means = var_weights.mean(axis=0)

    # Location of mean for observation
    mean_loc = np.dot(var_means, test_observation)

    # Estimates of gestationalAgeAtDelivery
    estimates = np.random.normal(loc=mean_loc, scale=sd_value, size=1000)

    # print_test_estimates(test_observation, estimates, actual, mean_loc)
    # plot_test_estimates(estimates, actual, mean_loc)

    print('mean_loc - actual = ', mean_loc - actual)

    return mean_loc, actual


# Make predictions for a new data point from the model trace
def query_model(trace, new_observation):
    # Dictionary of all sampled values for each parameter
    var_dict = {}
    for variable in trace.varnames:
        var_dict[variable] = trace[variable]

    # Standard deviation
    sd_value = var_dict['sd'].mean()

    # Results into a dataframe
    var_weights = pd.DataFrame(var_dict)

    # Align weights and new observation
    var_weights = var_weights[new_observation.index]

    # Means of variables
    var_means = var_weights.mean(axis=0)

    # Mean for observation
    mean_loc = np.dot(var_means, new_observation)

    # Distribution of estimates
    estimates = np.random.normal(loc=mean_loc, scale=sd_value,
                                 size=1000)

    # print_query_estimates(new_observation, estimates, mean_loc)
    # plot_query_estimates(estimates, mean_loc)


# ##########################################################################################################

def main():
    csv_location = sys.argv[1]
    print('Reading data from: ', csv_location)
    
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        df = pd.read_csv(csv_location, encoding="ISO-8859-1", sep=';')

        df, X_train, X_test, y_train, y_test = format_data(df)

        # Define formula
        formula = 'gestationalAgeAtDelivery ~ ' + ' + '.join(['%s' % variable for variable in X_train.columns[1:]])

        # Context for the model
        with pm.Model() as normal_model:
            # The prior for the model parameters will be a normal distribution
            family = pm.glm.families.Normal()

            # Creating the model
            pm.GLM.from_formula(formula, data=X_train, family=family)

            # Perform Markov Chain Monte Carlo sampling
            # normal_trace = pm.sample(draws=2000, chains=2, tune=800)
            normal_trace = pm.sample(tune=1000, cores=4)

            pm.summary(normal_trace)

            model_formula = 'gestationalAgeAtDelivery = '
            for variable in normal_trace.varnames:
                model_formula += ' %0.2f * %s +' % (np.mean(normal_trace[variable]), variable)

            print(' '.join(model_formula.split(' ')[:-1]))

            for i in range(len(X_test)):
                test_model(normal_trace, X_test.iloc[i])

            dirname = os.path.dirname(__file__)
            filename = os.path.join(dirname, 'files/risk_model')
            outfile = open(filename, 'wb')
            pickle.dump(normal_trace, outfile)
            outfile.close()

            """
            weight = 57
            height = 165
            sys_bp = 120
            dys_bp = 80

            observation = pd.Series({
                'Intercept': 1,
                'PLGF': 1,
                'PAPP_A': 1,
                'BMI': calulate_BMI(weight, height),
                'MAP': calculate_MAP(sys_bp, dys_bp),
                'smokingDuringPregnancy': 0,
                'diabetes': 0,
                'IVF': 0,
                'ageOver30': 0,
                'nulliparity': 0
            })

            query_model(normal_trace, observation)
            """

            plt.show()

            print('Done')
            sys.stdout.flush()

# ###########################################################################################################


if __name__ == '__main__':
    main()
    os._exit(0)
