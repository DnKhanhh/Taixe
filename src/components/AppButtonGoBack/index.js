import React from 'react';
import {TouchableOpacity, Keyboard} from 'react-native';
import {SVG_NAME} from 'assets/path';
import NavigationServices from 'navigation/navigationServices';

const AppButtonGoBack = ({onGoBack}) => {
  function goBack() {
    if (typeof onGoBack === 'function') {
      Keyboard.dismiss();
      onGoBack();
    } else {
      Keyboard.dismiss();
      NavigationServices.goBack();
    }
  }

  return (
    <TouchableOpacity onPress={goBack}>
      <SVG_NAME.GO_BACK />
    </TouchableOpacity>
  );
};

export default AppButtonGoBack;
