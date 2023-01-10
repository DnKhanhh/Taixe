import {StyleSheet} from 'react-native';
import {getSize} from 'utils/responsive';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import {DEFAULT_PREFIX_FONT_FAMILY} from '../AppText/appFont';
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: COLOR.COLOR_BORDER,
    borderWidth: 1,
    borderRadius: CONST_SIZE.BORDER_RADIUS_TEXT_INPUT,
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    height: getSize.v(45),
    minHeight: 45,
  },
  textInput: {
    width: '30%',
    fontSize: getSize.m(16),
    color: COLOR.COLOR_TEXT_PRIMARY,
    fontFamily: `${DEFAULT_PREFIX_FONT_FAMILY}-Regular`,
    textAlign: 'center',
  },
  txtError: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: getSize.m(12) - 2,
    // fontStyle: 'italic',
    paddingHorizontal: getSize.m(5),
    marginBottom: -getSize.m(16),
    position: 'absolute',
    bottom: 0,
  },
  heightWithError: {
    height: getSize.v(60),
  },
  label: {
    color: COLOR.COLOR_TEXT_PRIMARY,
    fontSize: getSize.m(12),
  },
  line: {
    width: 3,
    height: 24,
    borderToptWidth: 1,
    borderColor: 'black',
  },
});
