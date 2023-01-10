import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {FORGOT_PASSWORD_SCHEMA} from './constant';
import {SVG_NAME} from 'assets/path';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

//components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButton from 'components/AppButton';
import AppChangeLanguage from 'components/AppChangeLanguage';
import AppButtonChangeLanguage from 'components/AppButtonChangeLanguage';
import AppHotline from 'components/AppHotline';
import AppButtonGoBack from 'components/AppButtonGoBack';
import AppView from 'components/AppView';
import AwareScrollView from 'components/AwareScrollView';

//hooks
import useTranslate from 'hooks/useTranslate';

//utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

const ForgotPasswordScreen = ({
  onPressRecoveryPassword,
  onGoBack,
  phoneOrEmailLogin,
}) => {
  const {t} = useTranslate();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialValues = {
    phoneOrEmail: phoneOrEmailLogin || '',
  };
  useEffect(() => {
    if (initialValues.phoneOrEmail) {
      setIsSubmitted(true);
    }
    return () => {};
  }, []);
  return (
    <AppContainer hide>
      <StatusBar barStyle={'dark-content'} />
      <LinearGradient
        style={styles.container}
        colors={COLOR.LINEAR_WHITE_GREEN}>
        <AwareScrollView>
          <View style={styles.contentContainer}>
            <AppView row space={'between'} alignCenter>
              <AppButtonGoBack />
              <AppButtonChangeLanguage onPress={() => setShowModal(true)} />
            </AppView>
            <AppView alignSelf={'center'} marginTop={62} marginBottom={45}>
              <SVG_NAME.LOGO_COLOR />
            </AppView>

            <Formik
              initialValues={initialValues}
              validateOnChange
              validate={values => {
                if (values.phoneOrEmail) {
                  setIsSubmitted(true);
                } else {
                  setIsSubmitted(false);
                }
              }}
              validationSchema={FORGOT_PASSWORD_SCHEMA}
              onSubmit={values => onPressRecoveryPassword(values)}>
              {({ handleChange, handleSubmit, values, errors, touched }) => {
                if (_.isEmpty(touched)) {
                  errors = {};
                }
                return (
                  <AppView>
                    <AppText style={styles.titleText}>
                      {t('common:textContent.forgotPassword')}
                    </AppText>
                    <AppView marginVertical={16}>
                      <AppText style={styles.textBold}>
                        {t('common:textContent.phoneOrEmail')}
                        <AppText style={styles.textSmall}>
                          {' '}
                          {t('common:textContent.usedToRegister')}
                        </AppText>
                      </AppText>
                      <AppTextInput
                        containerStyle={{ marginTop: 8 }}
                        placeholder={t('common:textInput.hintPhoneOrEmail')}
                        styleViewInput={styles.viewInput}
                        textInputStyle={styles.textInput}
                        value={values.phoneOrEmail}
                        onChangeText={handleChange('phoneOrEmail')}
                        error={touched.phoneOrEmail && errors.phoneOrEmail}
                        messageError={t(`${errors.phoneOrEmail}`)}>
                        <SVG_NAME.AVATAR_ICON_BLUE />
                      </AppTextInput>
                    </AppView>
                    <AppButton
                      onPress={handleSubmit}
                      style={styles.containerSubmit}
                      title={t('common:button.recoveryPassword')}
                      disabled={!isSubmitted || !_.isEmpty(errors)}
                    />
                    <AppView rowAlignCenter alignSelf={'center'}>
                      <AppText
                        style={[
                          STYLE_GLOBAL.body1,
                          STYLE_GLOBAL.color_textContent,
                        ]}>
                        {t('common:textContent.goBack')}{' '}
                      </AppText>
                      <TouchableOpacity onPress={onGoBack}>
                        <AppText style={styles.textGoBack}>
                          {t('common:button.signIn')}
                        </AppText>
                      </TouchableOpacity>
                    </AppView>
                  </AppView>
                );
              }}
            </Formik>
            <AppView alignSelf={'center'} marginTop={80}>
              <AppHotline />
            </AppView>
          </View>
        </AwareScrollView>
      </LinearGradient>
      <AppChangeLanguage
        showModalChangeLanguage={showModal}
        setShowModalChangeLanguage={setShowModal}
      />
    </AppContainer>
  );
};
export default ForgotPasswordScreen;
