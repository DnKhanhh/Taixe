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
import AppRadioButton from 'components/AppRadioButton';

const ModalConfirmDelivery = ({
  showModal,
  setShowModal,
  distance,
  checkStatusArrived,
  data,
  handelGetDetailsCurrentTrip,
}) => {
  const {t} = useTranslate();

  let DATA_OPTIONS = [
    {
      key: 1,
      title: 'Nhập số liệu giao hàng ngay',
    },
    {
      key: 2,
      title: 'Nhập số liệu giao hàng sau',
    },
  ];

  const status = [
    'journey_route_driver_status_not_sure',
    'journey_route_driver_status_arrived',
    'journey_route_driver_status_next',
  ];

  const onCheckNotArrived = data => {
    if (data === 'err') {
      setIsArrived(false);
    }
    setShowModal(false);
  };

  return (
    <AppModal
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
            Xác nhận giao hàng
          </AppText>
          <AppView marginBottom={32} alignCenter>
            <AppText
              style={[
                {...STYLE_GLOBAL.body1},
                {
                  marginBottom: 16,
                },
              ]}>
              Bạn đã thực hiện giao hàng thành công?
            </AppText>
            <AppRadioButton
              hasBorderFocus={true}
              data={DATA_OPTIONS}
              value={false}
              titleStyle={styles.text1RadioBtn}
              containerStyle={styles.radioButtonContainer}
              contentStyle={[styles.viewDisplayOptionOTP]}
              textStyle={styles.text2RadioBtn}
              onPress={res => console.log('res::::', res)}
            />
          </AppView>
        </AppView>
        <AppButton
          styleTouchOpacity={{
            backgroundColor: COLOR.POP_UP_SUCCESS,
            borderColor: COLOR.POP_UP_SUCCESS,
            borderWidth: 1,
          }}
          title="Đã giao"
          onPress={() => {
            checkStatusArrived(data.id, status[1], data => {
              onCheckNotArrived(data);
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
          title="Chưa giao xong"
          onPress={() => {
            setShowModal(false);
          }}
        />
      </AppView>
    </AppModal>
  );
};

export default ModalConfirmDelivery;

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
  text1RadioBtn: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '400',
    color: COLOR.TEXT_CONTENT,
  },
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  viewDisplayOptionOTP: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '100%',
  },
  text2RadioBtn: {
    ...STYLE_GLOBAL.body1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '700',
  },
});
