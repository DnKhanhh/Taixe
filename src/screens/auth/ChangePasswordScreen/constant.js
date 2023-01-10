export const NAMESPACE = 'navigate:scenes.auth.changePassword.title';
import * as Yup from 'yup';

export const CHANGEPASSWORD_FORM_SCHEME = Yup.object().shape({
  oldPassword: Yup.string().required(
    'common:validation.string.requiredPassword',
  ),
  newPassword: Yup.string()
    .required('common:validation.string.requiredPassword')
    .min(8, 'common:validation.string.requiredMinPassword')
    .max(20, 'common:validation.string.requiredMaxPassword')
    .matches(
      /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*[#?!@$%^&*-])$/,
      'common:validation.string.requiredMatchPassword',
    ),
  confirmPassword: Yup.string()
    .required('common:validation.string.requiredPassword')
    .oneOf(
      [Yup.ref('newPassword'), null],
      'common:validation.string.passwordNotMatch',
    ),
});

export const DATA_VEHICLE_CATEGORY = [
  {
    id: 1,
    typeCategory: 'truck',
    name: 'Xe tải',
  },
  {
    id: 2,
    typeCategory: 'container',
    name: 'Xe container',
  },
];
