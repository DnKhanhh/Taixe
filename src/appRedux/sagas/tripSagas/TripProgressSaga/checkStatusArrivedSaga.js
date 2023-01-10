import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {checkStatusArrivedApi} from 'appRedux/api/tripApi';

export function* checkStatusArrivedSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    id = null,
    data = null,
  } = payload || {};
  yield invoke(
    function* execution() {
      // console.log('statussss', statusDriver, id);
      try {
        const result = yield call(checkStatusArrivedApi, {
          id,
          data,
        });
        if (result) {
          yield callback(result);
        }
      } catch (err) {
        yield callback(err);
      }
    },
    null,
    showLoading,
    type,
  );
}
