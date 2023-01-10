import React, {useCallback, useState, useEffect} from 'react';
import ReportTroubleTripScreen from 'screens/ReportTroubleTrip/view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import {useActions} from 'hooks/useActions';
import {
  reportTroubleSubmit,
  checkStatusArrivedSubmit,
  gpsTrackingVehicleSubmit,
} from 'appRedux/actions/tripAction';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getVehicleInfoSelector} from 'appRedux/selectors/tripSelector';
export default function ({route}) {
  const actions = useActions({
    reportTroubleSubmit,
    checkStatusArrivedSubmit,
    gpsTrackingVehicleSubmit,
  });
  const {dataDetailTrip} = route.params;
  const [vehicleInfo, setVehicleInfo] = useState(
    useSelectorShallow(getVehicleInfoSelector),
  );
  console.log('location --->>>>', vehicleInfo);
  const points = dataDetailTrip?.journeyRoutes.map(item => item?.orderRoute);
  const handlePostReportTroubleSubmit = useCallback(
    values => {
      const options = {
        callback: res => {},
        ...values,
        id: dataDetailTrip?.id,
        onSuccess: () => {
          NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP_INPROGRESS);
        },
      };
      actions.reportTroubleSubmit({...options});
    },
    [actions],
  );
  const getGpsTrackingVehicle = useCallback(() => {
    const options = {
      callback: res => {
        setVehicleInfo(res.dataDetailTrip?.[0]);
      },
      queries: {
        'vehicleIds[]': dataDetailTrip?.vehicleId,
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

  return (
    <ReportTroubleTripScreen
      dataDetailTrip={dataDetailTrip}
      onSubmitReportTrouble={handlePostReportTroubleSubmit}
      vehicleInfo={vehicleInfo}
      points={points}
    />
  );
}
