import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Platform} from 'react-native';
import VerifyOTPScreen from './view';
import {useActions} from 'hooks/useActions';

//Logic
import {
  sendOTPSMSSubmit,
  sendOTPEmailSubmit,
  verifyOTPSMSSubmit,
  verifyOTPEmailSubmit,
} from 'appRedux/actions/authActions';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';

//Timing
const RESEND_OTP_TIME_LIMIT = 180;
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4;
let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;
const attempts = 3;
export default function ({route}) {
  const actions = useActions({
    verifyOTPSMSSubmit,
    verifyOTPEmailSubmit,
    sendOTPSMSSubmit,
    sendOTPEmailSubmit,
    getUserInfoSubmit,
  });
  const {password, confirmOptions, otpOptions, phoneOrEmail, keyAction} =
    route.params;
  // console.log('Options OTP Verify params', route.params);

  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  let confirmCode = useRef([]);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
    AUTO_SUBMIT_OTP_TIME_LIMIT,
  );
  const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixTextInputRef = useRef(null);
  const otpInput = [
    firstTextInputRef,
    secondTextInputRef,
    thirdTextInputRef,
    fourthTextInputRef,
    fifthTextInputRef,
    sixTextInputRef,
  ];

  const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  useEffect(() => {
    autoSubmitOtpTimerIntervalCallbackReference.current =
      autoSubmitOtpTimerIntervalCallback;
  });

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);

      onVerifyOTPPress();
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };

  const onResendOtpButtonPress = confirmOption => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '', '', '']);
      firstTextInputRef.current.focus();
    }
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    switch (confirmOption) {
      case otpOptions.phone:
        const optionsSMS = {
          callback: res => {
            console.log('response Send OTP SMS', res);
          },
          phone: otpOptions.phone,
        };
        actions.sendOTPSMSSubmit({...optionsSMS});
        break;
      case otpOptions.email:
        const optionsEmail = {
          callback: res => {
            console.log('response Send OTP Email', res);
          },
          email: otpOptions.email,
        };
        actions.sendOTPEmailSubmit({...optionsEmail});
        break;
      default:
        console.log('not confirm');
    }
    console.log('todo: Resend OTP');
  };

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      confirmCode.current[index] = value;

      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixTextInputRef.current.focus();
        }
      }
    };
  };

  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }

        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const onVerifyOTPPress = useCallback(
    e => {
      // console.log('todo: Submit OTP');
      const options = {
        phoneOrEmail: phoneOrEmail,
        password: password,
        code: confirmCode.current.join(''),
        keyAction: keyAction,
        phone: otpOptions.phone,
        email: otpOptions.email,
      };
      // actions.verifyOTPSubmit({...e, ...options});
      switch (confirmOptions) {
        case otpOptions.phone:
          actions.verifyOTPSMSSubmit({...options});
          break;
        case otpOptions.email:
          actions.verifyOTPEmailSubmit({...options});
          break;
        default:
          console.log('not confirm');
      }
      console.log('todo: Submit OTP');
    },
    [actions],
  );
  return (
    <VerifyOTPScreen
      otpInput={otpInput}
      onVerifyOTPPress={onVerifyOTPPress}
      otpArray={otpArray}
      resendButtonDisabledTime={resendButtonDisabledTime}
      onResendOtpButtonPress={onResendOtpButtonPress}
      onOtpKeyPress={onOtpKeyPress}
      onOtpChange={onOtpChange}
      confirmOptions={confirmOptions}
      otpOptions={otpOptions}
      attemptsRemaining={attemptsRemaining}
      setAttemptsRemaining={setAttemptsRemaining}
    />
  );
}
