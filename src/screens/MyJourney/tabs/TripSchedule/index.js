import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import NavigationServices from 'navigation/navigationServices';
import TripSchedule from './view';
import {SCENE_NAMES} from 'utils/AppConst';
import {
  getListTrip,
  getListScheduleJourney,
  scheduleJourneyOfMonthSubmit,
  scheduleJourneyOfDaySubmit,
} from 'appRedux/actions/tripAction';
// import {getListTripContinue} from 'appRedux/actions/tripAction';
import {useActions} from 'hooks/useActions';
export default function ({setShowModalGetOrder}) {
  var currentDate = new Date();

  var firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).toISOString();

  var lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).toISOString();

  const [initialDate, setInitialDate] = useState(new Date().toISOString());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const [listJourney, setListJourney] = useState([]);
  const [listScheduleJourney, setListScheduleJourney] = useState([]);
  const [currentScheduleJourney, setCurrentScheduleJourney] = useState([]);

  const actions = useActions({
    getListTrip,
    getListScheduleJourney,
    scheduleJourneyOfMonthSubmit,
    scheduleJourneyOfDaySubmit,
  });

  const handleGoToDetail = () => {
    NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP);
  };

  const [listTripContinue, setListTripContinue] = useState([]);

  // const handleGoToDetail = useCallback(
  //   id => {
  //     const options = {
  //       callback: res => {
  //         NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP, {
  //           dataDetailTrip: res,
  //         });
  //       },
  //       id: id,
  //     };
  //     actions.getDetailTrip({...options});
  //   },
  //   [actions],
  // );

  // const handleGetScheduleOfTrips = useCallback(
  //   value => {
  //     const options = {
  //       callback: res => {
  //         setListTripContinue(res);
  //       },
  //       queries: {
  //         etaDatetimeFrom: value,
  //       },
  //     };
  //     actions.getListTrip({...options});
  //   },
  //   [actions],
  // );

  const handleGetScheduleOfTrips = useCallback(
    value => {
      const options = {
        callback: res => {
          setListTripContinue(res);
        },
        queries: {
          etaDatetimeFrom: value,
        },
      };
      actions.getListTripContinue({...options});
    },
    [actions],
  );

  const handleGetScheduleOfTripsInMonth = useCallback(() => {
    const options = {
      callback: res => {
        setListScheduleJourney(res);
      },
      year: currentYear,
      month: currentMonth,
    };

    actions.scheduleJourneyOfMonthSubmit({...options});
  }, [actions, currentMonth, currentYear]);

  const handleGetScheduleOfTripsInDay = useCallback(
    date => {
      const options = {
        callback: res => {
          setListJourney(res);
        },
        date: date,
      };
      actions.scheduleJourneyOfDaySubmit({...options});
    },
    [actions],
  );

  // useEffect(() => {
  //   handleGetScheduleOfTrips(initialDate);
  // }, [initialDate]);

  // const handelGetCurrentScheduleJourney = ()=>{
  //   listScheduleJourney.filter((item)=>

  //     )
  // }
  useEffect(() => {
    const initialDateValue = moment(initialDate, moment.ISO_8601).format(
      'YYYY-MM-DD',
    );
    handleGetScheduleOfTripsInDay(initialDateValue);
  }, [initialDate]);

  useEffect(() => {
    handleGetScheduleOfTripsInMonth();
    return () => {};
  }, [currentMonth]);

  return (
    <TripSchedule
      listScheduleJourney={listScheduleJourney}
      onGoToDetail={handleGoToDetail}
      setShowModalGetOrder={setShowModalGetOrder}
      setInitialDate={setInitialDate}
      initialDate={initialDate}
      currentScheduleJourney={currentScheduleJourney}
      listJourney={listJourney}
      //
      setCurrentMonth={setCurrentMonth}
      setCurrentYear={setCurrentYear}
    />
  );
}
