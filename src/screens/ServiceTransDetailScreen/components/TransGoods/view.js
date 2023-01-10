import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

const TransGoodScreen = ({dataDetailTrip}) => {
  const {t} = useTranslate();
  return (
    <AppContainer
      title="Chi tiết dịch vụ vận chuyển"
      back={true}
      stackScreen={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        backgroundColor={COLOR.WHITE}
        flex={1}>
        <AppView>
          <AppView rowAlignCenter margin={16}>
            <SVG_NAME.ICON_INVENTORY_BLUE />
            <AppText
              style={{
                ...STYLE_GLOBAL.subTitle2,
                ...STYLE_GLOBAL.weight700,
                color: COLOR.BLUE_7,
                marginLeft: 18,
              }}>
              Dịch vụ vận chuyển hàng hoá
            </AppText>
          </AppView>
          <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />
          <AppView marginHorizontal={16} marginTop={16}>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Nhóm hàng:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.vehicleGoods?.goodsType?.group?.name ??
                  'default'}
              </AppText>
            </AppView>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Loại hàng:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.vehicleGoods?.goodsType?.name +
                  dataDetailTrip?.vehicleGoods?.packingStyle?.name}
              </AppText>
            </AppView>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Tên hàng:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.vehicleGoods?.goodsType?.name ?? 'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Tính chất:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.vehicleGoods?.goodsType?.property?.name ??
                  'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Quy cách đóng gói:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.vehicleGoods?.packingStyle?.name ?? 'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Kích thước đóng gói:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.dimensionHeight ?? 'default'} x{' '}
                {dataDetailTrip?.dimensionWidth ?? 'default'} x{' '}
                {dataDetailTrip?.dimensionLength ?? 'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Đơn vị báo giá:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                VNĐ/tấn
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Trọng tải:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.goodLoad ?? 'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Thể tích:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                -------m3
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.lineBold} />
          <AppView rowAlignCenter margin={16}>
            <SVG_NAME.ICON_UNIT_BLUE />
            <AppText
              style={{
                ...STYLE_GLOBAL.subTitle2,
                ...STYLE_GLOBAL.weight700,
                color: COLOR.BLUE_7,
                marginLeft: 18,
              }}>
              Bảo quản lạnh
            </AppText>
          </AppView>
          <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />
          <AppView marginHorizontal={16} marginTop={16}>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                Hàng hoá cần bảo quản lạnh
              </AppText>
            </AppView>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Nhiệt độ(C):
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.journeyOrders?.order?.fromTemperature ??
                  'default'}{' '}
                -{' '}
                {dataDetailTrip?.journeyOrders?.order?.toTemperature ??
                  'default'}{' '}
                (C)
              </AppText>
            </AppView>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 1,
                }}>
                Quy cách bảo quản:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                {dataDetailTrip?.journeyOrders?.order?.goodPreservationMethod ??
                  'default'}{' '}
              </AppText>
            </AppView>
          </AppView>
          <AppView style={styles.lineBold} />
          <AppView rowAlignCenter margin={16}>
            <SVG_NAME.ICON_DEFEND_BLUE />
            <AppText
              style={{
                ...STYLE_GLOBAL.subTitle2,
                ...STYLE_GLOBAL.weight700,
                color: COLOR.BLUE_7,
                marginLeft: 18,
              }}>
              Hàng hoá có bảo hiểm
            </AppText>
          </AppView>
          <AppView style={{...styles.lineBold, marginTop: 0}} />
          <AppView marginHorizontal={16} marginTop={16}>
            <AppView rowAlignCenter space={'between'} marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 1,
                }}>
                Lưu ý: Tài xế thu nhập đầy đủ các giấy tờ giao nhận hàng để làm
                thủ tục bảo hiểm khi cần
              </AppText>
            </AppView>
          </AppView>
        </AppView>
      </ScrollView>
    </AppContainer>
  );
};
const styles = StyleSheet.create({
  title: {
    ...STYLE_GLOBAL.subTitle2,
    ...STYLE_GLOBAL.weight600,
    color: COLOR.STATUS_SUCCESS_TEXT,
  },
  container: {
    flex: 1,
    marginBottom: 15,
  },
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
});
export default TransGoodScreen;
