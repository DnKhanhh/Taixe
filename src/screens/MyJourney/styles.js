import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewContentHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  viewBody: {
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
    flex: 1,
  },
  viewHelper: {
    borderRadius: 64,
    width: '30%',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  viewButtonHelper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  viewModalHelp: {
    maxHeight: '40%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLOR.COLOR_SECONDARY,
  },
  textHelper: [
    STYLE_GLOBAL.caption,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_secondary,
    {position: 'absolute', textAlign: 'center', left: 0, right: 0},
  ],
  imageBackgroundStyle: {
    left: 0,
    right: 0,
    height: scalePortrait(250),
  },
  textTitle: [
    STYLE_GLOBAL.h6,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_primary,
    {paddingLeft: 16},
  ],
  textTitleModal: [
    STYLE_GLOBAL.title,
    STYLE_GLOBAL.weight600,
    {color: '#00192F', textAlign: 'center', zIndex: 100},
  ],
});
