import {StyleSheet} from 'react-native';
import {CONST_SIZE, COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  container: {
    paddingVertical: CONST_SIZE.DEFAULT_PADDING_VERTICAL,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  listBankTitle: [
    STYLE_GLOBAL.h6,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_primary,
    {marginTop: 16, marginBottom: 8},
  ],
  containerItem: {
    flex: 1 / 4,
    borderColor: COLOR.COLOR_BORDER,
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  wrapItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginItem: {marginHorizontal: 4},
  bankNameStyle: [
    STYLE_GLOBAL.overLine,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
    {marginTop: 8},
  ],
  logoBank: {
    width: scalePortrait(32),
    height: scalePortrait(32),
    borderRadius: 71,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
});
