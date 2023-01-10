/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MapView, {MAP_TYPES, PROVIDER_GOOGLE} from 'react-native-maps';
import {SVG_NAME} from 'assets/path';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import NavigationServices from 'navigation/navigationServices';
import AppText from 'components/AppText';
import AppView from 'components/AppView';
import {COLOR, DEFAULT_LOCATION_MAP} from 'utils/AppConst';
import useTranslate from 'hooks/useTranslate';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import RenderListAddress from './components/RenderListAddress';
import {Modalize} from 'react-native-modalize';
import {getAddressFromGeoCodingGoogleSubmit} from 'appRedux/actions/addressActions';
import {useActions} from 'hooks/useActions';

const RNMapView = ({route}) => {
  const {t} = useTranslate();
  const {currentLocations} = route.params;
  const modalizeRef = React.useRef(null);

  const onOpenModal = React.useCallback(() => {
    modalizeRef.current?.open();
  }, []);

  const actions = useActions({getAddressFromGeoCodingGoogleSubmit});
  const mapRef = useRef(null);

  const [pointChange, setPointChange] = React.useState(null);
  console.log('pointChange', pointChange);
  const [listAddress, setListAddress] = React.useState([]);

  console.log('listAddress  ->>>>>', listAddress);
  const fetchDataAddressFromGeoGoogle = useCallback(() => {
    const options = {
      callback: res => {
        console.log('res geo google list', res);
        setListAddress(res);
      },
      lat: pointChange?.latitude,
      long: pointChange?.longitude,
    };
    actions.getAddressFromGeoCodingGoogleSubmit({...options});
    console.log('options geo', {...options});
  }, [actions, pointChange?.latitude, pointChange?.longitude]);

  useEffect(() => {
    if (!pointChange) return;
    fetchDataAddressFromGeoGoogle();
  }, [pointChange]);

  const isMounted = React.useRef(false);
  // effects
  useEffect(() => {
    setPointChange(DEFAULT_LOCATION_MAP);
  }, []);

  if (!pointChange) {
    return null;
  }
  return (
    <View style={[styles.container]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType={MAP_TYPES.STANDARD}
        style={[styles.map, {paddingTop: 16}]}
        initialRegion={pointChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation
        ref={mapRef}
        onRegionChangeComplete={(region, details) => {
          if (!isMounted.current) {
            isMounted.current = true;
            return;
          }
          console.log('region map', region);
          setPointChange(region);
          onOpenModal();
        }}></MapView>
      <AppView>
        <SVG_NAME.MAP_PIN_SELECT />
      </AppView>
      <AppView style={styles.goBackButton}>
        <TouchableOpacity onPress={() => NavigationServices.goBack()}>
          <SVG_NAME.GO_BACK_MAP />
        </TouchableOpacity>
      </AppView>

      {/* <Modalize
        ref={modalizeRef}
        onBackButtonPress={() => {
          modalizeRef.current?.close();
          return true;
        }}
        handleStyle={{
          backgroundColor: 'transparent',
        }}
        modalHeight={getSize.m(350)}
        HeaderComponent={
          <AppView style={styles.titleContainer}>
            <AppText style={styles.txtTitle}>{t('common:suggestions')}</AppText>
          </AppView>
        }>
        <RenderListAddress
          dataAddress={listAddress}
          // type={type}
          // detailsAddressInput={detailsAddressInput}
          // isGetDetailsFromGoogleApi={isGetDetailsFromGoogleApi}
          // isUpdate={isUpdate}
          // totalLocNumber={totalLocNumber}
          // orderDataDraft={orderDataDraft}
          // orderRoutesDetails={orderRoutesDetails}
        />
      </Modalize> */}
    </View>
  );
};

export default React.memo(RNMapView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  goBackButton: {
    marginTop: getSize.m(22),
    position: 'absolute',
    left: 0,
    top: 0,
  },
  titleSuggestions: {
    ...STYLE_GLOBAL.caption,
    fontWeight: '600',
    color: COLOR.COLOR_TEXT_TITLE_INTRO,
    flex: 1,
  },
  titleContainer: {
    marginTop: getSize.m(16),
    marginHorizontal: getSize.m(16),
  },
  txtTitle: {
    ...STYLE_GLOBAL.caption,
    fontWeight: '600',
    color: COLOR.COLOR_TEXT_TITLE_INTRO,
  },
});
