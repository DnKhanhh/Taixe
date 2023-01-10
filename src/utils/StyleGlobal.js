import {Platform} from 'react-native';
import {IS_PHONE_X, COLOR, CONST_SIZE} from './AppConst';
import {getSize} from 'utils/responsive';
import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

//SETUP GLOBAL STYLE
const STYLE_GLOBAL = {
  //apply for phone devices not check on tablet
  h1: {
    fontSize: getSize.m(76),
    fontWeight: '700',
    lineHeight: getSize.m(76) * 1.5,
  },
  h2: {
    fontSize: getSize.m(48),
    fontWeight: '700',
    lineHeight: getSize.m(48) * 1.5,
  },
  h3: {
    fontSize: getSize.m(32),
    fontWeight: '600',
    lineHeight: getSize.m(32) * 1.5,
  },
  h4: {
    fontSize: getSize.m(28),
    fontWeight: '700',
    lineHeight: getSize.m(28) * 1.5,
  },
  h5: {
    fontSize: getSize.m(24),
    fontWeight: '600',
    lineHeight: getSize.m(24) * 1.5,
  },
  h6: {
    fontSize: getSize.m(20),
    fontWeight: '600',
    lineHeight: getSize.m(20) * 1.5,
  },
  subTitle1: {
    fontSize: getSize.m(20),
    fontWeight: '400',
    lineHeight: getSize.m(20) * 1.5,
  },
  subTitle2: {
    fontSize: getSize.m(18),
    fontWeight: '400',
    lineHeight: getSize.m(18) * 1.5,
  },
  body1: {
    fontSize: getSize.m(16),
    lineHeight: getSize.m(16) * 1.5,
    fontWeight: '400',
  },
  body2: {
    fontSize: getSize.m(14),
    lineHeight: getSize.m(14) * 1.5,
    fontWeight: '400',
  },
  buttonLarge: {
    fontSize: getSize.m(16),
    lineHeight: getSize.m(16) * 1.5,
    fontWeight: '700',
  },
  buttonMedium: {
    fontSize: getSize.m(14),
    lineHeight: getSize.m(14) * 1.5,
    fontWeight: '700',
  },
  caption: {
    fontSize: getSize.m(12),
    lineHeight: getSize.m(12) * 1.5,
    fontWeight: '400',
  },
  overLine: {
    fontSize: getSize.m(10),
    lineHeight: getSize.m(10) * 1.5,
    fontWeight: '400',
  },
  weight700: {
    fontWeight: '700',
  },
  weight600: {
    fontWeight: '600',
  },
  weight500: {
    fontWeight: '500',
  },
  weight400: {
    fontWeight: '400',
  },
  color_primary: {
    color: COLOR.COLOR_PRIMARY,
  },
  color_secondary: {
    color: COLOR.COLOR_SECONDARY,
  },
  color_third: {
    color: COLOR.COLOR_PRIMARY_THIRD,
  },
  color_four: {
    color: COLOR.COLOR_PRIMARY_FOUR,
  },
  color_textContent: {
    color: COLOR.TEXT_CONTENT,
  },
  color_textBottomTabActive: {
    color: COLOR.COLOR_BOTTOM_TAB_ACTIVE,
  },
  color_textBottomTab: {
    color: COLOR.COLOR_BOTTOM_TAB,
  },
  color_textTitleDrawer: {
    color: COLOR.COLOR_TEXT_TITLE_DRAWER,
  },
  color_textGrey: {
    color: COLOR.TEXT_GREY,
  },
  color_textTitleIntro: {
    color: COLOR.COLOR_TEXT_TITLE_INTRO,
  },
  flex1: {
    flex: 1,
  },
  padding: {
    padding: 16,
  },
  paddingStatusBar: {
    paddingTop: CONST_SIZE.DEFAULT_PADDING_TOP,
  },
  margin: {
    margin: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? (IS_PHONE_X ? 40 : 35) : 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  borderRadius: {
    borderRadius: 8,
  },
  containerBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFlexEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    top: getStatusBarHeight() + getSize.v(12),
    right: getSize.s(16),
    position: 'absolute',
  },
  containerFlexStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  marginBottomTextInput: {
    marginBottom: getSize.m(24),
  },
  paddingIPX: {paddingTop: Platform.OS === 'ios' ? (IS_PHONE_X ? 40 : 35) : 0},
  shadowDefault: {
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#001F3B',
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
};

export default STYLE_GLOBAL;
