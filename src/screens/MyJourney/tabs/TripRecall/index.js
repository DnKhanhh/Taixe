import React, {useState, useCallback, useEffect} from 'react';
import NavigationServices from 'navigation/navigationServices';
import TripRecall from './view';
import {SCENE_NAMES} from 'utils/AppConst';
import {useActions} from 'hooks/useActions';
import {
  getListTripRecall,
  getDetailTripContinue,
} from 'appRedux/actions/tripAction';
import moment from 'moment';

const LIMIT = 10;
export default function ({setShowModalGetOrder}) {
  const actions = useActions({getListTripRecall, getDetailTripContinue});

  const defaultSearchAndFilter = {
    // page: 1,
    limit: LIMIT,
    // orderBy: 'journeyRoutes.etaDatetime',
  };
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listTripRecall, setListTripRecall] = useState([]);
  const [searchAndFilterTrip, setSearchAndFilterTrip] = useState({
    ...defaultSearchAndFilter,
  });

  const getDataSearchAndFilter = useCallback(
    data => {
      console.log('abcd ee', data);
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
  const refreshData = () => {
    setRefreshing(true);
    setSearchAndFilterTrip({...defaultSearchAndFilter});
    setRefreshing(false);
  };
  const loadMore = () => {
    // setSearchAndFilterTrip({
    //   ...searchAndFilterTrip,
    //   page: Math.ceil(listTripRecall.length / LIMIT) + 1,
    // });
  };

  const handleGetListTripRecall = useCallback(() => {
    const options = {
      callback: data => {
        setListTripRecall(data);
      },
      queries: searchAndFilterTrip,
    };
    actions.getListTripRecall({...options});
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
    handleGetListTripRecall();
  }, [handleGetListTripRecall, searchAndFilterTrip]);
  return (
    <TripRecall
      listTripRecall={listTripRecall}
      onRefresh={refreshData}
      refreshing={refreshing}
      loadMore={loadMore}
      onGoToDetail={handleGoToDetail}
      setShowModalFilter={setShowModalFilter}
      showModalFilter={showModalFilter}
      setShowModalGetOrder={setShowModalGetOrder}
      searchAndFilterTrip={searchAndFilterTrip}
      getDataSearchAndFilter={getDataSearchAndFilter}
      defaultSearchAndFilter={defaultSearchAndFilter}
      setSearchAndFilterTrip={setSearchAndFilterTrip}
    />
  );
}
