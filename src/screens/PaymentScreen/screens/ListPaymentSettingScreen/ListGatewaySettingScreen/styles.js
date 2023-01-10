import {StyleSheet} from 'react-native';
import {CONST_SIZE, COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
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
  gatewayNameStyle: [
    STYLE_GLOBAL.overLine,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
    {marginTop: 8},
  ],
  logoGateway: {
    width: scalePortrait(32),
    height: scalePortrait(32),
    borderRadius: 71,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
});
