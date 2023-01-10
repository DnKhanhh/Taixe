import React, {useState, useCallback} from 'react';
import TypeInputDataTrip from 'screens/MyJourney/tabs/TripInprogress/components/TypeInputDataTrip/view';
import {useActions} from 'hooks/useActions';
import {typeInputData} from 'appRedux/actions/tripAction';
import NavigationServices from 'navigation/navigationServices';

export default function ({route}) {
  const actions = useActions({
    typeInputData,
  });

  const {dataJourneyRoute} = route.params;

  const handleConfirmTypeInputData = formData => {
    const options = {
      callback: () => {
        NavigationServices.goBack();
      },
      id: dataJourneyRoute?.id,
      data: formData,
    };
    actions.typeInputData({...options});
  };

  return (
    <TypeInputDataTrip
      dataJourneyRoute={dataJourneyRoute}
      handleConfirmTypeInputData={handleConfirmTypeInputData}
    />
  );
}
