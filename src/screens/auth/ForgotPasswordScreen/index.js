import React, {useCallback} from 'react';
import ForgotPasswordScreen from './view';
import {useActions} from 'hooks/useActions';
import {checkPhoneOrEmailAccountExistedSubmit} from 'appRedux/actions/authActions';
import NavigationServices from 'navigation/navigationServices';
import {KEY_ACTION_OTP} from 'utils/AppConst';

export default function ({route}) {
  const actions = useActions({
    checkPhoneOrEmailAccountExistedSubmit,
  });
  const phoneOrEmailLogin = route.params.phoneOrEmail;
  const onPressRecoveryPassword = useCallback(
    data => {
      console.log('data', data);
      const options = {
        keyAction: KEY_ACTION_OTP.RESET_PASSWORD,
      };
      actions.checkPhoneOrEmailAccountExistedSubmit({...data, ...options});
    },
    [actions],
  );

  return (
    <ForgotPasswordScreen
      onGoBack={() => NavigationServices.goBack()}
      onPressRecoveryPassword={onPressRecoveryPassword}
      phoneOrEmailLogin={phoneOrEmailLogin}
    />
  );
}
