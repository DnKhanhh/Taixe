import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SVG_NAME} from 'assets/path';

//utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR, getDateFuture} from 'utils/AppConst';
import {dateSelect, datePostToApi} from 'utils/appUtils';
import {scalePortrait} from 'utils/responsive';

//Components
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppDatePicker from 'components/AppDatePicker';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';
import AppRadioButton from 'components/AppRadioButton';
import AppPickerInput from 'components/AppPickerInput';

//hooks
import useTranslate from 'hooks/useTranslate';

const PersonalInformation = ({
  handleChange,
  values,
  errors,
  setFieldValue,
  touched,
  checkRequiredField,
  setFieldTouched,
  checkEditProfile,
}) => {
  const {t} = useTranslate();
  const [openIdDateIssue, setOpenIdDateIssue] = useState(false);
  const [openDob, setOpenDob] = useState(false);
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
    <View style={{marginTop: 8}}>
      <View style={styles.contentStyle}>
        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('name')}>
          {t('common:textContent.fullName')}
        </AppText>
        <AppTextInput
          containerStyle={styles.marginTextInput}
          editable={checkEditProfile}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
          placeholder={t('common:textInput.hintName')}
          error={touched.name && errors.name}
          messageError={errors.name}
          onChangeText={handleChange('name')}
          value={values.name}
        />

        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('dob')}>
          {t('common:textContent.dob')}
        </AppText>

        <AppPickerInput
          onPressIcon={() => {
            setOpenDob(true);
          }}
          placeholder={t('common:textInput.hintDob')}
          isSelectOne={true}
          selectedName={dateSelect(values.dob)}
          error={touched.dob && errors.dob}
          messageError={errors.dob}
          disabled={!checkEditProfile}
          icon={<SVG_NAME.CALENDAR />}
          style={styles.marginTextInput}
        />

        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('gender')}>
          {t('common:textContent.gender.title')}
        </AppText>
        <View style={[STYLE_GLOBAL.containerFlexStart, {marginBottom: 12}]}>
          <AppRadioButton
            data={GENDER}
            value={values.gender}
            onPress={res => {
              setFieldValue('gender', res.key);
              setTimeout(() => {
                setFieldTouched('gender', true);
              }, 400);
            }}
            disabled={!checkEditProfile}
          />
        </View>
        {touched.gender && errors.gender && (
          <View style={{marginBottom: 6}}>
            <AppText style={styles.txtError}>{errors.gender}</AppText>
          </View>
        )}
      </View>
      <View style={{height: 8}} />
      <View style={styles.contentStyle}>
        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('personalIdNumber')}>
          {t('common:textContent.personalIdNumber')}
        </AppText>
        <AppTextInput
          containerStyle={styles.marginTextInput}
          editable={checkEditProfile}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
          error={touched.personalIdNumber && errors.personalIdNumber}
          placeholder={t('common:textInput.hintPersonalIdNumber')}
          messageError={errors.personalIdNumber}
          onChangeText={handleChange('personalIdNumber')}
          value={values.personalIdNumber}
        />

        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('idDateIssue')}>
          {t('common:textContent.idDateIssue')}
        </AppText>

        <AppPickerInput
          onPressIcon={() => {
            setOpenIdDateIssue(true);
          }}
          placeholder={t('common:textInput.hintIdDateIssue')}
          isSelectOne={true}
          selectedName={dateSelect(values.idDateIssue)}
          error={touched.idDateIssue && errors.idDateIssue}
          messageError={errors.idDateIssue}
          disabled={!checkEditProfile}
          icon={<SVG_NAME.CALENDAR />}
          style={styles.marginTextInput}
        />

        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('idPlaceIssue')}>
          {t('common:textContent.idPlaceIssue')}
        </AppText>
        <AppTextInput
          containerStyle={styles.marginTextInput}
          editable={checkEditProfile}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
          placeholder={t('common:textInput.hintIdPlaceIssue')}
          error={touched.idPlaceIssue && errors.idPlaceIssue}
          messageError={errors.idPlaceIssue}
          onChangeText={handleChange('idPlaceIssue')}
          value={values.idPlaceIssue}
        />

        <AppText
          style={styles.textContentStyle}
          required={
            checkRequiredField('frontImageOfId') ||
            checkRequiredField('backImageOfId')
          }>
          {t('common:textContent.identityCardImage')}
        </AppText>
        <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 18}}>
          <ContainerImageUpload
            name="frontImageOfId"
            style={{marginRight: 24}}
            uri={values.frontImageOfId}
            setFieldValue={setFieldValue}
            titleText={t('common:textContent.frontImage')}
            disabled={!checkEditProfile}
          />
          <ContainerImageUpload
            name="backImageOfId"
            uri={values.backImageOfId}
            setFieldValue={setFieldValue}
            titleText={t('common:textContent.backImage')}
            disabled={!checkEditProfile}
          />
        </View>
        {touched.frontImageOfId && errors.frontImageOfId && (
          <View>
            <AppText style={styles.txtError}>{errors.frontImageOfId}</AppText>
          </View>
        )}

        {touched.backImageOfId && errors.backImageOfId && (
          <View style={{marginTop: 12}}>
            <AppText style={styles.txtError}>{errors.backImageOfId}</AppText>
          </View>
        )}
      </View>
      <AppDatePicker
        openModalDate={openIdDateIssue}
        setOpenModalDate={setOpenIdDateIssue}
        maximumDate={getDateFuture()}
        dateDefault={
          values.idDateIssue
            ? getDateFuture(values.idDateIssue)
            : getDateFuture(-18)
        }
        onConfirm={date => {
          setOpenIdDateIssue(false);
          const time = datePostToApi(date);
          setFieldValue('idDateIssue', time);
        }}
      />

      <AppDatePicker
        openModalDate={openDob}
        setOpenModalDate={setOpenDob}
        maximumDate={getDateFuture(-18)}
        dateDefault={
          values.dob ? getDateFuture(values.dob) : getDateFuture(-18)
        }
        onConfirm={date => {
          setOpenDob(false);
          const time = datePostToApi(date);
          setFieldValue('dob', time);
        }}
      />
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  contentStyle: {
    padding: 16,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  textContentStyle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {marginBottom: 8},
  ],
  marginTextInput: {marginBottom: 18},
  txtError: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: scalePortrait(12) - 2,
    paddingHorizontal: scalePortrait(5),
    marginBottom: -scalePortrait(16),
    position: 'absolute',
    bottom: 0,
  },
});
