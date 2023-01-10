import {StyleSheet} from 'react-native';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';

export default StyleSheet.create({
  containerModal: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  viewModalError: {
    height: 'auto',
    maxHeight: '75%',
    borderRadius: 6,
    paddingTop: 24,
    width: '85%',
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  subTitleModal: [
    STYLE_GLOBAL.body1,
    {color: COLOR.TEXT_CONTENT, textAlign: 'center'},
  ],
  textContentModal: {
    marginBottom: 32,
    textAlign: 'center',
  },
});
