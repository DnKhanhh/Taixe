export const NAMESPACE = 'scenes.auth.signIn';
import * as Yup from 'yup';

const personalSchema = {
  fullName: Yup.string().required('common:validation.string.requiredFullName'),

  email: Yup.string().email('common:validation.string.requiredEmailFormat'),

  phone: Yup.string()
    .required('common:validation.string.requiredPhone')
    .matches(
      /^(\+84-|\+84|0)?\d{9}$/,
      'common:validation.string.requiredPhoneFormat',
    ),
  password: Yup.string()
    .required('common:validation.string.requiredPassword')
    .min(8, 'common:validation.string.requiredMinPassword')
    .max(20, 'common:validation.string.requiredMaxPassword')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'common:validation.string.requiredMatchPassword',
    ),

  rePassword: Yup.string()
    .required('common:validation.string.requiredPassword')
    .min(8, 'common:validation.string.requiredMinPassword')
    .max(20, 'common:validation.string.requiredMaxPassword')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'common:validation.string.requiredMatchPassword',
    )
    .oneOf(
      [Yup.ref('password'), null],
      'common:validation.string.passwordNotMatch',
    ),
};

const companySchema = {
  ...personalSchema,
  companyName: Yup.string().required(
    'common:validation.string.requiredCompanyName',
  ),
};

export const SIGNUP_PERSONAL_FORM_SCHEME = Yup.object().shape(personalSchema);
export const SIGNUP_COMPANY_FORM_SCHEME = Yup.object().shape(companySchema);
