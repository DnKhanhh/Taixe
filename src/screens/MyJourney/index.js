import MyJourneyScreen from './view';
import React, {useCallback, useEffect} from 'react';
import {useActions} from 'hooks/useActions';
import {
  gpsTrackingVehicleSubmit,
  detailsCurrentTripSubmit,
} from 'appRedux/actions/tripAction';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getCurrentTripSelector} from 'appRedux/selectors/tripSelector';

export default function RootDrawerNavigation({}) {
  const actions = useActions({
    gpsTrackingVehicleSubmit,
    detailsCurrentTripSubmit,
  });
  const currentTrip = useSelectorShallow(getCurrentTripSelector);
  const handelGetDetailsCurrentTrip = useCallback(() => {
    const options = {
      callback: res => {
        console.log('res gps ->>>>', res);
        if (res) {
          const options = {
            callback: () => {},
            queries: {
              'vehicleIds[]': [res.journeyRoutes?.[0].vehicleId],
            },
          };

          actions.gpsTrackingVehicleSubmit({...options});
        }
        console.log('options ->>>>>', options);
      },
    };
    actions.detailsCurrentTripSubmit({...options});
  }, [actions]);

  useEffect(() => {
    if (currentTrip && Object.keys(currentTrip).length === 0) {
      handelGetDetailsCurrentTrip();
    }
  }, [currentTrip]);

  return <MyJourneyScreen />;
}
