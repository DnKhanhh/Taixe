import React, {useCallback, useEffect, useState} from 'react';
import HaveATrip from 'screens/MyJourney/tabs/TripInprogress/components/HaveATrip/view';
import {useActions} from 'hooks/useActions';
import {
  gpsTrackingVehicleSubmit,
  checkStatusArrivedSubmit,
} from 'appRedux/actions/tripAction';
import {getVehicleInfoSelector} from 'appRedux/selectors/tripSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

export default function ({data, onGoToDetail, handelGetDetailsCurrentTrip}) {
  const [vehicleInfo, setVehicleInfo] = useState(
    useSelectorShallow(getVehicleInfoSelector),
  );

  const actions = useActions({
    gpsTrackingVehicleSubmit,
    checkStatusArrivedSubmit,
  });
  // console.log('dadada', data.journeyRoutes.length);
  const points = data?.journeyRoutes?.map(item => item.orderRoute);
  // console.log('point..', points.length);
  const getGpsTrackingVehicle = useCallback(() => {
    const options = {
      callback: res => {
        setVehicleInfo(res.data?.[0]);
      },
      queries: {
        'vehicleIds[]': [data.vehicleId],
      },
    };
    actions.gpsTrackingVehicleSubmit({...options});
  }, [actions]);

  useEffect(() => {
    const interval = setInterval(() => {
      getGpsTrackingVehicle();
    }, 80000);
    return () => clearInterval(interval);
  }, []);

  const checkStatusArrived = useCallback(
    (id, status, callBackStatus) => {
      const options = {
        callback: res => {
          // console.log('checkStatusArrived res', res);
          if (
            res?.message ===
            'The vehicle has not yet reached the specified pick up point!'
          ) {
            callBackStatus('err');
          } else {
            // console.log('checkStatusArrived res', res);
            callBackStatus();
          }
        },
        id,
        data: {statusDriver: status},
      };
      actions.checkStatusArrivedSubmit({...options});
    },
    [actions],
  );

  return (
    <HaveATrip
      handelGetDetailsCurrentTrip={handelGetDetailsCurrentTrip}
      vehicleInfo={vehicleInfo}
      points={points}
      data={data}
      onGoToDetail={onGoToDetail}
      checkStatusArrived={checkStatusArrived}
    />
  );
}
