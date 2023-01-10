/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {NAMESPACE} from './constant';
import styles from './style';
//Components
import AppContainer from 'components/AppContainer';
//Utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';

function NotificationScreen() {
  const {t} = useTranslate();
  return (
    <AppContainer
      title={t(`${NAMESPACE}`)}
      back={true}
      stackScreen={true}
      draw={false}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SVG_NAME.CLOUD />
      </View>
    </AppContainer>
  );
}

export default React.memo(NotificationScreen);
