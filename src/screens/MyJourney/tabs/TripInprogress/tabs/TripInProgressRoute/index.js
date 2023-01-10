import React, {useState} from 'react';
import TripInProgressRoute from './view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getTripDetailSelector} from 'appRedux/selectors/tripDetailSelector';

export default function ({onRefuse}) {
  const [showModalGetOrder, setShowModalGetOrder] = useState(false);
  const dataCurrentTripInprogress = useSelectorShallow(getTripDetailSelector);

  // const dataDetailCurrentTripInprogress = useSelectorShallow(
  //   getCurrentTripSelector,
  // );
  // console.log('check data route', dataCurrentTripInprogress);
  const TypeInputDataTrip = dataItem => {
    NavigationServices.navigate(SCENE_NAMES.TYPE_INPUT_DATA_TRIP, {
      dataJourneyRoute: dataItem,
    });
  };
  return (
    <TripInProgressRoute
      dataDetailCurrentTripInprogress={dataCurrentTripInprogress}
      setShowModalGetOrder={setShowModalGetOrder}
      showModalGetOrder={showModalGetOrder}
      TypeInputDataTrip={TypeInputDataTrip}
    />
  );
}
