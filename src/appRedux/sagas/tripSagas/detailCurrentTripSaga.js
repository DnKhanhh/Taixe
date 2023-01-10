import {call, put} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {detailsCurrentTripApi} from 'appRedux/api/tripApi';
import {detailsCurrentTripSuccess} from 'appRedux/actions/tripAction';

export function* detailsCurrentTripSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(detailsCurrentTripApi);
      if (result) {
        console.log('res:::::-::: khanh', result.data);
        yield put(detailsCurrentTripSuccess(result.data));
        yield callback(result.data);
      }
    },
    null,
    showLoading,
    type,
  );
}
