import React, {useCallback, useEffect, useRef, useState} from 'react';
import TripDetailScreen from 'screens/TripDetailScreen/view';
import {
  updateTripContinueAssignmentStatus,
  updateTripContinueStatus,
} from 'appRedux/actions/tripAction';
import {useActions} from 'hooks/useActions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getTripDetailSelector} from 'appRedux/selectors/tripDetailSelector';
import {getTripSelector} from 'appRedux/selectors/tripSelector';
import NavigationServices from 'navigation/navigationServices';

export default function ({route}) {
  const actions = useActions({
    updateTripContinueAssignmentStatus,
    updateTripContinueStatus,
  });
  const dataDetailTrip = useSelectorShallow(getTripDetailSelector);

  // const {isGoneTrip} = route?.params;
  // console.log('isGone', route?.params?.isGoneTrip);
  // console.log('sel', setTabSelected);

  const handleUpdateTripContinueAssignmentStatus = useCallback(
    (value, assignmentStatusId, reason) => {
      if (!reason) {
        const options = {
          callback: data => {},
          id: value,
          data: {assignmentStatusId: assignmentStatusId},
        };
        actions.updateTripContinueAssignmentStatus({...options});
      } else {
        const options = {
          callback: () => {},
          id: value,
          data: {
            assignmentStatusId: assignmentStatusId,
            transporterErrorNote: reason,
          },
        };
        actions.updateTripContinueAssignmentStatus({...options});
      }
    },
    [actions],
  );

  const handleUpdateTripContinueStatus = useCallback(
    value => {
      const options = {
        callback: () => {
          NavigationServices.goBack();
          route?.params?.setTabSelected(1);
        },
        id: value,
        data: {statusId: 'journey_transporting'},
      };
      actions.updateTripContinueStatus({...options});
    },
    [actions],
  );

  return (
    <TripDetailScreen
      isGoneTrip={route?.params?.isGoneTrip}
      isRejectandRecallTrip={route?.params?.isRejectandRecallTrip}
      dataDetailTrip={dataDetailTrip}
      handleUpdateTripStatus={handleUpdateTripContinueStatus}
      handleUpdateTripAssignmentStatus={
        handleUpdateTripContinueAssignmentStatus
      }
    />
  );
}
