import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import ModalSearchAndFilter from 'components/AppModalSearchAndFilter';
import AppSearchAndFilter from 'components/AppSearchAndFilter';
import { SVG_NAME } from 'assets/path';
import TripItem from 'screens/MyJourney/components/TripItem';
import { COLOR } from 'utils/AppConst';
import useTranslate from 'hooks/useTranslate';
import AppModal from 'components/Modal/AppModal';
import { getListProvince } from 'appRedux/actions/addressActions';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import { deviceWidth } from 'utils/AppConst';
import AppButton from 'components/AppButton';
import moment from 'moment';
import { getSize } from 'hooks/useIconSvgResizeHOC';
const TripContinue = ({
  listTripContinue,
  refreshing,
  onRefresh,
  onGoToDetail,
  loadMore,
  searchAndFilterTrip,
  defaultSearchAndFilter,
  showModalOptions,
  setShowModalOptions,
  setShowModalFilter,
  showModalFilter,
  getDataSearchAndFilter,
  setSearchAndFilterTrip,

  handleUpdateTripAssignmentStatus,
  handleUpdateTripStatus,
}) => {
  const { t } = useTranslate();
  const { width, height } = Dimensions.get('screen');
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
  //     :item ==='journey_assignment_accepted'
  //     ? 'Đã nhận lệnh'
  //     : 'Tất cả';
  // };

  return (
    <AppView flex={1} backgroundColor={COLOR.WHITE}>
      <AppView center>
        <TouchableOpacity
          onPress={() => setShowModalSearch(true)}
          style={{
            height: getSize.v(50),
            width: '93%',
            marginTop: getSize.m(10),
            borderRadius: getSize.m(8),
            borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AppView marginHorizontal={getSize.m(10)}>
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
            <AppView marginHorizontal={getSize.m(12)} marginTop={getSize.m(16)}>
              <AppView rowAlignCenter space={'between'}>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                  }}>
                  Kết quả tìm kiếm({listTripContinue.length})
                </AppText>
                <TouchableOpacity
                  onPress={() => setSearchAndFilterTrip(defaultSearchAndFilter)}>
                  <SVG_NAME.ICON_EXIT_CIRCLE />
                </TouchableOpacity>
              </AppView>

              {searchAndFilterTrip?.searchJourney && (
                <AppView rowAlignCenter marginVertical={getSize.m(8)}>
                  <SVG_NAME.SEARCH marginRight={getSize.m(5)} />
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
                  <AppView rowAlignCenter marginBottom={getSize.m(8)}>
                    <SVG_NAME.CALENDAR marginRight={getSize.m(5)} />
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
                <AppView rowAlignCenter marginBottom={getSize.m(8)}>
                  <SVG_NAME.ICON_FILTER marginHorizontal={getSize.m(5)} />
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                    }}>
                    Trạng thái:{' '}
                    {stateFilter(searchAndFilterTrip?.assignmentStatusId)}
                  </AppText>
                </AppView>
              )}
            </AppView>
          )}
      </AppView>
      {/* <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} /> */}

      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        style={styles.flex1}
        contentContainerStyle={
          listTripContinue && listTripContinue.length > 0
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
        keyExtractor={(item, index) => 'key' + index}
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
        data={listTripContinue}
        renderItem={({ item, index }) => (
          <TripItem
            isContinueTrip
            onPress={onGoToDetail}
            item={item}
            index={index}
            handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
            handleUpdateTripStatus={handleUpdateTripStatus}
          />
        )}
      />
      <ModalSearchAndFilter
        defaultSearchAndFilter={defaultSearchAndFilter}
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
    marginTop: getSize.m(16),
    width: '100%',
    borderWidth: getSize.m(5),
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
});
export default TripContinue;
