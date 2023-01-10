import React from 'react';
import TripInProgressDetailScreen from 'screens/TripInProgressDetail/view';

export default function ({route}) {
  const {pageNumberInitial} = route?.params;

  return <TripInProgressDetailScreen pageNumberInitial={pageNumberInitial} />;
}
