export const AUTHENTICATION_API_PATH = {
  LOGIN_PATH: 'v2/auth/login',
  //OTP_PATH: 'v2/send-otp',
  CHECK_OTP_BY_SMS_PATH: 'v2/check-otp/sms',
  CHECK_OTP_BY_EMAIL_PATH: 'v2/check-otp/email',
  SEND_OTP_BY_SMS_PATH: 'v2/send-otp/sms',
  SEND_OTP_BY_EMAIL_PATH: 'v2/send-otp/email',
  VERIFY_OTP_SMS: 'v2/verify-otp/sms',
  VERIFY_OTP_EMAIL: 'v2/verify-otp/email',
  // LOG_OUT: 'v1/auth/logout',
  CHANGE_PASSWORD_PATH: 'v2/change-password',
  FORGET_PASSWORD_PATH: 'v2/reset-password',
  RECOVERY_PASSWORD_PATH: 'v2/change-password',
  REGISTER_PATH: 'v2/register',
  REFRESH_TOKEN_PATH: 'v1/refresh-token',
  LOCK_ACCOUNT_PATH: 'v2/lock-account',
  CHANGE_PHONE_PATH: 'v2/me/change-phone',
  CHANGE_EMAIL_PATH: 'v2/me/change-email',
  CHECK_PHONE_OR_EMAIL_EXISTED: 'v2/check-phone-or-email-account-existed',
};

export const COMMON_API_PATH = {
  GET_PROVINCES_PATH: 'v1/province',
  GET_DISTRICTS_PATH: 'v1/province',
  GET_WARD_PATH: 'v1/province/d',
};

export const ACCOUNT_API_PATH = {
  USER_PROFILE_PATH: 'v2/me/user-profile',

  PROFILES_PATH: 'v1/account/profiles',
  GET_PROFILE_VERIFICATION_FIELDS_PATH:
    'v1/setting-profile-verification/setting',
  UPDATE_PROFILE_STATUS_PATH: 'v1/account/profile/status',
  CREATE_DRIVER_PROFILE_PATH: 'v1/register-driver',
  CURRENT_CAR_OWNER_STEP_PATH: 'v1/account/profile/process-step',
  DELETE_ACCOUNT_PATH: 'v2/delete-account',
  UPGRADE_ACCOUNT_PATH: 'v2/me/upgrade-account',
  VALIDATION_LOG_PATH: 'v2/me/profile/validation-log',
  STOP_WORKING_ACCOUNT_PATH: 'v2/stop-working-account',
  REACTIVE_ACCOUNT_PATH: 'v2/reactive-account',
};

export const UPLOAD_API_PATH = {
  UPLOAD_IMAGE_PATH: 'v2/upload/photo',
};

export const SENDER_API_PATH = {
  DELETE_ADDRESSES_BOOK_PATH: 'v1/sender/address/bulk-delete',
  SENDER_ADDRESS_BOOK_PATH: 'v1/sender/address',
  SENDER_ADDRESS_SET_DEFAULT_PATH: '/v1/sender/address/set-default',
};

//get Setting from Admin
export const SETTING_API_PATH = {
  GET_USER_PROFILE_SETTING_PATH: 'v2/user-profile/attributes',
  GET_DETAIL_USER_PROFILE_SETTING_PATH: 'v2/user-profile/attributes',
  UPDATE_USER_PROFILE_SETTING_PATH: 'v2/user-profile/attributes',
};

export const PAYMENT_INFO_API_PATH = {
  BANK_ACCOUNT_PATH: 'v2/sender/banks',
  SET_DEFAULT_BANK_ACCOUNT_PATH: 'v2/sender/banks/set-default',
  GET_AVAILABLE_BANK_SETTING_PATH: 'v2/bank-settings',
  GATEWAY_ACCOUNT_PATH: 'v2/sender/payments',
  SET_DEFAULT_GATEWAY_ACCOUNT_PATH: 'v2/sender/payments/set-default',
  GET_AVAILABLE_GATEWAY_SETTING_PATH: 'v2/payment-settings',
};

export const ADDRESS_API_PATH = {
  GET_LIST_PROVINCE: 'v2/locations/cities',
  GET_LIST_DISTRICT: 'v2/locations/cities',
  GET_LIST_WARD: 'v2/locations/districts',
  GET_ID_ADDRESS_GOOGLE: 'v2/locations/suggest',
  GET_ADDRESS_FROM_GEOCODING_GOOGLE: 'maps/api/geocode/json',
};

export const TRIP_API_PATH = {
  //them chi phi phat sinh
  API_COST_ACTION: 'v2/driver/journey-cost',

  GET_LIST_TRIP: 'v2/driver/journey',
  GET_LIST_TRIP_GONE: 'v2/driver/journey/gone-journey',
  GET_LIST_TRIP_RECALL: 'v2/driver/journey/recovery-journey',
  GET_LIST_TRIP_REJECT: 'v2/driver/journey/reject-journey',
  UPDATE_TRIP_ASSIGNMENT: 'v2/driver/journey',
  DETAILS_CURRENT_TRIP: 'v2/driver/journey/transporting-journey',
  GPS_TRACKING_VEHICLE: 'v2/gps-tracking/realtime',
  UPDATE_TRIP_ASSIGNMENT_STATUS: 'v2/driver/journey',
  UPDATE_TRIP_STATUS: 'v2/driver/journey',
  GET_SCHEDULE_JOURNEY: 'v2/driver/journey/schedule-journey',
  CHECK_STATUS_ARRIVED: 'v2/driver/journey-route',

  // nhap lieu
  TYPE_INPUT_DATA: 'v2/driver/journey-route',
  //lich cac chuyen di
  SCHEDULE_JOURNEY_OF_MONTH: 'v2/driver/journey/schedule-journey-of-month',
  SCHEDULE_JOURNEY_OF_DAY: 'v2/driver/journey/schedule-journey-of-day',
  //bao su co
  REPORT_TROUBLE: 'v2/driver/journey',
};

export const ADDRESS_BOOK_API_PATH = 'v2/sender/address';
