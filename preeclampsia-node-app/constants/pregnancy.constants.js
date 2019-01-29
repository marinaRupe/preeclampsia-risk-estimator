const PregnancyTypes = {
  Singleton: {
    key: 0,
    en: 'Singleton',
    hr: 'Jedno dijete'
  },
  MonochorionicTwins: {
    key: 1,
    en: 'Monochorionic twins',
    hr: 'Jednojajčani blizanci',
  },
  DichorionicTwins: {
    key: 2,
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
