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
import AppContainer_Search from 'components/AppContainer_Search';
import useTranslate from 'hooks/useTranslate';

function SearchScreen() {
  const {t} = useTranslate();
  return (
    <AppContainer_Search title={t(`${NAMESPACE}`)} back={true} add={true} />
  );
}

export default React.memo(SearchScreen);
