import {put, call} from 'redux-saga/effects';
import {
  getUserInfoSubmit,
  setAccessToken,
  signInSuccess,
} from 'appRedux/actions/authActions';
import {signInApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import APIUtils from 'utils/apiUtils';
import {BRANCH_NAME, HOT_KEY, SCENE_NAMES, HOT_LINE} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* signInSaga({payload, type}) {
  const {showLoading = true} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        signInApi,
        payload.phoneOrEmail,
        payload.password,
        BRANCH_NAME,
      );

      const accessToken = result.data.accessToken;
      APIUtils.setAccessToken(accessToken);
      yield put(setAccessToken(accessToken));
      yield put(signInSuccess(result.data));

      if (result.message === HOT_KEY.SUCCESS) {
        yield put(getUserInfoSubmit());
      }
    },
    error => {
      if (
        error &&
        error.status === 403 &&
        error.data &&
        error.data.isActivated === false
      ) {
        NavigationServices.navigate(SCENE_NAMES.SELECT_OTP, {
          otpOptions: {
            phone: error.data.phone,
            email: error.data.email,
          },
          password: payload.password,
          phoneOrEmail: payload.phoneOrEmail,
          keyAction: 'login',
        });
      } else {
        Toast.show({
          type: 'warning',
          props: {
            title:
              error.message === 'User is locked'
                ? t('common:toastMessage.accountLocked', {
                    hotline: HOT_LINE.PHONE,
                  })
                : error.message === 'Account not found.' //temp follow BE
                ? t('common:toastMessage.accountDeleted')
                : error.message, //temp follow message BE
          },
        });
      }
    },
    showLoading,
    type,
  );
}
