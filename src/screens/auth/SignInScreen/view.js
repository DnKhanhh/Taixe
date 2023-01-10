import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, ImageBackground, StatusBar} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {SIGN_IN_FORM_SCHEME} from './constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButton from 'components/AppButton';
import AppHotline from 'components/AppHotline';
import AppChangeLanguage from 'components/AppChangeLanguage';
import AppView from 'components/AppView';
import AppButtonChangeLanguage from 'components/AppButtonChangeLanguage';

//Utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

//hooks
import useTranslate from 'hooks/useTranslate';
import AppIcons from 'utils/AppIcons';
import {getSize} from 'utils/responsive';

const SignInScreen = ({
  onPressSignIn,
  onPressSignUp,
  onPressToForgotPassword,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {t} = useTranslate();
  const initialValues = {
    phoneOrEmail: __DEV__ ? '0929292421' : '',
    password: __DEV__ ? 'ttcDriver1' : '',
  };
  const passwordRef = useRef(null);
  useEffect(() => {
    if (initialValues.phoneOrEmail && initialValues.password) {
      setIsSubmitted(true);
    }
    return () => {};
  }, []);
  return (
    <AppContainer hide={true}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('assets/images/sender_splash_background.png')}>
        <KeyboardAwareScrollView
          // resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={140}>
          <View style={styles.container}>
            <View style={[STYLE_GLOBAL.containerFlexEnd]}>
              <AppButtonChangeLanguage onPress={() => setShowModal(true)} />
            </View>

            <View style={styles.logo}>{AppIcons.LOGO_WHITE}</View>

            <AppView
              height={318}
              style={{
                marginBottom: 118.24 - 48,
                marginTop: getSize.v(60),
              }}>
              <AppText
                style={[
                  STYLE_GLOBAL.h4,
                  STYLE_GLOBAL.color_secondary,
                  styles.titleLogin,
                ]}>
                {t('common:titleLogin')}
              </AppText>

              <Formik
                initialValues={initialValues}
                validateOnChange
                validate={values => {
                  if (values.phoneOrEmail && values.password) {
                    setIsSubmitted(true);
                  } else {
                    setIsSubmitted(false);
                  }
                }}
                onSubmit={values => {
                  // console.log(values);
                  onPressSignIn(values);
                }}
                validationSchema={SIGN_IN_FORM_SCHEME}>
                {({handleChange, values, touched, errors, handleSubmit}) => {
                  if (_.isEmpty(touched)) {
                    errors = {};
                  }
                  return (
                    <React.Fragment>
                      <AppTextInput
                        containerStyle={styles.marginBottom24}
                        placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                        placeholder={t('common:textInput.hintPhoneOrEmail')}
                        error={touched.phoneOrEmail && errors.phoneOrEmail}
                        messageError={t(`${errors.phoneOrEmail}`)}
                        onChangeText={handleChange('phoneOrEmail')}
                        value={values.phoneOrEmail}
                        styleTextError={styles.styleTextError}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        blurOnSubmit={false}
                      />

                      <AppTextInput
                        containerStyle={STYLE_GLOBAL.marginBottomTextInput}
                        placeholder={t('common:textInput.hintPassword')}
                        placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                        error={touched.password && errors.password}
                        messageError={t(`${errors.password}`)}
                        onChangeText={handleChange('password')}
                        value={values.password}
                        isSecure={true}
                        styleTextError={styles.styleTextError}
                        onSubmitEditing={handleSubmit}
                        refCallback={passwordRef}
                      />

                      <AppButton
                        title={t('common:button.signIn')}
                        onPress={handleSubmit}
                        disabled={!isSubmitted || !_.isEmpty(errors)}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          onPressToForgotPassword(values.phoneOrEmail)
                        }
                        style={styles.forgotPassword}>
                        <AppText style={styles.textButtonStyle}>
                          {t('common:button.forgotPassword')}
                        </AppText>
                      </TouchableOpacity>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </AppView>

            <AppView alignSelf={'center'} style={styles.hotlineContent}>
              <AppHotline />
            </AppView>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>

      <AppChangeLanguage
        showModalChangeLanguage={showModal}
        setShowModalChangeLanguage={setShowModal}
      />
    </AppContainer>
  );
};

export default React.memo(SignInScreen);
