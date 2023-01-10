import {PAYMENT} from 'appRedux/actionsType';

export const getListBankSubmit = payload => ({
  type: PAYMENT.GET_LIST_BANK.HANDLER,
  payload,
});

export const getListBankSettingSubmit = payload => ({
  type: PAYMENT.GET_LIST_BANK_SETTING.HANDLER,
  payload,
});

export const createBankSubmit = payload => ({
  type: PAYMENT.CREATE_BANK.HANDLER,
  payload,
});

export const deleteBankSubmit = payload => ({
  type: PAYMENT.DELETE_BANK.HANDLER,
  payload,
});

export const setDefaultBankSubmit = payload => ({
  type: PAYMENT.SET_DEFAULT_BANK.HANDLER,
  payload,
});

export const getDetailBankInfoSubmit = payload => ({
  type: PAYMENT.GET_DETAIL_BANK_INFO.HANDLER,
  payload,
});

export const getListGatewaySubmit = payload => ({
  type: PAYMENT.GET_LIST_GATEWAY.HANDLER,
  payload,
});

export const getListGatewaySettingSubmit = payload => ({
  type: PAYMENT.GET_LIST_GATEWAY_SETTING.HANDLER,
  payload,
});

export const createGatewaySubmit = payload => ({
  type: PAYMENT.CREATE_GATEWAY.HANDLER,
  payload,
});

export const deleteGatewaySubmit = payload => ({
  type: PAYMENT.DELETE_GATEWAY.HANDLER,
  payload,
});

export const setDefaultGatewaySubmit = payload => ({
  type: PAYMENT.SET_DEFAULT_GATEWAY.HANDLER,
  payload,
});

export const getDetailGatewayInfoSubmit = payload => ({
  type: PAYMENT.GET_DETAIL_GATEWAY_INFO.HANDLER,
  payload,
});
