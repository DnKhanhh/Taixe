import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from '../../styles';
import {SVG_NAME} from 'assets/path';

//component
import AppView from 'components/AppView';
import InputContainer from 'components/AppInputContainer/view';
import AppText from 'components/AppText';
import AppPickerInput from 'components/AppPickerInput';
import AppDatePicker from 'components/AppDatePicker';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';

//utils
import {getDateFuture} from 'utils/AppConst';
import {datePostToApi, dateSelect} from 'utils/appUtils';

//hooks
import useTranslate from 'hooks/useTranslate';

export const TabTax = ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  checkRequiredField,
}) => {
  const {t} = useTranslate();
  const [openPickerDay, setOpenPickerDay] = useState(false);

  return (
    <>
      <AppView style={styles.container}>
        <InputContainer
          required={checkRequiredField('companyTaxNumber')}
          label={t('common:textContent.companyTaxNumber')}
          placeholder={t('common:placeholder.plCompanyTaxNumber')}
          value={values?.companyTaxNumber}
          onChangeText={handleChange('companyTaxNumber')}
          error={errors?.companyTaxNumber && touched?.companyTaxNumber}
          messageError={t(errors?.companyTaxNumber)}
        />

        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('companyActiveDate')}>
          {t('common:textContent.companyActiveDate')}
        </AppText>

        <AppPickerInput
          style={styles.marginTextInput}
          onPressIcon={() => {
            setOpenPickerDay(true);
          }}
          placeholder={t('common:placeholder.plDate')}
          isSelectOne={true}
          icon={<SVG_NAME.CALENDAR />}
          selectedName={dateSelect(values?.companyActiveDate)}
          error={errors?.companyActiveDate && touched?.companyActiveDate}
          messageError={t(errors?.companyActiveDate)}
        />

        <InputContainer
          required={checkRequiredField('companyRegisterLocation')}
          label={t('common:textContent.companyRegisterLocation')}
          placeholder={t('common:placeholder.plCompanyRegisterLocation')}
          value={values?.companyRegisterLocation}
          onChangeText={handleChange('companyRegisterLocation')}
          error={
            errors?.companyRegisterLocation && touched?.companyRegisterLocation
          }
          messageError={t(errors?.companyRegisterLocation)}
        />

        <InputContainer
          label={t('common:textContent.companyRegistrationCertificatePicture')}
          required={
            checkRequiredField('frontCompanyRegistrationCertificatePicture') ||
            checkRequiredField('backCompanyRegistrationCertificatePicture')
          }>
          <AppView rowAlignCenter>
            <ContainerImageUpload
              style={styles.containerImageUpload}
              uri={values?.frontCompanyRegistrationCertificatePicture}
              name={'frontCompanyRegistrationCertificatePicture'}
              titleText={t('common:textContent.frontImage')}
              setFieldValue={setFieldValue}
            />
            <ContainerImageUpload
              uri={values?.backCompanyRegistrationCertificatePicture}
              name={'backCompanyRegistrationCertificatePicture'}
              titleText={t('common:textContent.backImage')}
              setFieldValue={setFieldValue}
            />
          </AppView>

          {touched?.frontCompanyRegistrationCertificatePicture &&
            errors?.frontCompanyRegistrationCertificatePicture && (
              <View>
                <AppText style={styles.txtError}>
                  {t(errors?.frontCompanyRegistrationCertificatePicture)}
                </AppText>
              </View>
            )}

          {touched?.backCompanyRegistrationCertificatePicture &&
            errors?.backCompanyRegistrationCertificatePicture && (
              <View style={{marginTop: 12}}>
                <AppText style={styles.txtError}>
                  {t(errors?.backCompanyRegistrationCertificatePicture)}
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
          values?.companyActiveDate
            ? getDateFuture(values?.companyActiveDate)
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
