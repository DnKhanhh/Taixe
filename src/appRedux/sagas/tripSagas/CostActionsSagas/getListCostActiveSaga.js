import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListCostActiveApi} from 'appRedux/api/tripApi/addCostApi';
import {getListCostActiveSuccess} from 'appRedux/actions/tripAction';

export function* getListCostActiveSaga({payload, type}) {
  //   console.log('payload getListTrip check', payload);
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
    id = null,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListCostActiveApi, id);

      if (result) {
        yield put(getListCostActiveSuccess(result.data));
        // yield callback(result.data.items);
      }
    },
    null,
    showLoading,
    type,
  );
}
