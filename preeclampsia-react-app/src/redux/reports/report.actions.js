import { ACTION_STATUS } from 'enums/responseStatus.enums';
import { API } from 'constants/routes';
import { actionWrapper } from 'utils/redux.utils';
import { getLoginDataFromLocalStorage } from 'utils/auth.utils';
import { formatDateTime } from 'utils/dateTime.utils';
import * as httpCalls from 'utils/http.utils';
import * as actionCreators from './report.actionCreators';

export function generatePDFReport(medicalExaminationId) {
	const action = async (dispatch) => {

		const currentUser = getLoginDataFromLocalStorage().user;
		const body = {
			generatedBy: currentUser,
		};

		const res = await httpCalls.POST(
			API.RISK.GENERATE_PDF_REPORT(medicalExaminationId),
			body,
			{
				responseType: 'blob'
			}
		);
  
		if (res.status === 200) {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `preeclampsia_risk_report_${medicalExaminationId}_${formatDateTime(new Date())}.pdf`);
			document.body.appendChild(link);
			link.click();

			await dispatch(actionCreators.generatePDF({ status: ACTION_STATUS.SUCCESS, data: res.data }));
		}
	};
	return actionWrapper(action);
}

export function fetchPregnancyDataForReport(medicalExaminationId) {
	const action = async (dispatch) => {
		const resp = await httpCalls.GET(API.MEDICAL_EXAMINATIONS.BY_ID(medicalExaminationId));
		if (resp.status === 200) {
			await dispatch(actionCreators.updatePregnancyDataForReport({
				status: ACTION_STATUS.SUCCESS,
				data: resp.data,
			}));
		}
	};
	return actionWrapper(action);
}

