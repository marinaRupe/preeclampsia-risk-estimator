import warnings
import sys
import logging
import re
import os
import pickle
import math


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

        if s.startswith(ignore_teano) \
                or re.search("\sSampling", s) is not None \
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

import numpy as np
import pandas as pd

DATE_FORMAT = "%Y-%m-%d"


def parse_float_values(x):
    return float(str(x).replace(',', '.'))


def parse_gestational_age(x):
    if "/" in x:
        return int(x.split("/")[1])
    elif "+" in x:
        return int(x.split("+")[0])
    return int(x)


# #######################################################################################################

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

    return mean_loc, sd_value


# ##########################################################################################################

def main():
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'files', 'risk_model')
    infile = open(filename, 'rb')
    normal_trace = pickle.load(infile)
    infile.close()

    age_param = sys.argv[1]
    PLGF_param = sys.argv[2]
    PAPP_A_param = sys.argv[3]
    BMI_param = sys.argv[4]
    smoking_during_pregnancy_param = sys.argv[5]
    diabetes_param = sys.argv[6]
    IVF_param = sys.argv[7]
    MAP_param = sys.argv[8]
    nulliparity_param = sys.argv[9]

    age = int(age_param) if age_param != "" else 30
    PLGF = float(PLGF_param) if PLGF_param != "" else 1
    PAPP_A = float(PAPP_A_param) if PAPP_A_param != "" else 1
    BMI = float(BMI_param) if BMI_param != "" else 20
    MAP = float(MAP_param) if MAP_param != "" else 93.3
    smoking_during_pregnancy = int(smoking_during_pregnancy_param) if smoking_during_pregnancy_param != "" else 0
    diabetes = int(diabetes_param) if diabetes_param != "" else 0
    IVF = int(IVF_param) if IVF_param != "" else 0
    nulliparity = int(nulliparity_param) if nulliparity_param != "" else 1

    observation = pd.Series({
        'Intercept': 1,
        'ageOver30': age > 30,
        'PLGF': PLGF,
        'PAPP_A': PAPP_A,
        'BMI': BMI,
        'MAP': MAP,
        'smokingDuringPregnancy': smoking_during_pregnancy,
        'diabetes': diabetes,
        'IVF': IVF,
        'nulliparity': nulliparity
    })

    deliveryWeek = 34

    meanLoc, sdValue = query_model(normal_trace, observation)
    risk = 0.5 * (1 + math.erf((deliveryWeek - meanLoc) / (sdValue * math.sqrt(2))))

    print({
        "risk": risk,
        "usedValues": {
            'ageOver30': 'true' if age > 30 else 'false',
            'PLGF': PLGF,
            'PAPP_A': PAPP_A,
            'BMI': BMI,
            'smokingDuringPregnancy': smoking_during_pregnancy,
            'diabetes': diabetes,
            'IVF': IVF,
            'MAP': MAP
        },
        "meanLoc": meanLoc,
        "sdValue": sdValue
    })
    sys.stdout.flush()

# ###########################################################################################################


if __name__ == '__main__':
    main()
    os._exit(0)
