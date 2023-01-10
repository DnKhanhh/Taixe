import {call, put} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {gpsTrackingVehicleApi} from 'appRedux/api/tripApi';
import {gpsTrackingVehicleSuccess} from 'appRedux/actions/tripAction';

export function* gpsTrackingVehicleSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, queries} = payload || {};
  const queriesSubmit = new URLSearchParams(queries).toString();
  yield invoke(
    function* execution() {
      const result = yield call(gpsTrackingVehicleApi, {
        queries: queriesSubmit,
      });
      if (result) {
        yield put(gpsTrackingVehicleSuccess(result.data?.[0] || {}));
        yield callback(result);
      }
    },
    null,
    showLoading,
    type,
  );
}
