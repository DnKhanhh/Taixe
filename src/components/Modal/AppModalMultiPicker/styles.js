import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
export default StyleSheet.create({
  viewModal: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: getBottomSpace() + 12,
  },
  viewButtonFooter: {
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 12,
    shadow: {
      ...Platform.select({
        android: {elevation: 3},
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.7,
          shadowRadius: 3,
          shadowOffset: {
            width: 2,
            height: 2,
          },
        },
      }),
    },
  },
  titleModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  containerItemRender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyTitleModal: {
    backgroundColor: COLOR.COLOR_SECONDARY,
    width: 30,
    height: 30,
  },
  lineTitleModal: {borderTopWidth: 1, borderColor: COLOR.COLOR_BORDER},
});
