import React, {useCallback, useState, useLayoutEffect} from 'react';
import CompanyDriverInformation from './view';
import {KEY_ACTION_PROFILE, ACCOUNT_STATUS, BRANCH_NAME} from 'utils/AppConst';
import {statusTransfer} from 'utils/appUtils';

//Logic
import {useActions} from 'hooks/useActions';
import {updateProfileSubmit} from 'appRedux/actions/authActions';
import {getUserProfileSettingSubmit} from 'appRedux/actions/settingActions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import {useGetValidationLog} from 'hooks/useGetValidationLog';

export default function ({route}) {
  const actions = useActions({
    updateProfileSubmit,
    getUserProfileSettingSubmit,
  });
  const user = useSelectorShallow(getUserInfoSelector);
  const userProfile = user.userProfile;
  console.log('userInfo selector company', userProfile);
  const {
    invalidValidation,
    noteInvalidValidation,
    getProfileAttributesValidationLog,
  } = useGetValidationLog('profile');
  // console.log('error test', {error});
  const [dataUserProfileSetting, setDataUserProfileSetting] = useState([]);
  const [checkFieldVerify, setCheckFieldVerify] = useState(false); //check Notify if field change was included setting requiredVerify
  const onPressSubmitUpdate = useCallback(
    data => {
      let form = {...data};
      for (let key in form) {
        if (!form[key]) {
          form[key] = null;
        }
      }
      delete form.districtName;
      delete form.cityName;

      actions.updateProfileSubmit({
        checkFieldVerify: checkFieldVerify,
        keyAction: KEY_ACTION_PROFILE.UPDATE_AFTER_COMPLETED,
        ...form,
      });
      console.log('data change', {...form});
    },
    [actions, checkFieldVerify],
  );

  //get User Profile Setting from Admin
  const fetchDataDriverProfileSetting = useCallback(() => {
    const options = {
      callback: res => {
        // console.log('res DataUserProfileSetting', res);
        setDataUserProfileSetting(res);
      },
      accountType:
        userProfile?.status === ACCOUNT_STATUS.PENDING_UPGRADE_REVIEW //process this case because response BE with personal and status 'pending_upgrade_review'
          ? 'company'
          : userProfile?.accountType || 'company',
      profileType: userProfile?.profileType || BRANCH_NAME,
    };
    actions.getUserProfileSettingSubmit({...options});
    return () => {};
  }, [actions, userProfile?.accountType]);

  useLayoutEffect(() => {
    fetchDataDriverProfileSetting();
    return () => {};
  }, [actions, userProfile?.accountType]);

  useLayoutEffect(() => {
    if (
      statusTransfer(userProfile?.status).changeNameStatus ===
      ACCOUNT_STATUS.NEED_UPDATE
    ) {
      getProfileAttributesValidationLog();
    }
    return () => {};
  }, [userProfile?.status]);

  return (
    <CompanyDriverInformation
      onPressSubmitUpdate={onPressSubmitUpdate}
      userProfile={userProfile || {}}
      dataUserProfileSetting={dataUserProfileSetting}
      setCheckFieldVerify={setCheckFieldVerify}
      checkFieldVerify={checkFieldVerify}
      invalidValidation={invalidValidation}
      noteInvalidValidation={noteInvalidValidation}
    />
  );
}
