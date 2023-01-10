import * as Yup from 'yup';

export const NAMESPACE_DETAIL = 'navigate:scenes.payment.detailGateway';
export const NAMESPACE_CREATE = 'navigate:scenes.payment.createGateway';

export const CREATE_BANK_FORM_SCHEME = Yup.object().shape({
  fullName: Yup.string().required('common:validation.string.requiredFullName'),
  paymentNumber: Yup.number().required(
    'common:validation.string.requiredGatewayNumber',
  ),
});
