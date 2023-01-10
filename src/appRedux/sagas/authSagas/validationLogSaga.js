import {call} from 'redux-saga/effects';
import {validationLogApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';

export function* validationLogSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, types} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        validationLogApi,
        types,
        payload?.accountId,
        payload?.vehicleId,
      );
      console.log('result validationLogSaga', result);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}
