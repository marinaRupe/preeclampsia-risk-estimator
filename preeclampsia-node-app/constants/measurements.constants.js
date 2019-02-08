const DiabetesTypes = {
  DiabetesType1: {
    key: 1,
    value: 'DM1',
    en: 'Diabetes type I',
    hr: 'Dijabetes tipa I',
  },
  DiabetesType2: {
    key: 2,
    value: 'DM2',
    en: 'Diabetes type II',
    hr: 'Dijabetes tipa II',
  },
  GestationalDiabetes: {
    key: 3,
    value: 'GD',
    en: 'Gestational diabetes',
    hr: 'Gestacijski dijabetes',
  },
};

const HypertensionTypes = {
  ChronicHipertension: {
    key: 1,
    value: 'Kronična',
    en: 'Chronic hypertension',
    hr: 'Kronična hipertenzija',
  },
  GestationalHipertension: {
    key: 2,
    value: 'Gestacijska',
    en: 'Gestational hypertension',
    hr: 'Gestacijska hipertenzija',
  },
};

module.exports = {
  DiabetesTypes,
  HypertensionTypes,
};
