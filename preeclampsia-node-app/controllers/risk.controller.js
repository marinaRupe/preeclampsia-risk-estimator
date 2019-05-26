const Errors = require('restify-errors');
const fs = require('fs');
const html2pdf = require('html-pdf');
const path = require('path');
const Handlebars = require('handlebars');
const { Characteristics } = require('../constants/characteristics.constants');
const { ConceptionMethods, PregnancyTypes } = require('../constants/pregnancy.constants');
const { DiabetesTypes } = require('../constants/measurements.constants');
const hospitalLogo = require('../assets/hospitalLogo');
const UserService = require('../services/user.service');
const MedicalExaminationService = require('../services/medicalExamination.service');
const { formatDate, getAgeInYears, calculateGestationalAgeFromDate } = require('../utils/dateTime.utils');

const generatePdf = async (req, res) => {
  const { medicalExaminationId } = req.params;
  const { generatedBy } = req.body;

  if (!medicalExaminationId) {
    throw new Errors.BadRequestError();
  }

  const medicalExamination = await MedicalExaminationService.getById(medicalExaminationId);

  if (!medicalExamination) {
    throw new Errors.NotFoundError();
  }

  const { pregnancy } = medicalExamination;
  const { patient } = pregnancy;

  const user = await UserService.getById(generatedBy.id);

  if (!user) {
    throw new Errors.BadRequestError();
  }

  const gestationalAgeOnBloodTest = calculateGestationalAgeFromDate(
    medicalExamination.ultrasoundDate,
    medicalExamination.bloodTestDate,
    medicalExamination.gestationalAgeByUltrasoundWeeks,
    medicalExamination.gestationalAgeByUltrasoundDays
  );

  const booleanMeasurements = {};
  (medicalExamination.booleanMeasurements || []).forEach(bm => {
    booleanMeasurements[bm.characteristicId] = bm;
  });

  const numericalMeasurements = {};
  (medicalExamination.numericalMeasurements || []).forEach(nm => {
    numericalMeasurements[nm.characteristicId] = nm;
  });

  const enumMeasurements = {};
  (medicalExamination.enumMeasurements || []).forEach(em => {
    enumMeasurements[em.characteristicId] = em;
  });

  const serumPLGF = numericalMeasurements[Characteristics.SerumPLGF.key];
  const serumPAPPA = numericalMeasurements[Characteristics.SerumPAPPA.key];
  const CRL = numericalMeasurements[Characteristics.FetalCrownRumpLength.key];
  const weight = numericalMeasurements[Characteristics.Weight.key];
  const height = numericalMeasurements[Characteristics.Height.key];
  const diabetes = enumMeasurements[Characteristics.DiabetesType.key];

  const smokingDuringPregnancy = booleanMeasurements[Characteristics.SmokingDuringPregnancy.key];

  // TODO: calculate
  const serumPLGFMoM = serumPLGF && serumPLGF.value;
  const serumPAPPAMoM = serumPAPPA && serumPAPPA.value;

  // TODO: refactor
  const data = {
    patient: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      MBO: patient.MBO,
      birthDate: formatDate(patient.birthDate),
      racialOrigin: patient.racialOrigin,
      protocol: medicalExamination.protocol,
      gestationalAgeByUltrasoundWeeks: medicalExamination.gestationalAgeByUltrasoundWeeks,
      gestationalAgeByUltrasoundDays: medicalExamination.gestationalAgeByUltrasoundDays,
      gestationalAgeOnBloodTestWeeks: gestationalAgeOnBloodTest.weeks,
      gestationalAgeOnBloodTestDays: gestationalAgeOnBloodTest.days,
      ultrasoundDate: formatDate(medicalExamination.ultrasoundDate),
      bloodTestDate: formatDate(medicalExamination.bloodTestDate),
      bloodTestAge: getAgeInYears(patient.birthDate, medicalExamination.bloodTestDate),
      note: medicalExamination.note,
      serumPLGF: serumPLGF && serumPLGF.value,
      serumPAPPA: serumPAPPA && serumPAPPA.value,
      serumPLGFMoM,
      serumPAPPAMoM,
      height: height && height.value || '-',
      weight: weight && weight.value || '-',
      CRL: CRL && CRL.value || '-',
      hadPEInPreviousPregnancy: pregnancy.hadPEInPreviousPregnancy === null
        ? 'nepoznato'
        : (pregnancy.hadPEInPreviousPregnancy ? 'da' : 'ne'),
      smokingDuringPregnancy: smokingDuringPregnancy === null
        ?
        'nepoznato'
        : (smokingDuringPregnancy ? 'da' : 'ne'),
      conceptionMethod: pregnancy.conceptionMethod === null
        ? 'nepoznato'
        : Object.values(ConceptionMethods).find(m => m.key === pregnancy.conceptionMethod).hr,
      pregnancyType: pregnancy.pregnancyType === null
        ? 'nepoznato'
        : Object.values(PregnancyTypes).find(t => t.key === pregnancy.pregnancyType).hr,
      diabetesType: !diabetes
        ? 'nepoznato'
        : Object.values(DiabetesTypes).find(t => t.key === diabetes.value).hr,
    },
    report: {
      generatedBy: user,
      note: medicalExamination.note,
      createdAt: formatDate(new Date()),
    },
    hospitalLogo
  };

  const template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'riskReport.template.handlebars'), 'utf8');
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate(data);

  const options = { format: 'A4', border: { top: '30px', left: '30px', right: '30px' } };
  const pdfName = `preeclampsia_risk_report_${pregnancy.patientId}_${medicalExamination.id}_${new Date()}.pdf`;

  const file = await new Promise((resolve, reject) =>
    html2pdf
      .create(html, options)
      .toBuffer((err, stream) => err ? reject(err) : resolve(stream))
  );

  res.attachment(pdfName).send(file);
};

module.exports = {
  generatePdf,
};
