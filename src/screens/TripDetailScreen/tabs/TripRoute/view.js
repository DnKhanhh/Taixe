import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import {Section} from 'components/Section';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import NavigationServices from 'navigation/navigationServices';
import ModalRefuse from 'screens/TripDetailScreen/Modal/ModalRefuse';
import {SCENE_NAMES} from 'utils/AppConst';
import ModalConfirmGetOrder from 'screens/MyJourney/Modal/ModalConfirmGetOrder';
import moment from 'moment';
import {getSize} from 'utils/responsive';
import {t} from 'i18next';

const TripRoute = ({
  isRejectandRecallTrip,
  setShowModalGetOrder,
  showModalGetOrder,
  dataDetailTrip,
  isGoneTrip,
  handleUpdateTripStatus,
  handleUpdateTripAssignmentStatus,
}) => {
  const [showModalRefuse, setShowModalRefuse] = useState(false);

  const hourSetting = 6;
  const hourNow = 5;
  const hourPlan = 10;

  const hourCalculate = hourPlan - hourNow;
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
            : 'red'
        }
        paddingHorizontal={6}
        paddingVertical={1}>
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
                : 'red',
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
  const renderDescriptionInfo = (
    statusTrip,
    hourSetting,
    hourNow,
    hourPlan,
  ) => {
    return hourCalculate > hourSetting ? (
      <AppView />
    ) : (
      <AppView>
        <AppText
          style={{
            ...STYLE_GLOBAL.body2,
            color: COLOR.COLOR_BOTTOM_TAB_ACTIVE,
          }}>
          {statusTrip === 'journey_assignment_wait_accept'
            ? 'Vui lòng phản hồi trước: hh:mm dd/mm/yyyy'
            : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < hourSetting
            ? 'Bạn có thể bắt đầu chuyến đi'
            : statusTrip === 'journey_assignment_reject'
            ? 'Chủ xe chưa xác nhận. Bạn có thể chọn lại Nhận lệnh'
            : ''}
        </AppText>
      </AppView>
    );
  };
  return (
    <AppView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppView marginHorizontal={16} marginTop={10}>
          <AppView rowAlignCenter>
            {isGoneTrip
              ? renderTextStatusTripGone(dataDetailTrip?.statusId)
              : renderTextStatus(dataDetailTrip?.assignmentStatusId)}
            <AppView />
          </AppView>
          {!isGoneTrip &&
            !isRejectandRecallTrip &&
            renderDescriptionInfo(
              dataDetailTrip?.assignmentStatusId,
              hourSetting,
              hourNow,
              hourPlan,
            )}
        </AppView>
        <AppView style={styles.line} />
        <AppView margin={16}>
          <AppView rowAlignCenter>
            <AppView rowAlignCenter flex={1} wrap>
              <SVG_NAME.SYNCICON />
              <AppText
                style={{
                  ...STYLE_GLOBAL.subTitle2,
                  ...STYLE_GLOBAL.weight700,
                  color: COLOR.STATUS_SUCCESS_TEXT,
                  marginLeft: 16,
                }}>
                {dataDetailTrip?.journeyOrders?.order?.routeName ?? 'default'}{' '}
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  marginLeft: 10,
                  marginRight: 32,
                }}>
                | {dataDetailTrip?.journeyOrders?.order?.distance ?? 'default'}{' '}
                km
              </AppText>
            </AppView>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.DETAIL_TRIP_ROUTE_MAP);
              }}>
              <SVG_NAME.ICON_OPEN_MAP />
            </TouchableOpacity>
          </AppView>
        </AppView>
        <AppView style={{...styles.lineBold, marginTop: 0}} />

        <AppView style={styles.listTripContainer}>
          {dataDetailTrip?.journeyRoutes?.map((data, index) => (
            <AppView key={index}>
              <AppView
                rowAlignCenter
                paddingTop={12}
                paddingLeft={12}
                backgroundColor={COLOR.DASH_BOARD_BACKGROUND}>
                <AppView
                  style={{
                    backgroundColor:
                      data?.orderRoute?.locationType === 'pickup'
                        ? COLOR.BLUE_SUPPORT_500
                        : COLOR.TOAST_WARNING_BORDER,
                    paddingVertical: 1,
                    paddingHorizontal: 7,
                    borderRadius: 36,
                    borderWidth: 4,
                    borderColor: '#ffffff',
                  }}>
                  <AppText
                    style={{...STYLE_GLOBAL.caption, color: COLOR.WHITE}}>
                    {data?.locNumber ?? 'default'}
                  </AppText>
                </AppView>
                <AppView
                  rowAlignCenter
                  style={{
                    ...styles.itemType,
                    borderColor:
                      data?.orderRoute?.locationType === 'pickup'
                        ? COLOR.BLUE_SUPPORT_500
                        : COLOR.TOAST_WARNING_BORDER,
                    marginLeft: 7,
                  }}>
                  {data?.orderRoute?.locationType === 'pickup' ? (
                    <SVG_NAME.ARROW_LEFT />
                  ) : (
                    <SVG_NAME.ARROW_RIGHT />
                  )}

                  <AppText
                    style={{
                      ...STYLE_GLOBAL.caption,
                      color:
                        data?.orderRoute?.locationType === 'pickup'
                          ? COLOR.BLUE_SUPPORT_500
                          : COLOR.TOAST_WARNING_BORDER,
                      marginLeft: 7,
                    }}>
                    {data?.orderRoute?.locationType === 'pickup'
                      ? 'Giao'
                      : 'Nhận'}
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
                  <AppView paddingHorizontal={17}>
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
                          {moment(
                            data?.etaDatetime ?? new Date(),
                            'YYYY-MM-DD hh:mm:ss',
                          ).format('HH:mm DD-MM-YYYY')}
                        </AppText>
                      </AppView>
                    </AppView>
                  </AppView>
                }>
                <AppView>
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
                        {data?.assignedGoodWeight ?? 'default'}
                      </AppText>
                    </AppView>

                    <AppView row marginBottom={8}>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.GRAY5,
                          flex: 0.5,
                        }}>
                        Dịch vụ:
                      </AppText>
                      <AppView style={{flex: 0.5}} key={index}>
                        {data?.orderRoute?.routeServices?.map((data, index) => (
                          <AppText
                            style={{
                              ...STYLE_GLOBAL.body2,
                              color: COLOR.TEXT_CONTENT,
                            }}>
                            {data?.serviceCode ?? 'default'}
                          </AppText>
                        ))}
                      </AppView>
                    </AppView>

                    <AppView row marginBottom={8}>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body2,
                          color: COLOR.GRAY5,
                          flex: 0.5,
                        }}>
                        {/* {data?.orderRoute?.journeyRouteVehicle?.map((data, index) => (
                          <AppText
                            style={{
                              ...STYLE_GLOBAL.body2,
                              color: COLOR.TEXT_CONTENT,
                            }}>
                          </AppText>
                        ))} */}
                        {/* journeyRouteVehicle */}
                        Thu nhập:
                      </AppText>

                      <AppView style={{flex: 0.5}}>
                        <AppText
                          style={{
                            ...STYLE_GLOBAL.body2,
                            color: COLOR.TEXT_CONTENT,
                          }}>
                          Giấy nhận hàng
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
                    <AppView row marginBottom={8}>
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
                          {data?.orderRoute?.locationOfCustomer?.contactName ??
                            'default'}
                        </AppText>
                        <AppView rowAlignCenter>
                          <AppText
                            style={{
                              ...STYLE_GLOBAL.body2,
                              color: COLOR.TEXT_CONTENT,
                              marginRight: 10,
                            }}>
                            {data?.orderRoute?.locationOfCustomer
                              ?.contactPhone ?? 'default'}
                          </AppText>
                          <SVG_NAME.ICON_PHONE />
                        </AppView>
                      </AppView>
                    </AppView>
                  </AppView>
                </AppView>
              </Section>
            </AppView>
          ))}
        </AppView>

        <AppView rowAlignCenter marginHorizontal={16} marginTop={8}>
          <SVG_NAME.ICON_TEXT_FILE />
          <AppText
            style={{
              ...STYLE_GLOBAL.body1,
              color: COLOR.TEXT_CONTENT,
            }}>
            Ghi chú của chủ xe
          </AppText>
        </AppView>
        {!isGoneTrip && !isRejectandRecallTrip && (
          <>
            <AppView style={{...styles.lineBold, borderWidth: 10}} />
            <AppConfirmButton
              titleConfirm="Nhận lệnh"
              titleCancel="Từ chối"
              onPressConfirm={() => {
                setShowModalGetOrder(true);
              }}
              onPressCancel={() => setShowModalRefuse(true)}
              disabledConfirm={
                dataDetailTrip.assignmentStatusId ===
                  'journey_assignment_accepted' &&
                dataDetailTrip?.isTransporting
              }
              disableCancel={
                dataDetailTrip.assignmentStatusId ===
                'journey_assignment_reject'
                  ? true
                  : false
              }
            />
          </>
        )}
      </ScrollView>
      <ModalConfirmGetOrder
        dataItem={dataDetailTrip}
        showModal={showModalGetOrder}
        setShowModal={setShowModalGetOrder}
        hourCalculate={hourCalculate}
        hourSetting={hourSetting}
        handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
        handleUpdateTripStatus={handleUpdateTripStatus}
      />
      <ModalRefuse
        dataItem={dataDetailTrip}
        handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
        showModal={showModalRefuse}
        setShowModal={setShowModalRefuse}
      />
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTripContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
    borderRadius: 8,
  },
  moreInfoItem: {
    marginHorizontal: 28,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  line: {
    marginTop: 16,
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
  },
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },

  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
  text: {
    ...STYLE_GLOBAL.caption,
    color: '#F07F23',
  },
});
export default TripRoute;
