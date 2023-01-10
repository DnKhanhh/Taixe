import React from 'react';
import {TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import {NAMESPACE} from './constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

//Components
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButton from 'components/AppButton';
import AppButtonGoBack from 'components/AppButtonGoBack';
import AppContainer from 'components/AppContainer';
import AppView from 'components/AppView';

//Utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {hidePhone, formatTimeRemain, hideEmail, isEmail} from 'utils/appUtils';
import {COLOR} from 'utils/AppConst';

//hooks
import useTranslate from 'hooks/useTranslate';

function VerifyOTPChangeScreen({
  otpArray,
  onVerifyOTPPress,
  otpInput,
  resendButtonDisabledTime,
  onResendOtpButtonPress,
  onOtpKeyPress,
  onOtpChange,
  phoneOrEmail,
  attemptsRemaining,
  setAttemptsRemaining,
}) {
  const {t} = useTranslate();
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  return (
    <AppContainer hide={true}>
      <StatusBar barStyle={'dark-content'} />
      <LinearGradient style={styles.flex} colors={COLOR.LINEAR_WHITE_GREEN}>
        <KeyboardAwareScrollView
          style={[STYLE_GLOBAL.padding, STYLE_GLOBAL.paddingStatusBar]}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}>
          <AppButtonGoBack />
          <AppText style={styles.textTitle}>{t(`${NAMESPACE}`)}</AppText>
          <AppView paddingHorizontal={8}>
            <AppText style={styles.subText}>
              {!isEmail(phoneOrEmail)
                ? t('common:titleOTPPhone', {phone: hidePhone(phoneOrEmail)})
                : t('common:titleOTPEmail', {email: hideEmail(phoneOrEmail)})}
            </AppText>
            <AppView height={48}>
              {resendButtonDisabledTime > 0 ? (
                <AppText style={styles.textTimer}>
                  {formatTimeRemain(resendButtonDisabledTime)}
                </AppText>
              ) : (
                <AppText style={styles.textTimerEnd}>00:00</AppText>
              )}
            </AppView>
            <AppView rowAlignCenter>
              {otpInput.map((textInputRef, index) => (
                <AppTextInput
                  containerStyle={styles.textInputOTP}
                  value={otpArray[index]}
                  onKeyPress={onOtpKeyPress(index)}
                  onChangeText={onOtpChange(index)}
                  keyboardType={'numeric'}
                  maxLength={1}
                  textInputStyle={styles.otpText}
                  autoFocus={index === 0 ? true : undefined}
                  refCallback={refCallback(textInputRef)}
                  key={index}
                  hiddenClearMode
                  selectTextOnFocus
                  center
                />
              ))}
            </AppView>
            <AppButton
              style={styles.buttonConfirm}
              title={t('common:button.confirm')}
              disabled={otpArray.filter(code => code !== '').length !== 6}
              onPress={onVerifyOTPPress}
            />
            <AppView marginTop={24} style={STYLE_GLOBAL.containerCenter}>
              <AppText
                style={[STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent]}>
                {t('common:button.notReceiveCode')}{' '}
              </AppText>
              <TouchableOpacity
                onPress={() => {
                  onResendOtpButtonPress(phoneOrEmail);
                  setAttemptsRemaining(pre => pre - 1);
                }}
                disabled={
                  attemptsRemaining <= 0 || resendButtonDisabledTime > 0
                }>
                <AppText
                  style={[
                    STYLE_GLOBAL.body1,
                    STYLE_GLOBAL.weight700,
                    {
                      color:
                        resendButtonDisabledTime > 0
                          ? COLOR.TEXT_GREY
                          : COLOR.COLOR_PRIMARY,
                    },
                  ]}>
                  {t('common:button.resend')}
                </AppText>
              </TouchableOpacity>
            </AppView>
          </AppView>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </AppContainer>
  );
}

export default React.memo(VerifyOTPChangeScreen);
