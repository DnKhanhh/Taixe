import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';

import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {deviceWidth} from 'utils/AppConst';
import AppButton from 'components/AppButton';
import {Section} from 'components/Section';
import moment from 'moment';

const ModalConfirmArrived = ({
  showModal,
  handelGetDetailsCurrentTrip,
  setShowModal,
  data,
  checkStatusArrived,
  distance,
}) => {
  const {t} = useTranslate();
  const status = [
    'journey_route_driver_status_not_sure',
    'journey_route_driver_status_arrived',
    'journey_route_driver_status_next',
  ];
  console.log('dis', distance);

  const [isArrived, setIsArrived] = useState(true);

  const onCheckNotArrived = data => {
    if (data === 'err') {
      setIsArrived(false);
    }
    // setShowModal(false);
  };

  // const timeOutModal = () => {
  //   const timeOut = setTimeout(() => {
  //     if (distance < 0.1) {
  //       console.log('test test test');
  //       checkStatusArrived(data?.id, status[0], () => {
  //         setShowModal(false);
  //       });
  //       handelGetDetailsCurrentTrip();
  //     } else {
  //       setShowModal(false);
  //     }
  //   }, 5000);
  //   return () => clearTimeout(timeOut);
  // };

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     if (distance < 0.1) {
  //       console.log('test test test');
  //       checkStatusArrived(data?.id, status[0], () => {
  //         setShowModal(false);
  //       });
  //       handelGetDetailsCurrentTrip();
  //     } else {
  //       setShowModal(false);
  //     }
  //   }, 5000);
  //   return () => clearTimeout(timeOut);
  // }, []);
  const test = 'journey_route_driver_status_arrived';
  return (
    <AppModal
      // timeOutModal={timeOutModal}
      iconClose={<SVG_NAME.ICON_CLOSE />}
      setShowAppModal={setShowModal}
      showAppModal={showModal}>
      <AppView margin={16}>
        <AppView alignCenter>
          <SVG_NAME.IC_INFO />
          <AppText
            style={[
              STYLE_GLOBAL.h6,
              {color: COLOR.POP_UP_SUCCESS},
              styles.popupTitle,
            ]}>
            Xác nhận đã đến địa điểm
          </AppText>
          <AppView marginBottom={32} alignCenter>
            <AppText style={{...STYLE_GLOBAL.body1}}>
              {isArrived && distance < 0.1
                ? 'Bạn đã đến địa điểm sau:'
                : 'Vị trí hiện tại của bạn khác với điểm đến. Bạn chắc chắn đã đến nơi?'}
            </AppText>
            <AppView
              backgroundColor={COLOR.COLOR_BACKGROUND_TEXT_INPUT}
              borderRadius={8}
              padding={12}
              marginTop={16}>
              <AppView marginBottom={10} rowAlignCenter>
                <AppView
                  style={{
                    backgroundColor:
                      data?.locationType === 'delivery'
                        ? COLOR.BLUE_SUPPORT_500
                        : COLOR.TOAST_WARNING_BORDER,
                    marginRight: 7,
                    paddingVertical: 1,
                    paddingHorizontal: 7,
                    borderRadius: 36,
                    borderWidth: 3,
                    borderColor: '#ffffff',
                  }}>
                  <AppText style={{...styles.text, color: '#ffffff'}}>
                    {data?.locNumber}
                  </AppText>
                </AppView>
                <AppView
                  rowAlignCenter
                  style={{
                    ...styles.itemType,
                    borderColor:
                      data?.locationType === 'delivery'
                        ? COLOR.BLUE_SUPPORT_500
                        : COLOR.TOAST_WARNING_BORDER,
                  }}>
                  {data?.locationType === 'delivery' ? (
                    <SVG_NAME.ARROW_LEFT />
                  ) : (
                    <SVG_NAME.ARROW_RIGHT />
                  )}
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.caption,
                      color:
                        data?.locationType === 'delivery'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                      marginLeft: 7,
                    }}>
                    {data?.locationType === 'delivery' ? 'Giao' : 'Nhận'}
                  </AppText>
                </AppView>
              </AppView>
              <AppView>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                    ...STYLE_GLOBAL.weight600,
                    color: COLOR.TEXT_CONTENT,
                  }}>
                  {data?.orderRoute?.locationOfCustomer?.buildingName},{' '}
                  {data?.orderRoute?.locationOfCustomer?.address},{' '}
                  {data?.orderRoute?.locationOfCustomer?.ward?.name},{' '}
                  {data?.orderRoute?.locationOfCustomer?.district?.name},{' '}
                  {data?.orderRoute?.locationOfCustomer?.city?.name}
                </AppText>
                <AppView rowAlignCenter>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body2,
                      color: COLOR.TEXT_CONTENT,
                    }}>
                    Thời gian dự kiến:
                  </AppText>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body2,
                      color: COLOR.TEXT_CONTENT,
                      marginLeft: 10,
                    }}>
                    {moment(data?.estimatedTime)
                      .utc()
                      .format('HH:mm DD/MM/YYYY')}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <AppButton
          styleTouchOpacity={{
            backgroundColor: COLOR.POP_UP_SUCCESS,
            borderColor: COLOR.POP_UP_SUCCESS,
            borderWidth: 1,
          }}
          title="Đã đến"
          onPress={() => {
            checkStatusArrived(data.id, test, data => {
              onCheckNotArrived(data);
              setShowModal(false);
            });
            handelGetDetailsCurrentTrip();
          }}
        />
        <AppButton
          style={{marginTop: 16}}
          styleText={{color: COLOR.POP_UP_SUCCESS}}
          styleTouchOpacity={{
            backgroundColor: COLOR.WHITE,
            borderColor: COLOR.POP_UP_SUCCESS,
            borderWidth: 1,
          }}
          title="Chưa đến"
          onPress={() => {
            checkStatusArrived(data.id, status[2], () => {
              setShowModal(false);
            });
          }}
        />
      </AppView>
    </AppModal>
  );
};

export default ModalConfirmArrived;

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
