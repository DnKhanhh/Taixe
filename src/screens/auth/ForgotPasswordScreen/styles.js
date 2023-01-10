import {StyleSheet} from 'react-native';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    paddingLeft: 10,
  },
  viewInput: {
    flexDirection: 'row-reverse',
  },
  contentContainer: [STYLE_GLOBAL.padding, STYLE_GLOBAL.paddingStatusBar],
  titleText: [
    STYLE_GLOBAL.h4,
    STYLE_GLOBAL.color_primary,
    {
      alignSelf: 'center',
    },
  ],
  textGoBack: {
    ...STYLE_GLOBAL.body1,
    ...STYLE_GLOBAL.weight700,
    color: COLOR.COLOR_PRIMARY,
  },
  textButtonSubmit: [
    STYLE_GLOBAL.h3,
    {
      fontWeight: '700',
    },
  ],
  containerSubmit: {
    marginTop: 8,
    marginVertical: 24,
  },
  textBold: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.weight500,
    {
      color: COLOR.BLACK,
    },
  ],
  textSmall: [
    STYLE_GLOBAL.body2,
    {
      color: COLOR.BLACK,
    },
  ],
});
