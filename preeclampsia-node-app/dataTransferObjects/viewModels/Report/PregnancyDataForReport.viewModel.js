const MedicalExaminationDetailsViewModel = require('../Pregnancy/MedicalExaminationDetails.viewModel');
const PregnancyDetailsViewModel = require('../Pregnancy/PregnancyDetails.viewModel');

class PregnancyDataForReportViewModel {
  constructor(medicalExamination, pregnancy, patient) {
    this.medicalExamination = new MedicalExaminationDetailsViewModel(medicalExamination);
    this.pregnancy = new PregnancyDetailsViewModel(pregnancy);
    this.patient = patient;
  }
}

module.exports = PregnancyDataForReportViewModel;
