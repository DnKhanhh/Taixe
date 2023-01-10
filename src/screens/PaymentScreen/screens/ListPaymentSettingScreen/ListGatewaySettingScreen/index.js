import React, {useCallback, useState, useLayoutEffect} from 'react';
import ListGateSettingScreen from './view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

//Logic
import {useActions} from 'hooks/useActions';
import {getListGatewaySettingSubmit} from 'appRedux/actions/paymentActions';

export default function ({}) {
  const actions = useActions({
    getListGatewaySettingSubmit,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [dataGatewaySetting, setDataGatewaySetting] = useState([]);

  const fetchDataGatewaySetting = useCallback(() => {
    const options = {
      callback: res => {
        setDataGatewaySetting(res.items);
      },
    };
    actions.getListGatewaySettingSubmit({...options});
  }, [actions]);

  const onPressItemGateway = useCallback(
    item => {
      NavigationServices.navigate(SCENE_NAMES.DETAIL_GATEWAY_INFO, {
        isUpdate: false,
        detailGatewayInfo: item,
      });
    },
    [actions],
  );

  useLayoutEffect(() => {
    fetchDataGatewaySetting();
    return () => {};
  }, []);

  function refreshData() {
    setRefreshing(true);
    fetchDataGatewaySetting();
  }

  return (
    <ListGateSettingScreen
      onPressItemGateway={onPressItemGateway}
      dataGatewaySetting={dataGatewaySetting}
      refreshData={refreshData}
      refreshing={refreshing}
    />
  );
}
