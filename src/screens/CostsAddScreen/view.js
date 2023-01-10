import React from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppText from 'components/AppText';
import CostItem from 'screens/CostsAddScreen/components/CostItem/CostItem';

const CostsAddScreen = ({
  onRefuse,
  handleAddCostAction,
  listCostPending,
  listCostActive,
  loadMore,
  onRefresh,
  refreshing,
  idTripGone,
}) => {
  const {t} = useTranslate();
  const totalCosts =
    listCostPending &&
    listCostPending.length > 0 &&
    listCostPending
      ?.map(item => item.amountByDriver)
      ?.reduce((prev, next) => Number(prev) + Number(next));
  const totalCostsActive =
    listCostActive &&
    listCostActive.length > 0 &&
    listCostActive
      ?.map(item => item.amountByDriver)
      ?.reduce((prev, next) => Number(prev) + Number(next));
  // console.log('zzfff', totalCostsActive);
  return (
    <AppContainer
      title="Chi phí phát sinh"
      back={true}
      stackScreen={true}
      icon2={idTripGone ? <AppView /> : <SVG_NAME.ICON_PLUS_BLUE_BACKGROUND />}
      onPressIcon2={() => {
        handleAddCostAction();
      }}>
      <AppView style={styles.container}>
        <AppView margin={16} backgroundColor={COLOR.WHITE}>
          <AppView rowAlignCenter space={'between'}>
            <AppText
              style={{
                ...STYLE_GLOBAL.subTitle2,
                ...STYLE_GLOBAL.weight700,
                color: COLOR.TEXT_CONTENT,
                marginRight: 10,
              }}>
              Tổng phát sinh đề xuất:
            </AppText>
            <AppText
              style={{
                ...STYLE_GLOBAL.subTitle2,
                ...STYLE_GLOBAL.weight700,
                color: COLOR.POP_UP_SUCCESS,
                marginRight: 10,
              }}>
              {totalCosts ? totalCosts : 0} VND
            </AppText>
          </AppView>
          <AppView rowAlignCenter>
            <AppText
              style={{
                ...STYLE_GLOBAL.body2,
                color: COLOR.TEXT_CONTENT,
                marginRight: 4,
              }}>
              Vui lòng cập nhật trước:
            </AppText>
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                ...STYLE_GLOBAL.weight600,
                color: COLOR.POP_UP_DANGER,
                flex: 1,
              }}>
              0:30 ngày 11/7/2000
            </AppText>
          </AppView>
        </AppView>
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          style={styles.flex1}
          // style={{backgroundColor: '#D2D2D2'}}
          // contentContainerStyle={
          //   listTripContinue && listTripContinue.length > 0
          //     ? {}
          //     : styles.emptyList
          // }
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
          // ListEmptyComponent={() => {
          //   return (
          //     <AppText>
          //       {JSON.stringify(searchAndFilterTrip) ===
          //       JSON.stringify(defaultSearchAndFilter)
          //         ? t('navigate:scenes.addressScreen.emptyList')
          //         : t('navigate:scenes.addressScreen.emptyFilter')}
          //     </AppText>
          //   );
          // }}
          data={idTripGone ? listCostActive : listCostPending}
          renderItem={({item, index}) => (
            <CostItem item={item} idTripGone={idTripGone} />
          )}
        />
      </AppView>
    </AppContainer>
  );
};
const styles = StyleSheet.create({
  title: {
    ...STYLE_GLOBAL.subTitle2,
    ...STYLE_GLOBAL.weight600,
    color: COLOR.STATUS_SUCCESS_TEXT,
  },
  container: {
    flex: 1,
  },
  line: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: '#B5B6BA',
  },

  flex1: {
    flex: 1,
  },
});
export default CostsAddScreen;
