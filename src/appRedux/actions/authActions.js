import {AUTH} from 'appRedux/actionsType';

export const signInSubmit = payload => ({
  type: AUTH.SIGN_IN.HANDLER,
  payload,
});

export const signInSuccess = payload => ({
  type: AUTH.SIGN_IN.SUCCESS,
  payload,
});

export const refreshTokenSuccess = payload => ({
  type: AUTH.REFRESH_TOKEN.SUCCESS,
  payload,
});
export const getUserInfoSubmit = payload => ({
  type: AUTH.GET_USER_INFO.HANDLER,
  payload,
});

export const getUserInfoSuccess = payload => ({
  type: AUTH.GET_USER_INFO.SUCCESS,
  payload,
});

export const signOutSubmit = payload => ({
  type: AUTH.SIGN_OUT.HANDLER,
  payload,
});

export const signUpSubmit = payload => ({
  type: AUTH.SIGN_UP.HANDLER,
  payload,
});

export const signUpSuccess = payload => ({
  type: AUTH.SIGN_UP.SUCCESS,
  payload,
});

export const updateProfileSubmit = payload => ({
  type: AUTH.UPDATE_PROFILE.HANDLER,
  payload,
});

export const updateProfileSuccess = payload => ({
  type: AUTH.UPDATE_PROFILE.SUCCESS,
  payload,
});

export const setAccessToken = token => ({
  type: AUTH.ACCESS_TOKEN,
  payload: token,
});

export const checkOTPSMSSubmit = payload => ({
  type: AUTH.CHECK_OTP_SMS.HANDLER,
  payload,
});

export const checkOTPEmailSubmit = payload => ({
  type: AUTH.CHECK_OTP_EMAIL.HANDLER,
  payload,
});

export const sendOTPSMSSubmit = payload => ({
  type: AUTH.SEND_OTP_SMS.HANDLER,
  payload,
});

export const sendOTPEmailSubmit = payload => ({
  type: AUTH.SEND_OTP_EMAIL.HANDLER,
  payload,
});

export const verifyOTPSMSSubmit = payload => ({
  type: AUTH.VERIFY_OTP_SMS.HANDLER,
  payload,
});

export const verifyOTPEmailSubmit = payload => ({
  type: AUTH.VERIFY_OTP_EMAIL.HANDLER,
  payload,
});

export const changePasswordSubmit = payload => ({
  type: AUTH.CHANGE_PASSWORD.HANDLER,
  payload,
});

export const changePhoneSubmit = payload => ({
  type: AUTH.CHANGE_PHONE.HANDLER,
  payload,
});
export const changeEmailSubmit = payload => ({
  type: AUTH.CHANGE_EMAIL.HANDLER,
  payload,
});
export const changePhoneSuccess = payload => ({
  type: AUTH.CHANGE_PHONE.SUCCESS,
  payload,
});

export const checkPhoneOrEmailAccountExistedSubmit = payload => ({
  type: AUTH.CHECK_PHONE_OR_EMAIL_EXISTED.HANDLER,
  payload,
});

export const resetPasswordSubmit = payload => ({
  type: AUTH.RESET_PASSWORD.HANDLER,
  payload,
});

export const deleteAccountSubmit = payload => ({
  type: AUTH.DELETE_ACCOUNT.HANDLER,
  payload,
});

export const upgradeAccountSubmit = payload => ({
  type: AUTH.UPGRADE_ACCOUNT.HANDLER,
  payload,
});

export const updateProcessStep = payload => ({
  type: AUTH.UPDATE_PROCESS_STEP.HANDLER,
  payload,
});

export const getValidationLogSubmit = payload => ({
  type: AUTH.VALIDATION_LOG.HANDLER,
  payload,
});

export const changeStatusStopWorkingSubmit = payload => ({
  type: AUTH.CHANGE_STATUS_STOP_WORKING.HANDLER,
  payload,
});

export const changeStatusReactiveSubmit = payload => ({
  type: AUTH.CHANGE_STATUS_REACTIVE.HANDLER,
  payload,
});
