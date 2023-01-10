import React, {useState, useRef, useEffect} from 'react';
import {View, BackHandler} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {FORM_SCHEMA} from './constant';
import {SVG_NAME} from 'assets/path';
import LinearGradient from 'react-native-linear-gradient';
import NavigationServices from 'navigation/navigationServices';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppButton from 'components/AppButton';
import AppView from 'components/AppView';
import AppButtonGoBack from 'components/AppButtonGoBack';
import AppModalDialog from 'components/Modal/AppModalDialog';

//utils
import {COLOR, SCENE_NAMES} from 'utils/AppConst';

//hooks
import useTranslate from 'hooks/useTranslate';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const NewPasswordScreen = ({onChangeNewPassword}) => {
  const { t } = useTranslate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModalConfirmBack, setShowModalConfirmBack] = useState(false);

  const confirmPasswordRef = useRef(null);

  // back button event for android
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setShowModalConfirmBack(true);
      return true;
    });

    return () =>
      BackHandler.removeEventListener(
        'hardwareBackPress',
        setShowModalConfirmBack(false),
      );
  }, []);

  return (
    <AppContainer hide>
      <LinearGradient
        style={styles.container}
        colors={COLOR.LINEAR_WHITE_GREEN}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" extraHeight={140}>
          <View style={styles.contentContainer}>
            <Formik
              validationSchema={FORM_SCHEMA}
              initialValues={initialValues}
              validateOnChange
              validate={values => {
                if (values.password && values.confirmPassword) {
                  setIsSubmitted(true);
                } else {
                  setIsSubmitted(false);
                }
              }}
              onSubmit={values => onChangeNewPassword(values)}>
              {({ handleChange, touched, handleSubmit, values, errors }) => {
                if (_.isEmpty(touched)) {
                  errors = {};
                }
                return (
                  <View>
                    <AppButtonGoBack
                      onGoBack={() =>
                        setShowModalConfirmBack(true)
                        // NavigationServices.navigate(SCENE_NAMES.FORGOT_PASSWORD)
                      }
                    />
                    <AppView center marginTop={64}>
                      <SVG_NAME.CLOUD />
                      <AppView absolute>
                        <SVG_NAME.CLOCKED_PASS />
                      </AppView>
                    </AppView>
                    <AppText style={styles.titleText}>
                      {t('navigate:scenes.auth.settingNewPassword.title')}
                    </AppText>
                    <View style={styles.textInputContainer}>
                      <AppText style={styles.textLabel} required>
                        {t('common:textInput.hintNewPassword')}
                      </AppText>
                      <AppTextInput
                        value={values?.password}
                        onChangeText={handleChange('password')}
                        placeholder={t('common:textInput.hintNewPassword')}
                        error={errors?.password && touched?.password}
                        messageError={t(`${errors.password}`)}
                        isSecure={true}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          confirmPasswordRef.current?.focus()
                        }
                        blurOnSubmit={false}
                        autoFocus={true}
                      />
                    </View>
                    <View style={styles.textInputContainer}>
                      <AppText style={styles.textLabel} required>
                        {t('common:textInput.hintConfirmPassword')}
                      </AppText>
                      <AppTextInput
                        value={values?.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        placeholder={t('common:textInput.hintConfirmPassword')}
                        error={
                          errors?.confirmPassword && touched?.confirmPassword
                        }
                        messageError={t(`${errors.confirmPassword}`)}
                        isSecure={true}
                        refCallback={confirmPasswordRef}
                      />
                    </View>

                    <AppButton
                      onPress={handleSubmit}
                      style={styles.button}
                      title={t('common:button.confirm')}
                      disabled={!isSubmitted || !_.isEmpty(errors)}
                    />
                  </View>
                )
              }}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
      <AppModalDialog
        type="warning"
        titleModal={t('common:modalbox.confirm')}
        showModalDialog={showModalConfirmBack}
        contentModal={t('common:modalbox.contentConfirmBack')}
        setShowModalDialog={setShowModalConfirmBack}
        titleConfirm={t('common:modalbox.agree')}
        titleCancel={t('common:modalbox.cancel')}
        onPressConfirm={() => NavigationServices.navigate(SCENE_NAMES.SIGN_IN)}
        onPressCancel={() => setShowModalConfirmBack(false)}
      />
    </AppContainer>
  );
};
export default NewPasswordScreen;
