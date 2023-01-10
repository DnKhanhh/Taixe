import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  otpText: {
    fontWeight: 'bold',
    color: COLOR.BLUE_DARK2,
    fontSize: scalePortrait(18),
    width: '100%',
    textAlign: 'center',
  },
  textTitle: [
    STYLE_GLOBAL.h4,
    STYLE_GLOBAL.color_primary,
    {
      marginTop: 40,
      alignSelf: 'center',
      marginBottom: 8,
    },
  ],
  subText: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.color_textContent,
    {textAlign: 'center'},
  ],
  textTimer: [
    STYLE_GLOBAL.h5,
    {
      textAlign: 'center',
      color: COLOR.STATUS_SUCCESS_TEXT,
    },
  ],
  textTimerEnd: [
    STYLE_GLOBAL.h5,
    {
      textAlign: 'center',
      color: COLOR.COLOR_REQUIRED,
    },
  ],
  buttonConfirm: {
    marginTop: 24,
  },
  flex: {
    flex: 1,
  },
  textInputOTP: {
    flex: 1,
    marginHorizontal: 4,
  },
});
