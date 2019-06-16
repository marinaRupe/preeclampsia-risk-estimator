import { ACTION_STATUS } from 'enums/responseStatus.enums';
import { API } from 'constants/routes';
import { actionWrapper } from 'utils/redux.utils';
import * as httpCalls from 'utils/http.utils';
import * as actionCreators from './statistics.actionCreators';

export function fetchMediansForCharacteristic(characteristicId) {
	const action = async (dispatch) => {
		const resp = await httpCalls.GET(
			API.STATISTICS.MEDIANS_FOR_CHARACTERISTIC(characteristicId)
		);

		if (resp.status === 200) {
			await dispatch(actionCreators.updateMediansForCharacteristic({
				status: ACTION_STATUS.SUCCESS,
				data: { characteristicId, medians: resp.data }
			}));
		}
	};
	return actionWrapper(action);
}
