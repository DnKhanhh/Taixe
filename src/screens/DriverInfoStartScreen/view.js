import React from 'react';
import CompanyView from './Company';
import PersonalView from './Personal';
import {ACCOUNT_TYPE} from 'utils/AppConst';

//hook
import useTranslate from 'hooks/useTranslate';

//component
import AppContainer from 'components/AppContainer';

//reducer
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';

export const DriverInfoStartScreen = ({listProvince}) => {
  const user = useSelectorShallow(getUserInfoSelector);
  const {t} = useTranslate();

  const isCompany = () => {
    return (
      user.userProfile.accountType === ACCOUNT_TYPE.COMPANY ||
      user.userProfile.accountTypeFlag === ACCOUNT_TYPE.COMPANY
    );
  };
  return (
    <AppContainer
      stackScreen={true}
      title={t('navigate:scenes.detailTransporterInfo.title')}>
      {isCompany ? (
        <CompanyView listProvince={listProvince} />
      ) : (
        <PersonalView />
      )}
    </AppContainer>
  );
};
