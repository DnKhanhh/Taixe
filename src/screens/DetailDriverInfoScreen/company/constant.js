import * as Yup from 'yup';
import React from 'react';
import {t} from 'i18next';

export const useValidateUserProfile = requires => {
  const EDIT_PROFILE_FORM_SCHEME = Yup.object().shape({
    companyName: requires('companyName')
      ? Yup.string().required(t('common:validation.string.requiredCompanyName'))
      : Yup.string(),
    companyLegalRepresentative: requires('companyLegalRepresentative')
      ? Yup.string().required(
          t('common:validation.string.requiredCompanyLegalRepresentative'),
        )
      : Yup.string(),
    cityId: requires('cityId')
      ? Yup.string().required(t('common:validation.string.requiredCityId'))
      : Yup.string(),
    districtId: requires('districtId')
      ? Yup.string().required(t('common:validation.string.requiredDistrictId'))
      : Yup.string(),
    address: requires('address')
      ? Yup.string().required(t('common:validation.string.requiredAddress'))
      : Yup.string(),
    companyTaxNumber: requires('companyTaxNumber')
      ? Yup.string().required(
          t('common:validation.string.requiredCompanyTaxNumber'),
        )
      : Yup.string(),
    companyActiveDate: requires('companyActiveDate')
      ? Yup.string().required(
          t('common:validation.string.requiredCompanyActiveDate'),
        )
      : Yup.string(),
    companyRegisterLocation: requires('companyRegisterLocation')
      ? Yup.string().required(
          t('common:validation.string.requiredCompanyRegisterLocation'),
        )
      : Yup.string(),
    transportBusinessLicense: requires('transportBusinessLicense')
      ? Yup.string().required(
          t('common:validation.string.requiredTransportBusinessLicense'),
        )
      : Yup.string(),
    transportBusinessLicenseDate: requires('transportBusinessLicenseDate') //check name with BE
      ? Yup.string().required(
          t('common:validation.string.requiredTransportBusinessLicenseDate'),
        )
      : Yup.string(),
    transportBusinessLicenseExpiredDate: requires(
      'transportBusinessLicenseExpiredDate',
    ) //check name with BE
      ? Yup.string().required(
          t(
            'common:validation.string.requiredTransportBusinessLicenseExpiredDate',
          ),
        )
      : Yup.string(),
  });
  return {EDIT_PROFILE_FORM_SCHEME};
};
