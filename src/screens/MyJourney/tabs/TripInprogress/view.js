import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import AppSearchAndFilter from 'components/AppSearchAndFilter';
import {SVG_NAME} from 'assets/path';
import TripItem from 'screens/MyJourney/components/TripItem';
import {COLOR} from 'utils/AppConst';

import STYLE_GLOBAL from 'utils/StyleGlobal';

import HaveATrip from 'screens/MyJourney/tabs/TripInprogress/components/HaveATrip';
import NoTrip from 'screens/MyJourney/tabs/TripInprogress/components/NoTrip';

const TripInprogress = ({
  detailCurrentTrip,
  nearestPossibleTrip,
  onGoToDetail,
  setShowModalFilter,
  showModalFilter,
  handelGetDetailsCurrentTrip,
  setShowModalGetOrder,
}) => {
  return (
    <>
      {detailCurrentTrip && Object.keys(detailCurrentTrip).length !== 0 ? (
        <HaveATrip
          data={detailCurrentTrip}
          onGoToDetail={onGoToDetail}
          handelGetDetailsCurrentTrip={handelGetDetailsCurrentTrip}
        />
      ) : (
        <NoTrip
          onGoToDetail={onGoToDetail}
          nearestPossibleTrip={nearestPossibleTrip}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
  },
  textUnFilter: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.COLOR_PRIMARY,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    paddingBottom: 0,
  },
  flex1: {
    flex: 1,
  },
  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
  textPlace: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '600',
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },
  detailOrder: {
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 8,
    marginTop: 16,
  },
  marginLeft: {
    marginLeft: 7,
  },
  popupTitle: {
    marginTop: 18.67,
    marginBottom: 16,
  },
});
export default TripInprogress;
