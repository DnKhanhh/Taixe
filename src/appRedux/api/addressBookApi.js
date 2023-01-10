import utils from 'utils/apiUtils';
import {ADDRESS_BOOK_API_PATH} from 'appRedux/api/PathApi';

export const getListAddressBookApi = ({queries}) => {
  console.log('call API');
  return utils.get(`${ADDRESS_BOOK_API_PATH}?${queries}`);
};

export const getDetailAddressBookApi = id => {
  return utils.get(`${ADDRESS_BOOK_API_PATH}/${id}`);
};

export const createAddressBookApi = data => {
  return utils.post(ADDRESS_BOOK_API_PATH, data);
};

export const updateAddressBookApi = (id, data) => {
  return utils.put(`${ADDRESS_BOOK_API_PATH}/${id}`, data);
};

export const deleteAddressBookApi = id => {
  return utils.delete(`${ADDRESS_BOOK_API_PATH}/${id}`);
};

export const setDefaultAddressBookApi = id => {
  return utils.put(`${ADDRESS_BOOK_API_PATH}/set-default/${id}`);
};
