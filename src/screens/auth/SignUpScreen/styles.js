import {StyleSheet, Platform} from 'react-native';
import {CONST_SIZE} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONST_SIZE.DEFAULT_PADDING_HORIZONTAL,
    paddingTop: CONST_SIZE.DEFAULT_PADDING_TOP,
  },
  textTitleSignUp: [
    STYLE_GLOBAL.h4,
    STYLE_GLOBAL.color_primary,
    {
      alignSelf: 'center',
      marginVertical: 40,
    },
  ],
  textYouAre: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.color_textContent,
    {textAlign: 'center'},
  ],
  textSignIn: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.color_primary,
    STYLE_GLOBAL.weight700,
  ],
  viewYouHaveAccount: {
    flexDirection: 'row',
    marginTop: Platform.isPad ? 28 : 16,
    alignSelf: 'center',
  },
  viewAppHotline: {
    alignItems: 'center',
    marginTop: Platform.isPad ? 42 : 50,
  },
  logo: {
    alignItems: 'center',
    marginTop: 42,
  },
  containerAppRadioButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
});
