import {call, put} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {getListTripProgressApi} from 'appRedux/api/tripApi';

export function* getListTripProgressSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, queries} = payload || {};
  const queriesSubmit = new URLSearchParams(queries).toString();
  yield invoke(
    function* execution() {
      const result = yield call(getListTripProgressApi, {
        queries: queriesSubmit,
      });
      if (result) {
        yield callback(result);
      }
    },
    null,
    showLoading,
    type,
  );
}
