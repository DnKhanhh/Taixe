import React from 'react';
import {View} from 'react-native';
import AppText from 'components/AppText';
import AppButton from 'components/AppButton';
import styles from './styles';
import ModalBox from 'react-native-modalbox';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import {Portal} from 'react-native-portalize';
import {useIconResizeHOC} from 'hooks/useIconSvgResizeHOC';

function AppModalDialog({
  type,
  titleModal,
  subTitleModal,
  showModalDialog,
  setShowModalDialog,
  contentModal,
  titleConfirm,
  titleCancel,
  onPressConfirm,
  iconTitle,
  fillButtonTop = false,
  onPressCancel,
}) {
  let defaultProps = getDefaultProps(type);

  const handlePressCancel = () => {
    if (typeof onPressCancel === 'function') {
      onPressCancel();
    } else {
      setShowModalDialog(false);
    }
  };
  return (
    <Portal>
      <ModalBox
        style={styles.viewModalError}
        position="center"
        isOpen={showModalDialog}
        onClosed={() => setShowModalDialog(false)}
        backdropOpacity={0.3}>
        <View style={styles.containerModal}>
          {iconTitle || defaultProps.iconTitle}

          <View>
            <AppText
              style={[
                STYLE_GLOBAL.h6,
                STYLE_GLOBAL.weight700,
                {
                  color: defaultProps.titleColor,
                  textAlign: 'center',
                  marginVertical: 16,
                },
              ]}>
              {titleModal}{' '}
              <AppText style={styles.subTitleModal}>{subTitleModal}</AppText>
            </AppText>
            <AppText
              style={[
                STYLE_GLOBAL.body1,
                STYLE_GLOBAL.color_textContent,
                styles.textContentModal,
              ]}>
              {contentModal}
            </AppText>
          </View>

          {type === 'success' ? (
            <>
              {fillButtonTop ? (
                <>
                  <AppButton
                    style={{width: '100%', marginBottom: 16}}
                    styleTouchOpacity={{
                      backgroundColor:
                        defaultProps.backgroundButtonConfirmColor,
                    }}
                    title={titleConfirm}
                    onPress={onPressConfirm}
                  />
                  <AppButton
                    style={{width: '100%'}}
                    title={titleCancel}
                    styleTouchOpacity={{
                      backgroundColor: COLOR.COLOR_SECONDARY,
                      borderColor: defaultProps.borderButtonCancelColor,
                      borderWidth: 1,
                    }}
                    styleText={[{color: defaultProps.textButtonCancelColor}]}
                    onPress={() => setShowModalDialog(false)}
                  />
                </>
              ) : (
                <>
                  <AppButton
                    style={{width: '100%', marginBottom: 16}}
                    styleTouchOpacity={{
                      backgroundColor:
                        defaultProps.backgroundButtonConfirmColor,
                    }}
                    title={titleConfirm}
                    onPress={onPressConfirm}
                  />
                  <AppButton
                    style={{width: '100%'}}
                    title={titleCancel}
                    styleTouchOpacity={{
                      backgroundColor: COLOR.COLOR_SECONDARY,
                      borderColor: defaultProps.borderButtonCancelColor,
                      borderWidth: 1,
                    }}
                    styleText={[{color: defaultProps.textButtonCancelColor}]}
                    onPress={() => setShowModalDialog(false)}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <AppButton
                style={{width: '100%', marginBottom: 16}}
                styleTouchOpacity={{
                  backgroundColor: defaultProps.backgroundButtonConfirmColor,
                }}
                title={titleConfirm}
                onPress={onPressConfirm}
              />
              <AppButton
                style={{width: '100%'}}
                title={titleCancel}
                styleTouchOpacity={{
                  backgroundColor: COLOR.COLOR_SECONDARY,
                  borderColor: defaultProps.borderButtonCancelColor,
                  borderWidth: 1,
                }}
                styleText={{color: defaultProps.textButtonCancelColor}}
                onPress={handlePressCancel}
              />
            </>
          )}
        </View>
      </ModalBox>
    </Portal>
  );
}
const getDefaultProps = type => {
  switch (type) {
    case 'success':
      return {
        iconTitle: <SVG_NAME.POP_UP_SUCCESS />,
        titleColor: COLOR.POP_UP_SUCCESS,
        borderButtonCancelColor: COLOR.POP_UP_SUCCESS,
        backgroundButtonConfirmColor: COLOR.POP_UP_SUCCESS,
        textButtonCancelColor: COLOR.POP_UP_SUCCESS,
      };
    case 'danger':
      return {
        iconTitle: useIconResizeHOC(SVG_NAME.TRASH_ERROR, {s: 32}),
        titleColor: COLOR.POP_UP_DANGER,
        borderButtonCancelColor: COLOR.POP_UP_DANGER,
        backgroundButtonConfirmColor: COLOR.POP_UP_DANGER,
        textButtonCancelColor: COLOR.POP_UP_DANGER,
      };
    case 'warning':
      return {
        iconTitle: useIconResizeHOC(SVG_NAME.INFO_CIRCLE, {s: 32}),
        titleColor: COLOR.POP_UP_TITLE,
        borderButtonCancelColor: COLOR.POP_UP_WARNING,
        backgroundButtonConfirmColor: COLOR.POP_UP_WARNING,
        textButtonCancelColor: COLOR.POP_UP_WARNING,
      };
    case 'changeType':
      return {
        iconTitle: useIconResizeHOC(SVG_NAME.INFO_CIRCLE, {s: 32}),
        titleColor: COLOR.COLOR_PRIMARY,
        borderButtonCancelColor: COLOR.COLOR_PRIMARY,
        backgroundButtonConfirmColor: COLOR.COLOR_PRIMARY,
        textButtonCancelColor: COLOR.COLOR_PRIMARY,
      };
    default:
      return {
        iconTitle: useIconResizeHOC(SVG_NAME.INFO_CIRCLE, {s: 32}),
        titleColor: COLOR.POP_UP_TITLE,
        borderButtonCancelColor: COLOR.POP_UP_WARNING,
        backgroundButtonConfirmColor: COLOR.POP_UP_WARNING,
        textButtonCancelColor: COLOR.POP_UP_WARNING,
      };
  }
};
export default React.memo(AppModalDialog);
