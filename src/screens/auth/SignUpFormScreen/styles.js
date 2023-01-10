import {StyleSheet} from 'react-native';
import {CONST_SIZE} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  textInput: {
    marginBottom: 12,
  },
  container: {
    paddingHorizontal: CONST_SIZE.DEFAULT_PADDING_HORIZONTAL,
    paddingTop: CONST_SIZE.DEFAULT_PADDING_TOP,
    paddingBottom: 24,
  },
  textTitleRegister: [
    STYLE_GLOBAL.h4,
    STYLE_GLOBAL.color_primary,
    {
      alignSelf: 'center',
      marginVertical: 24,
    },
  ],
  textTitle: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent],
  textSignIn: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.color_primary,
    STYLE_GLOBAL.weight700,
  ],
  viewYouHaveAccount: {
    flexDirection: 'row',
    marginTop: 12,
    alignSelf: 'center',
    paddingBottom: 24,
  },
  viewTitle: {
    marginBottom: 8,
  },
  viewCheckbox: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 8,
  },
  viewPolicy: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    marginTop: -5,
  },
});
