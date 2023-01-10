import React, {useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
//components
import AppText from 'components/AppText';
//styles
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import useTranslate from 'hooks/useTranslate';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES, ACCOUNT_STATUS, KEY_ACTION_PROFILE} from 'utils/AppConst';
import {ACCOUNT_OPTIONS, ORDER_OPTION, QUOTE_OPTION} from '../constant';
import {checkUserCompletedForm, statusTransfer} from 'utils/appUtils';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';
import AppView from 'components/AppView';

const windowWidth = Dimensions.get('window').width;
const SPACE_HORIZONTAL = 64;
function RenderListButton({data = [], numberOfColumns = 2}) {
  const widthItem = (windowWidth - SPACE_HORIZONTAL) / numberOfColumns;
  const {t} = useTranslate();
  const actions = useActions({getUserInfoSubmit});
  const user = useSelectorShallow(getUserInfoSelector);
  const statusName = statusTransfer(user.userProfile.status).changeNameStatus;
  const onPressItem = useCallback(
    title => {
      if (
        statusName === ACCOUNT_STATUS.UNFINISHED ||
        statusName === ACCOUNT_STATUS.DRAFT
      ) {
        checkUserCompletedForm(user.userProfile.status);
      } else {
        switch (title) {
          case ORDER_OPTION.MY_ORDER: {
            NavigationServices.navigate(SCENE_NAMES.MY_ORDER);
            break;
          }
          case ORDER_OPTION.CREATE_ORDER: {
            NavigationServices.navigate(SCENE_NAMES.CREATE_NEW_ORDER);
            break;
          }
          case QUOTE_OPTION.LIST_QUOTE: {
            NavigationServices.navigate(SCENE_NAMES.LIST_QUOTE);
            break;
          }
          case QUOTE_OPTION.REQUEST_QUOTE: {
            NavigationServices.navigate(SCENE_NAMES.REQUEST_QUOTE);
            break;
          }
          case ACCOUNT_OPTIONS.DETAIL_SENDER_INFO:
            actions.getUserInfoSubmit({
              showLoading: true,
              keyAction: KEY_ACTION_PROFILE.GET_SENDER_INFORMATION,
            });
            break;
          case ACCOUNT_OPTIONS.PAYMENT:
            NavigationServices.navigate(SCENE_NAMES.PAYMENT_SCREEN);
            break;
          case ACCOUNT_OPTIONS.ANOTHER_INFORMATION:
            NavigationServices.navigate(SCENE_NAMES.ANOTHER_INFORMATION);
            break;
          case ACCOUNT_OPTIONS.SENDER_INFORMATION:
            NavigationServices.navigate(SCENE_NAMES.SENDER_INFORMATION);
            break;
          case ACCOUNT_OPTIONS.ADDRESS_SCREEN:
            NavigationServices.navigate(SCENE_NAMES.ADDRESS);
            break;
          default:
            break;
        }
      }
    },
    [actions, statusName, user.userProfile.status],
  );
  return (
    <View style={styles.viewContainerItem}>
      {data.length > 0
        ? data.map(item => (
            <AppView margin={16} width={widthItem}>
              <TouchableOpacity
                key={item.id}
                onPress={() => onPressItem(item.key)}>
                <AppView alignCenter>
                  <AppView marginBottom={4} style={styles.icon}>
                    {item.icon}
                  </AppView>
                  <AppText style={styles.textTitleButton}>
                    {t(`${item.title}`)}
                  </AppText>
                </AppView>
              </TouchableOpacity>
            </AppView>
          ))
        : null}
    </View>
  );
}
export default React.memo(RenderListButton);
const styles = StyleSheet.create({
  viewContainerItem: {
    borderRadius: 16,
    backgroundColor: COLOR.COLOR_SECONDARY,
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    justifyContent: 'space-evenly',
  },
  textTitleButton: [
    STYLE_GLOBAL.buttonMedium,
    STYLE_GLOBAL.weight600,
    {
      color: COLOR.BLUE_7,
      textAlign: 'center',
      width: '100%',
    },
  ],
  icon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#EDF8ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
