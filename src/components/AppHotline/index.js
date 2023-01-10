import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SVG_NAME } from 'assets/path';
import LinearGradient from 'react-native-linear-gradient';

//Components
import AppText from 'components/AppText';

//Utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import { COLOR, HOT_LINE } from 'utils/AppConst';
import { callNumber } from 'utils/communications';
import { getSize } from 'utils/responsive';
import { useIconResizeHOC } from 'hooks/useIconSvgResizeHOC';

function AppHotline() {
  const onPressHotlineNumber = number => {
    callNumber(number);
  };

  const HotLineIcon = useIconResizeHOC(SVG_NAME.HOTLINE_LEFT, { s: 41 });
  const HotLineRightIcon = useIconResizeHOC(SVG_NAME.HOTLINE_RIGHT, { w: 34, h: 41 });

  return (
    <TouchableOpacity
      onPress={() => {
        onPressHotlineNumber(HOT_LINE.PHONE);
      }}
    >
      <LinearGradient
        style={styles.container}
        start={{ x: 0.4, y: 1 }}
        end={{ x: 0.55, y: 0 }}
        colors={COLOR.APP_HOT_LINE}
      >
        <View
          style={{
            marginRight: getSize.m(17.64),
            marginLeft: getSize.m(16.78),
            zIndex: 10
          }}
        >
          {HotLineIcon}
          <View style={styles.circleLarge} />
          <View style={styles.circleMedium} />
          <View style={styles.circleSmall} />
          <View style={styles.circle} />
        </View>

        <View
          style={{
            position: 'absolute',
            top: getSize.m(13.88),
            right: getSize.m(26.5),
            zIndex: 10,
            width: getSize.s(125),
            height: getSize.v(49)
          }}
        >
          <AppText
            style={[
              STYLE_GLOBAL.body1,
              STYLE_GLOBAL.weight600,
              STYLE_GLOBAL.color_secondary,
            ]}>
            Hotline
          </AppText>
          <AppText
            style={[
              STYLE_GLOBAL.subTitle2,
              STYLE_GLOBAL.color_secondary,
              STYLE_GLOBAL.weight700,
            ]}>
            {HOT_LINE.PHONE}
          </AppText>
        </View>

        <View
          style={{
            position: 'absolute',
            right: getSize.m(12),
            top: getSize.m(11.94),
            zIndex: 10
          }}
        >
          {HotLineRightIcon}
        </View>

        <View style={styles.roundSmall} opacity={0.08} />
        <View style={styles.roundMedium} opacity={0.08} />
        <View style={styles.roundLarge} opacity={0.08} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default React.memo(AppHotline);

const BACKGROUND = {
  backgroundColor: COLOR.COLOR_SECONDARY,
  position: 'absolute',
};
const styles = StyleSheet.create({
  container: {
    borderRadius: getSize.s(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 14,
    // paddingHorizontal: 8,
    width: getSize.s(226),
    height: getSize.v(76),
    overflow: 'hidden',
  },
  circleLarge: {
    ...BACKGROUND,
    width: getSize.s(4.84),
    height: getSize.s(4.84),
    borderRadius: getSize.s(4.84) / 2,
  },
  circleMedium: {
    ...BACKGROUND,
    width: getSize.s(2.07),
    height: getSize.s(2.07),
    borderRadius: getSize.s(2.07),
    bottom: getSize.m(3),
  },
  circleSmall: {
    ...BACKGROUND,
    width: getSize.s(2.07),
    height: getSize.s(2.07),
    borderRadius: getSize.s(2.07) / 2,
    bottom: getSize.m(1),
    left: getSize.m(40),
  },
  circle: {
    ...BACKGROUND,
    width: getSize.s(2.76),
    height: getSize.s(2.76),
    borderRadius: getSize.s(2.76) / 2,
    left: getSize.m(48),
    top: getSize.m(-3),
  },
  roundSmall: {
    ...BACKGROUND,
    width: getSize.s(37.32),
    height: getSize.s(37.32),
    borderRadius: getSize.s(37.32),
    right: getSize.m(6.91),
    top: getSize.m(11.76),
    zIndex: 1,
  },
  roundMedium: {
    ...BACKGROUND,
    width: getSize.s(63.58),
    height: getSize.s(63.58),
    borderRadius: getSize.s(63.58),
    right: getSize.m(-6.22),
    top: getSize.m(-1.37),
    zIndex: 1,
  },
  roundLarge: {
    ...BACKGROUND,
    width: getSize.s(91.23),
    height: getSize.s(91.23),
    borderRadius: getSize.s(91.23),
    right: getSize.m(-20.04),
    top: getSize.m(-15.19),
    zIndex: 1,
  },
});
