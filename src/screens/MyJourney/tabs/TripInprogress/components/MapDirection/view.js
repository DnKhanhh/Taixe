import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import AppSearchAndFilter from 'components/AppSearchAndFilter';
import {SVG_NAME} from 'assets/path';
import TripItem from 'screens/MyJourney/components/TripItem';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import {getListProvince} from 'appRedux/actions/addressActions';
import {useActions} from 'hooks/useActions';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {deviceWidth, GG_API_KEY} from 'utils/AppConst';
import AppButton from 'components/AppButton';
import MapView, {
  MAP_TYPES,
  PROVIDER_GOOGLE,
  Marker,
  Overlay,
} from 'react-native-maps';
import {Section} from 'components/Section';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import MapViewDirections from 'react-native-maps-directions';
import {
  DEFAULT_PADDING_HORIZONTAL,
  DEFAULT_PADDING_VERTICAL,
} from 'utils/responsive';
import styles from './styles';
import {openMaps} from 'utils/appUtils';
// import ModalFilterAddressBook from './Modal/ModalFilterAddressBook';
// import ModalConfirmGetOrder from './Modal/ModalConfirmGetOrder';

const MapDirection = ({
  // listAddress,
  // refreshing,
  // onRefresh,
  onGoToDetail,
  // onSearch,
  // onFilter,
  // showModalOptions,
  // setShowModalOptions,
  // setShowModalFilter,
  // showModalFilter,
  // loadMore,
  // filtersBookAddress,
  // defaultFilter,
  // setShowModalGetOrder,
  // showModalGetOrder,
  lastPoint,
}) => {
  const [showModalConfirmArrived, setShowModalConfirmArrived] = useState(false);
  const address = `${lastPoint.locationOfCustomer.buildingName}, ${lastPoint.locationOfCustomer.address}, ${lastPoint.locationOfCustomer.ward.name}, ${lastPoint.locationOfCustomer.district.name}, ${lastPoint.locationOfCustomer.city.name}`;
  const onPressOpenMap = React.useCallback(() => {
    openMaps(
      {lat: lastPoint?.latitude, lng: lastPoint?.longitude},
      lastPoint?.locationOfCustomer?.address,
    );
  }, [lastPoint]);

  const OverlayComponent = () => {
    return (
      <TouchableOpacity
        onPress={onPressOpenMap}
        style={styles.directionTouchView}>
        <Image
          source={require('assets/images/direction.png')}
          style={styles.direction}
        />
      </TouchableOpacity>
    );
  };

  return (
    <AppView flex={1} backgroundColor={COLOR.WHITE}>
      <AppView style={{position: 'relative', height: 500}}>
        <MapView
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          initialRegion={{
            latitude: lastPoint?.latitude,
            longitude: lastPoint?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google">
          <Marker
            coordinate={{
              latitude: lastPoint?.latitude,
              longitude: lastPoint?.longitude,
            }}
          />
        </MapView>
        <OverlayComponent />
      </AppView>
      <View showsVerticalScrollIndicator={false}>
        <AppView>
          <AppView style={{...styles.line, marginTop: 0}} />

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
            borderRadius={8}
            padding={12}
            marginVertical={16}>
            <AppView rowAlignCenter>
              <AppView
                style={{
                  backgroundColor: '#F07F23',
                  paddingVertical: 1,
                  paddingHorizontal: 7,
                  borderRadius: 36,
                  borderWidth: 4,
                  borderColor: '#ffffff',
                }}>
                <AppText style={{...styles.text, color: '#ffffff'}}>1</AppText>
              </AppView>
              <AppView
                rowAlignCenter
                style={{
                  ...styles.itemType,
                  borderColor: '#F07F23',
                  marginLeft: 8,
                }}>
                <SVG_NAME.ARROW_RIGHT />
                <AppText style={[styles.text, styles.marginLeft]}>Nhận</AppText>
              </AppView>
            </AppView>

            <Section
              isTripRouteTab={true}
              isDivider={false}
              newBackground={COLOR.DASH_BOARD_BACKGROUND}
              changeBackground
              icon={<SVG_NAME.ICON_DOWN_DOUBLE />}
              openDefault={true}
              customHeader={
                <AppView paddingHorizontal={17}>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      ...STYLE_GLOBAL.weight600,
                      color: COLOR.TEXT_CONTENT,
                    }}>
                    {`${lastPoint.locationOfCustomer.buildingName}, ${lastPoint.locationOfCustomer.address}, ${lastPoint.locationOfCustomer.ward.name}, ${lastPoint.locationOfCustomer.district.name}, ${lastPoint.locationOfCustomer.city.name}`}
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
                      08:00 01/01/2022
                    </AppText>
                  </AppView>
                </AppView>
              }>
              <AppView paddingHorizontal={34} marginTop={8}>
                <AppView style={styles.moreInfoItem}>
                  <AppView rowAlignCenter marginBottom={8}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.GRAY5,
                        flex: 0.5,
                      }}>
                      Dự kiến nhận:
                    </AppText>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.TEXT_CONTENT,
                        flex: 0.5,
                      }}>
                      {}
                    </AppText>
                  </AppView>

                  <AppView row marginBottom={8}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.GRAY5,
                        flex: 0.5,
                      }}>
                      {lastPoint?.goodWeight||'default'}
                    </AppText>

                    <AppView style={{flex: 0.5}}>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        {lastPoint?.routeServices[0]?.serviceType?.name || 'default'}
                      </AppText>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        Hỗ trợ thu hồi hàng
                      </AppText>
                    </AppView>
                  </AppView>

                  <AppView row marginBottom={8}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.GRAY5,
                        flex: 0.5,
                      }}>
                      Thu nhập:
                    </AppText>

                    <AppView style={{flex: 0.5}}>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        {lastPoint?.routeServices[0]?.serviceType?.documentRecall || 'default'}
                      </AppText>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        Hồ sơ ABC
                      </AppText>
                    </AppView>
                  </AppView>
                  <AppView row>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        color: COLOR.GRAY5,
                        flex: 0.5,
                      }}>
                      Liên hệ:
                    </AppText>

                    <AppView style={{flex: 0.5}}>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        {lastPoint?.locationOfCustomer?.contactName}
                      </AppText>
                      <AppView rowAlignCenter>
                        <AppText
                          style={{
                            ...STYLE_GLOBAL.body2,
                            color: COLOR.TEXT_CONTENT,
                            marginRight: 10,
                          }}>
                          {lastPoint?.locationOfCustomer?.contactPhone}
                        </AppText>
                        <SVG_NAME.ICON_PHONE />
                      </AppView>
                    </AppView>
                  </AppView>
                </AppView>
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
                {lastPoint?.locationOfCustomer?.contactName}
              </AppText>
              <AppView rowAlignCenter>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                    color: COLOR.TEXT_CONTENT,
                    marginRight: 10,
                  }}>
                  {` | ${lastPoint?.locationOfCustomer?.contactPhone}`}
                </AppText>
                <SVG_NAME.ICON_PHONE />
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <AppView style={{...styles.lineBold, marginTop: 0}} />
      </View>
    </AppView>
  );
};

export default MapDirection;
