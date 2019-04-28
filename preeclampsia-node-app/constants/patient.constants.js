const RacialOriginTypes = {
  White: {
    key: 1,
    en: 'White',
    hr: 'Bijela',
  },
  Black: {
    key: 2,
    en: 'Diabetes type II',
    hr: 'Crna',
  },
  SouthAsian: {
    key: 3,
    en: 'South Asian',
    hr: 'Južnoazijska',
  },
  EastAsian: {
    key: 4,
    en: 'East Asian',
    hr: 'Istočnoazijska',
  },
  Mixed: {
    key: 5,
    en: 'Mixed',
    hr: 'Mixed',
  },
};

const patientListSortColumnNames = {
  MBO: 'MBO',
  firstName: 'firstName',
  lastName: 'lastName',
  createdAt: 'createdAt',
  default: 'createdAt',
};

module.exports = {
  RacialOriginTypes,
  patientListSortColumnNames,
};
