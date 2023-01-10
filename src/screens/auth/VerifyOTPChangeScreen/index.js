import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Platform} from 'react-native';
import VerifyOTPChangeScreen from './view';
import {useActions} from 'hooks/useActions';
//Logic
import {
  sendOTPEmailSubmit,
  sendOTPSMSSubmit,
  verifyOTPSMSSubmit,
  verifyOTPEmailSubmit,
} from 'appRedux/actions/authActions';
import {isEmail} from 'utils/appUtils';

//Timing
const RESEND_OTP_TIME_LIMIT = 180;
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4;
let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;
const attempts = 3;
export default function ({route}) {
  const actions = useActions({
    sendOTPEmailSubmit,
    sendOTPSMSSubmit,
    verifyOTPSMSSubmit,
    verifyOTPEmailSubmit,
  });
  const {phoneOrEmail, keyAction} = route.params;
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

  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '', '', '']);
      firstTextInputRef.current.focus();
    }
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    if (isEmail(phoneOrEmail)) {
      const optionsEmail = {
        callback: res => {
          console.log('response Send OTP Email', res);
        },
        email: phoneOrEmail,
      };
      actions.sendOTPEmailSubmit({...optionsEmail});
    } else {
      const optionsSMS = {
        callback: res => {
          console.log('response Send OTP SMS', res);
        },
        phone: phoneOrEmail,
      };
      actions.sendOTPSMSSubmit({...optionsSMS});
    }
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
      const options = {
        code: confirmCode.current.join(''),
        keyAction: keyAction,
      };
      if (isEmail(phoneOrEmail)) {
        actions.verifyOTPEmailSubmit({email: phoneOrEmail, ...options});
      } else {
        actions.verifyOTPSMSSubmit({phone: phoneOrEmail, ...options});
      }
      console.log('todo: Submit OTP');
    },
    [actions],
  );

  return (
    <VerifyOTPChangeScreen
      otpInput={otpInput}
      onVerifyOTPPress={onVerifyOTPPress}
      otpArray={otpArray}
      resendButtonDisabledTime={resendButtonDisabledTime}
      onResendOtpButtonPress={onResendOtpButtonPress}
      onOtpKeyPress={onOtpKeyPress}
      onOtpChange={onOtpChange}
      phoneOrEmail={phoneOrEmail}
      attemptsRemaining={attemptsRemaining}
      setAttemptsRemaining={setAttemptsRemaining}
    />
  );
}
