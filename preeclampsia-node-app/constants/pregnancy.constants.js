const PregnancyTypes = {
  Singleton: {
    key: 1,
    en: 'Singleton',
    hr: 'Jedno dijete'
  },
  MonochorionicTwins: {
    key: 2,
    en: 'Monochorionic twins',
    hr: 'Jednojajčani blizanci',
  },
  DichorionicTwins: {
    key: 3,
    en: 'Dichorionic twins',
    hr: 'Dvojajčani blizanci',
  },
};

const ConceptionMethods = {
  Spontaneous: {
    key: 0,
    en: 'Spontaneous',
    hr: 'Začeće prirodnim putem',
  },
  OvulationDrugs: {
    key: 1,
    en: 'Ovulation drugs',
    hr: 'Ovulacijski lijekovi',
  },
  InVitroFertilization: {
    key: 2,
    en: 'In vitro fertilization',
    hr: 'In vitro oplodnja',
  }
};

module.exports = {
  PregnancyTypes,
  ConceptionMethods,
};
