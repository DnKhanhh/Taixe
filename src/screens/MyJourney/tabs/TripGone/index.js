import React, {useState, useCallback, useEffect} from 'react';
import TripGone from './view';
import {useActions} from 'hooks/useActions';
import {
  getListTripGone,
  getDetailTripContinue,
} from 'appRedux/actions/tripAction';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getTripSelector} from 'appRedux/selectors/tripSelector';
import moment from 'moment';

const LIMIT = 10;

export default function ({setShowModalGetOrder}) {
  const actions = useActions({
    getListTripGone,
    getDetailTripContinue,
  });
  const defaultSearchAndFilter = {
    limit: LIMIT,
    page: 0,
    lang: 'en',
    orderDirection: 'DESC',
    '': '&searchJourneyBy=journey.id&searchJourneyBy=order.routeName&searchJourneyBy=vehicle.numberPlate',
  };
  // const listTrip = useSelectorShallow(getTripSelector);
  const [refreshing, setRefreshing] = useState(false);
  const [listTripGone, setListTripGone] = useState([]);
  const [searchAndFilterTrip, setSearchAndFilterTrip] = useState({
    ...defaultSearchAndFilter,
  });

  const refreshData = () => {
    setRefreshing(true);
    setSearchAndFilterTrip({...searchAndFilterTrip});
    setRefreshing(false);
  };

  const loadMore = () => {
    setSearchAndFilterTrip({
      ...searchAndFilterTrip,
      page: Math.ceil(listTripGone.length / LIMIT) + 1,
    });
  };
  const handleGetListTrip = useCallback(() => {
    const options = {
      callback: data => {
        setListTripGone(data);
      },
      queriesJourney: searchAndFilterTrip,
    };
    actions.getListTripGone({...options});
  }, [actions, searchAndFilterTrip]);

  const getDataSearchAndFilter = useCallback(
    data => {
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

  useEffect(() => {
    handleGetListTrip();
  }, [handleGetListTrip, searchAndFilterTrip]);

  const handleGoToDetail = useCallback(
    id => {
      const options = {
        callback: () => {
          NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP, {
            isGoneTrip: true,
          });
        },
        id: id,
      };
      actions.getDetailTripContinue({...options});
    },
    [actions],
  );

  // console.log('list gone', listTripGone.length);
  return (
    <TripGone
      listTripGone={listTripGone}
      onGoToDetail={handleGoToDetail}
      loadMore={loadMore}
      refreshing={refreshing}
      onRefresh={refreshData}
      setShowModalGetOrder={setShowModalGetOrder}
      defaultSearchAndFilter={defaultSearchAndFilter}
      searchAndFilterTrip={searchAndFilterTrip}
      setSearchAndFilterTrip={setSearchAndFilterTrip}
      getDataSearchAndFilter={getDataSearchAndFilter}
    />
  );
}
