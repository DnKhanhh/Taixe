import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import moment from 'moment';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {deviceWidth} from 'utils/AppConst';
import AppButton from 'components/AppButton';

const ModalConfirmGetOrder = ({
  showModal,
  setShowModal,
  hourSetting,
  handleUpdateTripAssignmentStatus,
  handleUpdateTripStatus,
  hourCalculate,
  dataItem,
}) => {
  // console.log("2", dataItem)
  const {t} = useTranslate();
  const assignmentStatusId = 'journey_assignment_accepted';
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
            {dataItem?.assignmentStatusId ===
              'journey_assignment_wait_accept' && hourCalculate < hourSetting
              ? 'Nhận lệnh'
              : 'Sẵn sàng'}
          </AppText>
          <AppText>
            Bạn sẵn sàng{' '}
            {dataItem?.assignmentStatusId ===
              'journey_assignment_wait_accept' && hourCalculate < hourSetting
              ? 'nhận lệnh'
              : 'bắt đầu'}{' '}
            chuyến đi sau
          </AppText>
        </AppView>
        <AppView style={styles.detailOrder}>
          <AppView rowAlignCenter space={'between'}>
            <AppView rowAlignCenter>
              <AppView
                rowAlignCenter
                style={{...styles.itemType, borderColor: '#F07F23'}}>
                <SVG_NAME.ARROW_RIGHT />
                <AppText style={[styles.text, styles.marginLeft]}>Nhận</AppText>
              </AppView>

              <AppView
                style={{
                  backgroundColor: '#F07F23',
                  marginLeft: 7,
                  paddingVertical: 1,
                  paddingHorizontal: 7,
                  borderRadius: 36,
                  borderWidth: 3,
                  borderColor: '#ffffff',
                }}>
                <AppText style={{...styles.text, color: '#ffffff'}}>
                  {dataItem?.journeyRouteFirst?.locNumber ?? 'default'}
                </AppText>
              </AppView>
            </AppView>
            {/* <AppText ellipsizeMode="clip" numberOfLines={1}>
              - - - - - - - - - - - - - - - - - -
            </AppText> */}
            <AppView rowAlignCenter>
              <AppView
                style={{
                  backgroundColor: COLOR.BLUE_SUPPORT_500,
                  marginRight: 7,
                  paddingVertical: 1,
                  paddingHorizontal: 7,
                  borderRadius: 36,
                  borderWidth: 3,
                  borderColor: '#ffffff',
                }}>
                <AppText style={{...styles.text, color: '#ffffff'}}>
                  {dataItem?.journeyRouteLast?.locNumber ?? 'default'}
                </AppText>
              </AppView>
              <AppView
                rowAlignCenter
                style={{...styles.itemType, borderColor: '#036FE3'}}>
                <SVG_NAME.ARROW_LEFT />
                <AppText
                  style={{
                    ...STYLE_GLOBAL.caption,
                    color: COLOR.BLUE_SUPPORT_500,
                    marginLeft: 7,
                  }}>
                  Giao
                </AppText>
              </AppView>
            </AppView>
          </AppView>
          <AppView rowAlignCenter space={'between'} marginTop={8}>
            <AppView rowAlignCenter>
              <AppText style={[styles.textPlace]}>
                {dataItem?.journeyRouteFirst?.orderRoute?.locationOfCustomer
                  ?.locationName ?? 'default'}
              </AppText>
            </AppView>
            <AppView rowAlignCenter>
              <AppText style={[styles.textPlace]}>
                {dataItem?.journeyRouteLast?.orderRoute?.locationOfCustomer
                  ?.locationName ?? 'default'}
              </AppText>
            </AppView>
          </AppView>

          <AppView rowAlignCenter space={'between'} marginTop={4}>
            <AppText
              style={{
                ...STYLE_GLOBAL.body2,
                maxWidth: deviceWidth / 2 - 31,
              }}
              numberOfLines={1}>
              {dataItem?.journeyRouteFirst?.orderRoute?.locationOfCustomer
                ?.address ?? 'default'}
            </AppText>
            <AppText
              style={{...STYLE_GLOBAL.body2, maxWidth: deviceWidth / 2 - 31}}>
              {dataItem?.journeyRouteLast?.orderRoute?.locationOfCustomer
                ?.address ?? 'default'}
            </AppText>
          </AppView>
        </AppView>
        <AppView space={'between'} row marginTop={12} marginBottom={32}>
          <AppView row>
            <SVG_NAME.IC_CLOCK />
            <AppText style={styles.marginLeft}>
              {moment(
                dataItem?.journeyRouteFirst?.etaDatetime ?? new Date(),
                'YYYY-MM-DD hh:mm:ss',
              ).format('HH:mm DD-MM-YYYY')}
            </AppText>
          </AppView>
          <AppText style={{color: COLOR.POP_UP_DANGER}}>
            13:00 ngày 04/04/2022
          </AppText>
        </AppView>
        <AppButton
          styleTouchOpacity={{
            backgroundColor: COLOR.POP_UP_SUCCESS,
            borderColor: COLOR.POP_UP_SUCCESS,
            borderWidth: 1,
          }}
          title={'Xác nhận'}
          onPress={() => {
            (dataItem?.assignmentStatusId ===
              'journey_assignment_wait_accept' &&
              hourCalculate < hourSetting) ||
            (dataItem?.assignmentStatusId === 'journey_assignment_reject' &&
              dataItem?.statusId === 'journey_assigned')
              ? handleUpdateTripAssignmentStatus(
                  dataItem?.id,
                  assignmentStatusId,
                )
              : handleUpdateTripStatus(dataItem?.id);
            setShowModal(false);
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
          title={'Huỷ bỏ'}
          onPress={() => {
            setShowModal(false);
          }}
        />
      </AppView>
    </AppModal>
  );
};

export default ModalConfirmGetOrder;

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
    ...STYLE_GLOBAL.weight600,
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
