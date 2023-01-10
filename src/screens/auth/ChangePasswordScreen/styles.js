import {StyleSheet} from 'react-native';
import {CONST_SIZE, COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  inputContainer: {
    ...STYLE_GLOBAL.marginBottomTextInput,
    height: 40,
  },
  container: {
    paddingHorizontal: CONST_SIZE.DEFAULT_PADDING_HORIZONTAL,
    paddingVertical: CONST_SIZE.DEFAULT_PADDING_VERTICAL,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  labelText: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {
      marginBottom: 8,
    },
  ],
  flex: {
    flex: 1,
  },
  textSubPass: [
    STYLE_GLOBAL.body2,
    {
      marginBottom: 16,
      color: '#4B5563',
      marginLeft: 8,
    },
  ],
});
