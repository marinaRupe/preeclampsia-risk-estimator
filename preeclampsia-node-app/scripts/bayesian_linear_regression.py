import warnings
import sys
import logging
import re


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
            self.original_stderr.write(s)


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

DATE_FORMAT = "%d.%m.%Y"


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

        df['PAPP_A'] = df['PAPP_A'].apply(lambda x: x / PAPP_A_MoM[gestational_age_at_blood_test])
        df['PLGF'] = df['PLGF'].apply(lambda x: x / PLGF_MoM[gestational_age_at_blood_test])

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
    df = calculateMoMs(df)

    # Drop unnecessary columns
    # df = df.loc[:, ['gestationalAgeAtDelivery', 'PLGF', 'PAPP_A', 'weight']]
    df = df[['gestationalAgeAtDelivery', 'PLGF', 'PAPP_A', 'weight']]

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
    csv_location = sys.argv[1]  # '../../data/podaci.csv'

    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        df = pd.read_csv(csv_location, encoding="ISO-8859-1", sep=';')

        df, X_train, X_test, y_train, y_test = format_data(df)

        formula = 'gestationalAgeAtDelivery ~ ' + ' + '.join(['%s' % variable for variable in X_train.columns[1:]])

        # Context for the model
        with pm.Model() as normal_model:
            # The prior for the model parameters will be a normal distribution
            family = pm.glm.families.Normal()

            # Creating the model requires a formula and data (and optionally a family)
            pm.GLM.from_formula(formula, data=X_train, family=family)

            # Perform Markov Chain Monte Carlo sampling
            normal_trace = pm.sample(draws=2000, chains=2, tune=800)

            pm.summary(normal_trace)

            model_formula = 'gestationalAgeAtDelivery = '
            for variable in normal_trace.varnames:
                model_formula += ' %0.2f * %s +' % (np.mean(normal_trace[variable]), variable)

            test_model(normal_trace, X_test.iloc[15])

            test_model(normal_trace, X_test.iloc[16])

            observation = pd.Series({
                'Intercept': 1,
                'PLGF': 0.34,
                'PAPP_A': 0.5,
                'weight': 69}
            )

            query_model(normal_trace, observation)

            print({"risk": 0.2})
            sys.stdout.flush()

# ###########################################################################################################


if __name__ == '__main__':
    main()
