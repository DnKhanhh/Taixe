import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {uploadImagesApi} from 'appRedux/api/otherApi';

export function* uploadFilesSaga({payload, type}) {
  const {showLoading = true, callback = () => {}, imageFile} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(uploadImagesApi, imageFile);
      console.log('result Image upload', result);
      yield callback(null, result);
    },
    null,
    showLoading,
    type,
  );
}
