import React, {useState} from 'react';
import TripInfo from './view';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

export default function ({
  route,
  isGoneTrip,
  isRejectandRecallTrip,
  dataDetailTrip,
  handleUpdateTripStatus,
  handleUpdateTripAssignmentStatus,
}) {
  const [showModalGetOrder, setShowModalGetOrder] = useState(false);
  const handleGoToDetail = () => {
    NavigationServices.navigate(SCENE_NAMES.DETAIL_SERVICE_TRANS, {
      dataDetailTrip: dataDetailTrip,
    });
  };
  return (
    <TripInfo
      isGoneTrip={isGoneTrip}
      isRejectandRecallTrip={isRejectandRecallTrip}
      dataDetailTrip={dataDetailTrip}
      onGoToDetail={handleGoToDetail}
      setShowModalGetOrder={setShowModalGetOrder}
      showModalGetOrder={showModalGetOrder}
      handleUpdateTripStatus={handleUpdateTripStatus}
      handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
    />
  );
}
