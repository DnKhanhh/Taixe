import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListProvinceApi} from 'appRedux/api/addressApi';
import {getListProvinceSuccess} from 'appRedux/actions/addressActions';

export function* getListProvinceSaga({payload, type}) {
  const {showLoading = false} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListProvinceApi);
      if (result.status === true) {
        yield put(getListProvinceSuccess(result.data));
      }
    },
    null,
    showLoading,
    type,
  );
}
