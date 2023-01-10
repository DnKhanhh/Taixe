import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  viewDisplayOptionOTP: {
    flexDirection: 'row',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLOR.COLOR_BORDER,
    width: '100%',
    // alignItems: 'flex-start', //temp for long email
  },
  textTitleOTP: [
    STYLE_GLOBAL.h3,
    STYLE_GLOBAL.weight400,
    STYLE_GLOBAL.color_textContent,
  ],
  textValueOTP: [
    STYLE_GLOBAL.h3,
    STYLE_GLOBAL.color_textContent,
    {flex: 1, flexWrap: 'wrap'},
  ],
  container: [
    STYLE_GLOBAL.padding,
    STYLE_GLOBAL.paddingStatusBar,
    {
      flex: 1,
    },
  ],
  textTitle: [
    STYLE_GLOBAL.h4,
    STYLE_GLOBAL.color_primary,
    {
      marginTop: 40,
      alignSelf: 'center',
      marginBottom: 8,
    },
  ],
  text1RadioBtn: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '400',
    color: COLOR.TEXT_CONTENT,
  },
  text2RadioBtn: {
    ...STYLE_GLOBAL.body1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '700',
  },
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonConfirm: {
    marginTop: 24,
  },
});
