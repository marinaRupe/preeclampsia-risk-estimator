import { ACTION_STATUS } from '../../enums/responseStatus.enums';
import { API } from '../../constants/routes';
import { actionWrapper } from '../../utils/redux.utils';
import { getLoginDataFromLocalStorage } from '../../utils/auth.utils';
import * as httpCalls from '../../utils/http.utils';
import * as actionCreators from '../actionCreators/risk.actionCreators';

export function generatePDFReport(trimesterId, user) {
  const action = async (dispatch) => {

    const currentUser = getLoginDataFromLocalStorage().user;

    const body = {
      generatedBy: currentUser,
    };

    const resp = await httpCalls.POST(
      API.RISK.GENERATE_PDF_REPORT(trimesterId),
      body,
      {
        responseType: 'blob'
      }
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