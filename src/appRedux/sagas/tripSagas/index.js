import {takeLatest, all} from 'redux-saga/effects';
import {TRIP} from 'appRedux/actionsType';
//cho phi phat sinh saga
import {getListCostPendingSaga} from './CostActionsSagas/getListCostPendingSaga';
import {getListCostActiveSaga} from './CostActionsSagas/getListCostActiveSaga';
import {getDetailCostSaga} from './CostActionsSagas/getDetailCostSaga';
import {addCostsActionSaga} from './CostActionsSagas/addCostsActionSaga';
import {deleteCostsActionSaga} from './CostActionsSagas/deleteCostsActionSaga';
import {editCostsActionSaga} from './CostActionsSagas/editCostsActionSaga';

import {getListTripContinueSaga} from './TripContinueSaga/getListTripContinueSaga';
import {getDetailTripContinueSaga} from './TripContinueSaga/getDetailTripContinueSaga';
import {getListTripRecallSaga} from './getListTripRecallSaga';
import {getListTripRejectSaga} from './getListTripRejectSaga';
import {getScheduleJourneySaga} from './getScheduleJourneySaga';
import {detailsCurrentTripSaga} from './detailCurrentTripSaga';
import {gpsTrackingVehicleSaga} from './TripProgressSaga/gpsTrackingVehicleSaga';
import {updateTripContinueAssignmentStatusSaga} from './TripContinueSaga/updateTripContinueAssignmentStatusSaga';
import {updateTripContinueStatusSaga} from './TripContinueSaga/updateTripContinueStatusSaga';
import {getListTripProgressSaga} from './TripProgressSaga/getListTripProgressSaga';
import {checkStatusArrivedSaga} from './TripProgressSaga/checkStatusArrivedSaga';
import {getListTripGoneSaga} from './TripGoneSaga/getListTripGoneSaga';
import {typeInputDataSaga} from './TypeInputSaga/typeInputDataSaga';
import {
  getScheduleJourneyOfMonthSaga,
  getScheduleJourneyOfDaySaga,
} from './TripScheduleSaga/getScheduleJourneySaga';
//bao su co
import {reportTroubleSaga} from './reportTroubleSaga';
export default function* tripSagas() {
  // Chi phi phat sinh
  // danh sach pending
  yield all([
    takeLatest(TRIP.GET_LIST_COST_PENDING.HANDLER, getListCostPendingSaga),
  ]);
  // danh sach active
  yield all([
    takeLatest(TRIP.GET_LIST_COST_ACTIVE.HANDLER, getListCostActiveSaga),
  ]);
  // xem chi tiet chi phi phat sinh
  yield all([takeLatest(TRIP.GET_DETAIL_COST.HANDLER, getDetailCostSaga)]);
  // them chi phi phat sinh
  yield all([takeLatest(TRIP.COST_ACTION.HANDLER, addCostsActionSaga)]);
  //Xoa chi phi phat sinh
  yield all([
    takeLatest(TRIP.DELETE_COST_ACTION.HANDLER, deleteCostsActionSaga),
  ]);
  //Sua chi phi phat sinh
  yield all([takeLatest(TRIP.EDIT_COST_ACTION.HANDLER, editCostsActionSaga)]);

  // TRIP CONTINUE
  yield all([
    takeLatest(TRIP.GET_LIST_TRIP_CONTINUE.HANDLER, getListTripContinueSaga),
  ]);
  yield all([
    takeLatest(
      TRIP.GET_DETAIL_TRIP_CONTINUE.HANDLER,
      getDetailTripContinueSaga,
    ),
  ]);

  yield all([
    takeLatest(
      TRIP.UPDATE_TRIP_CONTINUE_ASSIGNMENT_STATUS.HANDLER,
      updateTripContinueAssignmentStatusSaga,
    ),
  ]);

  yield all([
    takeLatest(
      TRIP.UPDATE_TRIP_CONTINUE_STATUS.HANDLER,
      updateTripContinueStatusSaga,
    ),
  ]);

  yield all([takeLatest(TRIP.TYPE_INPUT_DATA.HANDLER, typeInputDataSaga)]);

  yield all([takeLatest(TRIP.GET_LIST_TRIP_GONE.HANDLER, getListTripGoneSaga)]);

  yield all([
    takeLatest(TRIP.GET_LIST_TRIP_RECALL.HANDLER, getListTripRecallSaga),
  ]);
  yield all([
    takeLatest(TRIP.GET_LIST_TRIP_REJECT.HANDLER, getListTripRejectSaga),
  ]);
  yield all([
    takeLatest(TRIP.DETAILS_CURRENT_TRIP.HANDLER, detailsCurrentTripSaga),
  ]);
  yield all([
    takeLatest(TRIP.GPS_TRACKING_VEHICLE.HANDLER, gpsTrackingVehicleSaga),
  ]);
  yield all([
    takeLatest(TRIP.GET_LIST_TRIP_PROGRESS.HANDLER, getListTripProgressSaga),
  ]);

  yield all([
    takeLatest(TRIP.GET_SCHEDULE_JOURNEY.HANDLER, getScheduleJourneySaga),
  ]);

  yield all([
    takeLatest(TRIP.CHECK_STATUS_ARRIVED.HANDLER, checkStatusArrivedSaga),
  ]);

  yield all([
    takeLatest(
      TRIP.SCHEDULE_JOURNEY_OF_MONTH.HANDLER,
      getScheduleJourneyOfMonthSaga,
    ),
  ]);
  yield all([
    takeLatest(
      TRIP.SCHEDULE_JOURNEY_OF_DAY.HANDLER,
      getScheduleJourneyOfDaySaga,
    ),
  ]);
  yield all([takeLatest(TRIP.REPORT_TROUBLE.HANDLER, reportTroubleSaga)]);
}
