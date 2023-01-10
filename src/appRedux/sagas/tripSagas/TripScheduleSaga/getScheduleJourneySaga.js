import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {
  getScheduleJourneyOfMonthApi,
  getScheduleJourneyOfDayApi,
} from 'appRedux/api/tripApi';

export function* getScheduleJourneyOfMonthSaga({payload, type}) {
  const {showLoading = true, callback = () => {}, year, month} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getScheduleJourneyOfMonthApi, year, month);
      yield callback(result?.data);
    },
    null,
    showLoading,
    type,
  );
}

export function* getScheduleJourneyOfDaySaga({payload, type}) {
  const {showLoading = true, callback = () => {}, date} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getScheduleJourneyOfDayApi, date);
      yield callback(result?.data);
    },
    null,
    showLoading,
    type,
  );
}
