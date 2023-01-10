import React, {useState, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import ModalConfirmGetOrder from 'screens/MyJourney/Modal/ModalConfirmGetOrder';
import {getSize} from 'hooks/useIconSvgResizeHOC';

const TripItem = ({
  onPress,
  item,
  style,
  isGoneTrip = false,
  isContinueTrip = false,
  handleUpdateTripAssignmentStatus,
  handleUpdateTripStatus,
  index,
}) => {
  const {t} = useTranslate();
  const hourSetting = 6;
  const hourNow = 5;
  const hourPlan = 10;

  const hourCalculate = hourPlan - hourNow;

  const [showModalGetOrder, setShowModalGetOrder] = useState(false);
  const {width, height} = Dimensions.get('window');

  const renderTextStatusTripGone = statusTripGone => {
    return (
      <AppView
        rowAlignCenter
        backgroundColor={
          statusTripGone === 'journey_delivered' ? '#FDE5C0' : '#ccc'
        }
        paddingHorizontal={getSize.m(6)}
        paddingVertical={getSize.m(1)}>
        <AppText
          style={{
            ...STYLE_GLOBAL.body2,
            color:
              statusTripGone === 'journey_delivered'
                ? COLOR.STATUS_WARNING_TEXT
                : COLOR.GREEN_5,
          }}>
          {statusTripGone === 'journey_delivered'
            ? 'Đã giao / Chưa hoàn thành'
            : statusTripGone === 'journey_transport_complete'
            ? 'Hoàn thành'
            : 'Default'}
        </AppText>
      </AppView>
    );
  };

  const test1 = moment(item?.journeyRouteFirst?.etaDatetime);
  const test2 = moment(new Date());
  // console.log('test1', test1);
  // console.log('time', test2.diff(test1, 'minutes'));

  const timeConvert = time => {
    const num = time;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return (
      num + ' minutes = ' + rhours + ' hour(s) and ' + rminutes + ' minute(s).'
    );
  };
  // console.log('HOURS', timeConvert(50));
  // {moment(
  //   timeResponse ? timeResponse : new Date(),
  //   'YYYY-MM-DD hh:mm:ss',
  // ).format('HH:mm DD-MM-YYYY')}
  // 2022-12-25T10:15:00.000Z

  //2022-12-15T10:41:27.195Z
  const renderTextStatus = statusTrip => {
    return (
      <AppView
        rowAlignCenter
        backgroundColor={
          statusTrip === 'journey_assignment_wait_accept'
            ? COLOR.RED_200
            : statusTrip === 'journey_assignment_accepted'
            ? COLOR.BLUE_SUPPORT_200
            : statusTrip === 'journey_assignment_reject'
            ? COLOR.RED_200
            : statusTrip === 'journey_assignment_error'
            ? COLOR.BACKGROUND_GRAY
            : COLOR.BACKGROUND_GRAY
        }
        paddingHorizontal={getSize.m(6)}
        paddingVertical={getSize.m(1)}>
        <AppText
          style={{
            ...STYLE_GLOBAL.body2,
            color:
              statusTrip === 'journey_assignment_wait_accept'
                ? COLOR.RED_600
                : statusTrip === 'journey_assignment_accepted'
                ? COLOR.STATUS_DEFAULT_TEXT
                : statusTrip === 'journey_assignment_reject'
                ? COLOR.RED_600
                : statusTrip === 'journey_assignment_error'
                ? COLOR.TEXT_CONTENT
                : COLOR.TEXT_CONTENT,
          }}>
          {statusTrip === 'journey_assignment_wait_accept'
            ? 'Chưa nhận lệnh'
            : statusTrip === 'journey_assignment_accepted'
            ? 'Đã nhận lệnh'
            : statusTrip === 'journey_assignment_reject'
            ? 'Từ chối'
            : statusTrip === 'journey_assignment_error'
            ? 'Thu hồi'
            : 'Default'}
        </AppText>
      </AppView>
    );
  };
  const openModalConfirm = () => {
    setShowModalGetOrder(!showModalGetOrder);
  };
  const renderButton = (
    statusTrip,
    timeResponse,
    hourSetting,
    hourNow,
    hourPlan,
    openModalConfirm,
  ) => {
    return hourCalculate > hourSetting &&
      statusTrip === 'journey_assignment_accepted' ? (
      <AppView />
    ) : (
      <AppView rowAlignCenter space={'between'} marginTop={getSize.m(12)}>
        <AppView flex={1}>
          <AppText
            style={{
              ...STYLE_GLOBAL.body2,
              color: COLOR.COLOR_BOTTOM_TAB_ACTIVE,
            }}>
            {statusTrip === 'journey_assignment_wait_accept' ? (
              <AppView rowAlignCenter flex={1}>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body2,
                    color: COLOR.COLOR_BOTTOM_TAB_ACTIVE,
                  }}>
                  Vui lòng phản hồi trước:{' '}
                </AppText>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body2,
                    color:
                      hourCalculate <= 0
                        ? COLOR.POP_UP_DANGER
                        : COLOR.COLOR_BOTTOM_TAB_ACTIVE,
                  }}>
                  {moment(
                    timeResponse ? timeResponse : new Date(),
                    'YYYY-MM-DD hh:mm:ss',
                  ).format('HH:mm DD-MM-YYYY')}
                </AppText>
              </AppView>
            ) : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < 0 &&
              !item?.isTransporting ? (
              'Đã quá giờ dự kiến đến điểm đầu tiên. Hãy bắt đầu'
            ) : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < hourSetting &&
              !item?.isTransporting ? (
              'Bạn có thể bắt đầu chuyến đi'
            ) : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < hourSetting &&
              item?.isTransporting ? (
              'Bạn đang vận chuyển chuyến khác'
            ) : statusTrip === 'journey_assignment_reject' ? (
              'Chủ xe chưa xác nhận. Bạn có thể chọn lại Nhận lệnh'
            ) : (
              ''
            )}
          </AppText>
        </AppView>
        <TouchableOpacity
          disabled={
            statusTrip === 'journey_assignment_accepted' &&
            hourCalculate < hourSetting &&
            item?.isTransporting
              ? true
              : false
          }
          onPress={openModalConfirm}
          style={{
            paddingHorizontal: getSize.m(16),
            backgroundColor:
              statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < hourSetting &&
              item?.isTransporting
                ? '#ccc'
                : COLOR.COLOR_PRIMARY_SECOND,
            paddingVertical: getSize.m(4),
            borderRadius: getSize.m(4),
          }}>
          <AppText
            style={{
              ...STYLE_GLOBAL.body2,
              ...STYLE_GLOBAL.weight600,
              color: COLOR.WHITE,
            }}>
            {statusTrip === 'journey_assignment_wait_accept'
              ? 'Nhận lệnh'
              : statusTrip === 'journey_assignment_accepted' &&
                hourCalculate < hourSetting
              ? 'Bắt đầu'
              : statusTrip === 'journey_assignment_reject'
              ? 'Nhận lệnh'
              : ''}
          </AppText>
        </TouchableOpacity>
      </AppView>
    );
  };
  return (
    <AppView>
      {index !== 0 && (
        <AppView style={{...styles.lineBold, marginVertical: 10}} />
      )}
      <AppView style={[styles.container, style]}>
        <AppView style={styles.topContent}>
          <AppView rowAlignCenter space={'between'}>
            <AppView rowAlignCenter>
              <AppView
                style={[
                  styles.labelTypeView,
                  {
                    borderColor:
                      item?.journeyRouteFirst?.orderRoute?.locationType ===
                      'delivery'
                        ? COLOR.BLUE_SUPPORT_500
                        : COLOR.TOAST_WARNING_BORDER,
                  },
                ]}>
                <AppView>
                  {item?.journeyRouteFirst?.orderRoute?.locationType ===
                  'delivery' ? (
                    <SVG_NAME.ARROW_LEFT />
                  ) : (
                    <SVG_NAME.ARROW_RIGHT />
                  )}
                </AppView>
                <AppText
                  style={[
                    styles.caption,
                    {
                      color:
                        item?.journeyRouteFirst?.orderRoute?.locationType ===
                        'delivery'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                    },
                  ]}>
                  {item?.journeyRouteFirst?.orderRoute?.locationType ===
                  'delivery'
                    ? 'Giao'
                    : 'Nhận'}{' '}
                </AppText>
              </AppView>

              <AppView
                style={[
                  styles.pointView,
                  {
                    backgroundColor: COLOR.TOAST_WARNING_BORDER,
                    marginLeft: getSize.m(8),
                  },
                ]}>
                <AppText style={{...styles.text, color: '#ffffff'}}>
                  {item?.journeyRouteFirst?.locNumber ?? '0'}
                </AppText>
              </AppView>
            </AppView>

            <AppText ellipsizeMode="clip" numberOfLines={1}>
              - - - - - - - - - - - - - - - - - -
            </AppText>

            <AppView rowAlignCenter>
              <AppView
                style={[
                  styles.pointView,
                  {
                    backgroundColor: COLOR.BLUE_SUPPORT_500,
                    marginRight: getSize.m(8),
                  },
                ]}>
                <AppText style={{...styles.text, color: COLOR.WHITE}}>
                  {item?.journeyRouteLast?.locNumber ?? 'default'}
                </AppText>
              </AppView>
              <AppView
                style={[
                  styles.labelTypeView,
                  {
                    borderColor:
                      item?.journeyRouteLast?.orderRoute?.locationType ===
                      'delivery'
                        ? COLOR.BLUE_SUPPORT_500
                        : COLOR.TOAST_WARNING_BORDER,
                  },
                ]}>
                <AppView>
                  {item?.journeyRouteLast?.orderRoute?.locationType ===
                  'delivery' ? (
                    <SVG_NAME.ARROW_LEFT />
                  ) : (
                    <SVG_NAME.ARROW_RIGHT />
                  )}
                </AppView>
                <AppText
                  style={[
                    styles.caption,
                    {
                      color:
                        item?.journeyRouteLast?.orderRoute?.locationType ===
                        'delivery'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                    },
                  ]}>
                  {item?.journeyRouteLast?.orderRoute?.locationType ===
                  'delivery'
                    ? 'Giao'
                    : 'Nhận'}{' '}
                </AppText>
              </AppView>
            </AppView>
          </AppView>

          <AppView rowAlignCenter space={'between'} marginTop={getSize.m(8)}>
            <AppView rowAlignCenter>
              <AppText style={[styles.textPlace]}>
                {item?.journeyRouteFirst?.orderRoute?.locationOfCustomer
                  ?.locationName ?? 'default'}
              </AppText>
            </AppView>
            <AppView rowAlignCenter>
              <AppText style={[styles.textPlace]}>
                {item?.journeyRouteLast?.orderRoute?.locationOfCustomer
                  ?.locationName ?? 'default'}
              </AppText>
            </AppView>
          </AppView>

          <AppView rowAlignCenter space={'between'} marginTop={getSize.m(4)}>
            <AppText
              style={{
                ...STYLE_GLOBAL.body2,
                maxWidth: width / 2 - 31,
              }}
              numberOfLines={1}>
              {item?.journeyRouteFirst?.orderRoute?.locationOfCustomer
                ?.address ?? 'default'}
            </AppText>
            <AppText style={{...STYLE_GLOBAL.body2, maxWidth: width / 2 - 31}}>
              {item?.journeyRouteLast?.orderRoute?.locationOfCustomer
                ?.address ?? 'default'}
            </AppText>
          </AppView>
          <AppView
            rowAlignCenter
            space={'between'}
            marginVertical={getSize.m(9)}>
            {isGoneTrip
              ? renderTextStatusTripGone(item?.statusId)
              : renderTextStatus(item?.assignmentStatusId)}
            <TouchableOpacity onPress={() => onPress(item?.id)}>
              <AppView rowAlignCenter>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body2,
                    ...STYLE_GLOBAL.weight600,
                    color: COLOR.TEXT_IMAGE_UPLOAD,
                    marginRight: getSize.m(10),
                  }}>
                  Chi tiết
                </AppText>
                <SVG_NAME.ARROWRIGHTSMALL />
              </AppView>
            </TouchableOpacity>
          </AppView>
        </AppView>

        <AppView style={styles.mainContent}>
          <AppView
            rowAlignCenter
            marginTop={getSize.m(10)}
            spacing={getSize.m(8)}>
            <SVG_NAME.SYNCICON />
            <AppText style={styles.textBody1}>
              {item?.journeyOrders?.order?.routeName ?? '0'} điểm dừng
            </AppText>
            <AppText style={{...STYLE_GLOBAL.body1}}>
              {' '}
              | ( {item?.journeyOrders?.order?.distance ?? '0'} km)
            </AppText>
          </AppView>

          <AppView rowAlignCenter marginTop={getSize.m(10)} space={'between'}>
            <AppView rowAlignCenter spacing={getSize.m(8)}>
              <SVG_NAME.TIMEICON />
              <AppText
                style={[
                  STYLE_GLOBAL.body1,
                  STYLE_GLOBAL.color_textContent,
                ]}></AppText>
              <AppText
                style={[STYLE_GLOBAL.body1, {color: COLOR.TEXT_CONTENT}]}>
                {moment(
                  item?.journeyRouteFirst?.etaDatetime || new Date(),
                  'YYYY-MM-DD hh:mm:ss',
                ).format('HH:mm DD-MM-YYYY')}
              </AppText>
            </AppView>
            {isContinueTrip && (
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.POP_UP_DANGER,
                  marginLeft: getSize.m(9),
                }}>
                {hourCalculate <= hourSetting && hourCalculate > 0 ? (
                  `Còn ${hourCalculate} giờ`
                ) : (
                  <AppView />
                )}
              </AppText>
            )}
          </AppView>

          <AppView
            rowAlignCenter
            marginTop={getSize.m(10)}
            spacing={getSize.m(8)}>
            <SVG_NAME.INVENTORYICON />
            <AppText style={styles.textBody1}>
              {item?.vehicleGoods?.goodsType?.name ?? 'default'}
            </AppText>
            <AppText style={styles.textBody1}>|</AppText>
            <AppText style={styles.textBody1}>
              {item?.goodLoad ?? 'default'}
            </AppText>
          </AppView>

          <AppView
            row
            rowAlignCenter
            marginTop={getSize.m(10)}
            spacing={getSize.m(8)}>
            <SVG_NAME.TRUCKICON />
            <AppText style={styles.textBody1}>
              {item?.vehicleGroup?.name || 'Xe'}
            </AppText>
            <AppText style={styles.textBody1}>
              {item?.vehicle?.numberPlate || 'XXX-XXX.XX'}
            </AppText>
          </AppView>

          <AppView
            rowAlignCenter
            marginTop={getSize.m(10)}
            marginBottom={getSize.m(12)}
            spacing={getSize.m(8)}>
            <SVG_NAME.FILETEXTICON />
            <AppText style={styles.textBody1}>Ghi chú của chủ xe:</AppText>
            <AppText style={styles.textBody1}>
              {item?.journeyRouteFirst?.orderRoute?.locationOfCustomer
                ?.noteByTransporter ?? 'default'}
            </AppText>
          </AppView>
          {isGoneTrip ? (
            <AppView>
              <TouchableOpacity
                onPress={() => {
                  NavigationServices.navigate(SCENE_NAMES.COSTS_ADD, {
                    idTripGone: item?.id,
                  });
                }}>
                <AppView
                  row
                  rowAlignCenter
                  spacing={getSize.m(8)}
                  marginBottom={getSize.m(12)}>
                  <SVG_NAME.DOLLAR />
                  <AppText style={styles.textBody1}>Phát sinh:</AppText>
                  <AppText
                    style={[
                      STYLE_GLOBAL.body1,
                      STYLE_GLOBAL.weight600,
                      STYLE_GLOBAL.color_textContent,
                    ]}>
                    {item?.totalDriverJourneyCost || '0'} VNĐ
                  </AppText>
                  {item?.costFromDriverStatusId ===
                  'journey_cost_driver_active' ? (
                    <AppView />
                  ) : (
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: COLOR.BLUE_SUPPORT_500,
                        marginLeft: 9,
                      }}>
                      | Chưa duyệt
                    </AppText>
                  )}
                </AppView>
              </TouchableOpacity>

              {/* error */}
              {item?.transporterErrorNote === '' || null ? null : (
                <AppView row rowAlignCenter spacing={getSize.m(8)}>
                  <SVG_NAME.ERROR />
                  <AppText
                    style={[
                      STYLE_GLOBAL.body1,
                      {color: COLOR.STATUS_ERROR_TEXT},
                    ]}>
                    Lỗi:
                  </AppText>
                  <AppText
                    style={[
                      STYLE_GLOBAL.body1,
                      {color: COLOR.STATUS_ERROR_TEXT},
                    ]}>
                    {item?.transporterErrorNote}
                  </AppText>
                </AppView>
              )}
            </AppView>
          ) : (
            <AppView />
          )}
        </AppView>

        <AppView>
          {isContinueTrip &&
            renderButton(
              item?.assignmentStatusId,
              item?.journeyRouteFirst?.etaDatetime,
              hourSetting,
              hourNow,
              hourPlan,
              openModalConfirm,
            )}
        </AppView>
        <ModalConfirmGetOrder
          hourCalculate={hourCalculate}
          hourSetting={hourSetting}
          handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
          handleUpdateTripStatus={handleUpdateTripStatus}
          dataItem={item}
          showModal={showModalGetOrder}
          setShowModal={setShowModalGetOrder}
        />
      </AppView>
    </AppView>
  );
};
const styles = StyleSheet.create({
  mainContent: {},
  topContent: {
    backgroundColor: COLOR.GRAY_LIGHT_5,
    paddingHorizontal: getSize.m(16),
    paddingTop: getSize.m(10),
    paddingBottom: getSize.m(5),
    borderRadius: getSize.m(8),
    marginTop: getSize.m(12),
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textLight: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.TEXT_GREY,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dividerLine: {
    marginVertical: getSize.m(8),
    backgroundColor: COLOR.COLOR_BORDER,
    height: getSize.m(1),
  },
  marginLeft: {
    marginLeft: getSize.m(7),
  },
  marginRight: {
    marginRight: getSize.m(8),
  },
  text: {
    // ...STYLE_GLOBAL.caption,
    fontSize: getSize.m(12),
    color: '#F07F23',
  },

  textDefault: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.STATUS_DEFAULT_TEXT,
  },
  tagDefaultContainer: {
    backgroundColor: COLOR.COLOR_BACKGROUND_SELECTED,
    paddingHorizontal: getSize.m(6),
    paddingVertical: getSize.m(1),
    borderRadius: getSize.m(2),
  },
  title: {
    ...STYLE_GLOBAL.body1,
    ...STYLE_GLOBAL.weight700,
    color: COLOR.COLOR_PRIMARY,
  },
  container: {
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: getSize.m(12),
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
  lineBold: {
    height: getSize.v(10),
    backgroundColor: COLOR.COLOR_BACKGROUND_GRAY,
    opacity: 1,
  },
  textBody1: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.TEXT_CONTENT,
  },
  //
  pointView: {
    width: getSize.m(22),
    height: getSize.m(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getSize.m(35),
    borderWidth: getSize.m(2),
    borderColor: COLOR.COLOR_BACKGROUND,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  labelTypeView: {
    width: getSize.s(63),
    height: getSize.v(22),
    flexDirection: 'row',
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderWidth: getSize.m(1),
    borderRadius: getSize.m(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    ...STYLE_GLOBAL.caption,
  },
});
export default TripItem;
