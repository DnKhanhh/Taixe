import React from 'react';
import {StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import TripItem from 'screens/MyJourney/components/TripItem';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import moment from 'moment';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import CalendarHandle from './CalendarHandle';

const TripSchedule = ({
  onGoToDetail,
  setShowModalGetOrder,
  setInitialDate,
  initialDate,
  listJourney,
  listScheduleJourney,
  setCurrentMonth,
  setCurrentYear,
}) => {
  const {t} = useTranslate();

  const initialDateValue = moment(initialDate, moment.ISO_8601);
  const currentDate = moment(new Date().toISOString(), moment.ISO_8601);

  const bottomSheetRef = React.useRef(null);
  const flatListRef = React.useRef(null);

  const snapPoints = React.useMemo(() => ['33%', '100%'], []);

  return (
    <>
      <CalendarHandle
        setInitialDate={setInitialDate}
        initialDate={initialDate}
        listScheduleJourney={listScheduleJourney}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />
      <BottomSheet
        style={STYLE_GLOBAL.flex1}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}>
        {listJourney?.[initialDateValue.format('YYYY-MM-DD') || '2022-01-01'] &&
          listJourney?.[initialDateValue.format('YYYY-MM-DD') || '2022-01-01']
            .length !== 0 && (
            <AppText
              style={[
                STYLE_GLOBAL.body1,
                STYLE_GLOBAL.weight700,
                styles.today,
              ]}>
              {initialDateValue.format('DD/MM/YYYY') ===
                currentDate.format('DD/MM/YYYY') &&
                t('navigate:scenes.myJourneyScreen.today')}
              {initialDateValue.format('DD/MM/YYYY')}
            </AppText>
          )}
        <BottomSheetFlatList
          ref={flatListRef}
          ListEmptyComponent={() => {
            return (
              <AppView alignCenter flex={1} paddingVertical={70}>
                <AppText
                  style={[
                    STYLE_GLOBAL.body1,
                    STYLE_GLOBAL.weight700,
                    styles.today,
                  ]}>
                  {t('common:emptyList')}
                </AppText>
              </AppView>
            );
          }}
          ListFooterComponent={() => {
            return <AppView padding={15} />;
          }}
          data={listJourney || []}
          keyExtractor={(item, index) => index + 'key'}
          renderItem={({item, index}) => (
            <TripItem
              // onPress={onGoToDetail}
              item={item}
              index={index}
              onStart={() => setShowModalGetOrder(item)}
              style={styles.item}
            />
          )}
        />
      </BottomSheet>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  flex1: {
    flex: 1,
  },
  today: {
    marginLeft: 12,
    marginVertical: 12,
  },
  item: {
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#001F3B',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
    }),
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: 12,
  },
  horizontalCalendar: {
    padding: 5,
  },
});
export default TripSchedule;
