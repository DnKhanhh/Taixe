import {takeLatest} from 'redux-saga/effects';
import {OTHER} from 'appRedux/actionsType';
import {getAppVersionForceUpdateSaga} from './getAppVersionForceUpdateSaga';
import {uploadFilesSaga} from './uploadFiles';

export default function* otherSagas() {
  yield takeLatest(OTHER.GET_APP_VERSION.HANDLER, getAppVersionForceUpdateSaga);
  yield takeLatest(OTHER.UPLOAD_IMAGE.HANDLER, uploadFilesSaga);
}
