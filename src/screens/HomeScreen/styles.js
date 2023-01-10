import {StyleSheet} from 'react-native';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getSize, scalePortrait} from 'utils/responsive';
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper';
export default StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewHeader: {
    // top: 0,
    // left: 0,
    // right: 0,
    // height: '25%',
  },
  viewContentHeader: {
    paddingHorizontal: getSize.m(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getBottomSpace() + getSize.v(isIphoneX() ? 0 : 16),
    alignItems: 'center',
  },
  viewBody: {
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
    borderTopRightRadius: getSize.m(16),
    borderTopLeftRadius: getSize.m(16),
    paddingTop: getSize.m(8),
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: CONST_SIZE.DEVICE_WIDTH,
    height: getSize.v(625),
    zIndex: 100,
  },
  viewHelper: {
    borderRadius: getSize.m(64),
    height: getSize.v(43),
    width: getSize.s(112),
  },
  btnHelper: {
    borderRadius: getSize.m(64),
    height: getSize.v(43),
    width: getSize.s(112),
    alignSelf: 'flex-end',
    // position: 'absolute',
    right: getSize.m(16),
    bottom: getSize.m(15),
    zIndex: Number.MAX_VALUE,
  },
  viewButtonHelper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: getSize.v(43),
  },
  viewModalHelp: {
    maxHeight: '90%',
    height: 'auto',
    borderTopLeftRadius: getSize.m(24),
    borderTopRightRadius: getSize.m(24),
    backgroundColor: COLOR.COLOR_SECONDARY,
  },
  textHelper: [
    STYLE_GLOBAL.caption,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_secondary,
    {
      textAlign: 'center',
    },
  ],
  imageBackgroundStyle: {
    // left: 0,
    // right: 0,
    height: getSize.v(249),
  },
  textTitle: [
    STYLE_GLOBAL.h6,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_four,
    {paddingLeft: 16},
  ],
  textTitleModal: [
    STYLE_GLOBAL.title,
    STYLE_GLOBAL.weight600,
    {color: '#00192F', textAlign: 'center', zIndex: 100},
  ],
  textTitleButton: [
    STYLE_GLOBAL.buttonMedium,
    STYLE_GLOBAL.weight600,
    {
      color: COLOR.BLUE_DARK2,
      textAlign: 'center',
      width: '100%',
    },
  ],
});
