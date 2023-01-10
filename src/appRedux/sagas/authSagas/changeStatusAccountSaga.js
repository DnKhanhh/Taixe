import {call, put} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {
  changeStatusStopWorkingApi,
  changeStatusReactivateApi,
} from 'appRedux/api/authApi';
import {HOT_KEY, SCENE_NAMES} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
export function* changeStatusStopWorkingSaga({payload, type}) {
  const {showLoading = true, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(changeStatusStopWorkingApi);
      yield callback(result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t(
              'common:toastMessage.updateAccountStatusStopWorkingSuccess',
            ),
          },
        });
        yield put(
          getUserInfoSubmit({
            screenNavigate: SCENE_NAMES.DRIVER_INFORMATION,
          }),
        );
      }
    },
    null,
    showLoading,
    type,
  );
}

export const changeStatusReactivateSaga = ({payload, type}) => {
  const {showLoading = true} = payload || {};
  return invoke(
    function* execution() {
      const result = yield call(changeStatusReactivateApi);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.updateAccountStatusWorkingSuccess'),
          },
        });
        yield put(
          getUserInfoSubmit({
            screenNavigate: SCENE_NAMES.DRIVER_INFORMATION,
          }),
        );
      }
    },
    null,
    showLoading,
    type,
  );
};
