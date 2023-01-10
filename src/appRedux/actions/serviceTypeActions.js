import {SERVICE_TYPE} from 'appRedux/actionsType';
//vehicle
export const getListServiceType = payload => ({
  type: SERVICE_TYPE.GET_LIST_SERVICE_TYPE.HANDLER,
  payload,
});
export const getDetailServiceType = payload => ({
  type: SERVICE_TYPE.GET_SERVICE_TYPE_DETAIL.HANDLER,
  payload,
});
export const createServiceType = payload => ({
  type: SERVICE_TYPE.CREATE_SERVICE_TYPE.HANDLER,
  payload,
});

export const editServiceType = payload => ({
  type: SERVICE_TYPE.EDIT_SERVICE_TYPE.HANDLER,
  payload,
});
