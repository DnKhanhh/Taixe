import React from 'react';
import AppView from 'components/AppView';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AppText from 'components/AppText';
import {COLOR, deviceHeight, deviceWidth} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getVehicleInfoSelector} from 'appRedux/selectors/tripSelector';
import {getSize} from 'hooks/useIconSvgResizeHOC';
const HandleMapView = ({setShowAppModal, onPressConfirm}) => {
  const locationCar = useSelectorShallow(getVehicleInfoSelector);
  const mapRef = React.useRef();

  const vehicleLocation = {
    latitude: locationCar?.latitude,
    longitude: locationCar?.longitude,
  };

  const ASPECT_RATIO = deviceWidth / deviceHeight;
  const LATITUDE = locationCar?.latitude;
  const LONGITUDE = locationCar?.longitude;
  const LATITUDE_DELTA = 0.122;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const VehicleMarker = () => {
    return (
      <AppView alignCenter>
        <SVG_NAME.CAR_MAP />
      </AppView>
    );
  };
  const selectedLocation = React.useCallback(() => {
    onPressConfirm?.(locationCar);
  }, [locationCar]);
  return (
    <>
      <AppView style={{height: deviceHeight}}>
        <MapView
          ref={mapRef}
          provider="google"
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          followsUserLocation
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker coordinate={vehicleLocation}>
            <VehicleMarker />
          </Marker>
        </MapView>
        <AppView top={getSize.m(10)} absolute>
          <TouchableOpacity onPress={() => setShowAppModal(false)}>
            <SVG_NAME.GO_BACK_MAP />
          </TouchableOpacity>
        </AppView>
        <AppView
          absolute
          marginHorizontal={getSize.m(24)}
          bottom={getSize.m(20)}
          left={getSize.m(20)}>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={selectedLocation}>
            <AppText
              style={[
                STYLE_GLOBAL.body1,
                STYLE_GLOBAL.color_secondary,
                STYLE_GLOBAL.weight600,
              ]}>
              Xác Nhận
            </AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>
    </>
  );
};

const styles = StyleSheet.create({
  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  marginLeft: {
    marginLeft: 7,
  },
  locationName: {
    color: COLOR.COLOR_BACKGROUND,
    marginTop: 4,
  },
  triangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderStyle: 'solid',
    borderRightColor: COLOR.TRANSPARENT,
    borderLeftColor: COLOR.TRANSPARENT,
  },
  markerView: {
    transform: [{translateY: 50}],
  },
  btnConfirm: {
    backgroundColor: COLOR.COLOR_PRIMARY,
    borderRadius: getSize.m(4),
    height: getSize.v(45),
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize.s(300),
  },
});

export default HandleMapView;
