import { formatDate } from './dateTime.utils';

export const exists = (measurement) => (measurement !== null && measurement !== undefined)
  && (measurement.value !== null && measurement.value !== undefined);

export const displayDateMeasured = (measurement) => (
  exists(measurement) ? formatDate(measurement.dateMeasured) : '-'
);

export const displayBooleanValue = (measurement) => (
  (measurement !== null && measurement !== undefined)
    ? (measurement ? 'DA' : 'NE')
    : 'nepoznato'
);

export const displayBooleanMeasurementValue = (measurement) => (
  exists(measurement) ? (measurement.value ? 'DA' : 'NE') : 'nepoznato'
);

export const displayNumericalMeasurementValue = (measurement, unit) => (
  exists(measurement) ? `${measurement.value} ${unit ? unit : ''}` : 'nepoznato'
);

export const displayEnumMeasurementValue = (measurement) => (
  exists(measurement) ? measurement.hrName : 'nepoznato'
);
