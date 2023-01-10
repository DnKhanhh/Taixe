import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListScheduleJourneyApi} from 'appRedux/api/tripApi';

export function* getScheduleJourneySaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    queries = {},
  } = payload || {};
  const queriesSubmit = new URLSearchParams(queries).toString();
  yield invoke(
    function* execution() {
      const result = yield call(getListScheduleJourneyApi, {
        queries: queriesSubmit,
      });
      if (result) {
        yield callback(result.data);
      }
    },
    null,
    showLoading,
    type,
  );
}
