import React, {useState} from 'react';
import {View} from 'react-native';
import useTranslate from 'hooks/useTranslate';
import {datePostToApi, dateSelect} from 'utils/appUtils';
// components
import AppView from 'components/AppView';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';
import AppDatePicker from 'components/AppDatePicker';
import InputContainer from '../InputContainer';
import AppText from 'components/AppText';
import AppPickerInput from 'components/AppPickerInput';
//constants
import styles from '../styles';
import {SVG_NAME} from 'assets/path';
import {getDateFuture} from 'utils/AppConst';

const TabRegistrationCertificate = ({
  handleChange,
  values,
  errors,
  setFieldValue,
  touched,
  checkRequiredField,
}) => {
  const {t} = useTranslate();
  const [openPickerDayActive, setOpenPickerDayActive] = useState(false);
  const [openPickerExpiredDay, setOpenPickerExpiredDay] = useState(false);
  return (
    <>
      <AppView style={styles.container}>
        <InputContainer
          required={checkRequiredField('transportBusinessLicense')}
          label={t('common:textContent.transportBusinessLicense')}
          placeholder={t('common:placeholder.plTransportBusinessLicense')}
          value={values.transportBusinessLicense}
          onChangeText={handleChange('transportBusinessLicense')}
          error={
            errors.transportBusinessLicense && touched.transportBusinessLicense
          }
          messageError={t(errors.transportBusinessLicense)}
        />
        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField(
            'transportBusinessLicenseNumberDateActive',
          )}>
          {t('common:textContent.transportBusinessLicenseDate')}
        </AppText>

        <AppPickerInput
          onPressIcon={() => {
            setOpenPickerDayActive(true);
          }}
          placeholder={t('common:placeholder.plDate')}
          isSelectOne={true}
          selectedName={dateSelect(
            values.transportBusinessLicenseNumberDateActive,
          )}
          error={
            touched.transportBusinessLicenseNumberDateActive &&
            errors.transportBusinessLicenseNumberDateActive
          }
          messageError={t(errors.transportBusinessLicenseNumberDateActive)}
          icon={<SVG_NAME.CALENDAR />}
          style={styles.marginTextInput}
        />
        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField(
            'transportBusinessLicenseNumberDateEnd',
          )}>
          {t('common:textContent.transportBusinessLicenseExpiredDate')}
        </AppText>

        <AppPickerInput
          onPressIcon={() => {
            setOpenPickerExpiredDay(true);
          }}
          placeholder={t('common:placeholder.plDate')}
          isSelectOne={true}
          selectedName={dateSelect(
            values.transportBusinessLicenseNumberDateEnd,
          )}
          error={
            touched.transportBusinessLicenseNumberDateEnd &&
            errors.transportBusinessLicenseNumberDateEnd
          }
          messageError={t(errors.transportBusinessLicenseNumberDateEnd)}
          icon={<SVG_NAME.CALENDAR />}
          style={styles.marginTextInput}
        />

        <InputContainer
          required={
            checkRequiredField('frontTransportBusinessLicensePicture') ||
            checkRequiredField('endTransportBusinessLicensePicture')
          }
          label={t('common:textContent.transportBusinessLicensePicture')}>
          <AppView rowAlignCenter>
            <ContainerImageUpload
              style={styles.containerImageUpload}
              uri={values.frontTransportBusinessLicensePicture}
              setFieldValue={setFieldValue}
              name={'frontTransportBusinessLicensePicture'}
              titleText={t('common:textContent.frontImage')}
            />
            <ContainerImageUpload
              uri={values.endTransportBusinessLicensePicture}
              setFieldValue={setFieldValue}
              name={'endTransportBusinessLicensePicture'}
              titleText={t('common:textContent.backImage')}
            />
          </AppView>
          {touched.frontTransportBusinessLicensePicture &&
            errors.frontTransportBusinessLicensePicture && (
              <View>
                <AppText style={styles.txtError}>
                  {t(errors.frontTransportBusinessLicensePicture)}
                </AppText>
              </View>
            )}

          {touched.endTransportBusinessLicensePicture &&
            errors.endTransportBusinessLicensePicture && (
              <View style={{marginTop: 12}}>
                <AppText style={styles.txtError}>
                  {t(errors.endTransportBusinessLicensePicture)}
                </AppText>
              </View>
            )}
        </InputContainer>
      </AppView>

      <AppDatePicker
        openModalDate={openPickerDayActive}
        setOpenModalDate={setOpenPickerDayActive}
        maximumDate={getDateFuture()}
        dateDefault={
          values.transportBusinessLicenseNumberDateActive
            ? getDateFuture(values.transportBusinessLicenseNumberDateActive)
            : getDateFuture()
        }
        onConfirm={date => {
          setOpenPickerDayActive(false);
          const time = datePostToApi(date);
          setFieldValue('transportBusinessLicenseNumberDateActive', time);
        }}
      />

      <AppDatePicker
        openModalDate={openPickerExpiredDay}
        setOpenModalDate={setOpenPickerExpiredDay}
        maximumDate={getDateFuture(20)}
        dateDefault={
          values.transportBusinessLicenseNumberDateEnd
            ? getDateFuture(values.transportBusinessLicenseNumberDateEnd)
            : getDateFuture()
        }
        onConfirm={date => {
          setOpenPickerExpiredDay(false);
          const time = datePostToApi(date);
          setFieldValue('transportBusinessLicenseNumberDateEnd', time);
        }}
      />
    </>
  );
};
export default TabRegistrationCertificate;
