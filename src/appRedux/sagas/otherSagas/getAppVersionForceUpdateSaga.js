import {put, call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {getVersionSuccess} from 'appRedux/actions/otherActions';
import {getAppVersionForceUpdateApi} from 'appRedux/api/otherApi';

export function* getAppVersionForceUpdateSaga({payload}) {
  const {callback = () => {}} = payload || {};
  yield invoke(function* execution() {
    const result = yield call(getAppVersionForceUpdateApi);
    const data = result;
    yield put(getVersionSuccess(data));
    callback(null, data);
  });
}
