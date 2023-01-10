import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {CHANGEPASSWORD_FORM_SCHEME, NAMESPACE} from './constant';
import _ from 'lodash';
import AppView from 'components/AppView';
import {SVG_NAME} from 'assets/path';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';

//Constants
import {COLOR} from 'utils/AppConst';

//Utils
import useTranslate from 'hooks/useTranslate';
import NavigateServices from 'navigation/navigationServices';

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const ChangePasswordScreen = ({onPressConfirm}) => {
  const {t} = useTranslate();
  const [checkedValuesChange, setCheckedValuesChange] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onPressConfirm(values);
      }}
      validate={values => {
        if (!_.isEqual(values, initialValues) && !checkedValuesChange) {
          setCheckedValuesChange(true);
        }
      }}
      validationSchema={CHANGEPASSWORD_FORM_SCHEME}>
      {({handleChange, values, touched, errors, handleSubmit}) => (
        <AppContainer draw={false} stackScreen={true} title={t(`${NAMESPACE}`)}>
          <ScrollView>
            <View style={styles.container}>
              <React.Fragment>
                <AppText style={styles.labelText} required={true}>
                  {t('common:textInput.hintOldPassword')}
                </AppText>
                <AppTextInput
                  containerStyle={styles.inputContainer}
                  placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                  placeholder={t('common:textInput.hintOldPassword')}
                  error={touched.oldPassword && errors.oldPassword}
                  messageError={t(errors.oldPassword)}
                  onChangeText={handleChange('oldPassword')}
                  value={values.oldPassword}
                  isSecure={true}
                />
                <AppText style={styles.labelText} required={true}>
                  {t('common:textInput.hintNewPassword')}
                </AppText>
                <AppTextInput
                  containerStyle={
                    touched.newPassword && errors.newPassword
                      ? styles.inputContainer
                      : styles.labelText
                  }
                  placeholder={t('common:textInput.hintNewPassword')}
                  placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                  error={touched.newPassword && errors.newPassword}
                  messageError={t(errors.newPassword)}
                  onChangeText={handleChange('newPassword')}
                  value={values.newPassword}
                  isSecure={true}
                />

                <AppView row>
                  <SVG_NAME.CHECK_NOTE_PASSWORD />
                  <AppText style={styles.textSubPass}>
                    {t('common:textInput.hintNotePassword')}
                  </AppText>
                </AppView>

                <AppText style={styles.labelText} required={true}>
                  {t('common:textInput.hintConfirmPassword')}
                </AppText>
                <AppTextInput
                  containerStyle={styles.inputContainer}
                  placeholder={t('common:textInput.hintConfirmPassword')}
                  placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                  error={touched.confirmPassword && errors.confirmPassword}
                  messageError={t(errors.confirmPassword)}
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  isSecure={true}
                />
              </React.Fragment>
            </View>
          </ScrollView>
          {checkedValuesChange && (
            <AppConfirmButton
              onPressCancel={() => NavigateServices.goBack()}
              onPressConfirm={handleSubmit}
              titleConfirm={t('common:button.saveChange')}
            />
          )}
        </AppContainer>
      )}
    </Formik>
  );
};

export default React.memo(ChangePasswordScreen);
