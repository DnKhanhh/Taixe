import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListCostPendingApi} from 'appRedux/api/tripApi';
import {getListCostPendingSuccess} from 'appRedux/actions/tripAction';
import {getDetailCostApi} from 'appRedux/api/tripApi/addCostApi';

export function* getDetailCostSaga({payload, type}) {
  //   console.log('payload getListTrip check', payload);
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
    id = null,
  } = payload || {};
  // console.log('ai di', id);
  yield invoke(
    function* execution() {
      const result = yield call(getDetailCostApi, id);

      if (result) {
        // yield put(getListCostPendingSuccess(result.data));
        yield callback(result.data);
        // yield callback();
      }
    },
    null,
    showLoading,
    type,
  );
}
