import React, {useCallback} from 'react';
import ChangePhoneOrEmailScreen from './view';
import {KEY_ACTION_OTP} from 'utils/AppConst';

//Logic
import {
  changePhoneSubmit,
  changeEmailSubmit,
  checkPhoneOrEmailAccountExistedSubmit,
} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';

export default function ({route}) {
  const actions = useActions({
    changePhoneSubmit,
    changeEmailSubmit,
    checkPhoneOrEmailAccountExistedSubmit,
  });
  const {isChangePhone} = route.params;

  const onPressConfirm = useCallback(
    data => {
      console.log('data', data);
      const options = {
        phoneOrEmail: isChangePhone ? data.phone : data.email,
        keyAction: KEY_ACTION_OTP.CHANGE_PHONE_OR_EMAIL,
      };
      actions.checkPhoneOrEmailAccountExistedSubmit({...options});
    },
    [actions],
  );

  return (
    <ChangePhoneOrEmailScreen
      onPressConfirm={onPressConfirm}
      isChangePhone={isChangePhone}
    />
  );
}
