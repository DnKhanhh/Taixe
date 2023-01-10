import React, {useState, useCallback, useEffect} from 'react';
import SenderInformationScreen from './view';
import {SCENE_NAMES, ACCOUNT_STATUS, PROCESS_STEPS} from 'utils/AppConst';
import {signInOptions, DRIVER_INFORMATION, securityOptions} from './constant';

//Logic
import NavigationServices from 'navigation/navigationServices';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {useActions} from 'hooks/useActions';
import {
  deleteAccountSubmit,
  signOutSubmit,
  changeStatusStopWorkingSubmit,
  changeStatusReactiveSubmit,
  getUserInfoSubmit,
} from 'appRedux/actions/authActions';
import {useCheckStatusAccount} from 'hooks/useCheckStatusAccount';
import Toast from 'react-native-toast-message';
import useTranslate from 'hooks/useTranslate';

export default function ({}) {
  const user = useSelectorShallow(getUserInfoSelector);
  const userProfile = user?.userProfile;
  const {t} = useTranslate();
  // console.log('userInfo selector PersonalInformation', userProfile);
  const actions = useActions({
    deleteAccountSubmit,
    signOutSubmit,
    changeStatusStopWorkingSubmit,
    changeStatusReactiveSubmit,
    getUserInfoSubmit,
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false);
  const isCheckStatusAccount = useCheckStatusAccount(userProfile?.status);
  const onPressOptionsItem = useCallback(
    type => {
      switch (type) {
        case DRIVER_INFORMATION.DETAIL_INFORMATION:
          NavigationServices.navigate(SCENE_NAMES.DETAIL_DRIVER_INFO, {
            isFirstUpdate: false,
          });
          break;
        case DRIVER_INFORMATION.CHANGE_PHONE:
          NavigationServices.navigate(SCENE_NAMES.CHANGE_PHONE_OR_EMAIL, {
            isChangePhone: true,
          });
          break;
        case DRIVER_INFORMATION.CHANGE_EMAIL:
          NavigationServices.navigate(SCENE_NAMES.CHANGE_PHONE_OR_EMAIL, {
            isChangePhone: false,
          });
          break;
        case DRIVER_INFORMATION.CHANGE_PASSWORD:
          if (userProfile?.status === ACCOUNT_STATUS.WORKING) {
            NavigationServices.navigate(SCENE_NAMES.CHANGE_PASSWORD);
          } else {
            Toast.show({
              type: 'warning',
              props: {
                title: t('common:message.UN_WORKING'),
              },
            });
          }

          break;
        case DRIVER_INFORMATION.CHANGE_STATUS_ACCOUNT:
          setShowModalChangeStatus(true);
          break;
        case DRIVER_INFORMATION.DELETE_ACCOUNT:
          //to do with delete account
          setShowModalDelete(true);
          break;
        default:
          break;
      }
    },
    [t, userProfile?.processStep, userProfile?.status],
  );
  /*
   * TODO: delete account
   *  case1: còn đơn hàng chưa hoàn tất -> show toast thông báo
   *  case2: không còn đơn hàng -> delete account -> sign out
   */
  const handleDeleteAccount = () => {
    // case2
    actions.deleteAccountSubmit();
    actions.signOutSubmit();
  };
  const handleChangeStatus = useCallback(
    oldStatus => {
      switch (oldStatus) {
        case ACCOUNT_STATUS.WORKING:
          actions.changeStatusStopWorkingSubmit();
          break;
        case ACCOUNT_STATUS.STOP_WORKING:
          actions.changeStatusReactiveSubmit();
          break;
        default:
          break;
      }
      setShowModalChangeStatus(false);
    },
    [actions],
  );

  useEffect(() => {
    return () => {
      setShowModalChangeStatus(false);
      setShowModalDelete(false);
    };
  }, []);

  return (
    <SenderInformationScreen
      userProfile={userProfile || {}}
      signInOptions={signInOptions(
        userProfile?.phone,
        userProfile?.email,
        isCheckStatusAccount.editableInput,
      )}
      onPressOptionsItem={onPressOptionsItem}
      setShowModalDelete={setShowModalDelete}
      showModalDelete={showModalDelete}
      onDeleteAccount={handleDeleteAccount}
      securityOptions={securityOptions(
        isCheckStatusAccount.statusName,
        isCheckStatusAccount.editableStatus,
      )}
      setShowModalChangeStatus={setShowModalChangeStatus}
      showModalChangeStatus={showModalChangeStatus}
      onChangeStatus={handleChangeStatus}
    />
  );
}
