import * as Errors from 'restify-errors';
import * as path from 'path';
import UserService from 'services/user.service';
import MedicalExaminationService from 'services/medicalExamination.service';
import ReportService from 'services/report.service';
import { createPDFFromHTML } from 'utils/pdf.utils';
import { spawn } from 'child_process';
import { isDefined } from 'utils/value.utils';

const generatePdf = async (req, res) => {
	const medicalExaminationId = +req.params.medicalExaminationId;
	const { generatedBy } = req.body;
	const { translations, language } = res.locals;

	if (!isDefined(medicalExaminationId)) {
		throw new Errors.BadRequestError();
	}

	const medicalExamination = await MedicalExaminationService.getByIdDetailed(medicalExaminationId);
	if (!isDefined(medicalExamination)) {
		throw new Errors.NotFoundError();
	}

	const user = await UserService.getById(generatedBy.id);
	if (!isDefined(user)) {
		throw new Errors.BadRequestError();
	}

	const params = await ReportService.parseRiskEstimationData(medicalExamination);
	console.info('Starting the python script...');
	console.info(`Params: ${params}`);

	const pythonProcess = spawn('python3', [
		path.join(__dirname, '..', 'scripts', 'calculate_risk.py'), 
		...params
	]);

	pythonProcess.stdout.on('data', async (data) => {
		console.info('The python script finished successfully');
		const response = JSON.parse(data.toString().replace(/'/g, '"'));
		const { risk } = response;
		console.info(response);
		console.info(`Return value: ${risk}`);

		const reportData = ReportService.generateReportData(medicalExamination, risk, user);
		const report = await ReportService.createReport(reportData);

		if (!isDefined(report)) {
			throw new Errors.InternalServerError();
		}

		const html = await ReportService.generateHTMLReport(reportData, user, translations, language);
		const file = await createPDFFromHTML(html);

		res.set({ 'Content-Type': 'application/pdf', 'Content-Length': file.length });
		res.send(file);

		pythonProcess.kill();
	});

	pythonProcess.stderr.on('data', (err) => {
		console.info('The python script finished unsuccessfully');
		console.info(`Error: ${err.toString()}`);
		pythonProcess.kill();
		throw new Errors.InternalServerError();
	});
};

export default {
	generatePdf,
};
