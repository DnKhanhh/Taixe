import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppModal from 'components/Modal/AppModal';
import useTranslate from 'hooks/useTranslate';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppModalDialog from 'components/Modal/AppModalDialog';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import {SVG_NAME} from 'assets/path';
const ModalOptionsAddress = ({
  showModalOption,
  setShowModalOption,
  showModalDelete,
  setShowModalDelete,
  onPressDeleteAddress,
  onPressSetDefaultAddress,
}) => {
  const {t} = useTranslate();
  return (
    <>
      <AppModal
        titleModal={t('common:modalbox.modalTitleOptions')}
        showAppModal={showModalOption}
        setShowAppModal={setShowModalOption}>
        <AppView padding={16} paddingTop={24}>
          <TouchableOpacity onPress={onPressSetDefaultAddress}>
            <AppView marginBottom={16} rowAlignCenter>
              <SVG_NAME.CHECK_CIRCLE />
              <AppText style={styles.textOptions}>
                {t('navigate:scenes.addressScreen.setDefault')}
              </AppText>
            </AppView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowModalOption(false);
              setShowModalDelete(true);
            }}>
            <AppView rowAlignCenter>
              <SVG_NAME.TRASH_CIRCLE />
              <AppText style={styles.textOptions}>
                {t('navigate:scenes.addressScreen.delete')}
              </AppText>
            </AppView>
          </TouchableOpacity>
        </AppView>
      </AppModal>
      <AppModalDialog
        type={'warning'}
        titleModal={t('navigate:scenes.addressScreen.delete')}
        showModalDialog={showModalDelete}
        contentModal={t('navigate:scenes.addressScreen.areYouSure')}
        setShowModalDialog={setShowModalDelete}
        titleConfirm={t('common:button.confirm')}
        titleCancel={t('common:modalbox.cancel')}
        onPressConfirm={onPressDeleteAddress}
      />
    </>
  );
};
const styles = StyleSheet.create({
  textOptions: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.TEXT_CONTENT,
    marginLeft: 16,
  },
});
export default React.memo(ModalOptionsAddress);
