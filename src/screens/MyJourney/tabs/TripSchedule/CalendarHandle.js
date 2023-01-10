import React from 'react';
import useTranslate from 'hooks/useTranslate';
import {COLOR} from 'utils/AppConst';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {View, Text, StyleSheet} from 'react-native';

const CalendarHandle = ({
  initialDate,
  setInitialDate,
  listScheduleJourney,
  setCurrentMonth,
  setCurrentYear,
}) => {
  const {t} = useTranslate();
  const currentDate = new Date();
  LocaleConfig.locales['defaultLocale'] = {
    monthNames: [
      t('common:localeConfig.monthNames_1'),
      t('common:localeConfig.monthNames_2'),
      t('common:localeConfig.monthNames_3'),
      t('common:localeConfig.monthNames_4'),
      t('common:localeConfig.monthNames_5'),
      t('common:localeConfig.monthNames_6'),
      t('common:localeConfig.monthNames_7'),
      t('common:localeConfig.monthNames_8'),
      t('common:localeConfig.monthNames_9'),
      t('common:localeConfig.monthNames_10'),
      t('common:localeConfig.monthNames_11'),
      t('common:localeConfig.monthNames_12'),
    ],
    monthNamesShort: [
      t('common:localeConfig.monthNamesShort_1'),
      t('common:localeConfig.monthNamesShort_2'),
      t('common:localeConfig.monthNamesShort_3'),
      t('common:localeConfig.monthNamesShort_4'),
      t('common:localeConfig.monthNamesShort_5'),
      t('common:localeConfig.monthNamesShort_6'),
      t('common:localeConfig.monthNamesShort_7'),
      t('common:localeConfig.monthNamesShort_8'),
      t('common:localeConfig.monthNamesShort_9'),
      t('common:localeConfig.monthNamesShort_10'),
      t('common:localeConfig.monthNamesShort_11'),
      t('common:localeConfig.monthNamesShort_12'),
    ],
    dayNames: [
      t('common:localeConfig.dayNames_2'),
      t('common:localeConfig.dayNames_3'),
      t('common:localeConfig.dayNames_4'),
      t('common:localeConfig.dayNames_5'),
      t('common:localeConfig.dayNames_6'),
      t('common:localeConfig.dayNames_7'),
      t('common:localeConfig.dayNames_8'),
    ],
    dayNamesShort: [
      t('common:localeConfig.dayNamesShort_2'),
      t('common:localeConfig.dayNamesShort_3'),
      t('common:localeConfig.dayNamesShort_4'),
      t('common:localeConfig.dayNamesShort_5'),
      t('common:localeConfig.dayNamesShort_6'),
      t('common:localeConfig.dayNamesShort_7'),
      t('common:localeConfig.dayNamesShort_8'),
    ],
    today: t('common:scenes.localeConfig.today'),
  };

  LocaleConfig.defaultLocale = 'defaultLocale';

  const initialDateValue = moment(initialDate, moment.ISO_8601);

  const statusType = {
    journey_assignment_accepted: {
      key: 'journey_assignment_accepted',
      color: COLOR.GREEN_5,
    },
    journey_assignment_wait_accept: {
      key: 'journey_assignment_wait_accept',
      color: COLOR.ORANGE,
    },
    journey_assignment_reject: {
      key: 'journey_assignment_reject',
      color: COLOR.RED_1,
    },
    journey_route_processing: {
      key: 'journey_route_processing',
      color: COLOR.BLUE_8,
    },
    journey_route_done: {
      key: 'journey_route_done',
      color: COLOR.GRAY_10,
    },
    journey_route_not_done_yet: {
      key: 'journey_route_not_done_yet',
      color: COLOR.YELLOW_1,
    },
  };

  const handleStatusType = React.useCallback(arr => {
    const newArr = arr?.map(item => item?.journey_assignment_status_id);
    const newObject = {
      dots: [],
    };
    if (newArr?.includes('journey_assignment_accepted')) {
      newObject.dots.push(statusType.journey_assignment_accepted);
    }
    if (newArr?.includes('journey_assignment_wait_accept')) {
      newObject.dots.push(statusType.journey_assignment_wait_accept);
    }
    if (newArr?.includes('journey_assignment_reject')) {
      newObject.dots.push(statusType.journey_assignment_reject);
    }
    if (newArr?.includes('journey_route_processing')) {
      newObject.dots.push(statusType.journey_route_processing);
    }
    if (newArr?.includes('journey_route_done')) {
      newObject.dots.push(statusType.journey_route_done);
    }
    if (newArr?.includes('journey_route_not_done_yet')) {
      newObject.dots.push(statusType.journey_route_not_done_yet);
    }
    return newObject || {};
  }, []);

  const generateScheduleOfTripsInMonth = React.useMemo(() => {
    let temp = Object.fromEntries(
      Object.entries(listScheduleJourney || {}).map(([key, value]) => [
        `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${key}`,
        handleStatusType(value),
      ]),
    );
    return temp;
  }, [listScheduleJourney]);

  return (
    <Calendar
      markingType={'multi-dot'}
      initialDate={initialDateValue.format('YYYY-MM-DD')}
      onDayPress={day => {
        setInitialDate(new Date(day.dateString).toISOString());
      }}
      firstDay={1}
      enableSwipeMonths
      onMonthChange={month => {
        setCurrentMonth(month.month);
        setCurrentYear(month.year);
      }}
      minDate={moment().format('YYYY-MM-DD')}
      theme={{
        selectedDayTextColor: COLOR.TEXT_CONTENT,
        todayTextColor: COLOR.TEXT_CONTENT,

        arrowColor: COLOR.GRAY_11,
      }}
      markedDates={generateScheduleOfTripsInMonth}
    />
  );
};

export default CalendarHandle;

const styles = StyleSheet.create({});
