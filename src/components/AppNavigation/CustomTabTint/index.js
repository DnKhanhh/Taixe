import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import AppText from 'components/AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

const CustomTabTint = ({focused, title, isTopTabBar = true}) => {
  if (isTopTabBar) {
    return (
      <AppText
        style={[
          (STYLE_GLOBAL.body2, STYLE_GLOBAL.weight400),
          focused ? styles.textFocusTopTabBar : styles.textTopTabBar,
        ]}>
        {title}
      </AppText>
    );
  }
  if (focused) {
    return (
      <AppText numberOfLines={1} style={styles.textStyle}>
        {title}
      </AppText>
    );
  }
  return (
    <AppText
      style={[
        STYLE_GLOBAL.body1,
        STYLE_GLOBAL.color_textBottomTab,
        styles.textStyle,
      ]}>
      {title}
    </AppText>
  );
};

export default React.memo(CustomTabTint);

const styles = StyleSheet.create({
  textStyle: {textAlign: 'center'},
  textFocusTopTabBar: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.weight600,
    {color: COLOR.TEXT_FOCUSED_TOP_TABBAR},
  ],
  textTopTabBar: [STYLE_GLOBAL.body2, {color: COLOR.TEXT_TOP_TABBAR}],
});
