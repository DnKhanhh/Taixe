import React, {useCallback, useState, useLayoutEffect} from 'react';
import ListBankSettingScreen from './view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

//Logic
import {useActions} from 'hooks/useActions';
import {getListBankSettingSubmit} from 'appRedux/actions/paymentActions';

export default function ({}) {
  const actions = useActions({
    getListBankSettingSubmit,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [dataBankSetting, setDataBankSetting] = useState([]);

  const fetchDataBankSetting = useCallback(() => {
    const options = {
      callback: res => {
        // console.log('resBankSetting', res);
        setDataBankSetting(res.items);
      },
    };
    actions.getListBankSettingSubmit({...options});
  }, [actions]);

  const onPressItemBank = useCallback(
    item => {
      // console.log('item bank', item);
      NavigationServices.navigate(SCENE_NAMES.DETAIL_BANK_INFO, {
        isUpdate: false,
        detailBankInfo: item,
      });
    },
    [actions],
  );

  useLayoutEffect(() => {
    fetchDataBankSetting();
    return () => {};
  }, []);

  function refreshData() {
    setRefreshing(true);
    fetchDataBankSetting();
  }

  return (
    <ListBankSettingScreen
      onPressItemBank={onPressItemBank}
      dataBankSetting={dataBankSetting}
      refreshData={refreshData}
      refreshing={refreshing}
    />
  );
}
