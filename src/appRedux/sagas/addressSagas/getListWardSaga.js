import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {getListWardApi} from 'appRedux/api/addressApi';

export function* getListWardSaga({payload, type}) {
  console.log('payload getListWardSaga', payload);
  const {showLoading = false, idDistrict, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListWardApi, idDistrict);
      const {wards} = result.data;
      console.log('==========>', wards);
      yield callback(wards);
    },
    null,
    showLoading,
    type,
  );
}
