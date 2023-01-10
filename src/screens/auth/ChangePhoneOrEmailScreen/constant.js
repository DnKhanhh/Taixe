import * as Yup from 'yup';

export const NAMESPACE_PHONE = 'navigate:scenes.auth.changePhone.title';
export const NAMESPACE_EMAIL = 'navigate:scenes.auth.changeEmail.title';

export const CHANGE_PHONE_FORM_SCHEME = Yup.object().shape({
  phone: Yup.string()
    .required('common:validation.string.requiredPhone')
    .matches(
      /^(\+84-|\+84|0)?\d{9}$/,
      'common:validation.string.requiredPhoneFormat',
    ),
});

export const CHANGE_EMAIL_FORM_SCHEME = Yup.object().shape({
  email: Yup.string()
    .required('common:validation.string.requiredEmail')
    .email('common:validation.string.wrongEmail'),
});
