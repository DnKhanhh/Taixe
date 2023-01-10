import React, {useEffect, useRef, useState, useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {SVG_NAME} from 'assets/path';
import {COLOR, JOURNEY_ROUTE_STATUS} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {deviceWidth} from 'utils/AppConst';
import AppButton from 'components/AppButton';
import MapView, {MAP_TYPES, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Section} from 'components/Section';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import ModalConfirmArrived from '../Modal/ModalConfirmArrived';
import ModalConfirmDelivery from '../Modal/ModalConfirmDelivery';
import {SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import HandleMapView from './HandleMapView';
import moment from 'moment';
import InfoByRow from './components/InfoByRow';

import {getSize} from 'hooks/useIconSvgResizeHOC';
const HaveATrip = ({
  data,
  onGoToDetail,
  points,
  vehicleInfo,
  checkStatusArrived,
  handelGetDetailsCurrentTrip,
}) => {
  const pointInProgress = data.journeyRoutes.filter(
    item => item.statusId === JOURNEY_ROUTE_STATUS.BEING_TRANSPORTED,
  );
  console.log('poinnnnn', pointInProgress);
  const [showModalConfirmArrived, setShowModalConfirmArrived] = useState(false);
  const [showModalConfirmDelivery, setShowModalConfirmDelivery] =
    useState(false);
  const [point, setPoint] = React.useState(
    data.journeyRoutes.indexOf(pointInProgress[0]),
  );
  // console.log('ckk', point);

  const [distance, setDistance] = React.useState(0);
  console.log('disss', distance);
  const pointsLocation = points.map(item => item.locationOfCustomer);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (true) {
        // setShowModal(true);
      }
    }, 1000 * 60 * 15);
    return () => clearTimeout(timeOut);
  }, []);
  const isGoToRouteTab = true;
  const {goodWeight, routeServices} = points[point] || {};
  // When getting full data, please add remaining cases
  const filterService = useMemo(() => {
    let serviceName = '';
    switch (routeServices && routeServices[0]?.serviceCode) {
      case 'xep_hang':
        serviceName = 'Xếp hàng';
        break;

      default:
        serviceName = 'Bốc dỡ hàng';
        break;
    }
    return serviceName;
  }, [routeServices]);
  //
  const status = 'journey_route_driver_status_not_sure';
  function debounce(fn, ms) {
    let timer;

    return () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, ms);
    };
  }
  // const timeOutModal = () => {
  //   if (distance < 0.1) {
  //     console.log('test test test');
  //     checkStatusArrived(data.journeyRoutes[point]?.id, status, () => {
  //       setShowModalConfirmArrived(false);
  //     });
  //     handelGetDetailsCurrentTrip();
  //   } else {
  //     setShowModalConfirmArrived(false);
  //   }
  // };
  const timeOutModal = () => {
    const timeOut = setTimeout(() => {
      if (distance < 0.1) {
        console.log('test test test');
        checkStatusArrived(data.journeyRoutes[point]?.id, status, () => {
          setShowModalConfirmArrived(false);
        });
        handelGetDetailsCurrentTrip();
      } else {
        setShowModalConfirmArrived(false);
      }
    }, 5000);
    return () => clearTimeout(timeOut);
  };

  return (
    <AppView flex={1} backgroundColor={COLOR.WHITE}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppView>
          <TouchableOpacity
            onPress={() => {
              onGoToDetail(data.id);
            }}>
            <AppView rowAlignCenter space={'between'} margin={getSize.m(16)}>
              <AppView>
                <AppView rowAlignCenter>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      color: COLOR.COLOR_TEXT_TITLE_INTRO,

                      marginRight: getSize.m(10),
                    }}>
                    Mã chuyến:
                  </AppText>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.buttonLarge,
                      color: COLOR.STATUS_SUCCESS_TEXT,

                      marginRight: getSize.m(10),
                    }}>
                    {data.id}
                  </AppText>
                </AppView>
              </AppView>
              <SVG_NAME.ARROWRIGHTSMALL />
            </AppView>
          </TouchableOpacity>
          <AppView style={{...styles.line, marginTop: 0}} />

          <TouchableOpacity
            onPress={() => {
              onGoToDetail(data.id, isGoToRouteTab);
            }}>
            <AppView rowAlignCenter space={'between'} margin={getSize.m(16)}>
              <AppView rowAlignCenter>
                <SVG_NAME.SYNCICON />
                <AppText
                  style={{
                    ...STYLE_GLOBAL.subTitle2,
                    ...STYLE_GLOBAL.weight700,
                    color: COLOR.STATUS_SUCCESS_TEXT,
                    marginLeft: getSize.m(16),
                  }}>
                  Cung đường {data?.journeyOrders.order?.routeName || ''}{' '}
                </AppText>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                    color: COLOR.TEXT_CONTENT,
                  }}>
                  |{' '}
                  {(data?.journeyOrders.order?.distance / 1000).toFixed(3) ||
                    ''}{' '}
                  km
                </AppText>
              </AppView>
              <TouchableOpacity onPress={() => {}}>
                <SVG_NAME.ARROWRIGHTSMALL />
              </TouchableOpacity>
            </AppView>
          </TouchableOpacity>
          <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />
        </AppView>
        <AppView margin={16}>
          <AppView>
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                ...STYLE_GLOBAL.weight600,
                color: COLOR.TEXT_CONTENT,
              }}>
              Chi tiết hành trình
            </AppText>
          </AppView>
          <AppView
            backgroundColor={COLOR.DASH_BOARD_BACKGROUND}
            borderRadius={getSize.m(8)}
            padding={getSize.m(12)}
            marginVertical={getSize.m(16)}>
            <AppView rowAlignCenter>
              <AppView
                style={{
                  backgroundColor:
                    points[point]?.locationType === 'pickup'
                      ? COLOR.TOAST_WARNING_BORDER
                      : COLOR.BLUE_SUPPORT_500,
                  paddingVertical: getSize.m(1),
                  paddingHorizontal: getSize.m(7),
                  borderRadius: getSize.m(36),
                  borderWidth: getSize.m(4),
                  borderColor: '#ffffff',
                }}>
                <AppText style={{...styles.text, color: '#ffffff'}}>
                  {point + 1}
                </AppText>
              </AppView>
              <AppView
                rowAlignCenter
                style={{
                  ...styles.itemType,
                  borderColor:
                    points[point]?.locationType === 'pickup'
                      ? COLOR.TOAST_WARNING_BORDER
                      : COLOR.BLUE_SUPPORT_500,
                  marginLeft: 8,
                }}>
                {points[point]?.locationType === 'pickup' ? (
                  <SVG_NAME.ARROW_RIGHT />
                ) : (
                  <SVG_NAME.ARROW_LEFT />
                )}
                <AppText
                  style={[
                    styles.text,
                    styles.marginLeft,
                    {
                      color:
                        points[point]?.locationType === 'pickup'
                          ? COLOR.TOAST_WARNING_BORDER
                          : COLOR.BLUE_SUPPORT_500,
                    },
                  ]}>
                  {points[point]?.locationType === 'pickup' ? 'Nhận' : 'Giao'}
                </AppText>
              </AppView>
            </AppView>
            <Section
              isTripRouteTab={true}
              isDivider={false}
              newBackground={COLOR.DASH_BOARD_BACKGROUND}
              changeBackground
              icon={<SVG_NAME.ICON_DOWN_DOUBLE />}
              openDefault={false}
              customHeader={
                <AppView flex={1} paddingHorizontal={17}>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      ...STYLE_GLOBAL.weight600,
                      color: COLOR.TEXT_CONTENT,
                    }}>
                    {pointsLocation[point]?.buildingName},{' '}
                    {pointsLocation[point]?.address},{' '}
                    {pointsLocation[point]?.ward.name},{' '}
                    {pointsLocation[point]?.district.name},{' '}
                    {pointsLocation[point]?.city.name}
                  </AppText>
                  <AppView rowAlignCenter>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.TEXT_CONTENT,
                        flex: 0.5,
                      }}>
                      Thời gian dự kiến:
                    </AppText>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.TEXT_CONTENT,
                        marginLeft: 10,
                        flex: 0.5,
                      }}>
                      {moment(pointsLocation[point]?.estimatedTime)
                        .utc()
                        .format('HH:mm DD/MM/YYYY')}
                    </AppText>
                  </AppView>
                </AppView>
              }>
              <AppView paddingHorizontal={34} marginTop={8}>
                <InfoByRow
                  title={'Dự kiến nhận:'}
                  value={`${goodWeight || 'default'} tấn`}
                />
                <InfoByRow
                  title={'Dịch vụ:'}
                  /* For "routeServices", please check again if it had something went wrong */
                  value={filterService}
                />
                <InfoByRow
                  title={'Thu nhập:'}
                  value={data?.documentNote || 'default'}
                  addMoreInfo={'Hồ sơ ABC'}
                />
                <InfoByRow
                  title={'Liên hệ:'}
                  value={pointsLocation[point]?.contactName}
                  addMoreInfo={pointsLocation[point]?.contactPhone}
                  iconPhone
                />
              </AppView>
            </Section>
          </AppView>
          <AppView
            backgroundColor={COLOR.DASH_BOARD_BACKGROUND}
            borderRadius={8}>
            <AppView rowAlignCenter paddingVertical={4} paddingHorizontal={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                }}>
                Chủ hàng:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                }}>
                {' '}
                {pointsLocation[point]?.contactName}
              </AppText>
              <AppView rowAlignCenter>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                    color: COLOR.TEXT_CONTENT,
                    marginRight: getSize.m(10),
                  }}>
                  {' '}
                  | {pointsLocation[point]?.contactPhone}
                </AppText>
                <SVG_NAME.ICON_PHONE />
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <AppView style={{...styles.lineBold, marginTop: 0}} />
        <HandleMapView
          timeOutModal={timeOutModal}
          debounce={debounce}
          setShowModalConfirmDelivery={setShowModalConfirmDelivery}
          setShowModalConfirmArrived={setShowModalConfirmArrived}
          setPoint={setPoint}
          vehicleInfo={vehicleInfo}
          data={data}
          points={points}
          setDistance={setDistance}
          // currentPoint={point}
        />
        <ModalConfirmArrived
          handelGetDetailsCurrentTrip={handelGetDetailsCurrentTrip}
          checkStatusArrived={checkStatusArrived}
          data={data.journeyRoutes[point]}
          showModal={showModalConfirmArrived}
          setShowModal={setShowModalConfirmArrived}
          distance={distance}
        />
        <ModalConfirmDelivery
          handelGetDetailsCurrentTrip={handelGetDetailsCurrentTrip}
          data={data.journeyRoutes[point]}
          showModal={showModalConfirmDelivery}
          setShowModal={setShowModalConfirmDelivery}
          distance={distance}
          checkStatusArrived={checkStatusArrived}
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
    paddingHorizontal: getSize.m(5),
    paddingVertical: getSize.m(2),
    borderWidth: getSize.m(1),
    borderRadius: getSize.m(35),
  },
  textPlace: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '600',
  },
  text: {
    ...STYLE_GLOBAL.caption,
  },

  line: {
    marginTop: getSize.m(16),
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: getSize.m(1),
    borderColor: '#B5B6BA',
  },
  lineBold: {
    marginTop: getSize.m(16),
    width: '100%',
    borderWidth: getSize.m(5),
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },

  itemType: {
    paddingHorizontal: getSize.m(5),
    paddingVertical: getSize.m(2),
    borderWidth: getSize.m(1),
    borderRadius: getSize.m(35),
  },
});
export default HaveATrip;
