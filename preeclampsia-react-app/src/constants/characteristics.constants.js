export const CharacteristicTypes = {
  Enum: 'enum',
  Numerical: 'numerical',
  Boolean: 'boolean',
};

export const Characteristics = {
  PregnancyType: {
    key: 1,
    type: CharacteristicTypes.Enum,
    en: { name: 'Pregnancy type', display: 'Pregnancy type' },
    hr: { name: 'Vrsta trudnoće', display: 'Vrsta trudnoće' },
  },
  NumberOfFetuses: {
    key: 2,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: '',
    en: { name: 'Number of fetuses', display: 'Number of fetuses' },
    hr: { name: 'Broj fetusa', display: 'Broj fetusa' },
  },
  ConceptionMethod: {
    key: 3,
    type: CharacteristicTypes.Enum,
    en: { name: 'Conception method', display: 'Conception method' },
    hr: { name: 'Vrsta začeća', display: 'Vrsta začeća' },
  },
  FetalCrownRumpLength: {
    key: 4,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'mm',
    en: { name: 'Fetal crown-rump length (CRL)', display: 'Fetal crown-rump length' },
    hr: { name: 'Duljina fetalne krune (CRL)', display: 'CRL' },
  },
  BiparietalDiameter: {
    key: 5,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'mm',
    en: { name: 'Biparietal diameter (BPD)', display: 'Biparietal diameter' },
    hr: { name: 'Biparijetalni dijametar (BPD)', display: 'BPD' },
  },
  Height: {
    key: 6,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'cm',
    en: { name: 'Height', display: 'Height' },
    hr: { name: 'Visina', display: 'Visina' },
  },
  Weight: {
    key: 7,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'kg',
    en: { name: 'Weight', display: 'Weight' },
    hr: { name: 'Težina', display: 'Težina' },
  },
  RacialOrigin: {
    key: 8,
    type: CharacteristicTypes.Enum,
    en: { name: 'Racial origin', display: 'Racial origin' },
    hr: { name: 'Etnička skupina', display: 'Etnička skupina' },
  },
  SmokingDuringPregnancy: {
    key: 9,
    type: CharacteristicTypes.Boolean,
    en: { name: 'Smoking during pregnancy', display: 'Smoking during pregnancy' },
    hr: { name: 'Pušenje za vrijeme trudnoće', display: 'Pušenje' },
  },
  MotherOfPatientHadPE: {
    key: 10,
    type: CharacteristicTypes.Boolean,
    en: { name: 'Mother of patient had preeclampsia', display: 'Mother of patient had preeclampsia' },
    hr: { name: 'Majka pacijentice imala preeklampsiju', display: 'Preeklampsija u obitelji (majka)' },
  },
  Hypertension: {
    key: 11,
    type: CharacteristicTypes.Boolean,
    en: { name: 'Has hypertension', display: 'Hypertension' },
    hr: { name: 'Hipertenzija', display: 'Hipertenzija' },
  },
  HypertensionType: {
    key: 12,
    type: CharacteristicTypes.Enum,
    en: { name: 'Hypertension type', display: 'Hypertension type' },
    hr: { name: 'Tip hipertenzije', display: 'Etiologija hipertenzije' },
  },
  Diabetes: {
    key: 13,
    type: CharacteristicTypes.Boolean,
    en: { name: 'Diabetes', display: 'Has diabetes' },
    hr: { name: 'Diabetes', display: 'Je li trudnica dijabetičar' },
  },
  DiabetesType: {
    key: 14,
    type: CharacteristicTypes.Enum,
    en: { name: 'Diabetes type', display: 'Diabetes type' },
    hr: { name: 'Tip dijabetesa', display: 'Tip dijabetesa' },
  },
  SystemicLupusErythematosus: {
    key: 15,
    type: CharacteristicTypes.Boolean,
    en: { name: 'Systemic lupus erythematosus', display: 'Systemic lupus erythematosus' },
    hr: { name: 'Sistemski eritemski lupus', display: 'Sistemski eritemski lupus' },
  },
  AntiPhospholipidSyndrome: {
    key: 16,
    type: CharacteristicTypes.Boolean,
    en: { name: 'Anti-phospholipid syndrome', display: 'Anti-phospholipid syndrome' },
    hr: { name: 'Antifosfolipidni sindrom', display: 'Etnička skupina' },
  },
  MeanArterialPressure: {
    key: 17,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'mmHg',
    en: { name: 'Mean arterial pressure', display: 'Mean arterial pressure' },
    hr: { name: 'Srednji arterijski tlak', display: 'Srednji arterijski tlak' },
  },
  MeanUterineArteryPI: {
    key: 18,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: '',
    en: { name: 'Mean uterine artery PI', display: 'Mean uterine artery PI' },
    hr: { name: 'Srednji PI maternične arterije', display: 'Srednji PI maternične arterije' },
  },
  SerumPLGFMoM: {
    key: 19,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'MoM',
    en: { name: 'Serum PLGF', display: 'Serum PLGF' },
    hr: { name: 'Serum PLGF', display: 'Serum PLGF' },
  },
  SerumPAPPAMoM: {
    key: 20,
    type: CharacteristicTypes.Numerical,
    unitOfMeasure: 'MoM',
    en: { name: 'Serum PAPP-A', display: 'Serum PAPP-A' },
    hr: { name: 'Serum PAPP-A', display: 'Serum PAPP-A' },
  },
};
