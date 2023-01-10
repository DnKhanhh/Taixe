import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import { t } from 'i18next';
import useTranslate from 'hooks/useTranslate';
import AppSearchAndFilter from 'components/AppSearchAndFilter';
import { SVG_NAME } from 'assets/path';
import AddressItem from 'screens/AddressScreen/components/AddressItem';
import TripItem from 'screens/MyJourney/components/TripItem';
import { COLOR, SCENE_NAMES } from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import AppModal from 'components/Modal/AppModal';
import { Formik } from 'formik';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import InputContainer from 'components/InputContainer';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import { getListProvince } from 'appRedux/actions/addressActions';
import { useActions } from 'hooks/useActions';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import ModalSearch from 'components/AppModalSearchAndFilter';
import moment from 'moment';

const TripGone = ({
  listTripGone,
  refreshing,
  onRefresh,
  onGoToDetail,
  loadMore,
  setShowModalGetOrder,
  searchAndFilterTrip,
  getDataSearchAndFilter,
  defaultSearchAndFilter,
  setSearchAndFilterTrip,
}) => {
  const { t } = useTranslate();
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [dataTripsFilerDelivered, setDataTripsFilterDelivered] = useState();

  const getDataTripsFilter = useMemo(() => {
    return setDataTripsFilterDelivered(
      listTripGone?.filter(item => item?.delivered),
    );
  }, [listTripGone]);

  const stateFilter = item => {
    return item.length > 1 ? 'Tất cả' : (
      item[0] === 'journey_assignment_wait_accept'
        ? 'Chưa nhận lệnh'
        : item[0] === 'journey_assignment_reject'
          ? 'Từ chối'
          : 'Đã nhận lệnh'
    )
  };

  useEffect(() => {
    getDataTripsFilter;
  }, [listTripGone]);

  return (
    <AppView flex={1} backgroundColor={COLOR.WHITE}>
      <AppView center>
        <TouchableOpacity
          onPress={() => setShowModalSearch(true)}
          style={{
            height: 50,
            width: '93%',
            marginTop: 10,
            borderRadius: 8,
            borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AppView marginHorizontal={10}>
            <SVG_NAME.SEARCH />
          </AppView>
          <AppText
            style={{
              color: COLOR.COLOR_TEXT_INPUT,
              ...STYLE_GLOBAL.body1,
            }}>
            Tìm kiếm
          </AppText>
        </TouchableOpacity>
      </AppView>
      <AppView>
        {(searchAndFilterTrip?.assignmentStatusId ||
          searchAndFilterTrip?.searchJourney ||
          searchAndFilterTrip?.etaDatetimeFrom ||
          searchAndFilterTrip?.etaDatetimeTo) && (
            <AppView marginHorizontal={12} marginTop={16}>
              <AppView rowAlignCenter space={'between'}>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                  }}>
                  Kết quả tìm kiếm({listTripGone?.length})
                </AppText>
                <TouchableOpacity
                  onPress={() => setSearchAndFilterTrip(defaultSearchAndFilter)}>
                  <SVG_NAME.ICON_EXIT_CIRCLE />
                </TouchableOpacity>
              </AppView>

              {searchAndFilterTrip?.searchJourney && (
                <AppView rowAlignCenter marginVertical={8}>
                  <SVG_NAME.SEARCH marginRight={5} />
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                    }}>
                    {searchAndFilterTrip?.searchJourney}
                  </AppText>
                </AppView>
              )}

              {searchAndFilterTrip?.etaDatetimeFrom &&
                searchAndFilterTrip?.etaDatetimeTo && (
                  <AppView rowAlignCenter marginBottom={8}>
                    <SVG_NAME.CALENDAR marginRight={5} />
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                      }}>
                      Từ{' '}
                      {moment(searchAndFilterTrip?.etaDatetimeFrom).format(
                        'DD-MM-YYYY',
                      )}{' '}
                      đến{' '}
                      {moment(searchAndFilterTrip?.etaDatetimeTo).format(
                        'DD-MM-YYYY',
                      )}
                    </AppText>
                  </AppView>
                )}
              {searchAndFilterTrip?.assignmentStatusId && (
                <AppView rowAlignCenter marginBottom={8}>
                  <SVG_NAME.ICON_FILTER marginHorizontal={5} />
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                    }}>
                    Trạng thái:{' '}
                    {stateFilter(searchAndFilterTrip?.assignmentStatusId[0])}
                  </AppText>
                </AppView>
              )}
            </AppView>
          )}
      </AppView>
      <AppView style={{ ...styles.lineBold, borderWidth: 1, marginTop: 0 }} />
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        style={styles.flex1}
        contentContainerStyle={
          dataTripsFilerDelivered?.[0]?.delivered &&
            dataTripsFilerDelivered?.[0]?.delivered.length > 0
            ? {}
            : styles.emptyList
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLOR.COLOR_PRIMARY]}
            tintColor={COLOR.COLOR_PRIMARY}
          />
        }
        ListHeaderComponent={() => <AppView />}
        ListEmptyComponent={() => {
          return (
            <AppText>
              {JSON.stringify(searchAndFilterTrip) ===
                JSON.stringify(defaultSearchAndFilter)
                ? t('navigate:scenes.addressScreen.emptyList')
                : t('navigate:scenes.addressScreen.emptyFilter')}
            </AppText>
          );
        }}
        data={dataTripsFilerDelivered?.[0]?.delivered}
        renderItem={({ item, index }) => (
          <TripItem
            isGoneTrip
            // onLongPress={handleShowModalOptions}
            onPress={onGoToDetail}
            item={item}
            index={index}
            onStart={() => setShowModalGetOrder(true)}
          />
        )}
      />
      <ModalSearch
        showModalSearch={showModalSearch}
        setshowModalSearch={setShowModalSearch}
        getDataSearchAndFilter={getDataSearchAndFilter}
      />
    </AppView>
  );
};
const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
});
export default TripGone;
