/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, Keyboard} from 'react-native';
import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import AppCheckBox from 'components/AppCheckBox';
import useTranslate from 'hooks/useTranslate';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getSize} from 'hooks/useIconSvgResizeHOC';
const AppConfirmButton = ({
  style,
  styleButton,
  titleConfirm,
  styleTextConfirm,
  styleButtonConfirm,
  styleTextCancel,
  styleButtonCancel,
  onPressConfirm,
  titleCancel,
  onPressCancel,
  titleCheckedBox,
  hasCheckBox = false,
  hasCancelButton = true,
  disabledConfirm = false,
  childrenButtonConfirm,
  childrenButtonCancel,
  styleCheckBox,
  valuesCheckBox = false,
  setValuesCheckBox = () => {},
  useCheckBoxDisabled = true,
  disableCancel = false,
}) => {
  const {t} = useTranslate();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setValuesCheckBox(isChecked);
  }, [isChecked]);
  return (
    <View style={[style, styles.shadow]}>
      {hasCheckBox && (
        <View style={[styles.checkBox, styleCheckBox]}>
          <AppCheckBox
            colorChecked={COLOR.COLOR_PRIMARY}
            isChecked={isChecked}
            onPress={() => {
              Keyboard.dismiss();
              setIsChecked(!isChecked);
            }}
          />
          <AppText
            style={styles.textCheckBox}
            onPress={() => {
              Keyboard.dismiss();
              setIsChecked(!isChecked);
            }}>
            {titleCheckedBox || t('common:confirmPolicy')}
          </AppText>
        </View>
      )}
      <View style={[styles.modalBoxButton, styleButton]}>
        {hasCancelButton ? (
          <>
            <AppButton
              style={{flex: 1, marginRight: 16}}
              title={titleCancel || t('common:button.cancel')}
              styleTouchOpacity={[
                styleButtonConfirm,
                {
                  backgroundColor: COLOR.COLOR_BACKGROUND,
                  borderColor: COLOR.COLOR_PRIMARY,
                  borderWidth: 1,
                },
              ]}
              styleText={[
                STYLE_GLOBAL.body1,
                STYLE_GLOBAL.color_primary,
                STYLE_GLOBAL.weight700,
                styleTextConfirm,
              ]}
              onPress={onPressCancel}
              children={childrenButtonCancel}
              disabled={disableCancel}
            />
            <AppButton
              style={{flex: 1}}
              title={titleConfirm || t('common:button.update')}
              styleText={[
                styleTextCancel,
                STYLE_GLOBAL.body1,
                STYLE_GLOBAL.weight700,
              ]}
              styleTouchOpacity={[styleButtonCancel]}
              onPress={onPressConfirm}
              disabled={
                !useCheckBoxDisabled
                  ? disabledConfirm
                  : hasCheckBox
                  ? !isChecked || disabledConfirm
                  : disabledConfirm
              }
              children={childrenButtonConfirm}
            />
          </>
        ) : (
          <AppButton
            style={{flex: 1}}
            title={titleConfirm || t('common:button.update')}
            styleText={[
              styleTextCancel,
              STYLE_GLOBAL.body1,
              STYLE_GLOBAL.weight700,
            ]}
            styleTouchOpacity={[styleButtonCancel]}
            onPress={onPressConfirm}
            disabled={
              !useCheckBoxDisabled
                ? disabledConfirm
                : hasCheckBox
                ? !isChecked || disabledConfirm
                : disabledConfirm
            }
            children={childrenButtonConfirm}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBoxButton: {
    backgroundColor: COLOR.COLOR_SECONDARY,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingBottom: getBottomSpace() + getSize.m(8),
  },
  checkBox: {
    flexDirection: 'row',
    backgroundColor: COLOR.COLOR_SECONDARY,
    borderRadius: 4,
    padding: 16,
    // paddingRight: 24,
  },
  textCheckBox: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.color_textContent,
    {flex: 1, flexWrap: 'wrap', marginTop: -4},
  ],
  shadow: {
    backgroundColor: COLOR.COLOR_SECONDARY,
    ...Platform.select({
      android: {elevation: 11},
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,
      },
    }),
  },
});

export default React.memo(AppConfirmButton);
