import React, {useState} from 'react';
import TripRoute from './view';

export default function ({
  dataDetailTrip,
  handleUpdateTripStatus,
  handleUpdateTripAssignmentStatus,
  isGoneTrip,
  isRejectandRecallTrip,
}) {
  const [showModalGetOrder, setShowModalGetOrder] = useState(false);

  return (
    <TripRoute
      isRejectandRecallTrip={isRejectandRecallTrip}
      isGoneTrip={isGoneTrip}
      dataDetailTrip={dataDetailTrip}
      setShowModalGetOrder={setShowModalGetOrder}
      showModalGetOrder={showModalGetOrder}
      handleUpdateTripStatus={handleUpdateTripStatus}
      handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
    />
  );
}
