import {takeLatest} from 'redux-saga/effects';
import {signInSaga} from './signInSaga';
import {signUpSaga} from './signUpSaga';
import {AUTH} from 'appRedux/actionsType';
import {USER_PROFILE_ATTRIBUTES} from 'appRedux/actionsType';
import {getUserInfoSaga} from './getUserInfoSaga';
import {signOutSaga} from './signOutSaga';
import {
  updateProfileSaga,
  updateProcessTypeSaga,
  getUserInfoAttributesSaga,
} from './updateProfileSaga';
import {changePasswordSaga} from './changePasswordSaga';
import {changePhoneSaga} from './changePhoneSaga';
import {changeEmailSaga} from './changeEmailSaga';
import {resetPasswordSaga} from './resetPasswordSaga';
import {
  sendOTPSMSSaga,
  sendOTPEmailSaga,
  checkOTPSMSSaga,
  checkOTPEmailSaga,
  verifyOTPSMSSaga,
  verifyOTPEmailSaga,
} from './otpSaga';
import {checkPhoneOrEmailAccountExistedSaga} from './checkPhoneOrEmailAccountExisted';
import {deleteAccountSaga} from 'appRedux/sagas/authSagas/deleteAccountSaga';
import {upgradeAccountSaga} from 'appRedux/sagas/authSagas/upgradeAccountSaga';
import {validationLogSaga} from './validationLogSaga';
import {
  changeStatusStopWorkingSaga,
  changeStatusReactivateSaga,
} from 'appRedux/sagas/authSagas/changeStatusAccountSaga';

export default function* authSagas() {
  yield takeLatest(AUTH.SIGN_IN.HANDLER, signInSaga);
  yield takeLatest(AUTH.CHECK_OTP_SMS.HANDLER, checkOTPSMSSaga);
  yield takeLatest(AUTH.CHECK_OTP_EMAIL.HANDLER, checkOTPEmailSaga);
  yield takeLatest(AUTH.SEND_OTP_SMS.HANDLER, sendOTPSMSSaga);
  yield takeLatest(AUTH.SEND_OTP_EMAIL.HANDLER, sendOTPEmailSaga);
  yield takeLatest(AUTH.VERIFY_OTP_SMS.HANDLER, verifyOTPSMSSaga);
  yield takeLatest(AUTH.VERIFY_OTP_EMAIL.HANDLER, verifyOTPEmailSaga);
  yield takeLatest(AUTH.SIGN_UP.HANDLER, signUpSaga);
  yield takeLatest(AUTH.GET_USER_INFO.HANDLER, getUserInfoSaga);
  yield takeLatest(AUTH.UPDATE_PROFILE.HANDLER, updateProfileSaga);
  yield takeLatest(AUTH.CHANGE_PASSWORD.HANDLER, changePasswordSaga);
  yield takeLatest(AUTH.SIGN_OUT.HANDLER, signOutSaga);
  yield takeLatest(AUTH.CHANGE_PHONE.HANDLER, changePhoneSaga);
  yield takeLatest(AUTH.CHANGE_EMAIL.HANDLER, changeEmailSaga);
  yield takeLatest(AUTH.RESET_PASSWORD.HANDLER, resetPasswordSaga);
  yield takeLatest(
    AUTH.CHECK_PHONE_OR_EMAIL_EXISTED.HANDLER,
    checkPhoneOrEmailAccountExistedSaga,
  );
  yield takeLatest(AUTH.DELETE_ACCOUNT.HANDLER, deleteAccountSaga);
  yield takeLatest(AUTH.UPGRADE_ACCOUNT.HANDLER, upgradeAccountSaga);
  yield takeLatest(AUTH.UPDATE_PROCESS_STEP.HANDLER, updateProcessTypeSaga);
  yield takeLatest(
    USER_PROFILE_ATTRIBUTES.USER_PROFILE_ATTRIBUTES.HANDLER,
    getUserInfoAttributesSaga,
  );
  yield takeLatest(AUTH.VALIDATION_LOG.HANDLER, validationLogSaga);
  yield takeLatest(
    AUTH.CHANGE_STATUS_STOP_WORKING.HANDLER,
    changeStatusStopWorkingSaga,
  );
  yield takeLatest(
    AUTH.CHANGE_STATUS_REACTIVE.HANDLER,
    changeStatusReactivateSaga,
  );
}
