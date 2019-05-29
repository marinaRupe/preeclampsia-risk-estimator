const Errors = require('restify-errors');
const UserService = require('../services/user.service');
const MedicalExaminationService = require('../services/medicalExamination.service');
const ReportService = require('../services/report.service');
const { createPDFFromHTML } = require('../utils/pdf.utils');

const generatePdf = async (req, res) => {
  const { medicalExaminationId } = req.params;
  const { generatedBy } = req.body;
  const { translations, language } = res.locals;

  if (!medicalExaminationId) {
    throw new Errors.BadRequestError();
  }

  const medicalExamination = await MedicalExaminationService.getById(medicalExaminationId);
  if (!medicalExamination) {
    throw new Errors.NotFoundError();
  }

  const user = await UserService.getById(generatedBy.id);
  if (!user) {
    throw new Errors.BadRequestError();
  }

  const html = ReportService.generateHTMLReport(medicalExamination, user, translations, language);

  const pdfName = `preeclampsia_risk_report_${medicalExamination.id}_${new Date()}.pdf`;
  const file = await createPDFFromHTML(html);

  res.attachment(pdfName).send(file);
};

module.exports = {
  generatePdf,
};
