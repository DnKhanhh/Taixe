import React, {useCallback, useState} from 'react';
import {SCENE_NAMES} from 'utils/AppConst';
import SelectOTPScreen from './view';
import NavigationServices from 'navigation/navigationServices';

//Logic
import {
  sendOTPSMSSubmit,
  sendOTPEmailSubmit,
} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';

export default function ({route}) {
  const {otpOptions, password, phoneOrEmail, keyAction} = route.params;
  // console.log('route.params selectOTP', route.params);
  const actions = useActions({sendOTPSMSSubmit, sendOTPEmailSubmit});
  const [checked, setChecked] = useState(otpOptions.phone); //default phone always select
  const onPressSendOTP = useCallback(
    confirmOption => {
      switch (confirmOption) {
        case otpOptions.phone:
          const optionsSMS = {
            callback: res => {
              console.log('response Send OTP SMS', res);
              NavigationServices.navigate(SCENE_NAMES.VERIFY_OTP, {
                confirmOptions: otpOptions.phone,
                otpOptions: otpOptions,
                password: password,
                phoneOrEmail: phoneOrEmail,
                keyAction: keyAction,
              });
            },
            phone: otpOptions.phone,
          };
          actions.sendOTPSMSSubmit({...optionsSMS});
          break;
        case otpOptions.email:
          const optionsEmail = {
            callback: res => {
              console.log('response Send OTP Email', res);
              NavigationServices.navigate(SCENE_NAMES.VERIFY_OTP, {
                confirmOptions: otpOptions.email,
                otpOptions: otpOptions,
                password: password,
                phoneOrEmail: phoneOrEmail,
                keyAction: keyAction,
              });
            },
            email: otpOptions.email,
          };
          actions.sendOTPEmailSubmit({...optionsEmail});
          break;
        default:
          console.log('not confirm');
      }
    },
    [actions],
  );
  return (
    <SelectOTPScreen
      otpOptions={otpOptions}
      onPressSendOTP={onPressSendOTP}
      checked={checked}
      setChecked={setChecked}
    />
  );
}
