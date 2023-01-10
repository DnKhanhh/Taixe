import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import styles from './styles';
import {NAMESPACE} from './constant';
import LinearGradient from 'react-native-linear-gradient';
import {SVG_NAME} from 'assets/path';

//Components
import AppText from 'components/AppText';
import AppButton from 'components/AppButton';
import AppRadioButton from 'components/AppRadioButton';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import AppButtonGoBack from 'components/AppButtonGoBack';

//Utils
import {COLOR} from 'utils/AppConst';
import {hidePhone, hideEmailSelect} from 'utils/appUtils';

//hooks
import useTranslate from 'hooks/useTranslate';

const SelectOTPScreen = ({otpOptions, onPressSendOTP, checked, setChecked}) => {
  const {t} = useTranslate();
  console.log('checked >>>', checked);
  const {phone, email} = otpOptions;
  let DATA_OPTIONS = [
    {
      key: phone,
      title: t('common:textInput.hintOTPPhone'),
      text: hidePhone(phone),
    },
  ];

  if (email) {
    DATA_OPTIONS = [
      ...DATA_OPTIONS,
      {
        key: email,
        title: t('common:textInput.hintOTPEmail'),
        text: hideEmailSelect(email),
      },
    ];
  }
  return (
    <AppContainer hide={true}>
      <StatusBar barStyle={'dark-content'} />
      <LinearGradient
        style={styles.container}
        colors={COLOR.LINEAR_WHITE_GREEN}>
        <ScrollView>
          <AppButtonGoBack />
          <AppView center marginTop={60}>
            <SVG_NAME.SHIELD />
          </AppView>
          <AppText style={styles.textTitle}>{t(`${NAMESPACE}`)}</AppText>

          <AppRadioButton
            hasBorderFocus={true}
            data={DATA_OPTIONS}
            value={checked}
            titleStyle={styles.text1RadioBtn}
            containerStyle={styles.radioButtonContainer}
            contentStyle={[styles.viewDisplayOptionOTP]}
            textStyle={styles.text2RadioBtn}
            onPress={res => setChecked(res.key)}
          />
          <AppButton
            style={styles.buttonConfirm}
            title={t('common:button.sendOTP')}
            onPress={() => onPressSendOTP(checked)}
          />
        </ScrollView>
      </LinearGradient>
    </AppContainer>
  );
};
export default React.memo(SelectOTPScreen);
