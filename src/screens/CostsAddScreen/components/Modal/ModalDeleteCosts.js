import React from 'react';
import {StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';

import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppButton from 'components/AppButton';

const ModalDeleteCosts = ({
  showModal,
  setShowModal,
  dataDetailCost,
  handleDeleteAddCostSubmit,
}) => {
  const {t} = useTranslate();
  return (
    <AppModal
      iconClose={<SVG_NAME.ICON_CLOSE />}
      setShowAppModal={setShowModal}
      showAppModal={showModal}>
      <AppView margin={16}>
        <AppView alignCenter>
          <SVG_NAME.ICON_RECYCLE_BIN />
          <AppText
            style={[
              STYLE_GLOBAL.h6,
              {color: COLOR.POP_UP_DANGER},
              styles.popupTitle,
            ]}>
            Xoá chi phí phát sinh
          </AppText>
          <AppView marginBottom={32} alignCenter>
            <AppText style={{...STYLE_GLOBAL.body1}}>
              Bạn có muốn xoá chi phí phát sinh
            </AppText>
            <AppView rowAlignCenter>
              <AppText
                style={{...STYLE_GLOBAL.body1, ...STYLE_GLOBAL.weight600}}>
                Loại chi phí:
              </AppText>
              <AppText
                style={{...STYLE_GLOBAL.body1, ...STYLE_GLOBAL.weight600}}>
                {dataDetailCost?.priceTypeId ?? 'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter>
              <AppText
                style={{...STYLE_GLOBAL.body1, ...STYLE_GLOBAL.weight600}}>
                Số tiền:{' '}
              </AppText>
              <AppText
                style={{...STYLE_GLOBAL.body1, ...STYLE_GLOBAL.weight600}}>
                {dataDetailCost?.amountByDriver ?? 'default'} VND
              </AppText>
            </AppView>
          </AppView>
        </AppView>

        <AppButton
          styleTouchOpacity={{
            backgroundColor: COLOR.POP_UP_DANGER,
            borderColor: COLOR.POP_UP_DANGER,
            borderWidth: 1,
          }}
          title="Xoá"
          onPress={() => {
            handleDeleteAddCostSubmit();
          }}
        />
        <AppButton
          style={{marginTop: 16}}
          styleText={{color: COLOR.POP_UP_DANGER}}
          styleTouchOpacity={{
            backgroundColor: COLOR.WHITE,
            borderColor: COLOR.POP_UP_DANGER,
            borderWidth: 1,
          }}
          title="Huỷ"
          onPress={() => {
            setShowModal(false);
          }}
        />
      </AppView>
    </AppModal>
  );
};

export default ModalDeleteCosts;

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
