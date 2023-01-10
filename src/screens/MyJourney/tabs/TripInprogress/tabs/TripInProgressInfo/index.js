import React, {useState} from 'react';
import TripInProgressInfo from './view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {
  // getCurrentTripSelector,
  getTripDetailSelector,
} from 'appRedux/selectors/tripDetailSelector';
export default function () {
  // const [showModalGetOrder, setShowModalGetOrder] = useState(false);
  const dataCurrentTripInprogress = useSelectorShallow(getTripDetailSelector);
  const handleGoToDetail = () => {
    NavigationServices.navigate(SCENE_NAMES.COSTS_ADD, {
      // idTripProcessing: dataCurrentTripInprogress.id,
    });
  };
  return (
    <TripInProgressInfo
      onGoToDetail={handleGoToDetail}
      dataCurrentTripInprogress={dataCurrentTripInprogress}
      // setShowModalGetOrder={setShowModalGetOrder}
      // showModalGetOrder={showModalGetOrder}
    />
  );
}
