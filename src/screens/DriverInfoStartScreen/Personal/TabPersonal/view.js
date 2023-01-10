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
import AppRadioButton from 'components/AppRadioButton';
import Header from 'screens/DriverInfoStartScreen/components/Header';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';

//hooks
import useTranslate from 'hooks/useTranslate';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

//reducer
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';

//utils
import {getDateFuture} from 'utils/AppConst';
import {datePostToApi, dateSelect} from 'utils/appUtils';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

export const TabPersonal = ({
  values,
  handleChange,
  setFieldValue,
  checkRequiredField,
  touched,
  errors,
  setValues,
  setFieldTouched,
}) => {
  const {t} = useTranslate();
  const user = useSelectorShallow(getUserInfoSelector);

  const [openPickerDob, setOpenPickerDob] = useState(false);
  const [openPickerDateIssue, setOpenPickerDateIssue] = useState(false);

  const GENDER = [
    {
      key: 'male',
      text: t('common:textContent.gender.male'),
    },
    {
      key: 'female',
      text: t('common:textContent.gender.female'),
    },
  ];

  return (
    <>
      <AppView>
        <AppView
          style={[
            styles.container,
            {
              borderBottomWidth: 8,
              borderColor: COLOR.COLOR_BACKGROUND_SECONDARY,
            },
          ]}>
          <Header
            handleChange={handleChange}
            values={values}
            setFieldValue={setFieldValue}
            isPersonal={true}
          />
        </AppView>

        <AppView
          style={[
            styles.container,
            {
              borderBottomWidth: 8,
              borderColor: COLOR.COLOR_BACKGROUND_SECONDARY,
            },
          ]}>
          <InputContainer
            required={checkRequiredField('name')}
            value={values?.fullName}
            onChangeText={handleChange('name')}
            error={errors?.fullName && touched?.fullName}
            messageError={t(errors?.fullName)}
            label={t('common:textInput.hintName')}
            placeholder={t('common:placeholder.plName')}
          />

          <AppText
            style={styles.textContentStyle}
            required={checkRequiredField('dob')}>
            {t('common:textContent.dob')}
          </AppText>
          <AppPickerInput
            onPressIcon={() => {
              setOpenPickerDob(true);
            }}
            placeholder={t('common:textInput.hintDob')}
            isSelectOne={true}
            selectedName={dateSelect(values?.dob)}
            error={touched?.dob && errors?.dob}
            messageError={t(errors?.dob)}
            icon={<SVG_NAME.CALENDAR />}
            style={styles.marginTextInput}
          />

          <AppView style={styles.textInputContainer}>
            <AppText
              style={styles.textLabel}
              required={checkRequiredField('gender')}>
              {t('common:textContent.gender.title')}
            </AppText>
            <View style={[STYLE_GLOBAL.containerFlexStart]}>
              <AppRadioButton
                data={GENDER}
                value={values?.gender}
                onPress={res => {
                  setFieldValue('gender', res.key);
                  setTimeout(() => {
                    setFieldTouched('gender', true);
                  }, 400);
                }}
              />
            </View>
            {touched?.gender && errors?.gender && (
              <View>
                <AppText style={styles.txtError}>{t(errors?.gender)}</AppText>
              </View>
            )}
          </AppView>
        </AppView>

        <AppView style={styles.container}>
          <InputContainer
            required={checkRequiredField('personalIdNumber')}
            keyboardType={'number-pad'}
            value={values?.personalIdNumber}
            error={errors?.personalIdNumber && touched?.personalIdNumber}
            messageError={t(errors?.personalIdNumber)}
            onChangeText={handleChange('personalIdNumber')}
            label={t('common:textContent.identityNumber')}
            placeholder={t('common:textContent.identityNumber')}
          />

          <AppText
            style={styles.textContentStyle}
            required={checkRequiredField('idDateIssue')}>
            {t('common:textContent.idDateIssue')}
          </AppText>
          <AppPickerInput
            onPressIcon={() => {
              setOpenPickerDateIssue(true);
            }}
            placeholder={t('common:textInput.hintIdDateIssue')}
            isSelectOne={true}
            selectedName={dateSelect(values?.idDateIssue)}
            error={touched?.idDateIssue && errors?.idDateIssue}
            messageError={t(errors?.idDateIssue)}
            icon={<SVG_NAME.CALENDAR />}
            style={styles.marginTextInput}
          />

          <InputContainer
            required={checkRequiredField('idPlaceIssue')}
            value={values?.idPlaceIssue}
            error={errors?.idPlaceIssue && touched?.idPlaceIssue}
            messageError={t(errors?.idPlaceIssue)}
            onChangeText={handleChange('idPlaceIssue')}
            label={t('common:textContent.hintIssuedBy')}
            placeholder={t('common:placeholder.plIssuedBy')}
          />

          <InputContainer
            required={
              checkRequiredField('frontImageOfId') ||
              checkRequiredField('backImageOfId')
            }
            label={t('common:textContent.identityCardImage')}>
            <AppView rowAlignCenter>
              <ContainerImageUpload
                name={'frontImageOfId'}
                setFieldValue={setFieldValue}
                uri={values?.frontImageOfId}
                style={styles.containerImageUpload}
                titleText={t('common:textContent.frontImage')}
              />
              <ContainerImageUpload
                name={'backImageOfId'}
                setFieldValue={setFieldValue}
                uri={values?.backImageOfId}
                titleText={t('common:textContent.backImage')}
              />
            </AppView>
            {/* not check show error */}
            {touched?.frontImageOfId && errors?.frontImageOfId && (
              <View>
                <AppText style={styles.txtError}>
                  {t(errors?.frontImageOfId)}
                </AppText>
              </View>
            )}

            {touched?.backImageOfId && errors?.backImageOfId && (
              <View style={{marginTop: 12}}>
                <AppText style={styles.txtError}>
                  {t(errors?.backImageOfId)}
                </AppText>
              </View>
            )}
          </InputContainer>
        </AppView>
      </AppView>

      <AppDatePicker
        openModalDate={openPickerDob}
        setOpenModalDate={setOpenPickerDob}
        maximumDate={getDateFuture(-18)}
        dateDefault={
          values?.dob ? getDateFuture(values?.dob) : getDateFuture(-18)
        }
        onConfirm={date => {
          setOpenPickerDob(false);
          const time = datePostToApi(date);
          setFieldValue('dob', time);
        }}
      />

      <AppDatePicker
        openModalDate={openPickerDateIssue}
        setOpenModalDate={setOpenPickerDateIssue}
        maximumDate={getDateFuture(0)}
        dateDefault={
          values?.idDateIssue
            ? getDateFuture(values?.idDateIssue)
            : getDateFuture(0)
        }
        onConfirm={date => {
          setOpenPickerDateIssue(false);
          const time = datePostToApi(date);
          setFieldValue('idDateIssue', time);
        }}
      />
    </>
  );
};
