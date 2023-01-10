import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppText from 'components/AppText';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

const CostItem = ({item, idTripGone}) => {
  const {t} = useTranslate();
  const {width, height} = Dimensions.get('screen');
  return (
    <AppView marginHorizontal={16} marginTop={16}>
      <AppView
        backgroundColor={
          item?.statusId === 'cost_driver_cancelled'
            ? COLOR.STATUS_ERROR_BACKGROUND
            : COLOR.WHITE
        }
        padding={12}
        radius={8}>
        <AppView rowAlignCenter space={'between'}>
          <AppText
            style={{
              ...STYLE_GLOBAL.body1,
              color: COLOR.TEXT_CONTENT,
            }}>
            {item?.priceTypeId ?? 'default'}
          </AppText>
          <AppText
            style={{
              ...STYLE_GLOBAL.buttonMedium,
              color: COLOR.COLOR_PRIMARY,
            }}>
            {idTripGone
              ? item?.approvedAmount
              : item?.amountByDriver ?? 'default'}{' '}
            VND
          </AppText>
        </AppView>
        <AppView style={{...styles.line, marginVertical: 10}} />
        <AppView rowAlignCenter marginBottom={10}>
          <SVG_NAME.ICON_TEXT_FILE marginRight={10} />
          <AppText
            style={{
              ...STYLE_GLOBAL.body1,
              color: COLOR.TEXT_CONTENT,
              flex: 1,
            }}>
            {item?.noteByDriver ?? 'default'}
          </AppText>
        </AppView>
        <AppView rowAlignCenter>
          <SVG_NAME.ICON_ADD_CHECK marginRight={10} />

          <AppText
            style={{
              ...STYLE_GLOBAL.body1,
              color: COLOR.TEXT_CONTENT,
              flex: 1,
            }}>
            Đã tải minh chứng({item?.totalDocuments ?? '0'} ảnh)
          </AppText>
        </AppView>
        <AppView style={{...styles.line, marginVertical: 10}} />
        <AppView rowAlignCenter space={'between'}>
          <AppView
            rowAlignCenter
            backgroundColor={
              item?.statusId === 'cost_driver_transporter_pending'
                ? COLOR.YELLOW_200
                : item?.statusId === 'cost_driver_active'
                ? '#CDF3C6'
                : item?.statusId === 'cost_driver_cancelled'
                ? '#DFE0E2'
                : ''
            }
            paddingHorizontal={6}
            paddingVertical={1}>
            <AppText
              style={{
                ...STYLE_GLOBAL.body2,
                color:
                  item?.statusId === 'cost_driver_transporter_pending'
                    ? COLOR.STATUS_WAITING_TEXT
                    : item?.statusId === 'cost_driver_active'
                    ? COLOR.COLOR_PRIMARY_THIRD
                    : '',
              }}>
              {item?.statusId === 'cost_driver_transporter_pending'
                ? 'Chờ duyệt'
                : item?.statusId === 'cost_driver_active'
                ? 'Đã duyệt'
                : item?.statusId === 'cost_driver_cancelled'
                ? 'Từ chối'
                : ''}
            </AppText>
          </AppView>
          <TouchableOpacity
            onPress={() =>
              NavigationServices.navigate(SCENE_NAMES.DETAIL_COSTS, {
                idCost: item.id,
                idTripGone: idTripGone,
              })
            }>
            <AppView rowAlignCenter>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body2,
                  ...STYLE_GLOBAL.weight600,
                  color: COLOR.BLUE_SUPPORT_500,
                  marginRight: 10,
                }}>
                Chi tiết
              </AppText>
              <SVG_NAME.ICON_ARROW_RIGHT_SMALL_BLUE />
            </AppView>
          </TouchableOpacity>
        </AppView>
        <AppText
          style={{
            ...STYLE_GLOBAL.body2,
            color: COLOR.COLOR_GREEN_SUPPORT_700,
            marginRight: 10,
            marginTop: 5,
          }}>
          Ghi chú duyệt(nếu có thì hiển thị)
        </AppText>
      </AppView>
    </AppView>
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
  line: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: '#B5B6BA',
  },
});
export default CostItem;
