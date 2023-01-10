export const NAMESPACE = 'navigate:scenes.auth.signIn';
import * as Yup from 'yup';
import {REGEX_PHONE} from 'utils/AppConst';

export const SIGN_IN_FORM_SCHEME = Yup.object().shape({
  phoneOrEmail: Yup.string()
    .required('common:validation.string.requiredPhoneOrEmail')
    .test(
      'test-name',
      'common:validation.string.wrongPhoneOrEmail',
      function (value) {
        const emailRegex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const phoneRegex = REGEX_PHONE; // Change this regex based on requirement        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);
        let isValidEmail = emailRegex.test(value);
        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      },
    ),
  password: Yup.string().required('common:validation.string.requiredPassword'),
});
