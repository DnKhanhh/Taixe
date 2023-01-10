import * as yup from 'yup';

export const handleAttributes = require => {
  const COMPANY_SCHEMA = yup.object().shape({
    companyName: require('companyName')
      ? yup.string().required('common:validation.string.requiredCompanyName')
      : yup.string(),
    companyLegalRepresentative: require('companyLegalRepresentative')
      ? yup
          .string()
          .required(
            'common:validation.string.requiredCompanyLegalRepresentative',
          )
      : yup.string(),
    cityId: require('cityId')
      ? yup.string().required('common:validation.string.requiredCityId')
      : yup.string(),
    districtId: require('districtId')
      ? yup.string().required('common:validation.string.requiredDistrictId')
      : yup.string(),
    address: require('address')
      ? yup.string().required('common:validation.string.requiredAddress')
      : yup.string(),
    companyTaxNumber: require('companyTaxNumber')
      ? yup
          .string()
          .required('common:validation.string.requiredCompanyTaxNumber')
      : yup.string(),
    companyActiveDate: require('companyActiveDate')
      ? yup
          .string()
          .required('common:validation.string.requiredCompanyActiveDate')
      : yup.string(),
    companyRegisterLocation: require('companyRegisterLocation')
      ? yup
          .string()
          .required('common:validation.string.requiredCompanyRegisterLocation')
      : yup.string(),
    frontCompanyRegistrationCertificatePicture:
      require('frontCompanyRegistrationCertificatePicture')
        ? yup
            .string()
            .required(
              'common:validation.string.requiredFrontCompanyRegistrationCertificatePicture',
            )
        : yup.string(),
    backCompanyRegistrationCertificatePicture:
      require('backCompanyRegistrationCertificatePicture')
        ? yup
            .string()
            .required(
              'common:validation.string.requiredBackCompanyRegistrationCertificatePicture',
            )
        : yup.string(),
  });
  return {COMPANY_SCHEMA};
};
