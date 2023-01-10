import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {getListDistrictApi} from 'appRedux/api/addressApi';

export function* getListDistrictSaga({payload, type}) {
  console.log('payload getListDistrict', payload);
  const {showLoading = false, callback = () => {}, idProvince} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListDistrictApi, idProvince);
      const {districts} = result.data;
      yield callback(districts);
    },
    null,
    showLoading,
    type,
  );
}
