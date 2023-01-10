import React, {useEffect, useCallback, useState} from 'react';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import {ACCOUNT_TYPE, ACCOUNT_STATUS} from 'utils/AppConst';
import PersonalDriverInformation from './personal';
import CompanyDriverInformation from './company';
import {checkAndShownStatusInformation} from 'utils/appUtils';

const DetailDriverInfoScreen = () => {
  const user = useSelectorShallow(getUserInfoSelector);

  useEffect(() => {
    checkAndShownStatusInformation(user?.userProfile?.status);
    return () => {};
  }, [user?.userProfile?.status]);

  if (
    user?.userProfile?.accountType === ACCOUNT_TYPE.PERSONAL &&
    user?.userProfile?.status !== ACCOUNT_STATUS.PENDING_UPGRADE_REVIEW
  ) {
    return <PersonalDriverInformation />;
  } else {
    return <CompanyDriverInformation />;
  }
};

export default DetailDriverInfoScreen;
