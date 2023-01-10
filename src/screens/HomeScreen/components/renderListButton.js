import React, {useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
//components
import AppText from 'components/AppText';
//styles
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import useTranslate from 'hooks/useTranslate';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES, ACCOUNT_STATUS, KEY_ACTION_PROFILE} from 'utils/AppConst';
import {
  ACCOUNT_OPTIONS,
  DIRECTORY_OPTION,
  ORDER_OPTION,
  QUOTE_OPTION,
} from '../constant';
import {checkUserCompletedForm, statusTransfer} from 'utils/appUtils';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';
import AppView from 'components/AppView';
import {getSize} from 'utils/responsive';

const windowWidth = Dimensions.get('window').width;
const SPACE_HORIZONTAL = 64;
function RenderListButton({data = [], numberOfColumns = 2}) {
  const widthItem = (windowWidth - SPACE_HORIZONTAL) / numberOfColumns;
  const {t} = useTranslate();
  const actions = useActions({getUserInfoSubmit});
  const user = useSelectorShallow(getUserInfoSelector);
  const statusName = statusTransfer(user?.userProfile?.status).changeNameStatus;
  const onPressItem = useCallback(
    title => {
      console.log('tit', title);
      if (
        statusName === ACCOUNT_STATUS.UNFINISHED ||
        statusName === ACCOUNT_STATUS.DRAFT
      ) {
        checkUserCompletedForm(user?.userProfile?.status);
      } else {
        switch (title) {
          case DIRECTORY_OPTION.MYJOURNEY: {
            NavigationServices.navigate(SCENE_NAMES.MYJOURNEY_SCREEN);
            // Alert.alert('', t('common:msg_developing_feature'))
            break;
          }
          case DIRECTORY_OPTION.INFO_ACCOUNT: {
            Alert.alert('', t('common:msg_developing_feature'));
            // NavigationServices.navigate(SCENE_NAMES.ADDRESS);

            break;
          }
          case QUOTE_OPTION.LIST_QUOTE: {
            Alert.alert('', t('common:msg_developing_feature'));
            // NavigationServices.navigate(SCENE_NAMES.LIST_QUOTE);
            break;
          }
          case QUOTE_OPTION.REQUEST_QUOTE: {
            Alert.alert('', t('common:msg_developing_feature'));
            // NavigationServices.navigate(SCENE_NAMES.REQUEST_QUOTE);
            break;
          }
          case ACCOUNT_OPTIONS.DETAIL_SENDER_INFO:
            // actions.getUserInfoSubmit({
            //   showLoading: true,
            //   keyAction: KEY_ACTION_PROFILE.GET_SENDER_INFORMATION,
            // });
            Alert.alert('', t('common:msg_developing_feature'));
            break;
          case ACCOUNT_OPTIONS.PAYMENT:
            // NavigationServices.navigate(SCENE_NAMES.PAYMENT_SCREEN);
            Alert.alert('', t('common:msg_developing_feature'));
            break;
          case ACCOUNT_OPTIONS.ANOTHER_INFORMATION:
            // NavigationServices.navigate(SCENE_NAMES.ANOTHER_INFORMATION);
            Alert.alert('', t('common:msg_developing_feature'));
            break;
          case ACCOUNT_OPTIONS.SENDER_INFORMATION:
            // NavigationServices.navigate(SCENE_NAMES.SENDER_INFORMATION);
            Alert.alert('', t('common:msg_developing_feature'));
            break;
          case ACCOUNT_OPTIONS.ADDRESS_SCREEN:
            // NavigationServices.navigate(SCENE_NAMES.ADDRESS);
            Alert.alert('', t('common:msg_developing_feature'));
            break;
          default:
            Alert.alert('', t('common:msg_developing_feature'));
            break;
        }
      }
    },
    [actions, statusName, user?.userProfile?.status],
  );
  return (
    <AppView width={343} style={styles.viewContainerItem(numberOfColumns)}>
      {data.length > 0
        ? data.map((item, index) => (
            <TouchableOpacity
              key={item?.id || index}
              onPress={() => onPressItem(item.key)}>
              <AppView
                rowAlignCenter
                justifyCenter
                marginBottom={
                  numberOfColumns == 3 && index < numberOfColumns ? 16 : 0
                }
                // marginLeft={(index % numberOfColumns > 0 ? 24 : 16)}
                // center={numberOfColumns == 2}
                marginVertical={16}
                style={{
                  width: numberOfColumns == 3 ? getSize.s(90) : getSize.s(311),
                  height:
                    numberOfColumns == 3 ? getSize.v(130) : getSize.v(104),
                  backgroundColor: '#E8EFF1',
                  borderRadius: 24,
                }}>
                <AppView
                  style={{
                    width:
                      numberOfColumns == 3 ? getSize.s(90) : getSize.s(143.5),
                    height:
                      numberOfColumns == 3 ? getSize.v(130) : getSize.v(105),
                  }}
                  rowAlignCenter
                  flex={1}
                  marginHorizontal={getSize.s(54)}>
                  <AppView style={styles.icon}>{item.icon}</AppView>
                  <AppText style={styles.textTitleButton} flex={1}>
                    {t(`${item.title}`)}
                  </AppText>
                </AppView>
              </AppView>
            </TouchableOpacity>
          ))
        : null}
    </AppView>
  );
}
export default React.memo(RenderListButton);
const styles = StyleSheet.create({
  viewContainerItem: numberOfColumns => ({
    borderRadius: getSize.s(16),
    backgroundColor: COLOR.COLOR_SECONDARY,
    marginTop: getSize.m(8),
    flexDirection: 'column',
    flexWrap: numberOfColumns == 3 ? 'wrap' : undefined,
    marginHorizontal: getSize.m(16),
    alignItems: 'center',
    // backgroundColor:"red"
  }),
  textTitleButton: [
    STYLE_GLOBAL.buttonMedium,
    STYLE_GLOBAL.weight600,
    {
      color: COLOR.TEXT_CONTENT,
      width: '100%',
      marginLeft: getSize.m(21),
    },
  ],
  textTitleButtonMultiRow: [
    STYLE_GLOBAL.buttonMedium,
    STYLE_GLOBAL.weight600,
    {
      color: COLOR.BLUE_DARK2,
      textAlign: 'center',
      width: '100%',
    },
  ],
  icon: {
    width: getSize.s(64),
    height: getSize.v(64),
    // borderRadius: getSize.s(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getSize.m(4),
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getSize.m(100),
  },
});
