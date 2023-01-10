import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SVG_NAME} from 'assets/path';
import styles from './styles';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppButton from 'components/AppButton';
import AppHotline from 'components/AppHotline';
import AppChangeLanguage from 'components/AppChangeLanguage';
import AppRadioButton from 'components/AppRadioButton';
import AppButtonChangeLanguage from 'components/AppButtonChangeLanguage';

//utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {ACCOUNT_TYPE} from 'utils/AppConst';
import {COLOR} from 'utils/AppConst';

//hooks
import useTranslate from 'hooks/useTranslate';

const SignUpScreen = ({
  onPressSignIn,
  onPressSignUpForm,
  checkedType,
  setCheckedType,
}) => {
  const [showModalChangeLanguage, setShowModalChangeLanguage] = useState(false);
  const {t} = useTranslate();
  const DATA_TYPE = [
    {
      key: ACCOUNT_TYPE.COMPANY,
      text: t('navigate:scenes.signup.enterprise'),
    },
    {
      key: ACCOUNT_TYPE.PERSONAL,
      text: t('navigate:scenes.signup.person'),
    },
  ];
  return (
    <AppContainer hide={true}>
      <StatusBar barStyle={'dark-content'} />
      <LinearGradient
        style={STYLE_GLOBAL.flex1}
        colors={COLOR.LINEAR_WHITE_GREEN}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={STYLE_GLOBAL.containerFlexEnd}>
              <AppButtonChangeLanguage
                onPress={() => setShowModalChangeLanguage(true)}
              />
            </View>
            <View style={styles.logo}>
              <SVG_NAME.LOGO_COLOR />
              <AppText style={styles.textTitleSignUp}>
                {t('common:titleRegister')}
              </AppText>
              <AppText style={styles.textYouAre}>
                {t('navigate:scenes.signup.youare')}
              </AppText>
            </View>

            <View style={styles.containerAppRadioButton}>
              <SVG_NAME.ENTERPRISE />
              <SVG_NAME.PERSON />
            </View>
            <View style={{marginTop: 8}}>
              <AppRadioButton
                data={DATA_TYPE}
                value={checkedType}
                containerStyle={{justifyContent: 'space-around'}}
                textStyle={STYLE_GLOBAL.weight600}
                onPress={res => {
                  setCheckedType(res.key);
                }}
              />
            </View>

            <AppButton
              title={t('common:continue')}
              style={{marginTop: Platform.isPad ? 46 : 24}}
              onPress={onPressSignUpForm}
              disabled={checkedType === null ? true : false}
            />
            <View style={styles.viewYouHaveAccount}>
              <AppText
                style={[STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent]}>
                {t('common:doHaveAccount')}{' '}
              </AppText>
              <TouchableOpacity onPress={onPressSignIn}>
                <AppText style={styles.textSignIn}>
                  {t('common:button.signIn')}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.viewAppHotline}>
              <AppHotline />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <AppChangeLanguage
        showModalChangeLanguage={showModalChangeLanguage}
        setShowModalChangeLanguage={setShowModalChangeLanguage}
      />
    </AppContainer>
  );
};

export default SignUpScreen;
