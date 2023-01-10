import * as Yup from 'yup';

export const NAMESPACE_DETAIL = 'navigate:scenes.payment.detail';
export const NAMESPACE_CREATE = 'navigate:scenes.payment.create';

export const CREATE_BANK_FORM_SCHEME = Yup.object().shape({
  fullName: Yup.string().required('common:validation.string.requiredFullName'),
  bankNumber: Yup.number().required(
    'common:validation.string.requiredBankNumber',
  ),
});
