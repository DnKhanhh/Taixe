import React, {useState, useCallback, useLayoutEffect} from 'react';
import PaymentScreen from './view';
import {SCENE_NAMES} from 'utils/AppConst';

//Logic
import {useActions} from 'hooks/useActions';
import {
  getListBankSubmit,
  getDetailBankInfoSubmit,
  getListGatewaySubmit,
  getDetailGatewayInfoSubmit,
} from 'appRedux/actions/paymentActions';
import NavigationServices from 'navigation/navigationServices';
import {useIsFocused} from '@react-navigation/native';

const LIMIT = 10;

export default function () {
  const actions = useActions({
    getListBankSubmit,
    getDetailBankInfoSubmit,
    getListGatewaySubmit,
    getDetailGatewayInfoSubmit,
  });
  const [dataBank, setDataBank] = useState([]);
  const [dataGateway, setDataGateway] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const fetchDataBank = useCallback(
    (page = 1) => {
      const options = {
        callback: res => {
          // console.log('res getListBank', res);
          setRefreshing(false);
          if (page <= 1) {
            setDataBank(res.items);
          } else {
            setDataBank(old => [...old, ...(res.items || [])]);
          }
        },
        limit: LIMIT,
        page,
      };
      actions.getListBankSubmit({...options});
    },
    [actions],
  );

  const fetchDataGateway = useCallback(() => {
    const options = {
      callback: res => {
        // console.log('res getListGateway', res);
        setRefreshing(false);
        setDataGateway(res.items);
      },
    };
    actions.getListGatewaySubmit({...options});
  }, [actions]);

  function loadMore() {
    fetchDataBank(Math.ceil(dataBank.length / LIMIT) + 1);
  }

  function refreshData() {
    setRefreshing(true);
    fetchDataBank();
    fetchDataGateway();
  }

  const onPressItemBank = useCallback(
    item => {
      const options = {
        id: item.id,
      };
      actions.getDetailBankInfoSubmit({...options});
    },
    [actions],
  );

  const onPressItemGateway = useCallback(
    item => {
      const options = {
        id: item.id,
      };
      actions.getDetailGatewayInfoSubmit({...options});
    },
    [actions],
  );

  const onPressAddPayment = () => {
    NavigationServices.navigate(SCENE_NAMES.LIST_PAYMENT_SETTING);
  };

  useLayoutEffect(() => {
    isFocused && fetchDataBank();
    isFocused && fetchDataGateway();
  }, [isFocused]);

  return (
    <PaymentScreen
      dataBank={dataBank}
      dataGateway={dataGateway}
      refreshing={refreshing}
      refreshData={refreshData}
      onPressItemBank={onPressItemBank}
      onPressAddPayment={onPressAddPayment}
      onPressItemGateway={onPressItemGateway}
      loadMore={loadMore}
    />
  );
}
