import utils from 'utils/apiUtils';
import {TRIP_API_PATH} from 'appRedux/api/PathApi';

// trip CONTINUE
export const getListTripContinueApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GET_LIST_TRIP}`, queries);
};

export const getDetailTripContinueApi = id => {
  return utils.get(`${TRIP_API_PATH.GET_LIST_TRIP}/${id}`);
};

export const updateTripContinueAssignmentStatusApi = ({id, data}) => {
  return utils.put(
    `${TRIP_API_PATH.UPDATE_TRIP_ASSIGNMENT_STATUS}/${id}/assignment-status`,
    data,
  );
};
export const updateTripContinueStatusApi = ({id, data}) => {
  return utils.put(`${TRIP_API_PATH.UPDATE_TRIP_STATUS}/${id}/status`, data);
};

// trip GONE
export const getListTripGoneApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GET_LIST_TRIP_GONE}?${queries}`);
};

//get list schedule journey
export const getListScheduleJourneyApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GET_SCHEDULE_JOURNEY}?${queries}`);
};
//trip RECALL
export const getListTripRecallApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GET_LIST_TRIP_RECALL}`, queries);
};

//trip REJECT
export const getListTripRejectlApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GET_LIST_TRIP_REJECT}`, queries);
};

//Update trip assignment
export const updateTripAssignmentApi = ({id, assignmentStatusId}) => {
  return utils.put(
    `${TRIP_API_PATH.UPDATE_TRIP_ASSIGNMENT}/${id}/assignment-status`,
    assignmentStatusId,
  );
};

//detail current trip
export const detailsCurrentTripApi = () => {
  return utils.get(`${TRIP_API_PATH.DETAILS_CURRENT_TRIP}`);
};

//gps tracking vehicle
export const gpsTrackingVehicleApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GPS_TRACKING_VEHICLE}?${queries}`);
};

// trip PROGRESS
export const getListTripProgressApi = ({queries}) => {
  return utils.get(`${TRIP_API_PATH.GET_LIST_TRIP}`, queries);
};

// check status arrived
export const checkStatusArrivedApi = ({id, data}) => {
  console.log('statatata', data, id);
  return utils.put(
    `${TRIP_API_PATH.CHECK_STATUS_ARRIVED}/${id}/status-driver`,
    data,
  );
};

// Nhập liệu: typeInputData

export const typeInputDataApi = ({id, data}) => {
  return utils.putFormData(
    `${TRIP_API_PATH.TYPE_INPUT_DATA}/${id}/import-data`,
    data,
  );
};

//lich cac chuyen di theo thang
export const getScheduleJourneyOfMonthApi = (year, month) => {
  console.log('queries', year, month);
  return utils.get(
    `${TRIP_API_PATH.SCHEDULE_JOURNEY_OF_MONTH}?year=${year}&month=${month}`,
  );
};
//lich cac chuyen di theo ngay
export const getScheduleJourneyOfDayApi = date => {
  return utils.get(`${TRIP_API_PATH.SCHEDULE_JOURNEY_OF_DAY}?date=${date}`);
};

//bao cao su co
export const reportTroubleApi = ({id, data}) => {
  return utils.putFormData(
    `${TRIP_API_PATH.REPORT_TROUBLE}/${id}/report-trouble`,
    data,
  );
};
