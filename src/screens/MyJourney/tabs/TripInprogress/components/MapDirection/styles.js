import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import {
  DEFAULT_PADDING_HORIZONTAL,
  DEFAULT_PADDING_VERTICAL,
} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
  },

  confirmButton: {
    paddingBottom: 0,
  },
  flex1: {
    flex: 1,
  },
  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
  textPlace: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '600',
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },

  line: {
    marginTop: 16,
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#B5B6BA',
  },
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },

  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
  directionTouchView: {
    position: 'absolute',
    bottom: 0,
    right: DEFAULT_PADDING_HORIZONTAL,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  direction: {
    width: 35,
    height: 35,
    padding: DEFAULT_PADDING_HORIZONTAL,
  },
  openMapText: {
    color: '#000000',
    backgroundColor: 'rgba(225,225,225,0.7)',
    padding: DEFAULT_PADDING_VERTICAL,
    borderRadius: 10,
  },
});
