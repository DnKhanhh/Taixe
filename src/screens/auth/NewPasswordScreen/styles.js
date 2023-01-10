import {StyleSheet} from 'react-native';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: [STYLE_GLOBAL.padding, STYLE_GLOBAL.paddingStatusBar],
  titleText: [
    STYLE_GLOBAL.h4,
    STYLE_GLOBAL.color_primary,
    {
      alignSelf: 'center',
      marginBottom: 24,
      marginTop: 14,
    },
  ],
  button: {
    marginTop: 24,
  },
  textInputContainer: {
    marginVertical: 8,
  },
  textLabel: [
    STYLE_GLOBAL.body2,
    {
      color: COLOR.TEXT_CONTENT,
      marginBottom: 8,
    },
  ],
  viewInput: {
    flexDirection: 'row-reverse',
  },
});
