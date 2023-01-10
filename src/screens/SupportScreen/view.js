/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {NAMESPACE} from './constant';

//Components
import AppText from 'components/AppText';

//Utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import AppContainer from 'components/AppContainer';
import {useTranslation} from 'react-i18next';

function SupportScreen({}) {
  const {t} = useTranslation();
  return (
    <AppContainer
      title={t(`${NAMESPACE}`)}
      back={true}
      draw={false}
      stackScreen={true}
    />
  );
}

export default React.memo(SupportScreen);
