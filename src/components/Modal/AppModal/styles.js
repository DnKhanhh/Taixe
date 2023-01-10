import {getSize} from 'hooks/useIconSvgResizeHOC';
import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  viewModal: {
    height: 'auto',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: getBottomSpace(),
  },
  titleModalContainer: {
    height: getSize.m(51),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  containerButtonModal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 18,
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    minHeight: 100,
  },
  dividerItemStyle: {
    height: 1,
    width: '100%',
    backgroundColor: '#607D8B',
  },
  containerSearch: {
    borderWidth: 1,
    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
  },
});
