import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  buttonAddBankContainer: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 17,
  },
  buttonAddBankStyle: [
    STYLE_GLOBAL.containerCenter,
    {
      borderRadius: 8,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: COLOR.TEXT_GREY_SECONDARY,
      paddingVertical: 12,
    },
  ],
  textButtonAddBank: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight700,
    {color: COLOR.COLOR_PRIMARY, marginLeft: 8},
  ],
  titlePayment: [
    STYLE_GLOBAL.h6,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_primary,
  ],
});
