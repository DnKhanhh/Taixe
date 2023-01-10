import React, {useCallback, useState} from 'react';
import DetailBankInfoScreen from './view';
import NavigationServices from 'navigation/navigationServices';

//Logic
import {useActions} from 'hooks/useActions';
import {
  createBankSubmit,
  deleteBankSubmit,
  setDefaultBankSubmit,
  getDetailBankInfoSubmit,
} from 'appRedux/actions/paymentActions';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

export default function ({route}) {
  const actions = useActions({
    createBankSubmit,
    deleteBankSubmit,
    setDefaultBankSubmit,
    getDetailBankInfoSubmit,
  });
  const {isUpdate, detailBankInfo} = route.params;
  const [showModalDeleteBank, setShowModalDeleteBank] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const user = useSelectorShallow(getUserInfoSelector);

  const onPressSubmit = useCallback(
    data => {
      const options = {
        bankCode: !isUpdate && detailBankInfo.id,
        fullName: data.fullName,
        bankNumber: data.bankNumber,
        branchName: data.branchName || '',
        accountId: user?.userProfile?.id,
        isDefault: !isUpdate && isDefault, //temp for confirm with BE
      };
      actions.createBankSubmit({...data, ...options});
    },
    [actions],
  );

  const onPressDeleteSubmit = useCallback(
    id => {
      const options = {
        callback: () => {
          setShowModalDeleteBank(false);
          NavigationServices.goBack();
        },
        id: id,
      };
      actions.deleteBankSubmit({...options});
    },
    [actions],
  );

  const onPressSetDefault = useCallback(
    id => {
      const options = {
        id: id,
      };
      actions.setDefaultBankSubmit({...options});
    },
    [actions],
  );

  return (
    <DetailBankInfoScreen
      onPressSubmit={onPressSubmit}
      isUpdate={isUpdate}
      detailBankInfo={detailBankInfo}
      setShowModalDeleteBank={setShowModalDeleteBank}
      showModalDeleteBank={showModalDeleteBank}
      onPressDeleteSubmit={onPressDeleteSubmit}
      onPressSetDefault={onPressSetDefault}
      setIsDefault={setIsDefault}
      isDefault={isDefault}
    />
  );
}
