import {takeLatest} from 'redux-saga/effects';
import {ADDRESS} from 'appRedux/actionsType';
import {getListProvinceSaga} from './getListProvinceSaga';
import {getListDistrictSaga} from './getListDistrictSaga';
import {getListWardSaga} from './getListWardSaga';
import {getIdAddressGoogleSaga} from './getIdAddressGoogleSaga';
import {getAddressFromGeoGoogleSaga} from './getAddressFromGeoGoogleSaga';
export default function* addressSagas() {
  yield takeLatest(ADDRESS.GET_LIST_PROVINCE.HANDLER, getListProvinceSaga);
  yield takeLatest(ADDRESS.GET_LIST_DISTRICT.HANDLER, getListDistrictSaga);
  yield takeLatest(ADDRESS.GET_LIST_WARD.HANDLER, getListWardSaga);
  yield takeLatest(
    ADDRESS.GET_ADDRESS_FROM_GEOCODING_GOOGLE.HANDLER,
    getAddressFromGeoGoogleSaga,
  );
  yield takeLatest(
    ADDRESS.GET_ID_ADDRESS_GOOGLE.HANDLER,
    getIdAddressGoogleSaga,
  );
}
