import React from 'react';
import NoTrip from 'screens/MyJourney/tabs/TripInprogress/components/NoTrip/view';

export default function ({nearestPossibleTrip, onGoToDetail}) {
  return (
    <NoTrip
      onGoToDetail={onGoToDetail}
      nearestPossibleTrip={nearestPossibleTrip}
    />
  );
}
