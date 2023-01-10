import {put, call} from 'redux-saga/effects';
import {
  getUserInfoSuccess,
  refreshTokenSuccess,
} from 'appRedux/actions/authActions';
import {getUserInfoApi, refreshAccessTokenApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import {parseUserInfo} from 'appRedux/parsers/authParses';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES, KEY_ACTION_OTP, KEY_ACTION_PROFILE, ACCOUNT_STATUS} from 'utils/AppConst';
import APIUtils from 'utils/apiUtils';

export function* getUserInfoSaga({payload, type}) {
  const {
    showLoading = true,
    refreshToken,
    screenNavigate = null,
  } = payload || {};
  console.log('getUserInfoSaga', payload);
  yield invoke(
    function* execution() {
      if (refreshToken) {
        try {
          const reloadToken = yield call(refreshAccessTokenApi, refreshToken);
          if (reloadToken && reloadToken.data && reloadToken.data.accessToken) {
            yield APIUtils.setAccessToken(reloadToken.data.accessToken);
            yield put(refreshTokenSuccess(reloadToken.data.accessToken));
          }
        } catch (error) {}
      }
      const result = yield call(getUserInfoApi);
      const dataInfoParse = parseUserInfo(result.data);
      yield put(getUserInfoSuccess(dataInfoParse));
      //temp for waiting BE process logout when status user is closed
      if (
        dataInfoParse.status === ACCOUNT_STATUS.CLOSED ||
        dataInfoParse.status === ACCOUNT_STATUS.LOCKED
      ) {
        Toast.show({
          type: 'warning',
          props: {
            title:
              dataInfoParse.status === ACCOUNT_STATUS.CLOSED
                ? t('common:toastMessage.accountHasDeleted')
                : t('common:toastMessage.accountLocked', {
                    hotline: HOT_LINE.PHONE,
                  }),
          },
        });
        NavigationServices.resetActionTo(SCENE_NAMES.SIGN_IN);
        // yield put(signOutSubmit());
      }
      console.log('result dataInfoParse Saga', dataInfoParse);
      if (screenNavigate) {
        NavigationServices.replace(screenNavigate);
        return;
      }
      switch (payload?.keyAction) {
        case KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL:
          NavigationServices.navigate(SCENE_NAMES.DRIVER_INFORMATION);
          break;
        case KEY_ACTION_PROFILE.GET_USER_INFOR_AFTER_UPDATE:
          NavigationServices.goBack();
          break;
        case KEY_ACTION_PROFILE.CHANGE_TYPE_COMPANY_INFORMATION:
          NavigationServices.replace(SCENE_NAMES.DETAIL_DRIVER_INFO);
          break;
        // case KEY_ACTION_PROFILE.CHANGE_TYPE_COMPANY_STEP:
        //   NavigationServices.replace(STEP_NAME.STEP2);
        //   break;
        case KEY_ACTION_PROFILE.GET_DRIVER_INFORMATION_DETAIL:
          NavigationServices.navigate(SCENE_NAMES.GET_DRIVER_INFORMATION_DETAIL);
          break;
        case KEY_ACTION_PROFILE.GET_DRIVER_INFORMATION:
          NavigationServices.navigate(SCENE_NAMES.DETAIL_DRIVER_INFO);
          break;
        case KEY_ACTION_PROFILE.REFRESH_HOME_PAGE:
          break;
        default:
          NavigationServices.resetActionTo(SCENE_NAMES.HOME);
      }
    },
    null,
    showLoading,
    type,
  );
}
