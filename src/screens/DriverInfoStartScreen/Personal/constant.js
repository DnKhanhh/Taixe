import * as yup from 'yup';

export const handleSameAttributes = require => {
  const SAME_ADDRESS_SCHEMA = yup.object().shape({
    avatarUrl: yup.string().required('common:openPicker.titleEditAvatar'),
    fullName: require('name')
      ? yup.string().required('common:validation.string.requiredFullName')
      : yup.string(),
    dob: require('dob')
      ? yup.string().required('common:validation.string.requiredDOB')
      : yup.string(),
    gender: require('gender')
      ? yup.string().required('common:validation.string.requiredGender')
      : yup.string(),
    personalIdNumber: require('personalIdNumber')
      ? yup.string().required('common:validation.string.requiredIdentityNumber')
      : yup.string(),
    idDateIssue: require('idDateIssue')
      ? yup.string().required('common:validation.string.requiredIdDateIssue')
      : yup.string(),
    idPlaceIssue: require('idPlaceIssue')
      ? yup.string().required('common:validation.string.requiredIdPlaceIssue')
      : yup.string(),
    backImageOfId: require('backImageOfId')
      ? yup.string().required('common:validation.string.requiredBackImageOfId')
      : yup.string(),
    frontImageOfId: require('frontImageOfId')
      ? yup.string().required('common:validation.string.requiredFrontImageOfId')
      : yup.string(),
    permanentAddressCityId: require('permanentAddressCityId')
      ? yup.string().required('common:placeholder.plProvince')
      : yup.string(),
    permanentAddressDistrictName: require('permanentAddressDistrictId')
      ? yup.string().required('common:placeholder.plDistrict')
      : yup.string(),
    permanentAddress: require('permanentAddress')
      ? yup
          .string()
          .required('common:validation.string.requiredPermanentAddress')
      : yup.string(),
  });
  return {SAME_ADDRESS_SCHEMA};
};

export const handleNoSameAttributes = require => {
  const NO_SAME_ADDRESS_SCHEMA = yup.object().shape({
    avatarUrl: yup.string().required('common:openPicker.titleEditAvatar'),
    fullName: require('name')
      ? yup.string().required('common:validation.string.requiredFullName')
      : yup.string(),
    dob: require('dob')
      ? yup.string().required('common:validation.string.requiredDOB')
      : yup.string(),
    gender: require('gender')
      ? yup.string().required('common:validation.string.requiredGender')
      : yup.string(),
    personalIdNumber: require('personalIdNumber')
      ? yup.string().required('common:validation.string.requiredIdentityNumber')
      : yup.string(),
    idDateIssue: require('idDateIssue')
      ? yup.string().required('common:validation.string.requiredIdDateIssue')
      : yup.string(),
    idPlaceIssue: require('idPlaceIssue')
      ? yup.string().required('common:validation.string.requiredIdPlaceIssue')
      : yup.string(),
    backImageOfId: require('backImageOfId')
      ? yup.string().required('common:validation.string.requiredBackImageOfId')
      : yup.string(),
    frontImageOfId: require('frontImageOfId')
      ? yup.string().required('common:validation.string.requiredFrontImageOfId')
      : yup.string(),
    permanentAddressCityName: require('permanentAddressCityId')
      ? yup.string().required('common:placeholder.plProvince')
      : yup.string(),
    permanentAddressDistrictName: require('permanentAddressDistrictId')
      ? yup.string().required('common:placeholder.plDistrict')
      : yup.string(),
    permanentAddress: require('permanentAddress')
      ? yup
          .string()
          .required('common:validation.string.requiredPermanentAddress')
      : yup.string(),
    contactCityName: require('contactCityId')
      ? yup.string().required('common:placeholder.plProvince')
      : yup.string(),
    contactDistrictName: require('contactDistrictId')
      ? yup.string().required('common:placeholder.plDistrict')
      : yup.string(),
    contactAddress: require('contactAddress')
      ? yup.string().required('common:validation.string.requiredContactAddress')
      : yup.string(),
  });
  return {NO_SAME_ADDRESS_SCHEMA};
};
