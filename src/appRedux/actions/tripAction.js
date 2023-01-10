import {TRIP} from 'appRedux/actionsType';

// get LIST trip CONTINUE
export const getListTripContinue = payload => {
  return {
    type: TRIP.GET_LIST_TRIP_CONTINUE.HANDLER,
    payload,
  };
};

export const getListTripContinueSuccess = payload => {
  return {
    type: TRIP.GET_LIST_TRIP_CONTINUE.SUCCESS,
    payload,
  };
};
// get DETAIL trip CONTINUE
export const getDetailTripContinue = payload => {
  return {
    type: TRIP.GET_DETAIL_TRIP_CONTINUE.HANDLER,
    payload,
  };
};

export const getDetailTripContinueSuccess = payload => {
  return {
    type: TRIP.GET_DETAIL_TRIP_CONTINUE.SUCCESS,
    payload,
  };
};

// chi phi phat sinh
// danh sach pending
export const getListCostPending = payload => {
  return {
    type: TRIP.GET_LIST_COST_PENDING.HANDLER,
    payload,
  };
};

export const getListCostPendingSuccess = payload => {
  return {
    type: TRIP.GET_LIST_COST_PENDING.SUCCESS,
    payload,
  };
};
// danh sach active
export const getListCostActive = payload => {
  return {
    type: TRIP.GET_LIST_COST_ACTIVE.HANDLER,
    payload,
  };
};

export const getListCostActiveSuccess = payload => {
  return {
    type: TRIP.GET_LIST_COST_ACTIVE.SUCCESS,
    payload,
  };
};

//them chi phi phat sinh
export const addCostAction = payload => {
  return {
    type: TRIP.COST_ACTION.HANDLER,
    payload,
  };
};

export const addCostActionSuccess = payload => {
  return {
    type: TRIP.COST_ACTION.SUCCESS,
    payload,
  };
};
//Sua chi phi phat sinh
export const editCostAction = payload => {
  return {
    type: TRIP.EDIT_COST_ACTION.HANDLER,
    payload,
  };
};
//Xoa chi phi phat sinh
export const deleteCostAction = payload => {
  return {
    type: TRIP.DELETE_COST_ACTION.HANDLER,
    payload,
  };
};
//xem chi tiet chi phi phat sinh
export const getDetailCostAction = payload => {
  return {
    type: TRIP.GET_DETAIL_COST.HANDLER,
    payload,
  };
};

// get list trip GONE
export const getListTripGone = payload => {
  return {
    type: TRIP.GET_LIST_TRIP_GONE.HANDLER,
    payload,
  };
};
// get list trip RECALL
export const getListTripRecall = payload => {
  return {
    type: TRIP.GET_LIST_TRIP_RECALL.HANDLER,
    payload,
  };
};

// get list trip REJECT
export const getListTripReject = payload => {
  return {
    type: TRIP.GET_LIST_TRIP_REJECT.HANDLER,
    payload,
  };
};

// get schedule of trips
export const getScheduleOfTrips = payload => {
  return {
    type: TRIP.GET_SCHEDULE_OF_TRIPS.HANDLER,
    payload,
  };
};

//Update trip assignment
export const updateTripContinueAssignmentStatus = payload => {
  return {
    type: TRIP.UPDATE_TRIP_CONTINUE_ASSIGNMENT_STATUS.HANDLER,
    payload,
  };
};

export const updateTripContinueAssignmentStatusSuccess = payload => {
  return {
    type: TRIP.UPDATE_TRIP_CONTINUE_ASSIGNMENT_STATUS.SUCCESS,
    payload,
  };
};

//Update trip status
export const updateTripContinueStatus = payload => {
  return {
    type: TRIP.UPDATE_TRIP_CONTINUE_STATUS.HANDLER,
    payload,
  };
};

//Update trip assignment
export const detailsCurrentTripSubmit = payload => {
  return {
    type: TRIP.DETAILS_CURRENT_TRIP.HANDLER,
    payload,
  };
};

export const detailsCurrentTripSuccess = payload => {
  return {
    type: TRIP.DETAILS_CURRENT_TRIP.SUCCESS,
    payload,
  };
};

//gps tracking vehicle
export const gpsTrackingVehicleSubmit = payload => {
  return {
    type: TRIP.GPS_TRACKING_VEHICLE.HANDLER,
    payload,
  };
};
//gps tracking vehicle
export const gpsTrackingVehicleSuccess = payload => {
  return {
    type: TRIP.GPS_TRACKING_VEHICLE.SUCCESS,
    payload,
  };
};

// GET_LIST_TRIP_PROGRESS
export const getListTripProgress = payload => {
  return {
    type: TRIP.GET_LIST_TRIP_PROGRESS.HANDLER,
    payload,
  };
};
//get list schedule journey
export const getListScheduleJourney = payload => {
  return {
    type: TRIP.GET_SCHEDULE_JOURNEY.HANDLER,
    payload,
  };
};
//check status arrived
export const checkStatusArrivedSubmit = payload => {
  return {
    type: TRIP.CHECK_STATUS_ARRIVED.HANDLER,
    payload,
  };
};

//Nhap lieu
export const typeInputData = payload => {
  return {
    type: TRIP.TYPE_INPUT_DATA.HANDLER,
    payload,
  };
};
//schedule
export const scheduleJourneyOfMonthSubmit = payload => {
  return {
    type: TRIP.SCHEDULE_JOURNEY_OF_MONTH.HANDLER,
    payload,
  };
};

export const scheduleJourneyOfDaySubmit = payload => {
  return {
    type: TRIP.SCHEDULE_JOURNEY_OF_DAY.HANDLER,
    payload,
  };
};

//bao cao su co
export const reportTroubleSubmit = payload => {
  return {
    type: TRIP.REPORT_TROUBLE.HANDLER,
    payload,
  };
};
