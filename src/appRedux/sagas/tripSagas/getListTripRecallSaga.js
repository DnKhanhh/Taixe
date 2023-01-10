import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {getListTripRecallApi} from 'appRedux/api/tripApi';

export function* getListTripRecallSaga({payload, type}) {
  //   console.log('payload getListTrip', payload);
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListTripRecallApi, {
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
