import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {getListTripGoneApi} from 'appRedux/api/tripApi';

export function* getListTripGoneSaga({payload, type}) {
  const {showLoading = true, callback = () => {}, queriesJourney} = payload || {};
  const queries = new URLSearchParams(queriesJourney).toString();
  yield invoke(
    function* execution() {
      const result = yield call(getListTripGoneApi, {queries});
      yield callback(result?.data);
      // if (result) {
      //   yield callback(result?.data?.delivered);
      // }
    },
    null,
    showLoading,
    type,
  );
}
