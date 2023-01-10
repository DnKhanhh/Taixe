import {getSize} from 'hooks/useIconSvgResizeHOC';
import {Platform, StyleSheet} from 'react-native';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

export default StyleSheet.create({
  container: {
    borderColor: COLOR.COLOR_BORDER,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    borderRadius: CONST_SIZE.BORDER_RADIUS_TEXT_INPUT,
    minHeight: getSize.v(45),
    ...(Platform.OS === 'ios' && {
      flexWrap: 'wrap',
      paddingVertical: getSize.m(8),
    }),
  },
  iconContainer: {
    ...Platform.select({
      ios: {
        height: '100%',
        width: getSize.v(45),
      },
      android: {
        height: getSize.v(38),
        width: getSize.v(38),
      },
    }),

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getSize.m(4),
  },
  line: {
    width: 1,
    height: 24,
    borderLeftWidth: 1,
    borderColor: '#CACBCE',
  },
  row: {
    flexDirection: 'row',
    flex: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  amount: {
    paddingHorizontal: getSize.m(16),
  },
  amountContainer: {
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {
        height: getSize.v(38),
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: getSize.m(10),
    paddingHorizontal: getSize.m(5),
    marginTop: getSize.m(3),
  },
  selectOneText: [STYLE_GLOBAL.body1, {color: COLOR.BLACK}],
});
