import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListCostPendingApi} from 'appRedux/api/tripApi/addCostApi';
import {getListCostPendingSuccess} from 'appRedux/actions/tripAction';

export function* getListCostPendingSaga({payload, type}) {
  //   console.log('payload getListTrip check', payload);
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
    id = null,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListCostPendingApi, id);

      if (result) {
        yield put(getListCostPendingSuccess(result.data));
        // yield callback(result.data.items);
      }
    },
    null,
    showLoading,
    type,
  );
}
