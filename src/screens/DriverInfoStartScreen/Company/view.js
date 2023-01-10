import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Formik} from 'formik';
import TabCompany from './TabCompany';
import TabTax from './TabTax';
import _ from 'lodash';
import {handleAttributes} from './constant';

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

export const CompanyView = ({
  listProvince,
  updateDraft,
  submitForm,
  companyAttributes,
  setDataDraft,
}) => {
  const {t} = useTranslate();
  const user = useSelectorShallow(getUserInfoSelector);
  console.log('value in company: ', user.userProfile);

  const [isConfirm, setConfirm] = useState(false);

  const initialValues = {
    avatarUrl: user?.userProfile?.avatarUrl || '',
    companyName: user?.userProfile?.companyName || '',
    companyLegalRepresentative:
      user?.userProfile?.companyLegalRepresentative || '',
    cityId: user?.userProfile?.cityId || '',
    districtId: user?.userProfile?.districtId || '',
    address: user?.userProfile?.address || '',
    cityName: user?.userProfile?.cityName || '',
    districtName: user?.userProfile?.districtName || '',
    idPlaceIssue: user?.userProfile?.idPlaceIssue || '',
    companyTaxNumber: user?.userProfile?.companyTaxNumber || '',
    companyActiveDate: user?.userProfile?.companyActiveDate || '',
    companyRegisterLocation: user?.userProfile?.companyRegisterLocation || '',
    frontCompanyRegistrationCertificatePicture:
      user?.userProfile?.frontCompanyRegistrationCertificatePicture || '',
    backCompanyRegistrationCertificatePicture:
      user?.userProfile?.backCompanyRegistrationCertificatePicture || '',
    numberPlate: user?.userProfile?.numberPlate || '',
    transportBusinessLicenseNumberDateActive:
      user?.userProfile?.transportBusinessLicenseNumberDateActive || '',
    transportBusinessLicenseNumberDateEnd:
      user?.userProfile?.transportBusinessLicenseNumberDateEnd || '',
    frontTransportBusinessLicensePicture:
      user?.userProfile?.frontTransportBusinessLicensePicture || '',
    endTransportBusinessLicensePicture:
      user?.userProfile?.endTransportBusinessLicensePicture || '',
    transportBusinessLicense: user?.userProfile?.transportBusinessLicense || '',
  };

  //check required follow admin
  const checkRequiredField = fieldName => {
    return companyAttributes?.includes(fieldName);
  };

  //validate follow admin

  const {COMPANY_SCHEMA} = handleAttributes(checkRequiredField);

  return (
    <Formik
      validationSchema={COMPANY_SCHEMA}
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
                {/* info company */}
                <Section
                  headerTitle={t(
                    'navigate:scenes.carOwnerInfoStart.steps.step2.titleBusiness',
                  )}>
                  <TabCompany
                    listProvince={listProvince}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    checkRequiredField={checkRequiredField}
                    setValues={setValues}
                  />
                </Section>

                {/* info tax */}
                <Section
                  headerTitle={t(
                    'navigate:scenes.carOwnerInfoStart.infoCarLayout.tabs.tab7',
                  )}>
                  <TabTax
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    checkRequiredField={checkRequiredField}
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
