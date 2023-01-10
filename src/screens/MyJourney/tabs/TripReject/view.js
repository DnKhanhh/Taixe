import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import AppSearchAndFilter from 'components/AppSearchAndFilter';
import { SVG_NAME } from 'assets/path';
import TripItem from 'screens/MyJourney/components/TripItem';
import { COLOR } from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import { getListProvince } from 'appRedux/actions/addressActions';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import { deviceWidth } from 'utils/AppConst';
import AppButton from 'components/AppButton';
import AppContainer from 'components/AppContainer';
import ModalFilterAddressBook from '../../Modal/ModalFilterAddressBook';
import ModalSearch from 'components/AppModalSearchAndFilter';
import moment from 'moment';

const TripReject = ({
  listTripReject,
  refreshing,
  onRefresh,
  onGoToDetail,
  searchAndFilterTrip,
  defaultSearchAndFilter,
  getDataSearchAndFilter,
  loadMore,
  setShowModalGetOrder,
  setSearchAndFilterTrip,
}) => {
  const { t } = useTranslate();
  const [showModalSearch, setShowModalSearch] = useState(false);

  const stateFilter = item => {
    return item.length > 1 ? 'Tất cả' : (
      item[0] === 'journey_assignment_wait_accept'
        ? 'Chưa nhận lệnh'
        : item[0] === 'journey_assignment_reject'
          ? 'Từ chối'
          : 'Đã nhận lệnh'
    )
  };
  // const stateFilter = item => {
  //   return item === 'journey_assignment_wait_accept'
  //     ? 'Chưa nhận lệnh'
  //     : item === 'journey_assignment_reject'
  //     ? 'Từ chối'
  //     : 'Tất cả';
  // };
  return (
    <AppView flex={1}>
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
                  Kết quả tìm kiếm({listTripReject.length})
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
          listTripReject && listTripReject.length > 0 ? {} : styles.emptyList
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
        data={listTripReject}
        renderItem={({ item, index }) => (
          <TripItem
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
        defaultSearchAndFilter={defaultSearchAndFilter}
        getDataSearchAndFilter={getDataSearchAndFilter}

      // searchAndFilter={searchAndFilter}
      // setSearchAndFilter={setSearchAndFilter}
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
export default TripReject;
