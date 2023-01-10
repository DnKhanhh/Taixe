import {AUTHENTICATION_API_PATH} from 'appRedux/api/PathApi';
import i18n from 'i18next';
import _ from 'lodash';

export function handleErrorMessage(err) {
  const {response} = err;
  console.log('err', err);
  if (response) {
    const {code, status, message, error, data, path} = response.data || {};

    console.log('response+++++', response);
    if (
      message === 'account.TokenExpiredError' ||
      message === 'JsonWebTokenError' ||
      (status === 401 &&
        path !== '/' + AUTHENTICATION_API_PATH.LOGIN_PATH &&
        (path !== path) !== '/' + AUTHENTICATION_API_PATH.REGISTER_PATH)
    ) {
      return {
        code: code,
        message,
        status: 'EXP_TOKEN',
      };
    }
    if (status === 422 && data && data.errors) {
      return {
        code: code,
        message: _.isObject(data.errors)
          ? Object.values(data.errors).join(', ')
          : JSON.stringify(data.errors),
        status: status,
        data,
      };
    }
    if (message) {
      return {
        code: code,
        message: message,
        status: status,
        data,
      };
    }
    if (error && error.message) {
      return {
        code: code || error.name,
        message: error.message,
        status: status || error.statusCode,
        data,
      };
    }
    return {
      code: code,
      message: i18n.t('common:message.ERROR_OCCURRED'),
      status: status,
      data,
    };
  }
  const strMessage = err ? err.message : 'Error';
  return {
    code: err.code,
    message: strMessage,
    status: 0,
  };
}
