import {call, put} from 'redux-saga/effects';
import {checkPhoneOrEmailAccountExistedApi} from 'appRedux/api/authApi';
import {
  sendOTPEmailSubmit,
  sendOTPSMSSubmit,
} from 'appRedux/actions/authActions';
import {invoke} from 'helpers/sagas';
import {
  HOT_KEY,
  KEY_ACTION_OTP,
  BRANCH_NAME,
  SCENE_NAMES,
  HOT_LINE,
} from 'utils/AppConst';
import {isEmail} from 'utils/appUtils';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';
import NavigationServices from 'navigation/navigationServices';

export function* checkPhoneOrEmailAccountExistedSaga({payload, type}) {
  const {showLoading = true, keyAction, phoneOrEmail} = payload || {};
  yield invoke(
    function* execution() {
      switch (keyAction) {
        case KEY_ACTION_OTP.RESET_PASSWORD:
          try {
            const resultCheckAccountExist = yield call(
              checkPhoneOrEmailAccountExistedApi,
              phoneOrEmail,
              BRANCH_NAME,
            );
            if (resultCheckAccountExist.message === HOT_KEY.SUCCESS) {
              if (isEmail(phoneOrEmail)) {
                yield put(sendOTPEmailSubmit({email: phoneOrEmail}));
              } else {
                yield put(sendOTPSMSSubmit({phone: phoneOrEmail}));
              }
              yield NavigationServices.navigate(SCENE_NAMES.VERIFY_OTP_CHANGE, {
                phoneOrEmail: phoneOrEmail,
                keyAction: KEY_ACTION_OTP.RESET_PASSWORD,
              });
            }
          } catch (error) {
            const errorResult = error.response.data;
            if (
              error &&
              error.response.status === 403 &&
              errorResult.message === 'Account is not working'
            ) {
              if (isEmail(phoneOrEmail)) {
                yield put(sendOTPEmailSubmit({email: phoneOrEmail}));
              } else {
                yield put(sendOTPSMSSubmit({phone: phoneOrEmail}));
              }
              yield NavigationServices.navigate(SCENE_NAMES.VERIFY_OTP_CHANGE, {
                phoneOrEmail: phoneOrEmail,
                keyAction: KEY_ACTION_OTP.RESET_PASSWORD,
              });
            }
            if (
              error &&
              error.response.status === 403 &&
              errorResult.message !== 'Account is not working'
            ) {
              Toast.show({
                type: 'warning',
                props: {
                  title:
                    errorResult.message === 'Account is Lock'
                      ? t('common:toastMessage.accountLocked', {
                          hotline: HOT_LINE.PHONE,
                        })
                      : t('common:toastMessage.accountExistsNotChange'), //temp follow message BE
                },
              });
            }
            if (error && error.response.status === 422) {
              Toast.show({
                type: 'warning',
                props: {
                  title:
                    errorResult.message === 'Not found account' //temp follow BE
                      ? t('common:toastMessage.accountDeleted')
                      : errorResult.message, //temp follow message BE
                },
              });
            }
          }
          break;

        case KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL:
          try {
            const resultCheckAccountExists = yield call(
              checkPhoneOrEmailAccountExistedApi,
              phoneOrEmail,
              BRANCH_NAME,
            );
            if (resultCheckAccountExists.message === HOT_KEY.SUCCESS) {
              Toast.show({
                type: 'warning',
                props: {
                  title: isEmail(phoneOrEmail)
                    ? t('common:toastMessage.emailExistsNotChange')
                    : t('common:toastMessage.phoneExistsNotChange'),
                },
              });
            }
          } catch (error) {
            const errorResult = error.response.data;
            if (error && error.response.status === 422) {
              if (errorResult.message === 'Not found account') {
                if (isEmail(phoneOrEmail)) {
                  yield put(sendOTPEmailSubmit({email: phoneOrEmail}));
                } else {
                  yield put(sendOTPSMSSubmit({phone: phoneOrEmail}));
                }
                yield NavigationServices.navigate(
                  SCENE_NAMES.VERIFY_OTP_CHANGE,
                  {
                    phoneOrEmail: phoneOrEmail,
                    keyAction: KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL,
                  },
                );
              }
              if (error && error.response.status === 403) {
                Toast.show({
                  type: 'warning',
                  props: {
                    title:
                      errorResult.message === 'Account is Lock'
                        ? t('common:toastMessage.accountLocked', {
                            hotline: HOT_LINE.PHONE,
                          })
                        : errorResult.message === 'Account is not working'
                        ? t('common:toastMessage.accountExistsNotChange')
                        : errorResult.message, //temp follow message BE
                  },
                });
              }
            }
          }
          break;
        default:
          console.log('error');
      }
    },
    null,
    showLoading,
    type,
  );
}
