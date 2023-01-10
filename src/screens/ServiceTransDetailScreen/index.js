import React from 'react';
import ServiceTransDetailScreen from 'screens/ServiceTransDetailScreen/view';

export default function ({route}) {
  const {dataDetailTrip} = route?.params;
  return <ServiceTransDetailScreen dataDetailTrip={dataDetailTrip} />;
}
