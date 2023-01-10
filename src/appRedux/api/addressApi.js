import utils from 'utils/apiUtils';
import {ADDRESS_API_PATH} from 'appRedux/api/PathApi';
import {GOOGLE_PLACES_API_KEY} from 'utils/AppConst';
export const getListProvinceApi = () => {
  return utils.get(ADDRESS_API_PATH.GET_LIST_PROVINCE);
};

export const getListDistrictApi = provinceId => {
  return utils.get(`${ADDRESS_API_PATH.GET_LIST_DISTRICT}/${provinceId}`);
};

export const getListWardApi = districtId => {
  return utils.get(`${ADDRESS_API_PATH.GET_LIST_WARD}/${districtId}`);
};

export const getIdAddressGoogleApi = data => {
  return utils.post(`${ADDRESS_API_PATH.GET_ID_ADDRESS_GOOGLE}`, data);
};

export const getAddressFromGeoCodingGoogleApi = (lat, long) => {
  // console.log('latlng', lat, long);
  // console.log('${latlng}', `${lat}, ${long}`);
  return utils.getGoogleApi(
    `${ADDRESS_API_PATH.GET_ADDRESS_FROM_GEOCODING_GOOGLE}?latlng=${lat}, ${long}&key=${GOOGLE_PLACES_API_KEY}`,
  );
};
