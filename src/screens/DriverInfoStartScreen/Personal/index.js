import React, {useCallback, useEffect, useState} from 'react';
import {PersonalView} from './view';

//utils
import {ACCOUNT_STATUS} from 'utils/AppConst';

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

  const [attributes, setAttributes] = useState([]);
  const [dataDraft, setDataDraft] = useState([]);
  const [sameAddress, setSameAddress] = useState(false);

  const getAttributes = useCallback(() => {
    const options = {
      callback: res => {
        setAttributes(res.required);
      },
      accountType: user?.userProfile?.accountType,
      profileType: user?.userProfile?.profileType,
    };
    actions.getUserProfileSettingSubmit({...options});
  }, [actions]);

  const handleSubmitForm = useCallback(
    values => {
      if (sameAddress) {
        values.contactCityId = values.permanentAddressCityId;
        values.contactCityName = values.permanentAddressCityName;
        values.contactDistrictId = values.permanentAddressDistrictId;
        values.contactDistrictName = values.permanentAddressDistrictName;
        values.contactAddress = values.permanentAddress;
      }
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
    [actions, sameAddress],
  );

  const handleUpdateDraft = useCallback(() => {
    if (dataDraft.length !== 0) {
      let form = {...dataDraft};
      for (let key in form) {
        if (!form[key]) {
          form[key] = null;
        }
      }
      const options = {
        ...form,
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
    getAttributes();
    return () => {};
  }, []);

  return (
    <PersonalView
      listProvince={listProvince}
      updateDraft={handleUpdateDraft}
      submitForm={handleSubmitForm}
      attributes={attributes}
      setDataDraft={setDataDraft}
      sameAddress={sameAddress}
      setSameAddress={setSameAddress}
    />
  );
}
