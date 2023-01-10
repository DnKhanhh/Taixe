import React, {useCallback, useState} from 'react';
import DetailGatewayInfoScreen from './view';
import NavigationServices from 'navigation/navigationServices';

//Logic
import {useActions} from 'hooks/useActions';
import {
  createGatewaySubmit,
  deleteGatewaySubmit,
  setDefaultGatewaySubmit,
} from 'appRedux/actions/paymentActions';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

export default function ({route}) {
  const actions = useActions({
    createGatewaySubmit,
    deleteGatewaySubmit,
    setDefaultGatewaySubmit,
  });
  const {isUpdate, detailGatewayInfo} = route.params;
  const [showModalDeleteGateway, setShowModalDeleteGateway] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const user = useSelectorShallow(getUserInfoSelector);

  const onPressSubmit = useCallback(
    data => {
      const options = {
        paymentCode: !isUpdate && detailGatewayInfo.id,
        fullName: data.fullName,
        paymentNumber: data.paymentNumber,
        accountId: user?.userProfile?.id,
        isDefault: !isUpdate && isDefault, //temp for confirm with BE
      };
      actions.createGatewaySubmit({...data, ...options});
    },
    [actions],
  );

  const onPressDeleteSubmit = useCallback(
    id => {
      const options = {
        callback: () => {
          setShowModalDeleteGateway(false);
          NavigationServices.goBack();
        },
        id: id,
      };
      actions.deleteGatewaySubmit({...options});
    },
    [actions],
  );

  const onPressSetDefault = useCallback(
    id => {
      const options = {
        id: id,
      };
      actions.setDefaultGatewaySubmit({...options});
    },
    [actions],
  );

  return (
    <DetailGatewayInfoScreen
      onPressSubmit={onPressSubmit}
      isUpdate={isUpdate}
      detailGatewayInfo={detailGatewayInfo}
      setShowModalDeleteGateway={setShowModalDeleteGateway}
      showModalDeleteGateway={showModalDeleteGateway}
      onPressDeleteSubmit={onPressDeleteSubmit}
      onPressSetDefault={onPressSetDefault}
      setIsDefault={setIsDefault}
      isDefault={isDefault}
    />
  );
}
