import React, {useState, useCallback, useEffect} from 'react';
import NavigationServices from 'navigation/navigationServices';
import TripReject from './view';
import {SCENE_NAMES} from 'utils/AppConst';
import {useActions} from 'hooks/useActions';
import {
  getListTripReject,
  getDetailTripContinue,
} from 'appRedux/actions/tripAction';
import moment from 'moment';

const LIMIT = 10;
export default function ({setShowModalGetOrder}) {
  const actions = useActions({getListTripReject, getDetailTripContinue});

  const defaultSearchAndFilter = {
    limit: LIMIT,
  };
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listTripReject, setListTripReject] = useState([]);
  const [searchAndFilterTrip, setSearchAndFilterTrip] = useState({
    ...defaultSearchAndFilter,
  });
  const refreshData = () => {
    setRefreshing(true);
    setSearchAndFilterTrip({...defaultSearchAndFilter});
    setRefreshing(false);
  };
  const loadMore = () => {
    // setSearchAndFilterTrip({
    //   ...searchAndFilterTrip,
    //   page: Math.ceil(listTripReject.length / LIMIT) + 1,
    // });
  };

  const getDataSearchAndFilter = useCallback(
    data => {
      console.log('abcd e', data);
      setSearchAndFilterTrip({
        ...searchAndFilterTrip,
        searchJourney: data?.keyWordSearch,
        etaDatetimeFrom: data?.startDate
          ? moment.utc(data?.startDate).toDate()
          : undefined,
        etaDatetimeTo: data?.endDate
          ? moment.utc(data?.endDate).toDate()
          : undefined,
        assignmentStatusId: data?.assignmentStatusId,
        searchJourneyBy: [
          'journey.id',
          'order.routeName',
          'vehicle.numberPlate',
        ],
      });
    },
    [searchAndFilterTrip],
  );

  const handleGetListTripReject = useCallback(() => {
    const options = {
      callback: data => {
        setListTripReject(data);
      },
      queries: searchAndFilterTrip,
    };
    actions.getListTripReject({...options});
  }, [actions, searchAndFilterTrip]);

  const handleGoToDetail = useCallback(
    id => {
      const options = {
        callback: () => {
          NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP, {
            isRejectandRecallTrip: true,
          });
        },
        id: id,
      };
      actions.getDetailTripContinue({...options});
    },
    [actions],
  );
  useEffect(() => {
    handleGetListTripReject();
  }, [handleGetListTripReject, searchAndFilterTrip]);

  return (
    <TripReject
      listTripReject={listTripReject}
      onGoToDetail={handleGoToDetail}
      setShowModalFilter={setShowModalFilter}
      showModalFilter={showModalFilter}
      setShowModalGetOrder={setShowModalGetOrder}
      loadMore={loadMore}
      refreshData={refreshData}
      refreshing={refreshing}
      searchAndFilterTrip={searchAndFilterTrip}
      defaultSearchAndFilter={defaultSearchAndFilter}
      getDataSearchAndFilter={getDataSearchAndFilter}
      setSearchAndFilterTrip={setSearchAndFilterTrip}
    />
  );
}
