import {ADDRESS} from 'appRedux/actionsType';

export const getListProvince = payload => {
  return {
    type: ADDRESS.GET_LIST_PROVINCE.HANDLER,
    payload,
  };
};

export const getListProvinceSuccess = payload => {
  return {
    type: ADDRESS.GET_LIST_PROVINCE.SUCCESS,
    payload,
  };
};

export const getListDistrict = payload => {
  return {
    type: ADDRESS.GET_LIST_DISTRICT.HANDLER,
    payload,
  };
};

export const getListWard = payload => {
  return {
    type: ADDRESS.GET_LIST_WARD.HANDLER,
    payload,
  };
};

export const getIdAddressGoogleSubmit = payload => {
  return {
    type: ADDRESS.GET_ID_ADDRESS_GOOGLE.HANDLER,
    payload,
  };
};

export const getAddressFromGeoCodingGoogleSubmit = payload => {
  return {
    type: ADDRESS.GET_ADDRESS_FROM_GEOCODING_GOOGLE.HANDLER,
    payload,
  };
};