import utils from 'utils/apiUtils';
import {TRIP_API_PATH} from 'appRedux/api/PathApi';
// COST ACTION(chi phi phat sinh)

// xem danh sach chi phi phat sinh
// pending
export const getListCostPendingApi = id => {
  return utils.get(`${TRIP_API_PATH.API_COST_ACTION}/${id}/incurred-pending`);
};
// active
export const getListCostActiveApi = id => {
  return utils.get(`${TRIP_API_PATH.API_COST_ACTION}/${id}/incurred-active`);
};

//them chi phi phat sinh
export const addCostActionApi = ({data}) => {
  return utils.postFormData(`${TRIP_API_PATH.API_COST_ACTION}`, data);
};

//Sua chi phi phat sinh
export const editCostActionApi = ({data, id}) => {
  return utils.putFormData(`${TRIP_API_PATH.API_COST_ACTION}/${id}`, data);
};

//Xoa chi phi phat sinh
export const deleteCostActionApi = id => {
  return utils.delete(`${TRIP_API_PATH.API_COST_ACTION}/${id}`);
};

//xem chi tiet chi phi phat sinh:
export const getDetailCostApi = id => {
  return utils.get(`${TRIP_API_PATH.API_COST_ACTION}/${id}`);
};
