import {call, put} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {getDetailTripContinueApi} from 'appRedux/api/tripApi';
import {getDetailTripContinueSuccess} from 'appRedux/actions/tripAction';

export function* getDetailTripContinueSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, id = null} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getDetailTripContinueApi, id);
      yield callback();
      if (result) {
        yield put(getDetailTripContinueSuccess(result.data));
        // yield callback(result.data.items);
      }
    },
    null,
    showLoading,
    type,
  );
}
