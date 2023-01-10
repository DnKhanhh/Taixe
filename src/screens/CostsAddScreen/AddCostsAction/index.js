import React, {useCallback, useEffect, useRef, useState} from 'react';
import AddCostsAction from 'screens/CostsAddScreen/AddCostsAction/view';
import {useActions} from 'hooks/useActions';
import {addCostAction} from 'appRedux/actions/tripAction';
import NavigationServices from 'navigation/navigationServices';

export default function ({route}) {
  const actions = useActions({
    addCostAction,
  });
  const {idTripProcessing} = route.params;
  const handlePostAddCostSubmit = useCallback(
    values => {
      const options = {
        callback: res => {},
        data: values,
        // id: idTripProcessing,
        onSuccess: () => {
          NavigationServices.goBack();
        },
      };
      actions.addCostAction({...options});
    },
    [actions],
  );
  return (
    <AddCostsAction
      idTripProcessing={idTripProcessing}
      handlePostAddCostSubmit={handlePostAddCostSubmit}
    />
  );
}
