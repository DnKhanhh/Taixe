import React, {useState, useRef} from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import AppView from 'components/AppView';
import styles from '../styles';
import InputContainer from '../InputContainer';
import useTranslate from 'hooks/useTranslate';
import AppCheckBox from 'components/AppCheckBox';
import AppText from 'components/AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppModal from 'components/Modal/AppModal';
import {toggleAnimation} from 'animations/toggleAnimation';
import AppPickerInput from 'components/AppPickerInput';

const TabInfoAddress = ({
  listProvince,
  setProvinceIdSelected,
  listDistrict,
  setProvinceIdSelectedPermanent,
  listDistrictPermanent,
  handleChange,
  values,
  errors,
  setFieldValue,
  touched,
  tickSameAddress,
  setTickSameAddress,
  checkRequiredField,
  checkEditProfile,
}) => {
  const {t} = useTranslate();
  const animationController = useRef(new Animated.Value(0)).current;
  const [
    showModalSelectPermanentProvince,
    setShowModalSelectPermanentProvince,
  ] = useState(false);
  const [
    showModalSelectPermanentDistrict,
    setShowModalSelectPermanentDistrict,
  ] = useState(false);
  const [showModalSelectProvince, setShowModalSelectProvince] = useState(false);
  const [showModalSelectDistrict, setShowModalSelectDistrict] = useState(false);
  const handleCheckboxSameAddress = () => {
    const config = {
      duration: 300,
      toValue: tickSameAddress ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setTickSameAddress(!tickSameAddress);
  };

  return (
    <>
      <AppView style={styles.container}>
        <AppText style={styles.textSection}>
          {t('common:textContent.permanentAddress')}
        </AppText>
        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('permanentAddressCityId')}>
          {t('common:textContent.province')}
        </AppText>

        <AppPickerInput
          onPressIcon={() => {
            setShowModalSelectPermanentProvince(true);
          }}
          placeholder={t('common:placeholder.plProvince')}
          isSelectOne={true}
          selectedName={values.permanentAddressCityName}
          error={
            touched.permanentAddressCityName && errors.permanentAddressCityName
          }
          messageError={t(errors.permanentAddressCityName)}
          disabled={!checkEditProfile}
          style={styles.marginTextInput}
        />
        <AppText
          style={styles.textContentStyle}
          required={checkRequiredField('permanentAddressDistrictId')}>
          {t('common:textContent.district')}
        </AppText>

        {/* district */}
        <AppPickerInput
          onPressIcon={() => {
            setShowModalSelectPermanentDistrict(true);
          }}
          placeholder={t('common:placeholder.plDistrict')}
          isSelectOne={true}
          selectedName={values.permanentAddressDistrictName}
          error={
            touched.permanentAddressDistrictName &&
            errors.permanentAddressDistrictName
          }
          messageError={t(errors.permanentAddressDistrictName)}
          disabled={!checkEditProfile}
          style={styles.marginTextInput}
        />
        <InputContainer
          required={checkRequiredField('permanentAddress')}
          label={t('common:textContent.addressInformation')}
          placeholder={t('common:placeholder.plAddress')}
          value={values.permanentAddress}
          editable={checkEditProfile}
          onChangeText={handleChange('permanentAddress')}
          error={errors.permanentAddress && touched.permanentAddress}
          messageError={t(errors.permanentAddress)}
        />
        <AppView marginTop={16}>
          <AppText style={styles.textSection}>
            {t('common:textContent.contactAddress')}
          </AppText>
        </AppView>
        <AppView rowAlignCenter marginBottom={24}>
          <AppCheckBox
            isChecked={tickSameAddress}
            onPress={handleCheckboxSameAddress}
          />
          <AppText
            onPress={handleCheckboxSameAddress}
            style={STYLE_GLOBAL.color_textContent}>
            {t('common:textContent.sameAddress')}
          </AppText>
        </AppView>
        {tickSameAddress ? null : (
          <>
            <AppText
              style={styles.textContentStyle}
              required={checkRequiredField('contactCityId')}>
              {t('common:textContent.province')}
            </AppText>
            {/* province */}
            <AppPickerInput
              onPressIcon={() => {
                setShowModalSelectProvince(true);
              }}
              placeholder={t('common:placeholder.plProvince')}
              isSelectOne={true}
              selectedName={values.contactCityName}
              error={touched.contactCityId && errors.contactCityId}
              messageError={t(errors.contactCityId)}
              disabled={!checkEditProfile}
              style={styles.marginTextInput}
            />

            <AppText
              style={styles.textContentStyle}
              required={checkRequiredField('contactDistrictId')}>
              {t('common:textContent.district')}
            </AppText>

            <AppPickerInput
              onPressIcon={() => {
                setShowModalSelectDistrict(true);
              }}
              placeholder={t('common:placeholder.plProvince')}
              isSelectOne={true}
              selectedName={values.contactDistrictName}
              error={touched.contactDistrictName && errors.contactDistrictName}
              messageError={t(errors.contactDistrictName)}
              disabled={!checkEditProfile}
              style={styles.marginTextInput}
            />

            <InputContainer
              required={checkRequiredField('contactAddress')}
              label={t('common:textContent.addressInformation')}
              placeholder={t('common:placeholder.plAddress')}
              value={values.contactAddress}
              onChangeText={handleChange('contactAddress')}
              error={errors.contactAddress && touched.contactAddress}
              messageError={t(errors.contactAddress)}
              editable={checkEditProfile}
            />
          </>
        )}
      </AppView>
      <AppModal
        maxHeight={'75%'}
        titleModal={t('common:placeholder.plProvince')}
        dataModal={listProvince}
        setShowAppModal={setShowModalSelectProvince}
        showAppModal={showModalSelectProvince}
        onPressDataModal={item => {
          setFieldValue('contactCityId', item.id);
          setFieldValue('contactCityName', item.name);
          setFieldValue('contactDistrictId', '');
          setFieldValue('contactDistrictName', '');
          setProvinceIdSelected(item.id);
          setShowModalSelectProvince(false);
        }}
      />
      <AppModal
        maxHeight={'75%'}
        titleModal={t('common:placeholder.plDistrict')}
        dataModal={listDistrict}
        setShowAppModal={setShowModalSelectDistrict}
        showAppModal={showModalSelectDistrict}
        onPressDataModal={item => {
          setFieldValue('contactDistrictId', item.id);
          setFieldValue('contactDistrictName', item.name);
          setShowModalSelectDistrict(false);
        }}
      />
      <AppModal
        maxHeight={'75%'}
        titleModal={t('common:placeholder.plProvince')}
        dataModal={listProvince}
        setShowAppModal={setShowModalSelectPermanentProvince}
        showAppModal={showModalSelectPermanentProvince}
        onPressDataModal={item => {
          setFieldValue('permanentAddressCityId', item.id);
          setFieldValue('permanentAddressCityName', item.name);
          setFieldValue('permanentAddressDistrictId', '');
          setFieldValue('permanentAddressDistrictName', '');
          setProvinceIdSelectedPermanent(item.id);
          setShowModalSelectPermanentProvince(false);
        }}
      />
      <AppModal
        maxHeight={'75%'}
        titleModal={t('common:placeholder.plDistrict')}
        dataModal={listDistrictPermanent}
        setShowAppModal={setShowModalSelectPermanentDistrict}
        showAppModal={
          showModalSelectPermanentDistrict && listDistrictPermanent.length > 0
        }
        onPressDataModal={item => {
          setFieldValue('permanentAddressDistrictId', item.id);
          setFieldValue('permanentAddressDistrictName', item.name);
          setShowModalSelectPermanentDistrict(false);
        }}
      />
    </>
  );
};
export default TabInfoAddress;
