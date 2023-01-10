import React, {useState} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {
  SIGNUP_PERSONAL_FORM_SCHEME,
  SIGNUP_COMPANY_FORM_SCHEME,
} from './constant';
import _ from 'lodash';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButton from 'components/AppButton';
import AppChangeLanguage from 'components/AppChangeLanguage';
import AppCheckBox from 'components/AppCheckBox';
import AppButtonChangeLanguage from 'components/AppButtonChangeLanguage';
import AppButtonGoBack from 'components/AppButtonGoBack';

//hooks
import useTranslate from 'hooks/useTranslate';

//Utils
import {COLOR, ACCOUNT_TYPE} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {openURL} from 'utils/communications';

const onPressRules = () => {
  openURL('https://www.ttctrading.vn/quy-dinh-phap-ly'); //temp for test openURL
};

const onPressSecurity = () => {
  openURL('https://www.ttctrading.vn/dieu-khoan-bao-mat'); //temp for test openURL
};

const SignUpFormScreen = ({onPressSignIn, onPressRegister, checkedType}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModalChangeLanguage, setShowModalChangeLanguage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {t} = useTranslate();
  const initialPersonalValues = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
  };
  const initialCompanyValues = {
    ...initialPersonalValues,
    companyName: '',
  };
  return (
    <AppContainer hide={true}>
      <StatusBar barStyle={'dark-content'} />
      <LinearGradient
        style={STYLE_GLOBAL.flex1}
        colors={COLOR.LINEAR_WHITE_GREEN}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}>
          <View style={styles.container}>
            <View style={STYLE_GLOBAL.containerBetween}>
              <AppButtonGoBack />
              <AppButtonChangeLanguage
                onPress={() => setShowModalChangeLanguage(true)}
              />
            </View>
            <AppText style={styles.textTitleRegister}>
              {t('common:titleRegister')}
            </AppText>
            <Formik
              initialValues={
                checkedType === ACCOUNT_TYPE.COMPANY
                  ? initialCompanyValues
                  : initialPersonalValues
              }
              validateOnChange
              validate={values => {
                let form = {...values};
                delete form.email;
                if (Object.values(form).every(value => value)) {
                  setIsSubmitted(true);
                }
              }}
              onSubmit={(values, {resetForm}) => {
                // console.log(values);
                onPressRegister(values, resetForm);
              }}
              validationSchema={
                checkedType === ACCOUNT_TYPE.COMPANY
                  ? SIGNUP_COMPANY_FORM_SCHEME
                  : SIGNUP_PERSONAL_FORM_SCHEME
              }>
              {({handleChange, values, touched, errors, handleSubmit}) => {
                if (_.isEmpty(touched)) {
                  errors = {};
                }
                return (
                  <React.Fragment>
                    <View style={styles.viewTitle}>
                      <AppText required={true} style={[styles.textTitle]}>
                        {t('textInput.hintName')}
                      </AppText>
                    </View>
                    <AppTextInput
                      containerStyle={
                        touched.fullName && errors.fullName
                          ? [STYLE_GLOBAL.marginBottomTextInput]
                          : styles.textInput
                      }
                      placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                      placeholder={t('placeholder.plName')}
                      error={touched.fullName && errors.fullName}
                      messageError={t(`${errors.fullName}`)}
                      onChangeText={handleChange('fullName')}
                      value={values.fullName}
                    />
                    <View style={styles.viewTitle}>
                      <AppText required={true} style={[styles.textTitle]}>
                        {t('textInput.hintPhone')}
                      </AppText>
                    </View>

                    <AppTextInput
                      keyboardType={'phone-pad'}
                      containerStyle={
                        touched.phone && errors.phone
                          ? [STYLE_GLOBAL.marginBottomTextInput]
                          : styles.textInput
                      }
                      placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                      placeholder={t('placeholder.plPhone')}
                      error={touched.phone && errors.phone}
                      messageError={t(`${errors.phone}`)}
                      onChangeText={handleChange('phone')}
                      value={values.phone}
                    />
                    <View style={styles.viewTitle}>
                      <AppText style={[styles.textTitle]}>
                        {t('textInput.hintEmail')}
                      </AppText>
                    </View>
                    <AppTextInput
                      containerStyle={
                        touched.email && errors.email
                          ? [STYLE_GLOBAL.marginBottomTextInput]
                          : styles.textInput
                      }
                      placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                      placeholder={t('placeholder.plEmail')}
                      onChangeText={handleChange('email')}
                      error={touched.email && errors.email}
                      messageError={t(`${errors.email}`)}
                      value={values.email}
                      keyboardType={'email-address'}
                    />
                    {checkedType === 'company' && (
                      <>
                        <View style={styles.viewTitle}>
                          <AppText required={true} style={[styles.textTitle]}>
                            {t('textInput.hintCompanyName')}
                          </AppText>
                        </View>
                        <AppTextInput
                          containerStyle={
                            touched.companyName && errors.companyName
                              ? [STYLE_GLOBAL.marginBottomTextInput]
                              : styles.textInput
                          }
                          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                          placeholder={t('placeholder.plCompanyName')}
                          onChangeText={handleChange('companyName')}
                          error={touched.companyName && errors.companyName}
                          messageError={t(`${errors.companyName}`)}
                          value={values.companyName}
                        />
                      </>
                    )}
                    <View style={styles.viewTitle}>
                      <AppText required={true} style={[styles.textTitle]}>
                        {t('textInput.hintPassword')}
                      </AppText>
                    </View>

                    <AppTextInput
                      containerStyle={
                        touched.password && errors.password
                          ? [STYLE_GLOBAL.marginBottomTextInput]
                          : styles.textInput
                      }
                      placeholder={t('placeholder.plPassword')}
                      placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                      error={touched.password && errors.password}
                      messageError={t(`${errors.password}`)}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      isSecure={true}
                    />
                    <View style={styles.viewTitle}>
                      <AppText required={true} style={[styles.textTitle]}>
                        {t('textInput.hintRePassword')}
                      </AppText>
                    </View>
                    <AppTextInput
                      containerStyle={
                        touched.rePassword && errors.rePassword
                          ? [STYLE_GLOBAL.marginBottomTextInput]
                          : styles.textInput
                      }
                      placeholder={t('textInput.hintRePassword')}
                      placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                      error={touched.rePassword && errors.rePassword}
                      messageError={t(`${errors.rePassword}`)}
                      onChangeText={handleChange('rePassword')}
                      value={values.rePassword}
                      isSecure={true}
                    />

                    <View style={styles.viewCheckbox}>
                      <AppCheckBox
                        colorChecked={COLOR.COLOR_PRIMARY}
                        isChecked={isChecked}
                        onPress={() => setIsChecked(!isChecked)}
                      />
                      <View style={styles.viewPolicy}>
                        <AppText style={styles.textTitle}>
                          {t('common:agree')} {''}
                        </AppText>
                        <TouchableOpacity onPress={onPressRules}>
                          <AppText
                            style={[
                              styles.textTitle,
                              {color: COLOR.COLOR_TEXT_POLICY},
                            ]}>
                            {t('common:rules')} {''}
                          </AppText>
                        </TouchableOpacity>
                        <AppText style={styles.textTitle}>
                          {t('common:and')} {''}
                        </AppText>
                        <TouchableOpacity onPress={onPressSecurity}>
                          <AppText
                            style={[
                              styles.textTitle,
                              {color: COLOR.COLOR_TEXT_POLICY},
                            ]}>
                            {t('common:security')} {''}
                          </AppText>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <AppButton
                      title={t('button.signUp')}
                      onPress={handleSubmit}
                      disabled={
                        !isSubmitted ||
                        isChecked === false ||
                        !_.isEmpty(errors)
                      }
                    />
                  </React.Fragment>
                );
              }}
            </Formik>
            <View style={styles.viewYouHaveAccount}>
              <AppText
                style={[STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent]}>
                {t('common:doHaveAccount')}{' '}
              </AppText>
              <TouchableOpacity onPress={onPressSignIn}>
                <AppText style={styles.textSignIn}>
                  {t('button.signIn')}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
      <AppChangeLanguage
        showModalChangeLanguage={showModalChangeLanguage}
        setShowModalChangeLanguage={setShowModalChangeLanguage}
      />
    </AppContainer>
  );
};
export default SignUpFormScreen;
