import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {getListAddressBookApi} from 'appRedux/api/addressBookApi';

export function* getListAddressBookSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
  } = payload || {};
  const queriesSubmit = new URLSearchParams(queries).toString();
  yield invoke(
    function* execution() {
      const result = yield call(getListAddressBookApi, {
        queries: queriesSubmit,
      });
      yield callback(result.data.items);
    },
    null,
    showLoading,
    type,
  );
}
