import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListTripRejectlApi} from 'appRedux/api/tripApi';

export function* getListTripRejectSaga({payload, type}) {
  //   console.log('payload getListTrip', payload);
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListTripRejectlApi, {
        queries,
      });
      if (result) {
        yield callback(result.data.items);
      }
    },
    null,
    showLoading,
    type,
  );
}
