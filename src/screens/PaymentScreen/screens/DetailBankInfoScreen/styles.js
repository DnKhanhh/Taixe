import {StyleSheet} from 'react-native';
import {CONST_SIZE, COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  container: {
    paddingHorizontal: CONST_SIZE.DEFAULT_PADDING_HORIZONTAL,
    paddingVertical: CONST_SIZE.DEFAULT_PADDING_VERTICAL,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  logoBankStyle: {
    width: scalePortrait(44),
    height: scalePortrait(44),
    borderRadius: 100,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  bankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 16,
    paddingRight: 36,
  },
  containerDefaultBank: {
    backgroundColor: '#CEECFF',
    paddingHorizontal: 6,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  textDefaultBank: [STYLE_GLOBAL.body2, {color: '#002A8E'}],
  textBankNameStyle: [
    STYLE_GLOBAL.h6,
    STYLE_GLOBAL.color_textContent,
    {flexWrap: 'wrap', flex: 1},
  ],
  textTitle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {marginBottom: 8},
  ],
  textInput: {marginBottom: 18},
  buttonSetDefault: {
    backgroundColor: COLOR.BUTTON_SET_DEFAULT,
    borderColor: COLOR.COLOR_PRIMARY,
    borderWidth: 1,
  },
  checkBoxDefault: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.color_textContent,
    {flex: 1, flexWrap: 'wrap'},
  ],
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
