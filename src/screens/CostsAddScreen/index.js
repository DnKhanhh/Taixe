import React, {useCallback, useEffect, useRef, useState} from 'react';
import CostsAddScreen from 'screens/CostsAddScreen/view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import {
  getListCostPending,
  getListCostActive,
} from 'appRedux/actions/tripAction';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {
  getListCostPendingSelector,
  getListCostActiveSelector,
} from 'appRedux/selectors/tripSelector';
import {useActions} from 'hooks/useActions';
import {getTripDetailSelector} from 'appRedux/selectors/tripDetailSelector';

export default function ({route, navigation}) {
  const actions = useActions({
    getListCostPending,
    getListCostActive,
  });
  const dataCurrentTripInprogress = useSelectorShallow(getTripDetailSelector);

  const listCostPending = useSelectorShallow(getListCostPendingSelector);
  const listCostActive = useSelectorShallow(getListCostActiveSelector);
  // console.log('list active', listCostActive);
  const [refreshing, setRefreshing] = useState(false);
  const handleAddCostAction = () => {
    NavigationServices.navigate(SCENE_NAMES.ADD_COSTS_FORM_SCREEN, {
      idTripProcessing: dataCurrentTripInprogress?.id,
    });
  };
  const {idTripGone} = route.params;
  // console.log('chec kk', idTripGone);
  const loadMore = () => {
    // setSearchAndFilterTrip({
    //   ...searchAndFilterTrip,
    //   page: Math.ceil(listTripContinue.length / LIMIT) + 1,
    // });
  };
  const refreshData = () => {
    setRefreshing(true);
    // setSearchAndFilterTrip({...searchAndFilterTrip});
    setRefreshing(false);
  };
  const handleGetListCostPending = useCallback(() => {
    const options = {
      callback: () => {},
      id: idTripGone ? idTripGone : dataCurrentTripInprogress?.id,
    };
    actions.getListCostPending({...options});
  }, [actions]);
  const handleGetListCostActive = useCallback(() => {
    const options = {
      callback: () => {},
      id: idTripGone ?? idTripGone,
    };
    actions.getListCostActive({...options});
  }, [actions]);
  useEffect(() => {
    handleGetListCostPending();
    handleGetListCostActive();
  }, [handleGetListCostPending, handleGetListCostActive]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetListCostPending();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <CostsAddScreen
      handleAddCostAction={handleAddCostAction}
      loadMore={loadMore}
      listCostPending={listCostPending}
      listCostActive={listCostActive}
      refreshing={refreshing}
      onRefresh={refreshData}
      idTripGone={idTripGone}
    />
  );
}
