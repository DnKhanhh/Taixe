import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import { DEFAULT_PADDING_HORIZONTAL, DEFAULT_PADDING_VERTICAL } from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: DEFAULT_PADDING_VERTICAL
  },
  title: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.GRAY5,
    flex: 0.5,
  },
  value: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.TEXT_CONTENT,
  },
  valueContent: {
    flex: 0.5,
  },
  addMoreInfoContent:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  addMoreInfoValue:{
    marginRight: DEFAULT_PADDING_HORIZONTAL
  }
});
