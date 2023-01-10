import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  tabItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: COLOR.COLOR_BACKGROUND_SECONDARY,
  },
  tabItemContainerFocus: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  textTitleTabFocus: {
    ...STYLE_GLOBAL.h3,
    color: COLOR.BLUE_7,
  },
  textTitleTab: {
    ...STYLE_GLOBAL.h3,
    ...STYLE_GLOBAL.weight400,
    color: COLOR.BLUE_4,
  },
  containerImageUpload: {
    marginRight: 16,
  },
  textLabel: {
    ...STYLE_GLOBAL.body2,
    ...STYLE_GLOBAL.weight400,
    marginBottom: 8,
    color: COLOR.TEXT_CONTENT,
  },
  textInputContainer: {
    marginBottom: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  containerNotPadding: {
    flex: 1,
    backgroundColor: COLOR.COLOR_BACKGROUND_SECONDARY,
  },
  imageUpload: {
    marginRight: 16,
  },
  textInputStyle: {
    color: COLOR.TEXT_CONTENT,
  },
  textError: {
    color: 'red',
    fontSize: scalePortrait(12) - 2,
  },
  textSection: {
    marginBottom: 24,
    ...STYLE_GLOBAL.body1,
    ...STYLE_GLOBAL.weight700,
    color: COLOR.COLOR_PRIMARY,
  },
  textCheckbox: {
    ...STYLE_GLOBAL.body1,
    ...STYLE_GLOBAL.weight400,
    color: COLOR.TEXT_CONTENT,
  },
  textContentStyle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {marginBottom: 8},
  ],
  marginTextInput: {marginBottom: 18},
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
});
