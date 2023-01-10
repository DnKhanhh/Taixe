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
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import {t} from 'i18next';
import ModalRefuse from 'screens/TripDetailScreen/Modal/ModalRefuse';
import ModalConfirmGetOrder from 'screens/MyJourney/Modal/ModalConfirmGetOrder';
import moment from 'moment';
import {getAddressNameFromAPI} from 'utils/appUtils';
const TripInProgressInfo = ({
  onGoToDetail,
  setShowModalGetOrder,
  showModalGetOrder,
  dataCurrentTripInprogress,
}) => {
  // const [showModalRefuse, setShowModalRefuse] = useState(false);
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
        paddingHorizontal={getSize.m(6)}
        paddingVertical={getSize.m(1)}>
        <AppText
          style={[
            STYLE_GLOBAL.body2,
            {
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
            },
          ]}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        marginBottom={getSize.m(16)}>
        <AppView margin={getSize.m(16)}>
          <AppView row rowAlignCenter space={'between'}>
            <TouchableOpacity onPress={() => {}}>
              <AppView rowAlignCenter>
                <AppText
                  style={[
                    STYLE_GLOBAL.body1,
                    {
                      color: COLOR.COLOR_TEXT_TITLE_INTRO,
                      marginRight: getSize.m(10),
                    },
                  ]}>
                  Mã chuyến
                </AppText>
                <AppText
                  style={[
                    STYLE_GLOBAL.buttonLarge,
                    {
                      color: COLOR.STATUS_SUCCESS_TEXT,
                      marginRight: getSize.m(10),
                    },
                  ]}>
                  {dataCurrentTripInprogress?.id || '###'}
                </AppText>
              </AppView>
            </TouchableOpacity>
            <AppView
              paddingHorizontal={getSize.m(8)}
              paddingVertical={getSize.m(1)}>
              <AppText
                style={[
                  STYLE_GLOBAL.body2,
                  {color: COLOR.STATUS_WAITING_TEXT},
                ]}>
                {renderTextStatus(
                  dataCurrentTripInprogress?.assignmentStatusId,
                ) || '##'}
              </AppText>
            </AppView>
          </AppView>
          <AppView row marginTop={getSize.m(10)}>
            <AppText
              style={[
                STYLE_GLOBAL.body2,
                {color: COLOR.TEXT_CONTENT, marginRight: getSize.m(5)},
              ]}>
              Điểm tiếp theo
            </AppText>
            <AppText
              style={[
                STYLE_GLOBAL.buttonMedium,
                {color: COLOR.TEXT_CONTENT, flex: 1},
              ]}>
              {/* {getAddressNameFromAPI(
                dataCurrentTripInprogress?.journeyRoutes[1]?.orderRoute
                  ?.locationOfCustomer,
              )} */}
            </AppText>
          </AppView>
        </AppView>
        <AppView style={[styles.line, {marginTop: 0}]} />

        <AppView marginHorizontal={getSize.m(16)}>
          <AppView rowAlignCenter marginTop={getSize.m(10)} space={'between'}>
            <AppView rowAlignCenter>
              <SVG_NAME.TIMEICON />
              <AppText
                style={[
                  STYLE_GLOBAL.body1,
                  {color: COLOR.TEXT_CONTENT, marginLeft: getSize.m(9)},
                ]}>
                {moment(
                  dataCurrentTripInprogress?.journeyRouteFirst?.etaDatetime ??
                    new Date(),
                  'YYYY-MM-DD hh:mm:ss',
                ).format('HH:mm DD-MM-YYYY')}
              </AppText>
            </AppView>
          </AppView>
          <AppView rowAlignCenter marginTop={getSize.m(10)}>
            <SVG_NAME.INVENTORYICON />
            <AppText
              style={[
                STYLE_GLOBAL.body1,
                {color: COLOR.TEXT_CONTENT, marginLeft: getSize.m(9)},
              ]}>
              {dataCurrentTripInprogress?.vehicleGoods?.goodsType?.name ??
                'default'}
            </AppText>
            <AppText
              style={[
                STYLE_GLOBAL.body1,
                {color: COLOR.TEXT_CONTENT, marginLeft: getSize.m(9)},
              ]}>
              | {dataCurrentTripInprogress?.goodLoad ?? 'default'} |
            </AppText>
            <SVG_NAME.ICON_DEFEND marginHorizontal={getSize.m(10)} />
            <SVG_NAME.ICON_UNIT />
            <TouchableOpacity onPress={() => {}}>
              <AppText
                style={[
                  STYLE_GLOBAL.body2,
                  STYLE_GLOBAL.weight600,
                  {color: COLOR.BLUE_SUPPORT_500, marginLeft: getSize.m(9)},
                ]}>
                Chi tiết
              </AppText>
            </TouchableOpacity>
          </AppView>
          <AppView
            rowAlignCenter
            marginTop={getSize.m(10)}
            spacing={getSize.m(8)}>
            <SVG_NAME.TRUCKICON />
            <AppText style={[STYLE_GLOBAL.body1, {color: COLOR.TEXT_CONTENT}]}>
              {dataCurrentTripInprogress?.vehicleGroup?.name || 'Xe'}:
            </AppText>
            <AppText style={[STYLE_GLOBAL.body1, {color: COLOR.TEXT_CONTENT}]}>
              {dataCurrentTripInprogress?.vehicle?.numberPlate ?? 'default'}
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.lineBold} />
        <AppText
          style={[
            STYLE_GLOBAL.subTitle2,
            STYLE_GLOBAL.weight700,
            {color: COLOR.BLUE_7, margin: getSize.m(16)},
          ]}>
          Dịch vụ chung
        </AppText>
        <AppView
          style={[styles.lineBold, {borderWidth: getSize.m(1), marginTop: 0}]}
        />
        {dataCurrentTripInprogress?.journeyRoutes?.map((item, index) => (
          <AppView key={index} margin={getSize.m(16)}>
            <AppView rowAlignCenter>
              <AppView
                style={{
                  width: getSize.s(5),
                  height: getSize.v(5),
                  borderRadius: getSize.m(50),
                  borderWidth: getSize.m(2),
                  backgroundColor: COLOR.BLACK,
                }}
              />
              <AppText
                style={[
                  STYLE_GLOBAL.body1,
                  {color: COLOR.TEXT_CONTENT, marginLeft: getSize.m(10)},
                ]}>
                {item?.orderRoute?.routeServices?.map(
                  item => item?.serviceType?.name,
                )}
              </AppText>
            </AppView>
          </AppView>
        ))}

        <AppView style={[styles.lineBold, {marginTop: 0}]} />
        <AppText
          style={[
            STYLE_GLOBAL.subTitle2,
            STYLE_GLOBAL.weight700,
            {color: COLOR.BLUE_7, margin: getSize.m(16)},
          ]}>
          Giấy tờ tham khảo (của chủ hàng)
        </AppText>
        <AppView style={[styles.lineBold, {borderWidth: 1, marginTop: 0}]} />
        {dataCurrentTripInprogress &&
          dataCurrentTripInprogress?.journeyOrders?.order?.orderDocumentFile?.map(
            (item, index) => {
              return (
                <AppView margin={getSize.m(16)} key={index}>
                  <AppText
                    style={[STYLE_GLOBAL.body1, {color: COLOR.TEXT_CONTENT}]}>
                    Giấy tờ nhận hàng (
                    {
                      dataCurrentTripInprogress?.journeyOrders?.order
                        ?.orderDocumentFile?.length
                    }
                    )
                  </AppText>
                  <AppView rowAlignCenter wrap marginTop={getSize.m(10)}>
                    <AppView column alignCenter>
                      <AppView
                        padding={getSize.m(9)}
                        borderColor={COLOR.TEXT_IMAGE_UPLOAD}
                        borderWidth={getSize.m(1)}
                        borderStyle={'dashed'}
                        marginRight={getSize.m(12)}
                        borderRadius={getSize.m(8)}>
                        <AppImage
                          source={
                            item?.document?.url
                              ? {uri: item?.document?.url}
                              : require('assets/images/dashboard.png')
                          }
                          style={{
                            width: getSize.s(90),
                            height: getSize.v(90),
                            borderRadius: getSize.m(8),
                          }}
                        />
                      </AppView>
                      <AppText
                        numberOfLines={1}
                        style={[
                          STYLE_GLOBAL.body1,
                          {
                            color: COLOR.TEXT_CONTENT,
                            marginTop: getSize.m(5),
                            maxWidth: getSize.m(100),
                          },
                        ]}>
                        {item?.document?.name}
                      </AppText>
                    </AppView>
                  </AppView>
                </AppView>
              );
            },
          )}
        <AppView
          style={{
            ...styles.lineBold,
            marginTop: 0,
            marginVertical: getSize.m(10),
          }}
        />
        <AppView row space={'between'} wrap>
          <AppText
            style={{
              ...STYLE_GLOBAL.subTitle2,
              ...STYLE_GLOBAL.weight700,
              color: COLOR.BLUE_7,
              margin: getSize.m(16),
            }}>
            Chi phí phát sinh(VNĐ)
          </AppText>
          <AppText
            // wrap
            style={[
              STYLE_GLOBAL.subTitle2,
              STYLE_GLOBAL.weight700,
              {color: COLOR.BLUE_7, margin: getSize.m(16)},
            ]}>
            100000000 VNĐ
          </AppText>
        </AppView>
        <AppView marginHorizontal={16}>
          <AppView rowAlignCenter space={'between'} marginTop={9}>
            <AppView
              rowAlignCenter
              backgroundColor={COLOR.YELLOW_200}
              paddingHorizontal={6}
              paddingVertical={1}>
              <AppText
                style={[
                  STYLE_GLOBAL.body2,
                  {color: COLOR.STATUS_WAITING_TEXT},
                ]}>
                Chờ duyệt
              </AppText>
            </AppView>
            <TouchableOpacity
              onPress={() => {
                onGoToDetail();
              }}>
              <AppText
                style={[
                  STYLE_GLOBAL.body1,
                  STYLE_GLOBAL.weight600,
                  {color: COLOR.COLOR_TEXT_POLICY},
                ]}>
                Chi tiết
              </AppText>
            </TouchableOpacity>
          </AppView>
          <AppView style={styles.line} />
        </AppView>
      </ScrollView>
      {/* <AppView height={getSize.v(32)} backgroundColor={COLOR.GRAY_LIGHT_5} /> */}

      <AppConfirmButton
        titleConfirm="Báo cáo sự cố"
        hasCancelButton={false}
        style={styles.buttonConfirm}
        onPressConfirm={() => {
          NavigationServices.navigate(SCENE_NAMES.REPORT_TROUBLE_TRIP_SCREEN, {
            dataDetailTrip: dataCurrentTripInprogress,
          });
        }}
      />
      {/* <ModalConfirmGetOrder
        showModal={showModalGetOrder}
        setShowModal={setShowModalGetOrder}
      />
      <ModalRefuse
        onConfirm={onRefuse}
        showModal={showModalRefuse}
        setShowModal={setShowModalRefuse}
      /> */}
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    marginTop: getSize.m(16),
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.7,
    borderColor: '#B5B6BA',
  },
  lineBold: {
    marginTop: getSize.m(16),
    width: '100%',
    borderWidth: getSize.m(5),
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
});
export default TripInProgressInfo;
