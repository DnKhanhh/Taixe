import React, {useState} from 'react';
import useTranslate from 'hooks/useTranslate';
// components
import AppView from 'components/AppView';
import InputContainer from '../InputContainer';
import AppModal from 'components/Modal/AppModal';
import AppPickerInput from 'components/AppPickerInput';
import AppText from 'components/AppText';
import Header from '../Header';
//constants
import styles from '../styles';

import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

const TabUserInfo = ({
  listProvince,
  listDistrict,
  setProvinceIdSelected,
  handleChange,
  values,
  errors,
  setFieldValue,
  touched,
  hasHeader = true,
  checkRequiredField,
  checkEditProfile,
}) => {
  const {t} = useTranslate();
  const user = useSelectorShallow(getUserInfoSelector);
  const [showModalSelectProvince, setShowModalSelectProvince] = useState(false);
  const [showModalSelectDistrict, setShowModalSelectDistrict] = useState(false);

  return (
    <>
      <AppView style={styles.container}>
        {hasHeader && (
          <Header
            handleChange={handleChange}
            values={values}
            setFieldValue={setFieldValue}
            isPersonal={false}
            companyName={user?.userProfile?.companyName}
          />
        )}
        <InputContainer
          editable={checkEditProfile}
          required={checkRequiredField('companyName')}
          label={t('common:textInput.hintCompanyName')}
          placeholder={t('common:placeholder.plCompanyName')}
          value={values.companyName}
          onChangeText={handleChange('companyName')}
          error={errors.companyName && touched.companyName}
          messageError={t(errors.companyName)}
        />
        <InputContainer
          editable={checkEditProfile}
          required={checkRequiredField('companyLegalRepresentative')}
          label={t('common:textContent.ownerCompanyName')}
          placeholder={t('common:placeholder.plOwnerCompanyName')}
          value={values.companyLegalRepresentative}
          onChangeText={handleChange('companyLegalRepresentative')}
          error={
            errors.companyLegalRepresentative &&
            touched.companyLegalRepresentative
          }
          messageError={t(errors.companyLegalRepresentative)}
        />

        <AppText
          style={styles.textContentStyle}
          required={
            checkRequiredField('cityName') || checkRequiredField('cityId')
          }>
          {t('common:textContent.province')}
        </AppText>

        <AppPickerInput
          disabled={!checkEditProfile}
          onPressIcon={() => {
            setShowModalSelectProvince(true);
          }}
          placeholder={t('common:placeholder.plProvince')}
          isSelectOne={true}
          selectedName={values.cityName}
          error={touched.cityId && errors.cityId}
          messageError={t(errors.cityId)}
          style={styles.marginTextInput}
        />

        <AppText
          style={styles.textContentStyle}
          required={
            checkRequiredField('districtName') ||
            checkRequiredField('districtId')
          }>
          {t('common:textContent.district')}
        </AppText>

        <AppPickerInput
          disabled={!checkEditProfile}
          onPressIcon={() => {
            setShowModalSelectDistrict(true);
          }}
          placeholder={t('common:placeholder.plDistrict')}
          isSelectOne={true}
          selectedName={values.districtName}
          error={touched.districtId && errors.districtId}
          messageError={t(errors.districtId)}
          style={styles.marginTextInput}
        />

        {/* check lai BA */}
        {/* <InputContainer
          required={true}
          label={t('common:textInput.hintIdPlaceIssue')}
          placeholder={t('common:textInput.hintIdPlaceIssue')}
          value={values.address}
          onChangeText={handleChange('address')}
          error={errors.address && touched.address}
          messageError={t(errors.address)}
        /> */}

        <InputContainer
          editable={checkEditProfile}
          required={checkRequiredField('address')}
          label={t('common:textContent.addressInformation')}
          placeholder={t('common:placeholder.plAddress')}
          value={values.address}
          onChangeText={handleChange('address')}
          error={errors.address && touched.address}
          messageError={t(errors.address)}
        />
      </AppView>

      <AppModal
        maxHeight={'80%'}
        titleModal={t('common:placeholder.plProvince')}
        dataModal={listProvince}
        setShowAppModal={setShowModalSelectProvince}
        showAppModal={showModalSelectProvince}
        onPressDataModal={item => {
          setFieldValue('cityId', item.id);
          setFieldValue('cityName', item.name);
          setFieldValue('districtId', '');
          setFieldValue('districtName', '');
          setProvinceIdSelected(item.id);
          setShowModalSelectProvince(false);
        }}
      />
      <AppModal
        maxHeight={'80%'}
        titleModal={t('common:placeholder.plDistrict')}
        onPressDataModal={item => {
          setFieldValue('districtId', item.id);
          setFieldValue('districtName', item.name);
          setShowModalSelectDistrict(false);
        }}
        dataModal={listDistrict}
        setShowAppModal={setShowModalSelectDistrict}
        showAppModal={showModalSelectDistrict && listDistrict.length > 0}
      />
    </>
  );
};
export default TabUserInfo;
