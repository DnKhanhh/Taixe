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
import useTranslate from 'hooks/useTranslate';

function OrderScreen({}) {
  const {t} = useTranslate();
  return (
    <AppContainer
      title={t(`${NAMESPACE}`)}
      back={false}
      icon1={<SVG_NAME.NOTIFICATION_ICON />}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText
          style={[STYLE_GLOBAL.h1, STYLE_GLOBAL.color_textBottomTabActive]}>
          Đơn hàng
        </AppText>
      </View>
    </AppContainer>
  );
}

export default React.memo(OrderScreen);
