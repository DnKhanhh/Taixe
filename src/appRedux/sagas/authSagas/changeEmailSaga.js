import {call, put} from 'redux-saga/effects';
import {changeEmailApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import {HOT_KEY, KEY_ACTION_OTP} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';

export function* changeEmailSaga({payload, type}) {
  console.log('payload changeEmailSaga', payload);
  const {showLoading = true, callback = () => {}, email} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(changeEmailApi, email);
      yield callback(result.data);
      yield put(
        getUserInfoSubmit({
          showLoading: true,
          keyAction: KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL,
        }),
      );
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:changeEmail'),
          },
        });
      } else {
        Toast.show({
          type: 'warning',
          props: {
            title: result.message,
          },
        });
      }
    },
    null,
    showLoading,
    type,
  );
}
