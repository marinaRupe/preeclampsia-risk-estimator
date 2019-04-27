const Errors = require('restify-errors');
const fs = require('fs');
const html2pdf = require('html-pdf');
const path = require('path');
const Handlebars = require('handlebars');
const hospitalLogo = require('../assets/hospitalLogo');

const generatePdf = async (req, res) => {
  const { patientId } = req.params;

  const data = {
    patient: { firstName: 'Ana', lastName: 'Anić'},
    hospitalLogo
  };

  const template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'riskReport.template.handlebars'), 'utf8');
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate(data);

  const options = { format: 'A4', border: { top: '30px', left: '30px', right: '30px' } };
  const pdfName = `preeclampsia_risk_report_${patientId}_${new Date()}.pdf`;

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
