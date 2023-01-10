import {Platform, StyleSheet} from 'react-native';
import {CONST_SIZE} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getSize} from 'utils/responsive';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  containerTextForgot: {
    flexDirection: 'row',
    marginTop: Platform.isPad ? 24 : 12,
    alignSelf: 'center',
  },
  marginBottom12: {
    marginBottom: getSize.m(12),
  },
  marginBottom24: {
    marginBottom: getSize.m(24),
  },
  logo: {
    alignSelf: 'center',
    marginTop: getSize.v(88),
  },
  container: {
    width: CONST_SIZE.DEVICE_WIDTH,
    height: CONST_SIZE.DEVICE_HEIGHT,
    paddingHorizontal: CONST_SIZE.DEFAULT_PADDING_HORIZONTAL,
    // paddingVertical: CONST_SIZE.DEFAULT_PADDING_VERTICAL,
    // paddingTop: CONST_SIZE.DEFAULT_PADDING_TOP,
  },
  titleLogin: {
    alignSelf: 'center',
    // marginTop: getSize.v(60),
    marginBottom: getSize.v(24),
  },
  forgotPassword: {
    marginTop: getSize.m(16),
    marginBottom: getSize.v(118.24),
    alignSelf: 'center',
    height: getSize.v(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonStyle: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_secondary,
  ],
  backgroundImage: {
    width: CONST_SIZE.DEVICE_WIDTH,
    height: CONST_SIZE.DEVICE_HEIGHT,
  },
  styleTextError: [STYLE_GLOBAL.caption, {marginBottom: -getSize.m(20)}],
  hotlineContent: {
    position: 'absolute',
    bottom: getBottomSpace() + getSize.v(51.8 - 34),
  },
});
