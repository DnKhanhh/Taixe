import {StyleSheet} from 'react-native';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import {getSize} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  defaultButton: (disabled, leftIcon) => ({
    height: getSize.v(45),
    width: '100%',
    alignSelf: 'center',
    borderRadius: CONST_SIZE.BORDER_RADIUS_BUTTON,
    justifyContent: 'center',
    backgroundColor: COLOR.COLOR_PRIMARY,
    elevation: 0,
    paddingVertical: CONST_SIZE.ITEM_PADDING_VERTICAL,
    opacity: disabled ? 0.5 : 1,
  }),
  hightLight: {
    backgroundColor: COLOR.COLOR_SECONDARY,
    borderWidth: 1,
    borderColor: 'rgba(87, 157, 45, 0.36)',
  },
  defaultText: disabled => [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight700,
    {
      color: disabled ? COLOR.COLOR_SECONDARY : COLOR.COLOR_SECONDARY,
      alignSelf: 'center',
    },
  ],
  textLight: {
    color: COLOR.COLOR_PRIMARY,
  },
});
