import React, {useCallback, useEffect, useState} from 'react';
import {CompanyView} from './view';

//utils
import {ACCOUNT_STATUS, ACCOUNT_TYPE} from 'utils/AppConst';

//navigation
import navigationServices from 'navigation/navigationServices';
import {useNavigation} from '@react-navigation/native';

//actions
import {useActions} from 'hooks/useActions';
import {getUserProfileSettingSubmit} from 'appRedux/actions/settingActions';
import {updateProfileSubmit} from 'appRedux/actions/authActions';

//reducer
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';

export default function ({listProvince}) {
  const navigation = useNavigation();
  const actions = useActions({
    getUserProfileSettingSubmit,
    updateProfileSubmit,
  });
  const user = useSelectorShallow(getUserInfoSelector);

  const [companyAttributes, setCompanyAttributes] = useState([]);
  const [dataDraft, setDataDraft] = useState([]);
  const getCompanyAttributes = useCallback(() => {
    const options = {
      callback: res => {
        setCompanyAttributes(res.required);
      },
      accountType: user?.userProfile?.accountType,
      profileType: user?.userProfile?.profileType,
    };
    actions.getUserProfileSettingSubmit({...options});
  }, [actions]);

  const handleSubmitForm = useCallback(
    values => {
      let form = {...values};
      form.status = ACCOUNT_STATUS.PENDING_APPROVAL;
      for (let key in form) {
        if (!form[key]) {
          form[key] = null;
        }
      }

      const options = {
        callback: res => {
          navigationServices.goBack();
        },
        ...form,
      };
      actions.updateProfileSubmit({...options});
    },
    [actions],
  );

  const handleUpdateDraft = useCallback(() => {
    if (dataDraft.length !== 0) {
      let form = {...dataDraft};
      // form.status = ACCOUNT_STATUS.UNFINISHED;
      for (let key in form) {
        if (!form[key]) {
          form[key] = null;
        }
      }
      const options = {
        ...form,
        accountTypeFlag: ACCOUNT_TYPE.COMPANY,
      };
      // actions.updateProfileSubmit({...options});
      console.log('handleUpdateDraft: ', options);
    }
  }, [dataDraft, actions]);

  useEffect(() => {
    const unSubcribe = navigation.addListener('beforeRemove', () => {
      handleUpdateDraft();
    });
    return unSubcribe;
  }, [navigation, dataDraft]);

  useEffect(() => {
    getCompanyAttributes();
    return () => {};
  }, []);

  return (
    <CompanyView
      listProvince={listProvince}
      updateDraft={handleUpdateDraft}
      submitForm={handleSubmitForm}
      companyAttributes={companyAttributes}
      setDataDraft={setDataDraft}
    />
  );
}
