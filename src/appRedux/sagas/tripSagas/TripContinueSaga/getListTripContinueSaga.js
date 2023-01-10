import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListTripContinueApi} from 'appRedux/api/tripApi';
import {getListTripContinueSuccess} from 'appRedux/actions/tripAction';

export function* getListTripContinueSaga({payload, type}) {
  console.log('payload getListTrip check', payload);
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
  } = payload || {};

  yield invoke(
    function* execution() {
      const result = yield call(getListTripContinueApi, {
        queries,
      });
      if (result) {
        yield put(getListTripContinueSuccess(result.data.items));
        // yield callback(result.data.items);
      }
    },
    null,
    showLoading,
    type,
  );
}
