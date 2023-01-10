import {StyleSheet} from 'react-native';
import {getSize} from 'utils/responsive';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
export default StyleSheet.create({
  viewModal: {
    height: 'auto',
    maxHeight: '50%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 36,
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: getSize.s(18),
    color: '#000',
    paddingVertical: 4,
    marginLeft: 8,
  },
  selectedText: {
    fontSize: getSize.s(18),
    fontWeight: '600',
    color: COLOR.COLOR_PRIMARY,
    paddingVertical: 4,
    marginLeft: 8,
  },
});
