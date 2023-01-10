import * as Yup from 'yup';

export const FORM_SCHEMA = Yup.object({
  password: Yup.string()
    .required('common:validation.string.requiredPassword')
    .min(8, 'common:validation.string.requiredMinPassword')
    .max(20, 'common:validation.string.requiredMaxPassword')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'common:validation.string.requiredMatchPassword',
    ),

  confirmPassword: Yup.string()
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
});
