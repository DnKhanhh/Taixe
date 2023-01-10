import React, {useState, useCallback, useEffect} from 'react';
import DetailCosts from './view';
import {useActions} from 'hooks/useActions';
import {
  getDetailCostAction,
  deleteCostAction,
  editCostAction,
} from 'appRedux/actions/tripAction';
import NavigationServices from 'navigation/navigationServices';

export default function ({route}) {
  const [dataDetailCost, setDataDetailCost] = useState();
  // console.log('dataDetail', dataDetailCost?.id);
  const {idTripGone} = route.params;
  // console.log('id gone gone', idTripGone);
  const actions = useActions({
    getDetailCostAction,
    deleteCostAction,
    editCostAction,
  });
  const {idCost} = route.params;
  const handleGetDetailCost = useCallback(() => {
    const options = {
      callback: res => {
        setDataDetailCost(res);
      },
      id: idCost,
    };
    actions.getDetailCostAction({...options});
  }, [actions]);

  const handleEditAddCostSubmit = useCallback(
    values => {
      const options = {
        callback: res => {},
        data: values,
        id: dataDetailCost?.id,
        onSuccess: () => {
          NavigationServices.goBack();
        },
      };
      actions.editCostAction({...options});
    },
    [actions, dataDetailCost?.id],
  );
  const handleDeleteAddCostSubmit = () => {
    const options = {
      callback: () => {},
      id: dataDetailCost?.id,
      onSuccess: () => {
        NavigationServices.goBack();
      },
    };
    actions.deleteCostAction({...options});
  };
  useEffect(() => {
    handleGetDetailCost();
  }, [handleGetDetailCost]);
  return (
    <DetailCosts
      idTripGone={idTripGone}
      dataDetailCost={dataDetailCost}
      handleEditAddCostSubmit={handleEditAddCostSubmit}
      handleDeleteAddCostSubmit={handleDeleteAddCostSubmit}
    />
  );
}
