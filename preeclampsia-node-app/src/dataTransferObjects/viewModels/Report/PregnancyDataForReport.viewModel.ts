import MedicalExaminationDetailsViewModel from '../MedicalExamination/MedicalExaminationDetails.viewModel';
import PregnancyDetailsViewModel from '../Pregnancy/PregnancyDetails.viewModel';
import PatientDetailsViewModel from '../Patient/PatientDetails.viewModel';

class PregnancyDataForReportViewModel {
	medicalExamination: MedicalExaminationDetailsViewModel;
	pregnancy: PregnancyDetailsViewModel;
	patient: PatientDetailsViewModel;


	constructor(medicalExamination, pregnancy, patient) {
		this.medicalExamination = new MedicalExaminationDetailsViewModel(medicalExamination);
  	this.pregnancy = new PregnancyDetailsViewModel(pregnancy);
  	this.patient = new PatientDetailsViewModel(patient);
	}
}

export default PregnancyDataForReportViewModel;
