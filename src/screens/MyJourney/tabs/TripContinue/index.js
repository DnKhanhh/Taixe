import React, { useEffect, useState, useCallback } from 'react';
import NavigationServices from 'navigation/navigationServices';
import TripContinue from './view';
import { SCENE_NAMES } from 'utils/AppConst';
import { useActions } from 'hooks/useActions';
import {
  getListTripContinue,
  getDetailTripContinue,
  updateTripContinueAssignmentStatus,
  updateTripContinueStatus,
} from 'appRedux/actions/tripAction';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import { getTripSelector } from 'appRedux/selectors/tripSelector';

import moment from 'moment';

const LIMIT = 10;

export default function ({ navigation, setTabSelected }) {
  const actions = useActions({
    getListTripContinue,
    getDetailTripContinue,
    updateTripContinueAssignmentStatus,
    updateTripContinueStatus,
  });

  const listTrip = useSelectorShallow(getTripSelector);

  const defaultSearchAndFilter = {
    page: 1,
    limit: 10,
    // orderDirection: 'DESC',
    // orderBy: 'journeyRoutes.etaDatetime',
  };
  const [refreshing, setRefreshing] = useState(false);
  const [listTripContinue, setListTripContinue] = useState([]);
  const [searchAndFilterTrip, setSearchAndFilterTrip] = useState({
    ...defaultSearchAndFilter,
  });

  // console.log('DATA Search', searchAndFilterTrip);
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

  const refreshData = () => {
    setRefreshing(true);
    setSearchAndFilterTrip({ ...searchAndFilterTrip });
    setRefreshing(false);
  };

  const handleGoToDetail = useCallback(
    id => {
      const options = {
        callback: () => {
          NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP, {
            setTabSelected,
          });
        },
        id: id,
      };
      actions.getDetailTripContinue({ ...options });
    },
    [actions],
  );

  const loadMore = () => {
    // setSearchAndFilterTrip({
    //   ...searchAndFilterTrip,
    //   page: Math.ceil(listTripContinue.length / LIMIT) + 1,
    // });
  };
  const handleGetListTripContinue = useCallback(() => {
    const options = {
      callback: data => {
        // setListTripContinue(data);
      },
      queries: searchAndFilterTrip,
    };
    actions.getListTripContinue({ ...options });
  }, [actions, searchAndFilterTrip]);

  useEffect(() => {
    handleGetListTripContinue();
  }, [handleGetListTripContinue, searchAndFilterTrip]);

  const handleUpdateTripContinueAssignmentStatus = useCallback(
    value => {
      const options = {
        callback: data => {
          // console.log('dadada', data);
          // setListTripContinue(data);
        },
        id: value,
        data: { assignmentStatusId: 'journey_assignment_accepted' },
      };
      actions.updateTripContinueAssignmentStatus({ ...options });
    },
    [actions],
  );

  const handleUpdateTripContinueStatus = useCallback(
    value => {
      const options = {
        callback: () => {
          setTabSelected(1);
        },
        id: value,
        data: { statusId: 'journey_transporting' },
      };
      actions.updateTripContinueStatus({ ...options });
    },
    [actions],
  );

  console.log('item data', listTrip);
  return (
    <TripContinue
      listTripContinue={listTrip}
      onGoToDetail={handleGoToDetail}
      onRefresh={refreshData}
      loadMore={loadMore}
      refreshing={refreshing}
      defaultSearchAndFilter={defaultSearchAndFilter}
      searchAndFilterTrip={searchAndFilterTrip}
      getDataSearchAndFilter={getDataSearchAndFilter}
      setSearchAndFilterTrip={setSearchAndFilterTrip}
      handleUpdateTripAssignmentStatus={
        handleUpdateTripContinueAssignmentStatus
      }
      handleUpdateTripStatus={handleUpdateTripContinueStatus}
    />
  );
}
