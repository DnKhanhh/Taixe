import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import TransGoodScreen from 'screens/ServiceTransDetailScreen/components/TransGoods';
import TransContainerScreen from 'screens/ServiceTransDetailScreen/components/TransContainer';
import TransRoMoocScreen from 'screens/ServiceTransDetailScreen/components/TransRomooc';

const ServiceTransDetailScreen = ({dataDetailTrip}) => {
  const {t} = useTranslate();
  return dataDetailTrip?.vehicleGoods ? (
    <TransGoodScreen dataDetailTrip={dataDetailTrip} />
  ) : dataDetailTrip?.romoocId ? (
    <TransRoMoocScreen dataDetailTrip={dataDetailTrip} />
  ) : dataDetailTrip?.containerId ? (
    <TransContainerScreen dataDetailTrip={dataDetailTrip} />
  ) : (
    <TransGoodScreen />
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
    marginBottom: 15,
  },
});
export default ServiceTransDetailScreen;
