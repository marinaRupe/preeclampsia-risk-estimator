import axios from 'axios';
import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import * as actionCreators from '../actionCreators/risk.actionCreators';

export function generatePDFReport(patientId, pregnancyNumber) {
  const action = async (dispatch) => {
    const resp = await axios.get(
      API.RISK.GENERATE_PDF_REPORT(patientId, pregnancyNumber),
      { method: 'GET', responseType: 'blob' }
    );
    if (resp.status === 200) {
      const file = new Blob(
        [resp.data], 
        { type: 'application/pdf' });
      
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);

      await dispatch(actionCreators.generatePDF({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
    }
  };
  return actionWrapper(action);
}