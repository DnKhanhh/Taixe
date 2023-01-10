import {StyleSheet} from 'react-native';
import {CONST_SIZE, COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
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
  labelContent: [STYLE_GLOBAL.body1, {color: '#4B5563'}],
});
