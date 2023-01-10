import {call, put} from 'redux-saga/effects';
import {
  checkOTPSMSApi,
  checkOTPEmailApi,
  sendOTPSMSApi,
  sendOTPEmailApi,
  verifyOTPSMSApi,
  verifyOTPEmailApi,
} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import {
  changeEmailSubmit,
  changePhoneSubmit,
  signInSubmit,
} from 'appRedux/actions/authActions';
import {KEY_ACTION_OTP, SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';

export function* checkOTPSMSSaga({payload, type}) {
  console.log('payload check OTP SMS saga', payload);
  const {showLoading = true, data, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(checkOTPSMSApi, data);
      console.log('result check OTP SMS Saga', result);
      yield callback(result);
    },
    null,
    showLoading,
    type,
  );
}

export function* checkOTPEmailSaga({payload, type}) {
  console.log('payload check OTP email saga', payload);
  const {showLoading = true, data, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(checkOTPEmailApi, data);
      console.log('result check OTP email Saga', result);
      yield callback(result);
    },
    null,
    showLoading,
    type,
  );
}

export function* sendOTPSMSSaga({payload, type}) {
  // console.log('payload send OTP SMS saga', payload);
  const {showLoading = true, callback = () => {}, phone} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(sendOTPSMSApi, phone);
      console.log('result send OTP SMS Saga', result);
      yield callback(result);
    },
    null,
    showLoading,
    type,
  );
}

export function* sendOTPEmailSaga({payload, type}) {
  console.log('payload send OTP email saga', payload);
  const {showLoading = true, callback = () => {}, email} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(sendOTPEmailApi, email);
      console.log('result send OTP email Saga', result);
      yield callback(result);
    },
    null,
    showLoading,
    type,
  );
}

export function* verifyOTPSMSSaga({payload, type}) {
  console.log('payload verify OTP saga', payload);
  const {
    showLoading = true,
    callback = () => {},
    phone,
    code,
    keyAction,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(verifyOTPSMSApi, phone, code);
      console.log('result verify OTP Saga', result);
      switch (keyAction) {
        case KEY_ACTION_OTP.LOGIN:
          yield put(
            signInSubmit({phoneOrEmail: phone, password: payload?.password}),
          );
          break;
        //for another case
        case KEY_ACTION_OTP.RESET_PASSWORD:
          yield NavigationServices.navigate(SCENE_NAMES.NEW_PASSWORD_SCREEN, {
            phoneOrEmail: phone,
          });
          break;
        case KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL:
          yield put(changePhoneSubmit({phone: phone}));
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

export function* verifyOTPEmailSaga({payload, type}) {
  console.log('payload verify OTP Email saga', payload);
  const {
    showLoading = true,
    callback = () => {},
    email,
    code,
    keyAction,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(verifyOTPEmailApi, email, code);
      console.log('result verify OTP Email Saga', result);
      switch (keyAction) {
        case KEY_ACTION_OTP.LOGIN:
          yield put(
            signInSubmit({phoneOrEmail: email, password: payload?.password}),
          );
          break;
        //for another case
        case KEY_ACTION_OTP.RESET_PASSWORD:
          yield NavigationServices.navigate(SCENE_NAMES.NEW_PASSWORD_SCREEN, {
            phoneOrEmail: email,
          });
          break;
        case KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL:
          yield put(changeEmailSubmit({email: email}));
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
