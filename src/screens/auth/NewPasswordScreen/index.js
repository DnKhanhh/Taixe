import React, {useCallback} from 'react';
import NewPasswordScreen from './view';
import {useActions} from 'hooks/useActions';
import {resetPasswordSubmit} from 'appRedux/actions/authActions';

export default function ({route}) {
  const {phoneOrEmail} = route.params;
  const actions = useActions({
    resetPasswordSubmit,
  });
  const onChangeNewPassword = useCallback(
    data => {
      const options = {
        callback: res => {
          console.log('change success');
        },
        phoneOrEmail: phoneOrEmail,
        password: data.confirmPassword,
      };
      actions.resetPasswordSubmit({...options});
    },
    [actions],
  );

  return <NewPasswordScreen onChangeNewPassword={onChangeNewPassword} />;
}
