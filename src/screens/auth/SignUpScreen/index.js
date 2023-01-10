import React, {useState} from 'react';
import SignUpScreen from './view';
import {SCENE_NAMES} from 'utils/AppConst';

//navigation
import NavigationServices from 'navigation/navigationServices';

export default function () {
  const [checkedType, setCheckedType] = useState(null);
  const onPressSignIn = () => {
    NavigationServices.navigate(SCENE_NAMES.SIGN_IN);
  };
  const onPressSignUpForm = () => {
    NavigationServices.navigate(SCENE_NAMES.SIGN_UP_FORM, {
      checkedType: checkedType,
    });
  };
  return (
    <SignUpScreen
      onPressSignIn={onPressSignIn}
      onPressSignUpForm={onPressSignUpForm}
      checkedType={checkedType}
      setCheckedType={setCheckedType}
    />
  );
}
