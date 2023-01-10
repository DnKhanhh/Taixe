import React, {useState} from 'react';
import {View} from 'react-native';
import AppView from 'components/AppView';
import InputContainer from '../InputContainer';
import {datePostToApi, dateSelect} from 'utils/appUtils';
import {SVG_NAME} from 'assets/path';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import AppDatePicker from 'components/AppDatePicker';
import {getDateFuture} from 'utils/AppConst';
import styles from '../styles';
import AppPickerInput from 'components/AppPickerInput';

const TabTax = ({
  handleChange,
  values,
  errors,
  setFieldValue,
  touched,
  checkRequiredField,
  checkEditProfile,
}) => {
  const {t} = useTranslate();
  const [openPickerDay, setOpenPickerDay] = useState(false);

  return (
    <>
      <AppView style={styles.container}>
        <InputContainer
          editable={checkEditProfile}
          required={checkRequiredField('companyTaxNumber')}
          label={t('common:textContent.companyTaxNumber')}
          placeholder={t('common:placeholder.plCompanyTaxNumber')}
          value={values.companyTaxNumber}
          onChangeText={handleChange('companyTaxNumber')}
          error={errors.companyTaxNumber && touched.companyTaxNumber}
          messageError={t(errors.companyTaxNumber)}
        />

        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('companyActiveDate')}>
          {t('common:textContent.companyActiveDate')}
        </AppText>

        <AppPickerInput
          disabled={!checkEditProfile}
          onPressIcon={() => {
            setOpenPickerDay(true);
          }}
          placeholder={t('common:placeholder.plDate')}
          isSelectOne={true}
          selectedName={dateSelect(values.companyActiveDate)}
          error={touched.companyActiveDate && errors.companyActiveDate}
          messageError={t(errors.companyActiveDate)}
          icon={<SVG_NAME.CALENDAR />}
          style={styles.marginTextInput}
        />

        <InputContainer
          editable={checkEditProfile}
          required={checkRequiredField('companyRegisterLocation')}
          label={t('common:textContent.companyRegisterLocation')}
          placeholder={t('common:placeholder.plCompanyRegisterLocation')}
          value={values.companyRegisterLocation}
          onChangeText={handleChange('companyRegisterLocation')}
          error={
            errors.companyRegisterLocation && touched.companyRegisterLocation
          }
          messageError={t(errors.companyRegisterLocation)}
        />

        <InputContainer
          required={
            checkRequiredField('frontCompanyRegistrationCertificatePicture') ||
            checkRequiredField('backCompanyRegistrationCertificatePicture')
          }
          label={t('common:textContent.companyRegistrationCertificatePicture')}>
          <AppView rowAlignCenter>
            <ContainerImageUpload
              disabled={!checkEditProfile}
              style={styles.containerImageUpload}
              uri={values.frontCompanyRegistrationCertificatePicture}
              name={'frontCompanyRegistrationCertificatePicture'}
              setFieldValue={setFieldValue}
              titleText={t('common:textContent.frontImage')}
            />
            <ContainerImageUpload
              disabled={!checkEditProfile}
              uri={values.backCompanyRegistrationCertificatePicture}
              name={'backCompanyRegistrationCertificatePicture'}
              titleText={t('common:textContent.backImage')}
              setFieldValue={setFieldValue}
            />
          </AppView>
          {touched.frontCompanyRegistrationCertificatePicture &&
            errors.frontCompanyRegistrationCertificatePicture && (
              <View>
                <AppText style={styles.txtError}>
                  {t(errors.frontCompanyRegistrationCertificatePicture)}
                </AppText>
              </View>
            )}

          {touched.backCompanyRegistrationCertificatePicture &&
            errors.backCompanyRegistrationCertificatePicture && (
              <View style={{marginTop: 12}}>
                <AppText style={styles.txtError}>
                  {t(errors.backCompanyRegistrationCertificatePicture)}
                </AppText>
              </View>
            )}
        </InputContainer>
      </AppView>

      <AppDatePicker
        openModalDate={openPickerDay}
        setOpenModalDate={setOpenPickerDay}
        maximumDate={getDateFuture(0)}
        dateDefault={
          values.companyActiveDate
            ? getDateFuture(values.companyActiveDate)
            : getDateFuture(0)
        }
        onConfirm={date => {
          setOpenPickerDay(false);
          const time = datePostToApi(date);
          setFieldValue('companyActiveDate', time);
        }}
      />
    </>
  );
};
export default TabTax;
