import React, {useState, useRef} from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import {styles} from '../../styles';

//component
import AppView from 'components/AppView';
import InputContainer from 'components/AppInputContainer/view';
import AppText from 'components/AppText';
import AppPickerInput from 'components/AppPickerInput';
import AppModal from 'components/Modal/AppModal';
import AppCheckBox from 'components/AppCheckBox';
import STYLE_GLOBAL from 'utils/StyleGlobal';

//utils
import {COLOR} from 'utils/AppConst';

//hooks
import useTranslate from 'hooks/useTranslate';

//animation
import {toggleAnimation} from 'animations/toggleAnimation';

export const TabAddress = ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  checkRequiredField,
  sameAddress,
  setSameAddress,
  listProvince,
  setProvinceId,
  dataDistrict,
}) => {
  // console.log('listProvince: ', listProvince);
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
      toValue: sameAddress ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setSameAddress(!sameAddress);
  };

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
            selectedName={values?.permanentAddressCityName}
            error={
              touched?.permanentAddressCityName &&
              errors?.permanentAddressCityName
            }
            messageError={t(errors?.permanentAddressCityName)}
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
            selectedName={values?.permanentAddressDistrictName}
            error={
              touched?.permanentAddressDistrictName &&
              errors?.permanentAddressDistrictName
            }
            messageError={t(errors?.permanentAddressDistrictName)}
            style={styles.marginTextInput}
          />

          <InputContainer
            required={checkRequiredField('permanentAddress')}
            label={t('common:textContent.addressInformation')}
            placeholder={t('common:placeholder.plAddress')}
            value={values?.permanentAddress}
            onChangeText={handleChange('permanentAddress')}
            error={errors?.permanentAddress && touched?.permanentAddress}
            messageError={t(errors?.permanentAddress)}
          />
        </AppView>

        <AppView style={styles.container}>
          <AppText style={styles.textSection}>
            {t('common:textContent.contactAddress')}
          </AppText>

          <AppView rowAlignCenter marginBottom={24}>
            <AppCheckBox
              isChecked={sameAddress}
              onPress={handleCheckboxSameAddress}
            />
            <AppText
              onPress={handleCheckboxSameAddress}
              style={STYLE_GLOBAL.color_textContent}>
              {t('common:textContent.sameAddress')}
            </AppText>
          </AppView>

          {sameAddress ? null : (
            <>
              <AppText
                style={styles.textContentStyle}
                required={checkRequiredField('contactCityId')}>
                {t('common:textContent.province')}
              </AppText>
              <AppPickerInput
                onPressIcon={() => {
                  setShowModalSelectProvince(true);
                }}
                placeholder={t('common:placeholder.plProvince')}
                isSelectOne={true}
                selectedName={values?.contactCityName}
                error={touched?.contactCityId && errors?.contactCityId}
                messageError={t(errors?.contactCityId)}
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
                selectedName={values?.contactDistrictName}
                error={
                  touched?.contactDistrictName && errors?.contactDistrictName
                }
                messageError={t(errors?.contactDistrictName)}
                style={styles.marginTextInput}
              />

              <InputContainer
                required={checkRequiredField('contactAddress')}
                label={t('common:textContent.addressInformation')}
                placeholder={t('common:placeholder.plAddress')}
                value={values?.contactAddress}
                onChangeText={handleChange('contactAddress')}
                error={errors?.contactAddress && touched?.contactAddress}
                messageError={t(errors?.contactAddress)}
              />
            </>
          )}
        </AppView>
      </AppView>

      <AppModal
        maxHeight={'80%'}
        titleModal={t('common:placeholder.plProvince')}
        dataModal={listProvince}
        setShowAppModal={setShowModalSelectPermanentProvince}
        showAppModal={showModalSelectPermanentProvince}
        onPressDataModal={item => {
          setFieldValue('permanentAddressCityId', item.id);
          setTimeout(() => {
            setFieldValue('permanentAddressCityName', item.name);
          }, 100);
          setProvinceId(item.id);
          setShowModalSelectPermanentProvince(false);
        }}
      />

      <AppModal
        maxHeight={'80%'}
        titleModal={t('common:placeholder.plDistrict')}
        dataModal={dataDistrict}
        setShowAppModal={setShowModalSelectPermanentDistrict}
        showAppModal={showModalSelectPermanentDistrict}
        onPressDataModal={item => {
          setFieldValue('permanentAddressDistrictId', item.id);
          setTimeout(() => {
            setFieldValue('permanentAddressDistrictName', item.name);
          }, 100);
          setShowModalSelectPermanentDistrict(false);
        }}
      />

      <AppModal
        maxHeight={'80%'}
        titleModal={t('common:placeholder.plProvince')}
        dataModal={listProvince}
        setShowAppModal={setShowModalSelectProvince}
        showAppModal={showModalSelectProvince}
        onPressDataModal={item => {
          setFieldValue('contactCityId', item.id);
          setTimeout(() => {
            setFieldValue('contactCityName', item.name);
          }, 100);
          setProvinceId(item.id);
          setShowModalSelectProvince(false);
        }}
      />

      <AppModal
        maxHeight={'80%'}
        titleModal={t('common:placeholder.plDistrict')}
        dataModal={dataDistrict}
        setShowAppModal={setShowModalSelectDistrict}
        showAppModal={showModalSelectDistrict}
        onPressDataModal={item => {
          setFieldValue('contactDistrictId', item.id);
          setTimeout(() => {
            setFieldValue('contactDistrictName', item.name);
          }, 100);
          setShowModalSelectDistrict(false);
        }}
      />
    </>
  );
};
