import * as Yup from 'yup';
import {REGEX_PHONE} from 'utils/AppConst';
export const SCHEMA_ADDRESS = Yup.object().shape({
  addressName: Yup.string().required(
    'navigate:scenes.addressScreen.validation.name',
  ),
  buildingName: Yup.string().required(
    'navigate:scenes.addressScreen.validation.buildingName',
  ),
  contactName: Yup.string().required(
    'navigate:scenes.addressScreen.validation.contactName',
  ),
  contactPhone: Yup.string()
    .required('navigate:scenes.addressScreen.validation.contactPhone')
    .matches(
      REGEX_PHONE,
      'navigate:scenes.addressScreen.validation.contactPhoneMatches',
    ),
  address: Yup.string().required(
    'navigate:scenes.addressScreen.validation.address',
  ),
  cityName: Yup.string().required(
    'navigate:scenes.addressScreen.validation.city',
  ),
  districtName: Yup.string().required(
    'navigate:scenes.addressScreen.validation.district',
  ),
  wardName: Yup.string().required(
    'navigate:scenes.addressScreen.validation.ward',
  ),
});
