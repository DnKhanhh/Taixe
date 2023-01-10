import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: scalePortrait(18),
    color: '#000',
    paddingVertical: 4,
    marginLeft: 8,
  },
  selectedText: {
    fontSize: scalePortrait(18),
    fontWeight: '600',
    color: COLOR.COLOR_PRIMARY,
    paddingVertical: 4,
    marginLeft: 8,
  },
});
