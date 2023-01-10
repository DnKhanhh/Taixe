import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {updateTripContinueAssignmentStatusApi} from 'appRedux/api/tripApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';
import {
  updateTripContinueAssignmentStatusSuccess,
  getDetailTripContinueSuccess,
} from 'appRedux/actions/tripAction';
import {t} from 'i18next';

export function* updateTripContinueAssignmentStatusSaga({payload, type}) {
  console.log('payload updateTripAssignment', payload);
  const {
    showLoading = false,
    callback = () => {},
    id = null,
    data = null,
    // queries = {},
  } = payload || {};
  yield invoke(
    function* execution() {
      console.log('id', id);
      const result = yield call(updateTripContinueAssignmentStatusApi, {
        id,
        data,
      });
      yield put(updateTripContinueAssignmentStatusSuccess(result.data));
      yield put(getDetailTripContinueSuccess(result.data));

      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('navigate:scenes.addressScreen.updateSuccess'),
          },
        });
        yield callback();
      }
    },
    null,
    showLoading,
    type,
  );
}
