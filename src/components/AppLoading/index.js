import React from 'react';
import {View, StyleSheet} from 'react-native';

//Components
import AppImage from 'components/AppImage';
import AppText from 'components/AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';

//utils
import {COLOR} from 'utils/AppConst';
import {t} from 'i18next';
import { getSize } from 'utils/responsive';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  point: {
    backgroundColor: COLOR.COLOR_SECONDARY,
    width: 2,
    height: 2,
    borderRadius: 10,
    marginRight: 4,
  },
  imageGif: {
    width: getSize.s(90),
    height: getSize.s(90),
  },
  containerPoint: {flexDirection: 'row', alignItems: 'center', marginTop: -12},
});
function AppLoading() {
  return (
    <View style={styles.view}>
      <View style={styles.linearGradient}>
        <AppImage
          source={require('assets/ttc_loading.gif')}
          style={styles.imageGif}
        />
        <View style={styles.containerPoint}>
          <View style={styles.point} />
          <View style={[styles.point, {width: 4, height: 4}]} />
          <View style={[styles.point, {width: 6, height: 6}]} />
          <AppText
            style={[
              STYLE_GLOBAL.h6,
              STYLE_GLOBAL.weight400,
              {color: COLOR.COLOR_SECONDARY},
            ]}>
            {t('common:waitForLoading')}
          </AppText>
        </View>
      </View>
    </View>
  );
}

export default React.memo(AppLoading);
