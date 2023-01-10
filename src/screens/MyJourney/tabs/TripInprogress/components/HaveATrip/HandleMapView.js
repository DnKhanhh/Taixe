import React, {useCallback, useEffect, useRef, useState} from 'react';
import AppView from 'components/AppView';
import {Platform, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  COLOR,
  deviceHeight,
  deviceWidth,
  GG_API_KEY,
  JOURNEY_ROUTE_STATUS,
  SCENE_NAMES,
} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import AppText from 'components/AppText';
import MapViewDirections from 'react-native-maps-directions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import NavigationServices from 'navigation/navigationServices';

const HandleMapView = ({
  // currentPoint,
  debounce,
  timeOutModal,
  data,
  points,
  vehicleInfo,
  setPoint,
  setShowModalConfirmDelivery,
  setShowModalConfirmArrived,
  setDistance,
  setIsDelivery,
}) => {
  const mapRef = React.useRef();
  // console.log('data locations ->>>>>', currentPoint);
  const pointInProgress = data.journeyRoutes.filter(
    item => item.statusId === JOURNEY_ROUTE_STATUS.BEING_TRANSPORTED,
  );
  const [selectedPoint, setSelectedPoint] = useState(
    data.journeyRoutes.indexOf(pointInProgress[0]),
  );

  // console.log('zzzzz ki', selectedPoint);
  console.log('selected po', selectedPoint);
  console.log(
    'points[selectedPoint]?.locationType',
    data?.journeyRoutes[selectedPoint]?.statusDriverId,
  );
  const [value, setValue] = useState({
    distance: 0,
    time: 0,
  });
  console.log('aaaaaa', value);

  const checkTime = val => {
    console.log('check val', val);

    if (val < 0.1) {
      console.log('11111111');

      countDown(0);
      return;
    } else if (val < 5) {
      console.log('ABCDE');
      countDown(1);
      return;
    } else if (val <= 10) {
      countDown(5);
      return;
    } else if (val <= 20) {
      countDown(10);
      return;
    } else if (val <= 50) {
      countDown(20);
      return;
    } else if (val <= 100) {
      countDown(25);
      return;
    } else if (val > 100) {
      countDown(50);
      return;
    }
  };

  const notInitialRender = useRef(false);
  console.log('check ref', notInitialRender.current);
  useEffect(() => {
    if (notInitialRender.current) {
      checkTime(value.distance);
      // checkTime(2);
    } else {
      notInitialRender.current = true;
    }
  }, [value]);

  useEffect(() => {
    setDistance(value.distance);
  });

  const countDown = delay => {
    let countDown = setTimeout(() => {
      if (
        value?.distance <= 0.1 &&
        data?.journeyRoutes[selectedPoint]?.statusDriverId !==
          'journey_route_driver_status_arrived' &&
        data?.journeyRoutes[selectedPoint]?.statusDriverId !==
          'journey_route_driver_status_not_sure'
      ) {
        if (points[selectedPoint]?.locationType === 'delivery') {
          setShowModalConfirmDelivery(true);
          // if (
          //   !data?.journeyRoutes[selectedPoint]?.statusDriverId ||
          //   data?.journeyRoutes[selectedPoint]?.statusDriverId === null
          // ) {

          checkTime(value?.distance);
        } else {
          setShowModalConfirmArrived(true);
          // if (
          //   !data?.journeyRoutes[selectedPoint]?.statusDriverId ||
          //   data?.journeyRoutes[selectedPoint]?.statusDriverId === null
          // ) {

          checkTime(value?.distance);
        }
      } else if (
        data?.journeyRoutes[selectedPoint]?.statusDriverId ===
        'journey_route_driver_status_not_sure'
      ) {
        if (points[selectedPoint]?.locationType === 'delivery') {
          setShowModalConfirmDelivery(true);
        } else {
          setShowModalConfirmArrived(true);
        }
      } else {
        console.log('dcdcd');
        // if (
        //   data?.journeyRoutes[selectedPoint]?.statusDriverId ===
        //   'journey_route_driver_status_not_sure'
        // )
        checkTime(value?.distance);
        // checkTime(0.01);
      }
    }, 4000 + delay * 0);
    return () => {
      clearTimeout(countDown);
    };
  };

  const vehicleLocation = {
    latitude: vehicleInfo?.latitude,
    longitude: vehicleInfo?.longitude,
  };

  const arrPoint = points.map(item => {
    return {
      ...item,
      latitude: item.locationOfCustomer.lat,
      longitude: item.locationOfCustomer.long,
      locationOfCustomer: item?.locationOfCustomer,
    };
  });

  const lastPointLocation = {
    ...arrPoint[arrPoint.length - 1],
    latitude: arrPoint[arrPoint.length - 1]?.latitude,
    longitude: arrPoint[arrPoint.length - 1]?.longitude,
    locationOfCustomer: arrPoint[arrPoint.length - 1]?.locationOfCustomer,
  };

  const pointNumber = points.length;

  const ASPECT_RATIO = deviceWidth / deviceHeight;
  const LATITUDE = vehicleInfo?.latitude;
  const LONGITUDE = vehicleInfo?.longitude;
  const LATITUDE_DELTA = 0.122;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const CustomMarkerView = ({item, index}) => {
    return (
      <>
        {selectedPoint === index ? (
          <AppView style={styles.markerView}>
            <AppView
              flex={1}
              alignStart
              radius={8}
              padding={8}
              backgroundColor={
                item.locationType === 'delivery'
                  ? COLOR.BLUE_SUPPORT_500
                  : COLOR.TOAST_WARNING_BORDER
              }>
              <AppView
                rowAlignCenter
                style={{
                  ...styles.itemType,
                  borderColor:
                    item.locationType === 'delivery'
                      ? COLOR.BLUE_SUPPORT_500
                      : COLOR.TOAST_WARNING_BORDER,
                }}>
                {item.locationType === 'delivery' ? (
                  <SVG_NAME.ARROW_LEFT />
                ) : (
                  <SVG_NAME.ARROW_RIGHT />
                )}
                <AppText
                  style={[
                    {
                      ...STYLE_GLOBAL.caption,
                      color:
                        item.locationType === 'delivery'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                    },
                    styles.marginLeft,
                  ]}>
                  {item.locationType === 'delivery' ? 'Giao' : 'Nhận'}
                </AppText>
              </AppView>
              <AppText style={[styles.locationName, STYLE_GLOBAL.weight600]}>
                {item.locationOfCustomer.address}
              </AppText>
            </AppView>
            <AppView
              style={[
                styles.triangle,
                {
                  borderTopColor:
                    item.locationType === 'delivery'
                      ? COLOR.BLUE_SUPPORT_500
                      : COLOR.TOAST_WARNING_BORDER,
                },
              ]}
            />
          </AppView>
        ) : index === pointNumber - 1 ? (
          <SVG_NAME.ICON_END_POINT />
        ) : (
          <AppView marginBottom={5} alignCenter>
            <AppView
              marginBottom={5}
              paddingHorizontal={8}
              paddingVertical={2}
              radius={16}
              backgroundColor={COLOR.COLOR_BOTTOM_TAB_ACTIVE}>
              <AppText
                style={[
                  STYLE_GLOBAL.weight600,
                  {color: COLOR.COLOR_BACKGROUND},
                ]}>
                Điểm {index + 1}
              </AppText>
            </AppView>
            <SVG_NAME.ICON_MARKER_POINT />
          </AppView>
        )}
      </>
    );
  };

  const VehicleMarker = () => {
    return (
      <AppView alignCenter>
        <SVG_NAME.CAR_MAP />
      </AppView>
    );
  };

  const onGoBackToCurrentLocation = () => {
    mapRef.current.animateToRegion({
      latitude: vehicleInfo?.latitude,
      longitude: vehicleInfo?.longitude,
    });
  };

  return (
    <>
      <AppView style={{position: 'relative', height: 450}}>
        <MapView
          ref={mapRef}
          provider="google"
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <MapViewDirections
            apikey={GG_API_KEY}
            origin={vehicleLocation}
            destination={arrPoint[selectedPoint]}
            optimizeWaypoints={true}
            strokeWidth={3}
            strokeColor={COLOR.COLOR_BOTTOM_TAB_ACTIVE}
            splitWaypoints={true}
            onReady={result => {
              setValue({
                distance: result.distance,
                time: result.duration,
              });
            }}
          />
          <MapViewDirections
            splitWaypoints={true}
            waypoints={arrPoint.length > 2 ? arrPoint.slice(1, -1) : undefined}
            apikey={GG_API_KEY}
            origin={vehicleLocation}
            destination={arrPoint[arrPoint.length - 1]}
            optimizeWaypoints={true}
            strokeWidth={3}
            strokeColor={COLOR.COLOR_BORDER_TEXT_INPUT}
          />
          <Marker coordinate={vehicleLocation}>
            <VehicleMarker />
          </Marker>
          {points.map((marker, index) => (
            <Marker
              onPress={() => {
                // setSelectedPoint(index);
                setPoint(index);
              }}
              key={index}
              coordinate={{
                latitude: marker.locationOfCustomer.lat,
                longitude: marker.locationOfCustomer.long,
              }}>
              <CustomMarkerView index={index} item={marker} />
            </Marker>
          ))}
        </MapView>
      </AppView>
      <AppView rowAlignCenter space={'between'} marginHorizontal={10}>
        <AppView rowAlignCenter flex={1}>
          <TouchableOpacity
            onPress={() => {
              onGoBackToCurrentLocation();
            }}>
            <SVG_NAME.ICON_SMALL_SEE_MAP_POINT marginHorizontal={10} />
          </TouchableOpacity>
          <SVG_NAME.ICON_FOCUS_TRUCK marginHorizontal={15} />
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(
                SCENE_NAMES.MAP_DIRECTION,
                lastPointLocation,
              );
            }}>
            <AppView
              rowAlignCenter
              backgroundColor={COLOR.COLOR_PRIMARY}
              paddingVertical={8}
              paddingHorizontal={16}
              borderRadius={46}>
              <SVG_NAME.ICON_ROUTE_WHITE />
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  ...STYLE_GLOBAL.weight600,
                  color: COLOR.WHITE,
                }}>
                {' '}
                Dẫn đường
              </AppText>
            </AppView>
          </TouchableOpacity>
        </AppView>
        <AppView>
          <SVG_NAME.ICON_RELOAD_MAP />
        </AppView>
      </AppView>
      {points[selectedPoint]?.locationType === 'delivery' ? (
        <AppConfirmButton
          titleConfirm={'Đã nhận'}
          hasCancelButton={false}
          onPressConfirm={() => {
            setShowModalConfirmDelivery(true);
          }}
        />
      ) : (
        <AppConfirmButton
          titleConfirm={'Đã đến'}
          hasCancelButton={false}
          onPressConfirm={() => {
            setShowModalConfirmArrived(true);
          }}
        />
      )}
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
});

export default HandleMapView;
