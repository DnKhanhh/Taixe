import {call, put} from 'redux-saga/effects';
import {changePhoneApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import {HOT_KEY, KEY_ACTION_OTP} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';

export function* changePhoneSaga({payload, type}) {
  console.log('payload changePhoneSaga', payload);
  const {showLoading = true, callback = () => {}, phone} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(changePhoneApi, phone);
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
            title: t('common:changePhone'),
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
