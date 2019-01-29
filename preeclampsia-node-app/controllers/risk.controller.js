const errors = require('restify-errors');
const fs = require('fs');
const html2pdf = require('html-pdf');
const path      = require('path');

const generatePdf = async (req, res) => {
  const { patientId, pregnancyNumber } = req.params;

  const html = fs.readFileSync(path.join(__dirname, '..', 'templates', 'riskReport.template.html'), 'utf8');
  const options = { format: 'A4', border: { top: '30px', left: '30px', right: '30px' } };
  
  const pdfName = `preeclampsia_risk_report_${patientId}_${pregnancyNumber}_${new Date()}.pdf`;

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
