import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import AppImage from 'components/AppImage';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import {t} from 'i18next';
import ModalRefuse from 'screens/TripDetailScreen/Modal/ModalRefuse';
import ModalConfirmGetOrder from 'screens/MyJourney/Modal/ModalConfirmGetOrder';
import moment from 'moment';

const TripInfo = ({
  isGoneTrip,
  isRejectandRecallTrip,
  onGoToDetail,
  setShowModalGetOrder,
  showModalGetOrder,
  dataDetailTrip,
  handleUpdateTripAssignmentStatus,
  handleUpdateTripStatus,
}) => {
  const hourSetting = 6;
  const hourNow = 5;
  const hourPlan = 10;
  console.log('zzzzaa', dataDetailTrip.assignmentStatusId);
  // const hourCalculate = Math.abs(hourPlan - hourNow);
  const hourCalculate = hourPlan - hourNow;
  const [showModalRefuse, setShowModalRefuse] = useState(false);
  const renderNameButton = (statusTrip, hourSetting, hourNow, hourPlan) => {
    if (statusTrip === 'journey_assignment_wait_accept') return 'Nhận lệnh';
    if (
      statusTrip === 'journey_assignment_accepted' &&
      hourCalculate < hourSetting
    )
      return 'Bắt đầu';
    if (statusTrip === 'journey_assignment_reject') return 'Nhận lệnh';
    return 'default';
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
  const renderDescriptionInfo = (
    statusTrip,
    hourSetting,
    hourNow,
    hourPlan,
    timeStart,
  ) => {
    return hourCalculate > hourSetting &&
      statusTrip === 'journey_assignment_accepted' ? (
      <AppView />
    ) : (
      <AppView rowAlignCenter space={'between'} marginTop={12}>
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
                    dataDetailTrip?.journeyRouteFirst?.etaDatetime ??
                      new Date(),
                    'YYYY-MM-DD hh:mm:ss',
                  ).format('HH:mm DD-MM-YYYY')}
                </AppText>
              </AppView>
            ) : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < 0 &&
              !dataDetailTrip?.isTransporting ? (
              'Đã quá giờ dự kiến đến điểm đầu tiên. Hãy bắt đầu'
            ) : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < hourSetting &&
              !dataDetailTrip?.isTransporting ? (
              'Bạn có thể bắt đầu chuyến đi'
            ) : statusTrip === 'journey_assignment_accepted' &&
              hourCalculate < hourSetting &&
              dataDetailTrip?.isTransporting ? (
              'Bạn đang vận chuyển chuyến khác'
            ) : statusTrip === 'journey_assignment_reject' ? (
              'Chủ xe chưa xác nhận. Bạn có thể chọn lại Nhận lệnh'
            ) : (
              ''
            )}
          </AppText>
        </AppView>
      </AppView>
    );
  };
  return (
    <AppView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppView marginHorizontal={16}>
          <AppView rowAlignCenter space={'between'} marginVertical={9}>
            <TouchableOpacity>
              <AppView rowAlignCenter>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                    color: COLOR.COLOR_TEXT_TITLE_INTRO,

                    marginRight: 10,
                  }}>
                  Mã chuyến
                </AppText>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.buttonLarge,
                    color: COLOR.STATUS_SUCCESS_TEXT,

                    marginRight: 10,
                  }}>
                  {dataDetailTrip?.id ?? 'default'}
                </AppText>
              </AppView>
            </TouchableOpacity>
            {isGoneTrip
              ? renderTextStatusTripGone(dataDetailTrip?.statusId)
              : renderTextStatus(dataDetailTrip.assignmentStatusId)}
          </AppView>
          {!isGoneTrip &&
            !isRejectandRecallTrip &&
            renderDescriptionInfo(
              dataDetailTrip?.assignmentStatusId,
              hourSetting,
              hourNow,
              hourPlan,
              dataDetailTrip?.journeyRouteFirst?.etaDatetime,
            )}
        </AppView>
        <AppView style={styles.line} />

        <AppView marginHorizontal={16}>
          <AppView rowAlignCenter marginTop={10}>
            <AppView rowAlignCenter>
              <SVG_NAME.TIMEICON />
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  marginLeft: 9,
                }}>
                {moment(
                  dataDetailTrip?.journeyRouteFirst?.etaDatetime ?? new Date(),
                  'YYYY-MM-DD hh:mm:ss',
                ).format('HH:mm DD-MM-YYYY')}
              </AppText>
            </AppView>
          </AppView>
          <AppView rowAlignCenter marginTop={10}>
            <SVG_NAME.INVENTORYICON />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 9,
              }}>
              {dataDetailTrip?.vehicleGoods?.goodsType?.name ?? 'default'}
            </AppText>
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 9,
              }}>
              | {dataDetailTrip?.goodLoad ?? 'default'} |
            </AppText>
            <SVG_NAME.ICON_DEFEND marginHorizontal={10} />
            <SVG_NAME.ICON_UNIT />
            <TouchableOpacity onPress={() => onGoToDetail()}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body2,
                  ...STYLE_GLOBAL.weight600,
                  color: COLOR.BLUE_SUPPORT_500,
                  marginLeft: 9,
                }}>
                Chi tiết
              </AppText>
            </TouchableOpacity>
          </AppView>
          <AppView rowAlignCenter marginTop={10}>
            <SVG_NAME.TRUCKICON />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 9,
              }}>
              {dataDetailTrip?.vehicle?.numberPlate ?? 'default'}
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.lineBold} />
        <AppText
          style={{
            ...STYLE_GLOBAL.subTitle2,
            ...STYLE_GLOBAL.weight700,
            color: COLOR.BLUE_7,
            margin: 16,
          }}>
          Dịch vụ chung
        </AppText>
        <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />
        <AppView margin={16}>
          <AppView rowAlignCenter>
            <AppView
              style={{
                width: 5,
                height: 5,
                borderRadius: 50,
                borderWidth: 2,
                backgroundColor: 'black',
              }}
            />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 10,
              }}>
              Dịch vụ 1
            </AppText>
          </AppView>
          <AppView rowAlignCenter>
            <AppView
              style={{
                width: 5,
                height: 5,
                borderRadius: 50,
                borderWidth: 2,
                backgroundColor: 'black',
              }}
            />
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                color: COLOR.TEXT_CONTENT,
                marginLeft: 10,
              }}>
              Dịch vụ 2
            </AppText>
          </AppView>
        </AppView>
        <AppView style={{...styles.lineBold, marginTop: 0}} />
        <AppText
          style={{
            ...STYLE_GLOBAL.subTitle2,
            ...STYLE_GLOBAL.weight700,
            color: COLOR.BLUE_7,
            margin: 16,
          }}>
          Giấy tờ tham khảo (của chủ hàng)
        </AppText>
        <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />

        <AppView style={{...styles.line, marginTop: 0}} />
        {dataDetailTrip &&
          dataDetailTrip?.journeyOrders?.order?.orderDocumentFile?.map(
            (item, index) => {
              return (
                <AppView margin={16} key={index}>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      color: COLOR.TEXT_CONTENT,
                    }}>
                    Giấy tờ chứng nhận (
                    {
                      dataDetailTrip?.journeyOrders?.order?.orderDocumentFile
                        ?.length
                    }
                    )
                  </AppText>
                  <AppView rowAlignCenter wrap marginTop={10}>
                    <AppView column alignCenter>
                      <AppView
                        padding={9}
                        borderColor={COLOR.TEXT_IMAGE_UPLOAD}
                        borderWidth={1}
                        borderStyle={'dashed'}
                        marginRight={12}
                        borderRadius={8}>
                        <AppImage
                          source={
                            item?.document?.url
                              ? {uri: item?.document?.url}
                              : require('assets/images/dashboard.png')
                          }
                          style={{
                            width: getSize.s(90),
                            height: getSize.s(90),
                            borderRadius: 8,
                          }}
                        />
                      </AppView>
                      <AppText
                        numberOfLines={1}
                        style={{
                          ...STYLE_GLOBAL.body1,
                          color: COLOR.TEXT_CONTENT,
                          marginTop: 5,
                          maxWidth: 100,
                        }}>
                        {item?.document?.name}
                      </AppText>
                    </AppView>
                  </AppView>
                </AppView>
              );
            },
          )}
        {!isGoneTrip && !isRejectandRecallTrip && (
          <>
            <AppView
              style={{...styles.lineBold, marginTop: 0, marginVertical: 10}}
            />

            <AppConfirmButton
              titleCancel="Từ chối"
              titleConfirm={renderNameButton(
                dataDetailTrip.assignmentStatusId,
                hourSetting,
                hourNow,
                hourPlan,
              )}
              style={styles.buttonConfirm}
              title={t('common:button.confirm')}
              onPressCancel={() => {
                setShowModalRefuse(true);
              }}
              onPressConfirm={() => {
                setShowModalGetOrder(true);
              }}
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
        showModal={showModalGetOrder}
        setShowModal={setShowModalGetOrder}
        hourCalculate={hourCalculate}
        hourSetting={hourSetting}
        handleUpdateTripAssignmentStatus={handleUpdateTripAssignmentStatus}
        handleUpdateTripStatus={handleUpdateTripStatus}
        dataItem={dataDetailTrip}
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
});
export default TripInfo;
