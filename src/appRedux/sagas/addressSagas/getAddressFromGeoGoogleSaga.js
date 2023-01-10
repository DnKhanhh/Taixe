import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {getAddressFromGeoCodingGoogleApi} from 'appRedux/api/addressApi';

export function* getAddressFromGeoGoogleSaga({payload, type}) {
  console.log('payload getListDistrict', payload);
  const {showLoading = false, callback = () => {}, lat, long} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getAddressFromGeoCodingGoogleApi, lat, long);
      console.log('result call geo google', result);
      yield callback(result?.results);
    },
    null,
    showLoading,
    type,
  );
}
