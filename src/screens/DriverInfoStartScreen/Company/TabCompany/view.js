import React, {useState} from 'react';
import {styles} from '../../styles';

//component
import AppView from 'components/AppView';
import InputContainer from 'components/AppInputContainer/view';
import AppText from 'components/AppText';
import AppPickerInput from 'components/AppPickerInput';
import AppModal from 'components/Modal/AppModal';

//hooks
import useTranslate from 'hooks/useTranslate';

export const TabCompany = ({
  listProvince,
  listDistrict,
  setSelectedIdProvince,
  values,
  handleChange,
  setFieldValue,
  checkRequiredField,
  touched,
  errors,
  setValues,
}) => {
  const {t} = useTranslate();
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  return (
    <>
      <AppView style={styles.container}>
        <InputContainer
          required={checkRequiredField('companyName')}
          label={t('common:textInput.hintCompanyName')}
          placeholder={t('common:placeholder.plCompanyName')}
          value={values?.companyName}
          onChangeText={handleChange('companyName')}
          error={errors?.companyName && touched?.companyName}
          messageError={t(errors?.companyName)}
        />

        <InputContainer
          required={checkRequiredField('companyLegalRepresentative')}
          label={t('common:textContent.ownerCompanyName')}
          placeholder={t('common:placeholder.plOwnerCompanyName')}
          value={values?.companyLegalRepresentative}
          onChangeText={handleChange('companyLegalRepresentative')}
          error={
            errors?.companyLegalRepresentative &&
            touched?.companyLegalRepresentative
          }
          messageError={t(errors?.companyLegalRepresentative)}
        />

        {/* Province */}
        <AppText
          style={styles.textContentStyle}
          required={
            checkRequiredField('cityName') || checkRequiredField('cityId')
          }>
          {t('common:textContent.province')}
        </AppText>

        <AppPickerInput
          style={styles.marginTextInput}
          placeholder={t('common:placeholder.plProvince')}
          onPressIcon={() => {
            setShowProvinceModal(!showProvinceModal);
          }}
          isSelectOne={true}
          selectedName={values?.cityName}
          error={errors?.cityId && touched?.cityId}
          messageError={t(errors?.cityId)}
        />
        {/* District */}
        <AppText
          style={styles.textContentStyle}
          required={
            checkRequiredField('districtName') ||
            checkRequiredField('districtId')
          }>
          {t('common:textContent.district')}
        </AppText>

        <AppPickerInput
          style={styles.marginTextInput}
          placeholder={t('common:placeholder.plDistrict')}
          onPressIcon={() => {
            setShowDistrictModal(!showDistrictModal);
          }}
          isSelectOne={true}
          selectedName={values?.districtName}
          error={errors?.districtId && touched?.districtId}
          messageError={t(errors?.districtId)}
        />

        <InputContainer
          required={checkRequiredField('address')}
          label={t('common:textContent.addressInformation')}
          placeholder={t('common:placeholder.plAddress')}
          value={values?.address}
          onChangeText={handleChange('address')}
          error={errors?.address && touched?.address}
          messageError={t(errors?.address)}
        />
      </AppView>

      <AppModal
        maxHeight="80%"
        titleModal={t('common:placeholder.plProvince')}
        showAppModal={showProvinceModal}
        setShowAppModal={setShowProvinceModal}
        dataModal={listProvince}
        onPressDataModal={item => {
          setValues(oldValues => {
            oldValues.cityName = item.name;
            oldValues.cityId = item.id;
            return oldValues;
          });
          setSelectedIdProvince(item.id);
          setShowProvinceModal(false);
        }}
      />

      <AppModal
        maxHeight="80%"
        titleModal={t('common:placeholder.plDistrict')}
        showAppModal={showDistrictModal}
        setShowAppModal={setShowDistrictModal}
        dataModal={listDistrict}
        onPressDataModal={item => {
          setValues(oldValues => {
            oldValues.districtName = item.name;
            oldValues.districtId = item.id;
            return oldValues;
          });
          setShowDistrictModal(false);
        }}
      />
    </>
  );
};
