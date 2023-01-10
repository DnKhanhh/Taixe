import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {
  NAMESPACE_PHONE,
  NAMESPACE_EMAIL,
  CHANGE_PHONE_FORM_SCHEME,
  CHANGE_EMAIL_FORM_SCHEME,
} from './constant';
import _ from 'lodash';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';

//utils
import {COLOR} from 'utils/AppConst';

//Utils
import useTranslate from 'hooks/useTranslate';
import NavigateServices from 'navigation/navigationServices';

const ChangePhoneOrEmailScreen = ({onPressConfirm, isChangePhone}) => {
  const {t} = useTranslate();
  const [checkedValuesChange, setCheckedValuesChange] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialPhoneValues = {
    phone: '',
  };
  const initialEmailValues = {
    email: '',
  };
  return (
    <Formik
      initialValues={isChangePhone ? initialPhoneValues : initialEmailValues}
      onSubmit={values => {
        // console.log(values);
        onPressConfirm(values);
      }}
      validate={values => {
        if (isChangePhone) {
          if (values.phone) {
            setIsSubmitted(true);
          }
        }
        if (!isChangePhone) {
          if (values.email) {
            setIsSubmitted(true);
          }
        }
        if (
          !_.isEqual(
            values,
            isChangePhone ? initialPhoneValues : initialEmailValues,
          )
        ) {
          setCheckedValuesChange(true);
        }
      }}
      validationSchema={
        isChangePhone ? CHANGE_PHONE_FORM_SCHEME : CHANGE_EMAIL_FORM_SCHEME
      }>
      {({handleChange, values, touched, errors, handleSubmit}) => {
        return (
          <AppContainer
            draw={false}
            stackScreen={true}
            title={t(`${isChangePhone ? NAMESPACE_PHONE : NAMESPACE_EMAIL}`)}>
            <ScrollView>
              <View style={styles.container}>
                <React.Fragment>
                  {isChangePhone ? (
                    <>
                      <AppText style={styles.labelText} required={true}>
                        {t('common:textContent.phone')}
                      </AppText>
                      <AppTextInput
                        containerStyle={
                          touched.phone && errors.phone
                            ? {marginBottom: 16}
                            : {marginBottom: 8}
                        }
                        placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                        placeholder={t('common:textInput.hintNewPhone')}
                        error={touched.phone && errors.phone}
                        messageError={t(`${errors.phone}`)}
                        onChangeText={handleChange('phone')}
                        value={values.phone}
                        keyboardType={'phone-pad'}
                      />
                      <AppText style={styles.labelContent}>
                        {t('common:textContent.phoneOTP')}
                      </AppText>
                    </>
                  ) : (
                    <>
                      <AppText style={styles.labelText} required={true}>
                        {t('common:textContent.email')}
                      </AppText>
                      <AppTextInput
                        containerStyle={
                          touched.email && errors.email
                            ? {marginBottom: 16}
                            : {marginBottom: 8}
                        }
                        placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                        placeholder={t('common:textInput.hintNewEmail')}
                        error={touched.email && errors.email}
                        messageError={t(`${errors.email}`)}
                        onChangeText={handleChange('email')}
                        value={values.email}
                        keyboardType={'email-address'}
                      />
                      <AppText style={styles.labelContent}>
                        {t('common:textContent.emailOTP')}
                      </AppText>
                    </>
                  )}
                </React.Fragment>
              </View>
            </ScrollView>
            {checkedValuesChange && (
              <AppConfirmButton
                onPressCancel={() => NavigateServices.goBack()}
                onPressConfirm={handleSubmit}
                titleConfirm={t('common:button.saveChange')}
                disabledConfirm={!isSubmitted || !_.isEmpty(errors)}
              />
            )}
          </AppContainer>
        );
      }}
    </Formik>
  );
};

export default React.memo(ChangePhoneOrEmailScreen);
