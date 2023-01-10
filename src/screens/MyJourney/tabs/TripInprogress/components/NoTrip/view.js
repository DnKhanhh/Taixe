import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import TripItem from 'screens/MyJourney/components/TripItem';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getSize} from 'utils/responsive';
const NoTrip = ({nearestPossibleTrip, onGoToDetail}) => {
  return (
    <AppView flex={1} backgroundColor={COLOR.WHITE}>
      <AppView
        justifyCenter
        alignCenter
        height={getSize.v(160)}
        backgroundColor={COLOR.WHITE}>
        <AppText style={[STYLE_GLOBAL.body1, {color: COLOR.GRAY5}]}>
          Bạn không có chuyến nào
        </AppText>
      </AppView>
      <AppView backgroundColor={COLOR.GRAY_LIGHT_5}>
        <AppText
          style={[
            STYLE_GLOBAL.body1,
            STYLE_GLOBAL.weight600,
            {paddingVertical: getSize.m(24), paddingLeft: getSize.m(16)},
          ]}>
          Chuyến tiếp theo là:
        </AppText>
      </AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TripItem
          onPress={onGoToDetail}
          onStart={() => setShowModalGetOrder(true)}
          item={nearestPossibleTrip}
          index={0}
        />
      </ScrollView>
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
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

  line: {
    marginTop: 16,
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#B5B6BA',
  },
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },

  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
});
export default NoTrip;
