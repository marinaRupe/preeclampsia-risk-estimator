const { db } = require('../models');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { Characteristics } = require('../constants/characteristics.constants');
const { RacialOriginTypes } = require('../constants/patient.constants');
const hospitalLogo = require('../assets/hospitalLogo');
const { formatDate, getAgeInYears, calculateGestationalAgeFromDate } = require('../utils/dateTime.utils');
const {
  displayNumericalMeasurementValue,
  displayBooleanMeasurementValue,
  displayEnumMeasurementValue,
  getCharacteristicTranslation,
} = require('../utils/measurement.utils');

const generateHTMLReport = (medicalExamination, user, translations, language) => {
  const { pregnancy } = medicalExamination;
  const { patient } = pregnancy;

  const gestationalAgeOnBloodTest = calculateGestationalAgeFromDate(
    medicalExamination.ultrasoundDate,
    medicalExamination.bloodTestDate,
    medicalExamination.gestationalAgeByUltrasoundWeeks,
    medicalExamination.gestationalAgeByUltrasoundDays
  );

  // TODO: refactor
  const data = {
    translations,
    characteristicTranslations: getCharacteristicTranslations(language),
    patient: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      MBO: patient.MBO,
      birthDate: formatDate(patient.birthDate),
      racialOrigin: patient.racialOrigin
        && Object.values(RacialOriginTypes).find(r => r.key === patient.racialOrigin).hr,
      gynecologist: patient.gynecologist || '-',
      protocol: medicalExamination.protocol,
      gestationalAgeByUltrasoundWeeks: medicalExamination.gestationalAgeByUltrasoundWeeks,
      gestationalAgeByUltrasoundDays: medicalExamination.gestationalAgeByUltrasoundDays,
      gestationalAgeOnBloodTestWeeks: gestationalAgeOnBloodTest.weeks,
      gestationalAgeOnBloodTestDays: gestationalAgeOnBloodTest.days,
      ultrasoundDate: formatDate(medicalExamination.ultrasoundDate),
      bloodTestDate: formatDate(medicalExamination.bloodTestDate),
      bloodTestAge: getAgeInYears(patient.birthDate, medicalExamination.bloodTestDate),
      note: medicalExamination.note,
    },
    measurements: extractMeasurements(medicalExamination, translations, language),
    report: {
      generatedBy: user || '-',
      note: medicalExamination.note || '-',
      createdAt: formatDate(new Date()),
    },
    hospitalLogo
  };

  const template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'riskReport.template.handlebars'), 'utf8');
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate(data);

  return html;
};

const extractMeasurements = (medicalExamination, translations, language) => {
  const { pregnancy } = medicalExamination;
  const {
    hadPEInPreviousPregnancy,
    conceptionMethod,
    pregnancyType,
  } = pregnancy;

  const booleanMeasurements = {};
  (medicalExamination.booleanMeasurements || []).forEach(bm => {
    booleanMeasurements[bm.characteristicId] = bm;
  });

  const enumMeasurements = {};
  (medicalExamination.enumMeasurements || []).forEach(em => {
    enumMeasurements[em.characteristicId] = em;
  });

  const numericalMeasurements = {};
  (medicalExamination.numericalMeasurements || []).forEach(nm => {
    numericalMeasurements[nm.characteristicId] = nm;
  });

  const serumPLGF = numericalMeasurements[Characteristics.SerumPLGF.key];
  const serumPAPPA = numericalMeasurements[Characteristics.SerumPAPPA.key];
  const CRL = numericalMeasurements[Characteristics.FetalCrownRumpLength.key];
  const weight = numericalMeasurements[Characteristics.Weight.key];
  const height = numericalMeasurements[Characteristics.Height.key];

  const diabetes = enumMeasurements[Characteristics.DiabetesType.key];
  const smokingDuringPregnancy = booleanMeasurements[Characteristics.SmokingDuringPregnancy.key];

  return {
    serumPLGF: displayNumericalMeasurementValue(serumPLGF, Characteristics.SerumPLGF.unitOfMeasure, translations),
    serumPAPPA: displayNumericalMeasurementValue(serumPAPPA, Characteristics.SerumPAPPA.unitOfMeasure, translations),
    serumPLGFMoM: serumPLGF ? serumPLGF.value : '-', // TODO: calculate
    serumPAPPAMoM: serumPAPPA ? serumPAPPA.value : '-', // TODO: calculate
    CRL: displayNumericalMeasurementValue(CRL, Characteristics.FetalCrownRumpLength.unitOfMeasure, translations),
    weight: displayNumericalMeasurementValue(weight, Characteristics.Weight.unitOfMeasure, translations),
    height: displayNumericalMeasurementValue(height, Characteristics.Height.unitOfMeasure, translations),
    smokingDuringPregnancy: displayBooleanMeasurementValue(smokingDuringPregnancy, translations),
    hadPEInPreviousPregnancy: displayBooleanMeasurementValue(hadPEInPreviousPregnancy, translations),
    conceptionMethod: displayEnumMeasurementValue(
      conceptionMethod, Characteristics.ConceptionMethod.key, translations, language
    ),
    pregnancyType: displayEnumMeasurementValue(
      pregnancyType, Characteristics.PregnancyType.key, translations, language
    ),
    diabetesType: displayEnumMeasurementValue(diabetes, Characteristics.DiabetesType.key, translations, language),
  };
};

const getCharacteristicTranslations = (language) => ({
  serumPLGF: getCharacteristicTranslation(Characteristics.SerumPLGF, language),
  serumPAPPA: getCharacteristicTranslation(Characteristics.SerumPAPPA, language),
  CRL: getCharacteristicTranslation(Characteristics.FetalCrownRumpLength, language),
  weight: getCharacteristicTranslation(Characteristics.Weight, language),
  height: getCharacteristicTranslation(Characteristics.Height, language),
  smokingDuringPregnancy: getCharacteristicTranslation(Characteristics.SmokingDuringPregnancy, language),
  conceptionMethod: getCharacteristicTranslation(Characteristics.ConceptionMethod, language),
  pregnancyType: getCharacteristicTranslation(Characteristics.PregnancyType, language),
  diabetesType: getCharacteristicTranslation(Characteristics.DiabetesType, language),
});

module.exports = {
  generateHTMLReport,
};
