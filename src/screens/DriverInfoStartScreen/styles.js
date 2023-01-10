import {StyleSheet} from 'react-native';
//utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import {scalePortrait} from 'utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  textContentStyle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {marginBottom: 8},
  ],
  marginTextInput: {marginBottom: 14},
  containerImageUpload: {
    marginRight: 16,
  },
  txtError: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: scalePortrait(12) - 2,
    paddingHorizontal: scalePortrait(5),
    marginBottom: -scalePortrait(16),
    position: 'absolute',
    bottom: 0,
  },
  textInputContainer: {
    marginBottom: 12,
  },
  textLabel: {
    ...STYLE_GLOBAL.body2,
    ...STYLE_GLOBAL.weight400,
    marginBottom: 18,
    color: COLOR.TEXT_CONTENT,
  },
  textSection: {
    marginBottom: 24,
    ...STYLE_GLOBAL.body1,
    ...STYLE_GLOBAL.weight700,
    color: COLOR.COLOR_PRIMARY,
  },
});
