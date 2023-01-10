import React, { useEffect, useRef, useState, useTransition } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import { COLOR, deviceHeight, deviceWidth } from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppContainer from 'components/AppContainer';
import { SVG_NAME } from 'assets/path';
import AppImage from 'components/AppImage';
import { getSize } from 'hooks/useIconSvgResizeHOC';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import { t } from 'i18next';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import { getTripDetailSelector } from 'appRedux/selectors/tripDetailSelector';
import { getVehicleInfoSelector } from 'appRedux/selectors/tripSelector';
import moment from 'moment';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const DetailTripRouteMap = ({
  onGoToDetail,
  onRefuse,
  setShowModalGetOrder,
  showModalGetOrder,
  route,
}) => {
  // const dataDetailTrip = route.params.dataDetailTrip;
  const dataDetailTrip = useSelectorShallow(getTripDetailSelector);
  // const locationCar = useSelectorShallow(getVehicleInfoSelector);
  // console.log('location ca', locationCar);
  // console.log(
  //   'aaaaa trip',
  //   dataDetailTrip.journeyRoutes[0].orderRoute.locationOfCustomer.lat,
  // );
  // console.log(
  //   'check lat',
  //   dataDetailTrip?.journeyRoutes?.map(item => {
  //     return item.orderRoute.locationOfCustomer.lat;
  //   }),
  // );

  const modalizeRef = React.useRef(null);
  const { width, height } = Dimensions.get('window');
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);
  const DEFAULT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 };

  const [tickMaker, setTickMaker] = useState();
  const [selectOneRoute, setSelectOneRoute] = useState();

  const mapRef = useRef(null);
  const ASPECT_RATIO = deviceWidth / deviceHeight;
  // const LATITUDE = locationCar?.latitude;
  // const LONGITUDE = locationCar?.longitude;
  const LATITUDE_DELTA = 0.4;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const onSetCenter = location => {
    console.log(location)
    mapRef.current.animateToRegion(
      location
    );

    // const { coordinate,setCoordinate } = useState("");
    // const newCoordinate = {
    //   latitude: location.latitude  + ((Math.random() - 0.5) * (LATITUDE_DELTA / 2)),
    //   longitude: location.longitude  + ((Math.random() - 0.5) * (LONGITUDE_DELTA / 2))
    // };

    //   //this command will move the MARKER to the new location when the user double clicks on one of the locations in the drop down
    //   coordinate.timing(newCoordinate).start();
  };

  // const vehicleLocation = {
  //   latitude: locationCar?.latitude,
  //   longitude: locationCar?.longitude,
  // };
  // const VehicleMarker = () => {
  //   return (
  //     <AppView alignCenter>
  //       <SVG_NAME.CAR_MAP />
  //     </AppView>
  //   );
  // };

  const setMapReady = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        dataDetailTrip?.journeyRoutes?.map((item, index) => ({
          latitude: item.orderRoute.locationOfCustomer?.lat,
          longitude: item.orderRoute.locationOfCustomer?.long,
        })),
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        },
      );
    }
  };
  // console.log(
  //   'map latlong',
  //   dataDetailTrip?.journeyRoutes?.map((item, index) => ({
  //     latitude: item.orderRoute.locationOfCustomer?.lat,
  //     longitude: item.orderRoute.locationOfCustomer?.long,
  //   })),
  // );
  // const averageLat =
  //   dataDetailTrip?.journeyRoutes?.reduce(
  //     (r, c) => r + c?.orderRoute?.locationOfCustomer?.lat ?? 0,
  //     0,
  //   ) / dataDetailTrip?.journeyRoutes?.length;
  // const averageLong =
  //   dataDetailTrip?.journeyRoutes?.reduce(
  //     (r, c) => r + c?.orderRoute?.locationOfCustomer?.long ?? 0,
  //     0,
  //   ) / dataDetailTrip?.journeyRoutes?.length;

  return (
    <AppContainer hide>
      <AppView style={STYLE_GLOBAL.paddingIPX}></AppView>
      <AppView style={{ position: 'relative', height: 500 }}>
        <MapView
          onRegionChange={e => console.log(e)}
          ref={mapRef}
          provider="google"
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute',
          }}
          // initialRegion={{
          //   latitude: averageLat,
          //   longitude: averageLong,
          //   latitudeDelta: LATITUDE_DELTA,
          //   longitudeDelta: LONGITUDE_DELTA,
          // }}
          onMapReady={() => {
            Platform.OS === 'android' ? setMapReady() : null;
          }}
          onLayout={() => {
            Platform.OS === 'ios' ? setMapReady() : null;
          }}>
          {/* <Marker coordinate={vehicleLocation}>
            <VehicleMarker />
          </Marker> */}
          {dataDetailTrip?.journeyRoutes?.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.orderRoute.locationOfCustomer?.lat,
                longitude: item.orderRoute.locationOfCustomer?.long,
              }}
              onPress={() => {
                setTickMaker({
                  latitude: item.orderRoute.locationOfCustomer?.lat,
                  longitude: item.orderRoute.locationOfCustomer?.long,
                });
              }}
            // title="Vị trí hiện tại"
            // description="{}"
            >
              <EntypoIcon
                name="location-pin"
                size={35}
                color={
                  item.orderRoute.locationOfCustomer?.lat ===
                    selectOneRoute?.latitude &&
                    item.orderRoute.locationOfCustomer?.long ===
                    selectOneRoute?.longitude
                    ? COLOR.YELLOW_1
                    : 'red'
                }
              />
            </Marker>
          ))}
        </MapView>
      </AppView>
      <TouchableOpacity onPress={onOpen}>
        <AppText>Mở danh sách lộ trình</AppText>
      </TouchableOpacity>

      <Modalize
        modalStyle={{ padding: 16, backgroundColor: COLOR.WHITE }}
        ref={modalizeRef}
        childrenStyle={{
          backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
          borderRadius: 8,
        }}
        onBackButtonPress={() => {
          modalizeRef.current?.close();
          return true;
        }}
        handleStyle={{
          backgroundColor: 'transparent',
        }}
        modalHeight={getSize.m(height / 2)}
        withOverlay={false}
        HeaderComponent={
          <AppView>
            <AppView style={{ ...styles.scrollDown }} />
            <AppView rowAlignCenter space={'between'}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  ...STYLE_GLOBAL.weight600,
                  color: COLOR.TEXT_CONTENT,
                }}>
                Chi tiết hành trình
              </AppText>
              <TouchableOpacity
                onPress={() => {
                  setMapReady();
                  setSelectOneRoute(undefined);
                  setTickMaker(undefined);
                }}>
                <SVG_NAME.ICON_RELOAD_MAP />
              </TouchableOpacity>
            </AppView>
          </AppView>
        }>
        {dataDetailTrip.journeyRoutes?.map((item, index) => {
          console.log("222", item.orderRoute.locationOfCustomer)
          return (
            <AppView
              key={index}
              rowAlignCenter
              backgroundColor={
                item.orderRoute.locationOfCustomer?.lat ===
                  tickMaker?.latitude &&
                  item.orderRoute.locationOfsCustomer?.long ===
                  tickMaker?.longitude
                  ? COLOR.YELLOW_200
                  : COLOR.WHITE
              }>
              <TouchableOpacity
                key={index}
                style={{ flex: 1, padding: 12, marginBottom: 10 }}
                onPress={() => {
                  setMapReady();
                  setSelectOneRoute({
                    latitude: item.orderRoute.locationOfCustomer?.lat,
                    longitude: item.orderRoute.locationOfCustomer?.long,
                  });
                }}>
                <AppView rowAlignCenter>
                  <AppView
                    style={{
                      backgroundColor:
                        item?.orderRoute?.locationType === 'pickup'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                      paddingVertical: 1,
                      paddingHorizontal: 7,
                      borderRadius: 36,
                      borderWidth: 4,
                      borderColor: '#ffffff',
                    }}>
                    <AppText style={{ ...styles.text, color: '#ffffff' }}>
                      {item?.locNumber ?? 'default'}
                    </AppText>
                  </AppView>
                  <AppView
                    rowAlignCenter
                    style={{
                      ...styles.itemType,
                      borderColor:
                        item?.orderRoute?.locationType === 'pickup'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                      marginLeft: 7,
                    }}>
                    {item?.orderRoute?.locationType === 'pickup' ? (
                      <SVG_NAME.ARROW_LEFT />
                    ) : (
                      <SVG_NAME.ARROW_RIGHT />
                    )}
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.caption,
                        color:
                          item?.orderRoute?.locationType === 'pickup'
                            ? COLOR.BLUE_SUPPORT_500
                            : COLOR.TOAST_WARNING_BORDER,
                        marginLeft: 7,
                      }}>
                      {item?.orderRoute?.locationType === 'pickup'
                        ? 'Giao'
                        : 'Nhận'}
                    </AppText>
                  </AppView>
                </AppView>
                <AppView>
                  <AppView paddingLeft={34}>
                    <AppView rowAlignCenter>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body1,
                          ...STYLE_GLOBAL.weight600,
                          color: COLOR.TEXT_CONTENT,
                          flex: 1,
                        }}>
                        {item?.orderRoute?.locationOfCustomer?.buildingName},{' '}
                        {item?.orderRoute?.locationOfCustomer?.address},{' '}
                        {item?.orderRoute?.locationOfCustomer?.ward?.name},{' '}
                        {item?.orderRoute?.locationOfCustomer?.district?.name},{' '}
                        {item?.orderRoute?.locationOfCustomer?.city?.name}
                      </AppText>
                    </AppView>
                    <AppView rowAlignCenter>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.GRAY5,
                        }}>
                        Thời gian dự kiến:
                      </AppText>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.TEXT_CONTENT,
                          marginLeft: 10,
                        }}>
                        {moment(
                          item?.etaDatetime ?? new Date(),
                          'YYYY-MM-DD hh:mm:ss',
                        ).format('HH:mm DD-MM-YYYY')}{' '}
                      </AppText>
                    </AppView>
                  </AppView>
                </AppView>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  // console.log("111",item.orderRoute.locationOfCustomer)
                  onSetCenter({
                    latitude: item.orderRoute.locationOfCustomer?.lat,
                    longitude: item.orderRoute.locationOfCustomer?.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                  })
                }>
                <SVG_NAME.ICON_SEE_MAP_POINT />
              </TouchableOpacity>
            </AppView>
          );
        })}
      </Modalize>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginHorizontal: 16,
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
  scrollDown: {
    width: 56,
    height: 6,
    borderRadius: 10,
    backgroundColor: COLOR.STATUS_CLOSE_BACKGROUND,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
});
export default DetailTripRouteMap;
