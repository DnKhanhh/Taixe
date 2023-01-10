import React, {useCallback} from 'react';
import SignInScreen from './view';
import {SCENE_NAMES} from 'utils/AppConst';
//navigation
import NavigationServices from 'navigation/navigationServices';

//Logic
import {signInSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';

export default function () {
  const actions = useActions({signInSubmit});
  const onPressSignIn = useCallback(
    e => {
      actions.signInSubmit({...e});
    },
    [actions],
  );

  const onPressSignUp = () => {
    NavigationServices.navigate(SCENE_NAMES.SIGN_UP);
  };
  const handleToForgotPassword = phoneOrEmail => {
    NavigationServices.navigate(SCENE_NAMES.FORGOT_PASSWORD, {
      phoneOrEmail: phoneOrEmail,
    });
  };
  return (
    <SignInScreen
      onPressToForgotPassword={handleToForgotPassword}
      onPressSignIn={onPressSignIn}
      onPressSignUp={onPressSignUp}
    />
  );
}
