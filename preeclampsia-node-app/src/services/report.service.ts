import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { db } from 'models/index';
import { Characteristics } from 'constants/characteristics.constants';
import { RacialOriginTypes } from 'constants/patient.constants';
import hospitalLogo from '../assets/hospitalLogo';
import { formatDate, getAgeInYears } from 'utils/dateTime.utils';
import {
	getMeasurementValue,
	displayNumericalMeasurementValue,
	displayBooleanMeasurementValue,
	displayEnumMeasurementValue,
	getCharacteristicTranslation,
} from 'utils/measurement.utils';
import { DiabetesTypes } from 'constants/measurements.constants';
import { isDefined } from 'utils/value.utils';
import { PregnancyTypes, ConceptionMethods } from 'constants/pregnancy.constants';

const createReport = async (reportData) => {
	const report = await db.Report.create(reportData);
	return report;
};

const generateReportData = (medicalExamination, risk: number, user) => {
	const { pregnancy } = medicalExamination;
	const { patient } = pregnancy;

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

	const reportData = {
		firstName: patient.firstName,
		lastName: patient.lastName,
		MBO: patient.MBO,
		birthDate: patient.birthDate,
		protocol: medicalExamination.protocol,
		bloodTestDate: medicalExamination.bloodTestDate,
		weight: getMeasurementValue(numericalMeasurements[Characteristics.Weight.key]),
		height: getMeasurementValue(numericalMeasurements[Characteristics.Height.key]),
		racialOrigin: patient.racialOrigin,
		pregnancyType: pregnancy.pregnancyType,
		conceptionMethod: pregnancy.conceptionMethod,
		lastPeriodDate: pregnancy.lastPeriodDate,
		hadPEInPreviousPregnancy: pregnancy.hadPEInPreviousPregnancy,
		smokingDuringPregnancy: getMeasurementValue(booleanMeasurements[Characteristics.SmokingDuringPregnancy.key]),
		diabetesType: getMeasurementValue(enumMeasurements[Characteristics.DiabetesType.key]),
		PLGF: getMeasurementValue(numericalMeasurements[Characteristics.SerumPLGF.key]),
		PAPPA: getMeasurementValue(numericalMeasurements[Characteristics.SerumPAPPA.key]),
		ultrasoundDate: medicalExamination.ultrasoundDate,
		gestationalAgeByUltrasoundWeeks: medicalExamination.gestationalAgeByUltrasoundWeeks,
		gestationalAgeByUltrasoundDays: medicalExamination.gestationalAgeByUltrasoundDays,
		gestationalAgeOnBloodTestWeeks: medicalExamination.gestationalAgeOnBloodTestWeeks,
		gestationalAgeOnBloodTestDays: medicalExamination.gestationalAgeOnBloodTestDays,
		CRL: getMeasurementValue(numericalMeasurements[Characteristics.FetalCrownRumpLength.key]),
		calculatedRisk: 1 / risk,
		note: medicalExamination.note,
		dateGenerated: new Date(),
		generatedById: user.id,
		medicalExaminationId: medicalExamination.id,
	};

	return reportData;
};

const generateHTMLReport = (reportData, user, translations, language: string): string => {
	const data = {
		translations,
		characteristicTranslations: getCharacteristicTranslations(language),
		patient: {
			firstName: reportData.firstName,
			lastName: reportData.lastName,
			MBO: reportData.MBO,
			birthDate: formatDate(reportData.birthDate),
			racialOrigin: reportData.racialOrigin
        && Object.values(RacialOriginTypes).find(r => r.key === reportData.racialOrigin).hr,
			gynecologist: reportData.gynecologist || '-',
			protocol: reportData.protocol,
			gestationalAgeByUltrasoundWeeks: reportData.gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays: reportData.gestationalAgeByUltrasoundDays,
			gestationalAgeOnBloodTestWeeks: reportData.gestationalAgeOnBloodTestWeeks,
			gestationalAgeOnBloodTestDays: reportData.gestationalAgeOnBloodTestDays,
			ultrasoundDate: formatDate(reportData.ultrasoundDate),
			bloodTestDate: formatDate(reportData.bloodTestDate),
			bloodTestAge: getAgeInYears(reportData.birthDate, reportData.bloodTestDate),
		},
		measurements: extractMeasurements(reportData, translations, language),
		report: {
			risk: reportData.calculatedRisk,
			riskExplain: 'rizik manji od graničnog',
			generatedBy: user || '-',
			note: reportData.note || '-',
			createdAt: formatDate(reportData.dateGenerated),
		},
		hospitalLogo
	};

	const template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'riskReport.template.handlebars'), 'utf8');
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate(data);

	return html;
};

const extractMeasurements = (reportData, translations, language: string) => {
	const {
		hadPEInPreviousPregnancy,
		conceptionMethod,
		pregnancyType,
		CRL,
		weight,
		height,
		smokingDuringPregnancy,
		diabetesType,
		PLGF,
		PAPPA,
	} = reportData;

	return {
		serumPLGF: displayNumericalMeasurementValue(PLGF, Characteristics.SerumPLGF.unitOfMeasure, translations),
		serumPAPPA: displayNumericalMeasurementValue(PAPPA, Characteristics.SerumPAPPA.unitOfMeasure, translations),
		serumPLGFMoM: PLGF || '-', // TODO: calculate
		serumPAPPAMoM: PAPPA || '-', // TODO: calculate
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
		diabetesType: displayEnumMeasurementValue(
			diabetesType, Characteristics.DiabetesType.key, translations, language
		),
	};
};

const getCharacteristicTranslations = (language: string) => ({
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

const parseRiskEstimationData = (medicalExamination) => {
	const { pregnancy } = medicalExamination;
	const { patient } = pregnancy;

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

	const diabetesType = getMeasurementValue(enumMeasurements[Characteristics.DiabetesType.key]);
	const { conceptionMethod } = pregnancy;

	const age: number = getAgeInYears(patient.birthDate, medicalExamination.bloodTestDate);
	const PLGF: number = 0.34;
	const PAPP_A: number = 0.5;
	const weight: number
		= getMeasurementValue(numericalMeasurements[Characteristics.Weight.key]);
	const smokingDuringPregnancy: number
		= getMeasurementValue(booleanMeasurements[Characteristics.SmokingDuringPregnancy.key]) === true ? 1 : 0;
	const diabetes: number
		= isDefined(diabetesType) ? ((diabetesType === DiabetesTypes.None.key) ? 0 : 1) : null;
	const IVF: number
		= isDefined(conceptionMethod) ? (conceptionMethod === ConceptionMethods.InVitroFertilization ? 1 : 0) : null;

	const riskEstimationData: string[] = [
		isDefined(age) ? age.toString() : '',
		isDefined(PLGF) ? PLGF.toString() : '',
		isDefined(PAPP_A) ? PAPP_A.toString() : '',
		isDefined(weight) ? weight.toString() : '',
		isDefined(smokingDuringPregnancy) ? smokingDuringPregnancy.toString() : '',
		isDefined(diabetes) ? diabetes.toString() : '',
		isDefined(IVF) ? IVF.toString() : ''
	];

	return riskEstimationData;
};

export default {
	generateReportData,
	generateHTMLReport,
	createReport,
	parseRiskEstimationData,
};
