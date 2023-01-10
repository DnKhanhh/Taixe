import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Formik} from 'formik';
import TabPersonal from './TabPersonal';
import TabAddress from './TabAddress';
import _ from 'lodash';
import {handleNoSameAttributes, handleSameAttributes} from './constant';

//hooks
import useTranslate from 'hooks/useTranslate';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

//component
import {Section} from 'components/Section';
import AppView from 'components/AppView';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';

//reducer
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';

//navigation
import navigationServices from 'navigation/navigationServices';

export const PersonalView = ({
  listProvince,
  updateDraft,
  submitForm,
  attributes,
  setDataDraft,
  sameAddress,
  setSameAddress,
}) => {
  const {t} = useTranslate();
  const user = useSelectorShallow(getUserInfoSelector);
  const [isConfirm, setConfirm] = useState(false);
  const [fieldTouched, setFieldTouched] = useState(
    user?.userProfile?.gender || null,
  );

  const initialValues = {
    avatarUrl: user?.userProfile?.avatarUrl || '',
    fullName: user?.userProfile?.name || '',
    dob: user?.userProfile?.dob || '',
    gender: user?.userProfile?.gender || '',
    backImageOfId: user?.userProfile?.backImageOfId || '',
    frontImageOfId: user?.userProfile?.frontImageOfId || '',
    personalIdNumber: user?.userProfile?.personalIdNumber || '',
    idPlaceIssue: user?.userProfile?.idPlaceIssue || '',
    idDateIssue: user?.userProfile?.idDateIssue || '',
    contactCityId: user?.userProfile?.contactCityId || '',
    contactDistrictId: user?.userProfile?.contactDistrictId || '',
    contactAddress: user?.userProfile?.contactAddress || '',
    contactDistrictName: user?.userProfile?.contactDistrictName || '',
    contactCityName: user?.userProfile?.contactCityName || '',
    permanentAddressCityId: user?.userProfile?.permanentAddressCityId || '',
    permanentAddressDistrictId:
      user?.userProfile?.permanentAddressDistrictId || '',
    permanentAddressCityName: user?.userProfile?.permanentAddressCityName || '',
    permanentAddressDistrictName:
      user?.userProfile?.permanentAddressDistrictName || '',
    permanentAddress: user?.userProfile?.permanentAddress || '',
  };

  //check required follow admin
  const checkRequiredField = fieldName => {
    return attributes?.includes(fieldName);
  };

  //validate follow admin
  const {NO_SAME_ADDRESS_SCHEMA} = handleNoSameAttributes(checkRequiredField);
  const {SAME_ADDRESS_SCHEMA} = handleSameAttributes(checkRequiredField);

  return (
    <Formik
      validationSchema={
        sameAddress ? SAME_ADDRESS_SCHEMA : NO_SAME_ADDRESS_SCHEMA
      }
      initialValues={initialValues}
      validate={values => {
        setConfirm(!_.isEqual(values, initialValues));
        setDataDraft(values);
      }}
      onSubmit={values => {
        submitForm(values);
      }}>
      {({
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        handleSubmit,
        setValues,
      }) => {
        return (
          <>
            <ScrollView>
              <AppView>
                {/* info personal */}
                <Section
                  headerTitle={t(
                    'navigate:scenes.carOwnerInfoStart.steps.step2.titlePersonal',
                  )}>
                  <TabPersonal
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    checkRequiredField={checkRequiredField}
                    setValues={setValues}
                    setFieldTouched={setFieldTouched}
                  />
                </Section>

                {/* info address */}
                <Section
                  headerTitle={t(
                    'navigate:scenes.carOwnerInfoStart.infoCarLayout.tabs.tab5',
                  )}>
                  <TabAddress
                    listProvince={listProvince}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    checkRequiredField={checkRequiredField}
                    sameAddress={sameAddress}
                    setSameAddress={setSameAddress}
                    setValues={setValues}
                  />
                </Section>
              </AppView>
            </ScrollView>

            {/* confirm Button */}
            {isConfirm ? (
              <AppConfirmButton
                hasCheckBox={true}
                titleConfirm={t('common:button.saveChange')}
                onPressConfirm={() => {
                  handleSubmit();
                }}
                onPressCancel={() => {
                  updateDraft();
                  navigationServices.goBack();
                }}
              />
            ) : null}
          </>
        );
      }}
    </Formik>
  );
};
