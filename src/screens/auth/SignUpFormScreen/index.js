import React, {useCallback} from 'react';
import SignUpFormScreen from './view';
import {SCENE_NAMES, ACCOUNT_TYPE} from 'utils/AppConst';

//Logic
import {signUpSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';

//navigation
import NavigationServices from 'navigation/navigationServices';

//Utils
import useTranslate from 'hooks/useTranslate';
import Toast from 'react-native-toast-message';

export default function ({route}) {
  const {t} = useTranslate();
  const {checkedType} = route.params;
  const actions = useActions({signUpSubmit});

  const onPressSignIn = () => {
    NavigationServices.resetActionTo(SCENE_NAMES.SIGN_IN);
  };
  const onPressRegister = useCallback(
    (e, resetForm) => {
      const {phone, email, password, fullName} = e;
      const options = {
        callback: () => {
          resetForm();
          Toast.show({
            type: 'success',
            props: {
              title: t('common:createAccountSuccess'),
            },
          });
        },
        data: {
          phone,
          email: email?.trim().length > 0 ? email : null,
          password,
          fullName,
          typeUser: checkedType,
          companyName:
            checkedType === ACCOUNT_TYPE.COMPANY
              ? e.companyName
              : null,
        },
      };
      actions.signUpSubmit({...options});
    },
    [actions],
  );
  return (
    <SignUpFormScreen
      onPressSignIn={onPressSignIn}
      onPressRegister={onPressRegister}
      checkedType={checkedType}
    />
  );
}
