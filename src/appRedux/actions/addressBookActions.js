import {ADDRESS_BOOK} from 'appRedux/actionsType';

export const getListAddressBookSubmit = payload => {
  return {
    type: ADDRESS_BOOK.GET_LIST_ADDRESS_BOOK.HANDLER,
    payload,
  };
};

export const getDetailAddressBookSubmit = payload => {
  return {
    type: ADDRESS_BOOK.GET_DETAIL_ADDRESS_BOOK.HANDLER,
    payload,
  };
};

export const updateAddressBookSubmit = payload => {
  return {
    type: ADDRESS_BOOK.UPDATE_ADDRESS_BOOK.HANDLER,
    payload,
  };
};

export const deleteAddressBookSubmit = payload => {
  return {
    type: ADDRESS_BOOK.DELETE_ADDRESS_BOOK.HANDLER,
    payload,
  };
};

export const createAddressBookSubmit = payload => {
  return {
    type: ADDRESS_BOOK.CREATE_ADDRESS_BOOK.HANDLER,
    payload,
  };
};

export const setDefaultAddressBookSubmit = payload => {
  return {
    type: ADDRESS_BOOK.SET_DEFAULT_ADDRESS_BOOK.HANDLER,
    payload,
  };
};
