import {StyleSheet} from 'react-native';
import {scalePortrait} from 'utils/responsive';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import {DEFAULT_PREFIX_FONT_FAMILY} from '../AppText/appFont';
import {getSize} from 'hooks/useIconSvgResizeHOC';

export default StyleSheet.create({
  paddingInputContainer: {
    paddingLeft: scalePortrait(12),
    paddingRight: scalePortrait(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  focus: {
    borderColor: COLOR.BORDER_FOCUS_TEXT_INPUT,
    borderWidth: 3,
  },
  container: {
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    height: scalePortrait(45, 76),
    minHeight: 45,
    paddingLeft: scalePortrait(12),
    paddingRight: scalePortrait(8),
    borderRadius: CONST_SIZE.BORDER_RADIUS_TEXT_INPUT,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR.COLOR_BORDER,
    borderWidth: 1,
  },
  textInput: [
    {
      width: '100%',
      height: '100%',
      fontSize: scalePortrait(16),
      color: COLOR.TEXT_CONTENT,
      fontFamily: `${DEFAULT_PREFIX_FONT_FAMILY}-Regular`,
    },
  ],
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
  heightWithError: {
    height: scalePortrait(60),
  },
  label: {
    color: COLOR.BLACK,
    fontSize: scalePortrait(12),
  },
  clearButton: {
    height: getSize.v(18),
    aspectRatio: 1,
    alignSelf: 'center',
    backgroundColor: COLOR.BACKGROUND_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: getSize.v(6),
    borderRadius: getSize.v(18) / 2,
  },
});
