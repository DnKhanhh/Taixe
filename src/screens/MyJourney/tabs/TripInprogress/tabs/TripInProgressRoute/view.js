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
import {t} from 'i18next';
import {getSize} from 'hooks/useIconSvgResizeHOC';

const TripInProgressRoute = ({
  onGoToDetail,
  setShowModalGetOrder,
  showModalGetOrder,
  TypeInputDataTrip,
  dataDetailCurrentTripInprogress,
}) => {
  const [showModalRefuse, setShowModalRefuse] = useState(false);
  // console.log(
  //   'check detail',
  //   dataDetailCurrentTripInprogress?.journeyRoutes.length,
  // );
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
            ? COLOR.STATUS_CLOSE_BACKGROUND
            : statusTrip === 'journey_assignment_error'
            ? COLOR.BACKGROUND_GRAY
            : COLOR.BACKGROUND_GRAY
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
                ? COLOR.TEXT_CONTENT
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
  return (
    <AppView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppView margin={16}>
          <AppView rowAlignCenter space={'between'}>
            <TouchableOpacity onPress={() => {}}>
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
                  {dataDetailCurrentTripInprogress?.id || '##'}
                </AppText>
              </AppView>
            </TouchableOpacity>
            <AppView rowAlignCenter paddingHorizontal={6} paddingVertical={1}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body2,
                  color: COLOR.COLOR_PRIMARY_THIRD,
                }}>
                {renderTextStatus(
                  dataDetailCurrentTripInprogress?.assignmentStatusId,
                ) || '##'}
              </AppText>
            </AppView>
          </AppView>
          <AppView row marginTop={getSize.m(10)}>
            <AppText
              style={{
                ...STYLE_GLOBAL.body2,
                color: COLOR.TEXT_CONTENT,
                marginRight: 5,
              }}>
              Điểm tiếp theo
            </AppText>
            <AppText
              style={{
                ...STYLE_GLOBAL.buttonMedium,
                color: COLOR.TEXT_CONTENT,
                flex: 1,
              }}>
              (3) Kho ABC - 111 Hoàng Văn Thụ, P 2, Q. Tân Bình, Tp HCM
            </AppText>
          </AppView>
        </AppView>

        <AppView style={{...styles.lineBold, marginTop: 0}} />

        <AppView style={styles.listTripContainer}>
          {dataDetailCurrentTripInprogress?.journeyRoutes?.map(
            (dataItem, index) => {
              return (
                <AppView key={index}>
                  <AppView
                    rowAlignCenter
                    paddingTop={12}
                    paddingLeft={12}
                    backgroundColor={
                      dataItem?.statusId === 'journey_route_done'
                        ? COLOR.BLUE_SUPPORT_100
                        : dataItem?.statusId === 'journey_route_processing'
                        ? COLOR.GREEN_4
                        : COLOR.DASH_BOARD_BACKGROUND
                    }>
                    <AppView
                      rowAlignCenter
                      backgroundColor={COLOR.DASH_BOARD_BACKGROUND}>
                      <AppView
                        style={{
                          backgroundColor:
                            dataItem?.orderRoute?.locationType === 'delivery'
                              ? COLOR.BLUE_SUPPORT_500
                              : COLOR.TOAST_WARNING_BORDER,
                          paddingVertical: 1,
                          paddingHorizontal: 7,
                          borderRadius: 36,
                          borderWidth: 4,
                          borderColor: '#ffffff',
                        }}>
                        <AppText style={{...styles.text, color: '#ffffff'}}>
                          {dataItem?.locNumber ?? 'default'}{' '}
                        </AppText>
                      </AppView>

                      <AppView
                        rowAlignCenter
                        style={{
                          ...styles.itemType,
                          borderColor:
                            dataItem?.orderRoute?.locationType === 'delivery'
                              ? COLOR.BLUE_SUPPORT_500
                              : COLOR.TOAST_WARNING_BORDER,
                          marginLeft: 7,
                        }}>
                        <AppView>
                          {dataItem?.orderRoute?.locationType === 'delivery' ? (
                            <SVG_NAME.ARROW_LEFT />
                          ) : (
                            <SVG_NAME.ARROW_RIGHT />
                          )}
                        </AppView>
                        <AppText
                          style={{
                            ...STYLE_GLOBAL.caption,
                            color:
                              dataItem?.orderRoute?.locationType === 'delivery'
                                ? COLOR.BLUE_SUPPORT_500
                                : COLOR.TOAST_WARNING_BORDER,
                            marginLeft: 7,
                          }}>
                          {dataItem?.orderRoute?.locationType === 'delivery'
                            ? 'Giao'
                            : 'Nhận'}{' '}
                        </AppText>
                      </AppView>
                    </AppView>
                    {dataItem?.statusId === 'journey_route_accepted' ? (
                      <AppView />
                    ) : (
                      <AppView
                        rowAlignCenter
                        paddingHorizontal={6}
                        paddingVertical={1}
                        marginLeft={8}
                        backgroundColor={
                          dataItem?.statusId === 'journey_route_done'
                            ? COLOR.BLUE_SUPPORT_200
                            : dataItem?.statusId === 'journey_route_processing'
                            ? '#CDF3C6'
                            : ''
                        }>
                        <AppText
                          style={{
                            ...STYLE_GLOBAL.body2,
                            color:
                              dataItem?.statusId === 'journey_route_done'
                                ? COLOR.STATUS_DEFAULT_TEXT
                                : dataItem?.statusId ===
                                  'journey_route_processing'
                                ? COLOR.COLOR_PRIMARY_THIRD
                                : '',
                          }}>
                          {dataItem?.statusId === 'journey_route_done'
                            ? 'Đã nhận'
                            : dataItem?.statusId === 'journey_route_processing'
                            ? 'Đang giao'
                            : ''}
                        </AppText>
                      </AppView>
                    )}
                  </AppView>
                  <Section
                    isTripRouteTab={true}
                    isDivider={false}
                    newBackground={
                      dataItem?.statusId === 'journey_route_done'
                        ? COLOR.BLUE_SUPPORT_100
                        : dataItem?.statusId === 'journey_route_processing'
                        ? COLOR.GREEN_4
                        : COLOR.DASH_BOARD_BACKGROUND
                    }
                    changeBackground
                    icon={<SVG_NAME.ICON_DOWN_DOUBLE />}
                    openDefault={true}
                    customHeader={
                      <AppView paddingHorizontal={17}>
                        <AppView>
                          <AppText
                            style={{
                              ...STYLE_GLOBAL.body1,
                              ...STYLE_GLOBAL.weight600,
                              color: COLOR.TEXT_CONTENT,
                            }}>
                            {
                              dataItem?.orderRoute?.locationOfCustomer
                                ?.buildingName
                            }
                            ,{' '}
                            {dataItem?.orderRoute?.locationOfCustomer?.address},{' '}
                            {
                              dataItem?.orderRoute?.locationOfCustomer?.ward
                                ?.name
                            }
                            ,{' '}
                            {
                              dataItem?.orderRoute?.locationOfCustomer?.district
                                ?.name
                            }
                            ,{' '}
                            {
                              dataItem?.orderRoute?.locationOfCustomer?.city
                                ?.name
                            }
                          </AppText>
                          <AppView rowAlignCenter>
                            <AppText
                              style={{
                                ...STYLE_GLOBAL.body2,
                                color: COLOR.GRAY5,
                                flex: 0.5,
                              }}>
                              {dataItem?.statusId === 'journey_route_done'
                                ? 'Đã nhận lúc'
                                : 'Thời gian dự kiến'}
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
                      </AppView>
                    }>
                    <AppView style={styles.moreInfoItem}>
                      <AppView
                        rowAlignCenter
                        marginBottom={8}
                        backgroundColor={'white'}
                        space={'between'}
                        paddingVertical={4}
                        paddingHorizontal={8}
                        radius={8}>
                        <AppText
                          style={{
                            ...STYLE_GLOBAL.body2,
                            color: COLOR.TEXT_CONTENT,
                          }}>
                          Thực{' '}
                          {dataItem?.orderRoute?.locationType === 'delivery'
                            ? 'giao'
                            : 'nhận'}
                          :
                        </AppText>
                        <AppText
                          style={{
                            ...STYLE_GLOBAL.body2,
                            color: COLOR.BLUE_7,
                          }}>
                          {dataItem?.statusId === 'journey_route_done'
                            ? '30 Tấn'
                            : '-------'}
                        </AppText>
                        <SVG_NAME.ICON_TEXT_FILE />
                      </AppView>
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
                          30 Tấn
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

                        <AppView style={{flex: 0.5}}>
                          <AppText
                            style={{
                              ...STYLE_GLOBAL.body2,
                              color: COLOR.TEXT_CONTENT,
                            }}>
                            Bốc dỡ hàng
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
                              ...STYLE_GLOBAL.weight600,
                              color: COLOR.TEXT_CONTENT,
                            }}>
                            {dataItem?.orderRoute?.locationOfCustomer
                              ?.contactName ?? 'default'}{' '}
                          </AppText>
                          <AppView rowAlignCenter>
                            <AppText
                              style={{
                                ...STYLE_GLOBAL.body2,
                                color: COLOR.TEXT_CONTENT,
                                marginRight: 10,
                              }}>
                              {dataItem?.orderRoute?.locationOfCustomer
                                ?.contactPhone ?? 'default'}{' '}
                            </AppText>
                            <SVG_NAME.ICON_PHONE />
                          </AppView>
                        </AppView>
                      </AppView>
                      <AppView rowAlignCenter space={'between'}>
                        <AppView />

                        <TouchableOpacity
                          onPress={() => {
                            if (dataItem?.statusId === 'journey_route_done')
                              TypeInputDataTrip(dataItem);
                            // if (
                            //   dataItem?.statusId === 'journey_route_processing'
                            // )
                            //   TypeInputDataTrip(dataItem);
                          }}>
                          {dataItem?.statusId === 'journey_route_accepted' ||
                          dataItem?.statusId === null ? (
                            <AppView />
                          ) : (
                            <AppView
                              rowAlignCenter
                              backgroundColor={
                                dataItem?.statusId === 'journey_route_done'
                                  ? COLOR.WHITE
                                  : COLOR.POP_UP_SUCCESS
                              }
                              paddingHorizontal={8}
                              paddingVertical={4}
                              borderWidth={1}
                              borderColor={COLOR.POP_UP_SUCCESS}
                              borderRadius={4}>
                              <AppText
                                style={{
                                  ...STYLE_GLOBAL.body2,
                                  ...STYLE_GLOBAL.weight600,
                                  color:
                                    dataItem?.statusId === 'journey_route_done'
                                      ? COLOR.POP_UP_SUCCESS
                                      : COLOR.WHITE,
                                }}>
                                {dataItem?.statusId === 'journey_route_done'
                                  ? 'Nhập liệu'
                                  : dataItem?.statusId ===
                                    'journey_route_processing'
                                  ? 'Đã đến'
                                  : ''}
                              </AppText>
                            </AppView>
                          )}
                        </TouchableOpacity>
                      </AppView>
                    </AppView>
                  </Section>
                </AppView>
              );
            },
          )}
        </AppView>
        <AppView rowAlignCenter marginHorizontal={16} marginTop={8}>
          <SVG_NAME.ICON_TEXT_FILE marginRight={10} />
          <AppText
            style={{
              ...STYLE_GLOBAL.body1,
              color: COLOR.TEXT_CONTENT,
            }}>
            Ghi chú của chủ xe
          </AppText>
        </AppView>
        <AppView style={{...styles.lineBold, borderWidth: 10}} />
        <AppConfirmButton
          titleConfirm="Báo cáo sự cố"
          hasCancelButton={false}
          onPressConfirm={() => {
            NavigationServices.navigate(
              SCENE_NAMES.REPORT_TROUBLE_TRIP_SCREEN,
              {
                dataDetailTrip: dataDetailCurrentTripInprogress,
              },
            );
          }}
        />
      </ScrollView>
      {/* <ModalConfirmGetOrder
        showModal={showModalGetOrder}
        setShowModal={setShowModalGetOrder}
      /> */}
      <ModalRefuse
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

    // borderLeftWidth: 1,
    // borderLeftColor: 'red',
    // borderStyle: 'dashed',
    // border,
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
export default TripInProgressRoute;
