import utils from 'utils/apiUtils';
import {AUTHENTICATION_API_PATH, ACCOUNT_API_PATH} from './PathApi';

export const signInApi = (phoneOrEmail, password, profileType) => {
  
  return utils.post(`${AUTHENTICATION_API_PATH.LOGIN_PATH}`, {
    phoneOrEmail,
    password,
    profileType,
  });
};

export const checkOTPSMSApi = phone => {
  console.log('sendOTPApi run');
  return utils.post(`${AUTHENTICATION_API_PATH.CHECK_OTP_BY_SMS_PATH}`, {
    phone,
  });
};

export const checkOTPEmailApi = email => {
  console.log('sendOTPApi run');
  return utils.post(
    `${AUTHENTICATION_API_PATH.CHECK_OTP_BY_EMAIL_PATH}`,
    email,
  );
};

export const sendOTPSMSApi = phone => {
  console.log('sendOTPApi run');
  return utils.post(`${AUTHENTICATION_API_PATH.SEND_OTP_BY_SMS_PATH}`, {phone});
};

export const sendOTPEmailApi = email => {
  console.log('sendOTPApi run');
  return utils.post(`${AUTHENTICATION_API_PATH.SEND_OTP_BY_EMAIL_PATH}`, {
    email,
  });
};

export const verifyOTPSMSApi = (phone, code) => {
  console.log('verifyOTPApi-phone run');
  return utils.post(`${AUTHENTICATION_API_PATH.VERIFY_OTP_SMS}`, {phone, code});
};
export const verifyOTPEmailApi = (email, code) => {
  console.log('verifyOTPApi-email run');
  return utils.post(`${AUTHENTICATION_API_PATH.VERIFY_OTP_EMAIL}`, {
    email,
    code,
  });
};

export const checkPhoneOrEmailAccountExistedApi = (
  phoneOrEmail,
  profileType,
) => {
  console.log('Check existed Phone or Email run', phoneOrEmail);
  return utils.post(`${AUTHENTICATION_API_PATH.CHECK_PHONE_OR_EMAIL_EXISTED}`, {
    phoneOrEmail,
    profileType,
  });
};

export const signUpApi = (
  phone,
  email,
  password,
  type,
  companyName,
  fullName,
  profileType,
) => {
  return utils.post(`${AUTHENTICATION_API_PATH.REGISTER_PATH}`, {
    phone,
    email,
    password,
    type,
    companyName,
    fullName,
    profileType,
  });
};

export const getUserInfoApi = () => {
  console.log('getUserInfoApi run');
  return utils.get(`${ACCOUNT_API_PATH.USER_PROFILE_PATH}`);
};

export const updateProfileApi = dataUpdate => {
  console.log('updateProfileApi run', dataUpdate);
  return utils.put(`${ACCOUNT_API_PATH.USER_PROFILE_PATH}`, dataUpdate);
};

export const changePasswordApi = (oldPassword, password) => {
  console.log('changePasswordApi run');
  return utils.post(`${AUTHENTICATION_API_PATH.CHANGE_PASSWORD_PATH}`, {
    oldPassword,
    password,
  });
};

export const registerVehicleApi = data => {
  console.log('registerVehicleApi run');
  return utils.post('register-vehicle', data);
};

export const changePhoneApi = phone => {
  console.log('changePhoneApi run');
  return utils.put(`${AUTHENTICATION_API_PATH.CHANGE_PHONE_PATH}`, {phone});
};

export const changeEmailApi = email => {
  console.log('change emailApi run');
  return utils.put(`${AUTHENTICATION_API_PATH.CHANGE_EMAIL_PATH}`, {email});
};

export const resetPasswordApi = (phoneOrEmail, profileType, password) => {
  return utils.post(`${AUTHENTICATION_API_PATH.FORGET_PASSWORD_PATH}`, {
    phoneOrEmail,
    profileType,
    password,
  });
};

export const deleteAccountApi = () => {
  return utils.post(`${ACCOUNT_API_PATH.DELETE_ACCOUNT_PATH}`);
};

export const upgradeAccountApi = () => {
  return utils.post(`${ACCOUNT_API_PATH.UPGRADE_ACCOUNT_PATH}`);
};
export const updateProcessTypesApi = data => {
  return utils.put('v2/me/process-step', data);
};

export const getUserInfoAttributesApi = accountType => {
  return utils.get(
    `v2/user-profile/attributes?accountType=${accountType}&required=true`,
  );
};

export const refreshAccessTokenApi = refreshToken => {
  return utils.post('v2/auth/access-token', {refreshToken});
};

export const validationLogApi = (type, accountId, vehicleId) => {
  if (!accountId && !vehicleId) {
    return utils.get(`${ACCOUNT_API_PATH.VALIDATION_LOG_PATH}?type=${type}`);
  }
  if (accountId && !vehicleId) {
    return utils.get(
      `${ACCOUNT_API_PATH.VALIDATION_LOG_PATH}?type=${type}&accountId=${accountId}`,
    );
  }
  if (!accountId && vehicleId) {
    return utils.get(
      `${ACCOUNT_API_PATH.VALIDATION_LOG_PATH}?type=${type}&vehicleId=${vehicleId}`,
    );
  }
};

export const changeStatusStopWorkingApi = () => {
  return utils.post(ACCOUNT_API_PATH.STOP_WORKING_ACCOUNT_PATH);
};

export const changeStatusReactivateApi = () => {
  return utils.post(ACCOUNT_API_PATH.REACTIVE_ACCOUNT_PATH);
};
