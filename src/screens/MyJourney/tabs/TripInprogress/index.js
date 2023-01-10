import React, {useState, useEffect, useCallback} from 'react';
import TripInprogress from './view';
import {useActions} from 'hooks/useActions';
import {
  detailsCurrentTripSubmit,
  getListTripProgress,
} from 'appRedux/actions/tripAction';
import {getDetailTripContinue} from 'appRedux/actions/tripAction';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import {getCurrentTripSelector} from 'appRedux/selectors/tripSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

const LIMIT = 1;

export default function ({setShowModalGetOrder}) {
  const [showModalFilter, setShowModalFilter] = useState(false);

  const [detailCurrentTrip, setDetailCurrentTrip] = useState(
    useSelectorShallow(getCurrentTripSelector),
  );
  console.log('detailll', detailCurrentTrip);
  const [nearestPossibleTrip, setNearestPossibleTrip] = useState(null);

  const actions = useActions({
    detailsCurrentTripSubmit,
    getListTripProgress,
    getDetailTripContinue,
  });

  const handleGoToDetail = useCallback(
    (id, isGoToRouteTab) => {
      const options = {
        callback: res => {
          NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP_INPROGRESS, {
            pageNumberInitial: isGoToRouteTab ? 1 : 0,
          });
        },
        id: id,
      };
      actions.getDetailTripContinue({...options});
    },
    [actions],
  );

  const handelGetDetailsCurrentTrip = useCallback(() => {
    const options = {
      callback: res => {
        setDetailCurrentTrip(res);
      },
    };
    actions.detailsCurrentTripSubmit({...options});
  }, [actions]);

  const getNearestPossibleTrip = useCallback(() => {
    const options = {
      callback: res => {
        setNearestPossibleTrip(res?.[0]);
      },
      queries: {
        limit: LIMIT,
        orderBy: 'journeyRouteFirst.etaDatetime',
        orderDirection: 'DESC',
      },
    };
    actions.getListTripProgress({...options});
  }, [actions]);

  useEffect(() => {
    if (detailCurrentTrip && Object.keys(detailCurrentTrip).length === 0) {
      handelGetDetailsCurrentTrip();
    }
    // if (detailCurrentTrip) {
    //   handelGetDetailsCurrentTrip();
    // }
    getNearestPossibleTrip();
  }, []);

  return (
    <TripInprogress
      handelGetDetailsCurrentTrip={handelGetDetailsCurrentTrip}
      detailCurrentTrip={detailCurrentTrip}
      nearestPossibleTrip={nearestPossibleTrip}
      onGoToDetail={handleGoToDetail}
      setShowModalFilter={setShowModalFilter}
      showModalFilter={showModalFilter}
      setShowModalGetOrder={setShowModalGetOrder}
    />
  );
}
