import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {getDetailAddressBookApi} from 'appRedux/api/addressBookApi';

export function* getDetailAddressBookSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, id = null} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getDetailAddressBookApi, id);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}
