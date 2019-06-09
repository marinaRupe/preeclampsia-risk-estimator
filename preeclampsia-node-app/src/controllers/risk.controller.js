const Errors = require('restify-errors');
const path = require('path');
const UserService = require('services/user.service');
const MedicalExaminationService = require('services/medicalExamination.service');
const ReportService = require('services/report.service');
const { createPDFFromHTML } = require('utils/pdf.utils');
const { spawn } = require('child_process');

const generatePdf = async (req, res) => {
  const { medicalExaminationId } = req.params;
  const { generatedBy } = req.body;
  const { translations, language } = res.locals;

  if (!medicalExaminationId) {
    throw new Errors.BadRequestError();
  }

  const medicalExamination = await MedicalExaminationService.getByIdDetailed(medicalExaminationId);
  if (!medicalExamination) {
    throw new Errors.NotFoundError();
  }

  const user = await UserService.getById(generatedBy.id);
  if (!user) {
    throw new Errors.BadRequestError();
  }

  console.info('Starting the python script...');

  const pythonProcess = spawn('python', [
    path.join(__dirname, '..', 'scripts', 'bayesian_linear_regression.py'), 
    process.env.POPULATE_DB_DATA_LOCATION,
  ]);

  pythonProcess.stdout.on('data', async (data) => {
    console.info('The python script finished successfully');
    const { risk } = JSON.parse(data.toString().replace(/'/g, '"'));
    console.info(`Return value: ${risk}`);

    const reportData = ReportService.generateReportData(medicalExamination, risk, user);
    const report = await ReportService.createReport(reportData);

    if (!report) {
      throw new Errors.InternalServerError();
    }

    const html = ReportService.generateHTMLReport(reportData, user, translations, language);
    const file = await createPDFFromHTML(html);

    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': file.length });
    res.send(file);
  });

  pythonProcess.stderr.on('data', (err) => {
    console.info('The python script finished unsuccessfully');
    console.info(`Error: ${err.toString()}`);
    throw new Errors.InternalServerError();
  });
};

module.exports = {
  generatePdf,
};
