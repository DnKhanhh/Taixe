import {takeLatest, all} from 'redux-saga/effects';
import {ADDRESS_BOOK} from 'appRedux/actionsType';
import {getListAddressBookSaga} from './getListAddressBookSaga';
import {createAddressBookSaga} from './createAddressBookSaga';
import {updateAddressBookSaga} from './updateAddressBookSaga';
import {deleteAddressBookSaga} from './deleteAddressBookSaga';
import {getDetailAddressBookSaga} from './getDetailAddressBookSaga';
import {setDetailAddressBookSaga} from './setDefaultAddressBookSaga';

export default function* addressBookSagas() {
  yield all([
    takeLatest(
      ADDRESS_BOOK.GET_LIST_ADDRESS_BOOK.HANDLER,
      getListAddressBookSaga,
    ),
    takeLatest(ADDRESS_BOOK.CREATE_ADDRESS_BOOK.HANDLER, createAddressBookSaga),
    takeLatest(ADDRESS_BOOK.UPDATE_ADDRESS_BOOK.HANDLER, updateAddressBookSaga),
    takeLatest(ADDRESS_BOOK.DELETE_ADDRESS_BOOK.HANDLER, deleteAddressBookSaga),
    takeLatest(
      ADDRESS_BOOK.GET_DETAIL_ADDRESS_BOOK.HANDLER,
      getDetailAddressBookSaga,
    ),
    takeLatest(
      ADDRESS_BOOK.SET_DEFAULT_ADDRESS_BOOK.HANDLER,
      setDetailAddressBookSaga,
    ),
  ]);
}
