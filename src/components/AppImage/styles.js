import {StyleSheet} from 'react-native';
import {getSize} from 'utils/responsive';
export default StyleSheet.create({
  container: {
    width: getSize.s(60),
    height: getSize.v(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    zIndex: 9,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
  },
});
