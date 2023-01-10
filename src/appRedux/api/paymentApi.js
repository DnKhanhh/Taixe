import utils from 'utils/apiUtils';
import {PAYMENT_INFO_API_PATH} from './PathApi';

export const getListBankApi = (page, limit) => {
  // console.log('getListBank run');
  return utils.get(
    `${PAYMENT_INFO_API_PATH.BANK_ACCOUNT_PATH}?page=${page}&limit=${limit}`,
  );
};

export const getListBankSettingApi = () => {
  console.log('getListBankSettingApi run');
  return utils.get(`${PAYMENT_INFO_API_PATH.GET_AVAILABLE_BANK_SETTING_PATH}`);
};

export const createBankApi = (
  fullName,
  accountId,
  branchName,
  bankCode,
  bankNumber,
  isActive = true,
) => {
  // console.log('createBankApi run');
  return utils.post(`${PAYMENT_INFO_API_PATH.BANK_ACCOUNT_PATH}`, {
    fullName,
    accountId,
    branchName,
    bankCode,
    bankNumber,
    isActive,
  });
};

export const deleteBankApi = id => {
  // console.log('deleteBankApi run');
  return utils.delete(`${PAYMENT_INFO_API_PATH.BANK_ACCOUNT_PATH}/${id}`);
};

export const setDefaultBankApi = id => {
  // console.log('setDefaultBankApi run');
  return utils.put(
    `${PAYMENT_INFO_API_PATH.SET_DEFAULT_BANK_ACCOUNT_PATH}/${id}`,
  );
};

export const getDetailBankInfoApi = id => {
  // console.log('getDetailBankInfoApi run');
  return utils.get(`${PAYMENT_INFO_API_PATH.BANK_ACCOUNT_PATH}/${id}`);
};

export const getListGatewayApi = () => {
  // console.log('getListGatewayApi run');
  return utils.get(`${PAYMENT_INFO_API_PATH.GATEWAY_ACCOUNT_PATH}`);
};

export const getListGatewaySettingApi = () => {
  console.log('getListGatewaySettingApi run');
  return utils.get(
    `${PAYMENT_INFO_API_PATH.GET_AVAILABLE_GATEWAY_SETTING_PATH}`,
  );
};

export const createGatewayApi = (
  fullName,
  accountId,
  paymentCode,
  paymentNumber,
  isActive = true,
) => {
  // console.log('createGatewayApi run');
  return utils.post(`${PAYMENT_INFO_API_PATH.GATEWAY_ACCOUNT_PATH}`, {
    fullName,
    accountId,
    paymentCode,
    paymentNumber,
    isActive,
  });
};

export const deleteGatewayApi = id => {
  // console.log('deleteGatewayApi run');
  return utils.delete(`${PAYMENT_INFO_API_PATH.GATEWAY_ACCOUNT_PATH}/${id}`);
};

export const setDefaultGatewayApi = id => {
  // console.log('setDefaultGatewayApi run');
  return utils.put(
    `${PAYMENT_INFO_API_PATH.SET_DEFAULT_GATEWAY_ACCOUNT_PATH}/${id}`,
  );
};

export const getDetailGatewayInfoApi = id => {
  // console.log('getDetailGatewayInfoApi run');
  return utils.get(`${PAYMENT_INFO_API_PATH.GATEWAY_ACCOUNT_PATH}/${id}`);
};
