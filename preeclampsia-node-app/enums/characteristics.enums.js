const CharacteristicsEnum = {
  PregnancyType: 1,
  ConceptionMethod: 2,
  FetalCrownRumpLength: 3,
  Height: 4,
  Weight: 5,
  RacialOrigin: 6,
  SmokingDuringPregnancy: 7,
  MotherOfPatientHadPE: 8,
  ChronicHypertension: 9,
  DiabetesType1: 10,
  DiabetesType2: 11,
  SystemicLupusErythematosus: 12,
  AntiPhospholipidSyndrome: 13,
  MeanArterialPressure: 14,
  MeanUterineArteryPI: 15,
  SerumPLGFMoM: 16,
  SerumPAPPAMoM: 17,
};

const CharacteristicsByIdEnum = Object.entries(CharacteristicsEnum).reduce((obj, [key, value]) => {
  obj[value] = key;
  return obj;
}, {});


module.exports = {
  CharacteristicsEnum,
  CharacteristicsByIdEnum,
};