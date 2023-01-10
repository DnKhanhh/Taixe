import React, {useCallback} from 'react';
import ChangePasswordScreen from './view';

//Logic
import {changePasswordSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';
import useTranslate from 'hooks/useTranslate';

export default function () {
  const {t} = useTranslate();
  const actions = useActions({changePasswordSubmit});
  const onPressConfirm = useCallback(
    values => {
      const options = {
        oldPassword: values.oldPassword,
        password: values.newPassword,
      };
      actions.changePasswordSubmit({...values, ...options});
    },
    [actions],
  );

  return <ChangePasswordScreen onPressConfirm={onPressConfirm} />;
}
