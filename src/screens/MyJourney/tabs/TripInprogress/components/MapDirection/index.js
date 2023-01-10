import React, {useEffect, useState} from 'react';
import MapDirection from 'screens/MyJourney/tabs/TripInprogress/components/MapDirection/view';
import {SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import {
  getCurrentTripSelector,
  getVehicleInfoSelector,
} from 'appRedux/selectors/tripSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

export default function ({route}) {
  const handleGoToDetail = () => {
    // NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP_INPROGRESS);
  };
  const [myLocation, setMyLocation] = useState({});
  const detailCurrentTrip = useSelectorShallow(getCurrentTripSelector);
  
  const lastPoint = route.params;

  return (
    <MapDirection
      onGoToDetail={handleGoToDetail}
      detailCurrentTrip={detailCurrentTrip}
      lastPoint={lastPoint}
    />
  );
}
