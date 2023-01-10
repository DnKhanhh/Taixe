import * as Yup from 'yup';
import React from 'react';
import {t} from 'i18next';

export const useValidateUserProfile = requires => {
  const EDIT_PROFILE_FORM_SCHEME = Yup.object().shape({
    name: requires('name')
      ? Yup.string().required(t('common:validation.string.requiredFullName'))
      : Yup.string(),
    dob: requires('dob')
      ? Yup.string().required(t('common:validation.string.requiredDOB'))
      : Yup.string(),
    personalIdNumber: requires('personalIdNumber')
      ? Yup.string().required(
          t('common:validation.string.requiredIdentityNumber'),
        )
      : Yup.string(),
    idPlaceIssue: requires('idPlaceIssue')
      ? Yup.string().required(
          t('common:validation.string.requiredIdPlaceIssue'),
        )
      : Yup.string(),
    idDateIssue: requires('idDateIssue')
      ? Yup.string().required(
          t('common:validation.string.requiredIdentityNumber'),
        )
      : Yup.string(),
    permanentAddressCityId: requires('permanentAddressCityId')
      ? Yup.string().required(
          t('common:validation.string.requiredPermanentAddressCityId'),
        )
      : Yup.string(),
    permanentAddressDistrictId: requires('permanentAddressDistrictId')
      ? Yup.string().required(
          t('common:validation.string.requiredPermanentAddressDistrictId'),
        )
      : Yup.string(),
    permanentAddress: requires('permanentAddress')
      ? Yup.string().required(
          t('common:validation.string.requiredPermanentAddress'),
        )
      : Yup.string(),
    contactCityId: requires('contactCityId')
      ? Yup.string().required(
          t('common:validation.string.requiredContactCityId'),
        )
      : Yup.string(),
    contactDistrictId: requires('contactDistrictId')
      ? Yup.string().required(
          t('common:validation.string.requiredContactDistrictId'),
        )
      : Yup.string(),
    contactAddress: requires('contactAddress')
      ? Yup.string().required(
          t('common:validation.string.requiredContactAddress'),
        )
      : Yup.string(),
  });
  return {EDIT_PROFILE_FORM_SCHEME};
};
