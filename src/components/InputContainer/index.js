import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import {TouchableOpacity, StyleSheet, Keyboard, View} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';
import {SVG_NAME} from 'assets/path';

const InputContainer = ({
  label,
  placeholder,
  required,
  children,
  iconLeft,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom = 24,
  flex,
  onChangeText,
  error,
  messageError,
  keyboardType,
  hasClick,
  press,
  editable,
  disabled,
  value,
  isHasTouchIcon,
  stylesTextInput,
  styleContainerInput,
  onPressIcon,
  styleButtonContainer,
  styleTextError,
  colorContainerSelect,
  numberOfLines,
  ...props
}) => {
  const handlePress = () => {
    Keyboard.dismiss();
    press();
  };

  const handlePressIcon = () => {
    Keyboard.dismiss();
    onPressIcon();
  };

  return (
    <AppView
      flex={flex}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginBottom={marginBottom}>
      {label && (
        <AppText style={styles.textLabel} required={required}>
          {label}
        </AppText>
      )}
      {children ? (
        children
      ) : hasClick ? (
        <>
          <AppView style={styleButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                colorContainerSelect || {
                  backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
                },
                styles.containerSelect,
                error && {borderColor: COLOR.STATUS_ERROR_BORDER},
                disabled && {
                  backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
                },
                numberOfLines && !disabled && {paddingRight: 16},
              ]}
              onPress={handlePress}
              disabled={disabled}>
              <AppText
                style={[styles.textInput, value && styles.colorText]}
                numberOfLines={numberOfLines}>
                {value || placeholder}
              </AppText>
              {!disabled && iconLeft}
            </TouchableOpacity>
            {error && messageError ? (
              <AppView>
                <AppText style={styles.textError}>{messageError}</AppText>
              </AppView>
            ) : null}
          </AppView>
        </>
      ) : (
        <>
          <View style={styleContainerInput}>
            <AppTextInput
              containerStyle={[
                error && messageError ? styles.containerError : null,
                stylesTextInput,
              ]}
              keyboardType={keyboardType}
              messageError={messageError}
              error={error}
              onChangeText={onChangeText}
              required={required}
              placeholder={placeholder}
              value={value}
              editable={editable}
              {...props}>
              {/*{iconLeft && iconLeft}*/}
            </AppTextInput>
            {!isHasTouchIcon ? null : (
              <TouchableOpacity onPress={handlePressIcon}>
                {isHasTouchIcon}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </AppView>
  );
};
const styles = StyleSheet.create({
  containerError: {
    marginBottom: 12,
  },
  textError: {
    color: 'red',
    fontSize: scalePortrait(12) - 2,
    marginTop: 6,
  },
  textLabel: {
    ...STYLE_GLOBAL.body2,
    ...STYLE_GLOBAL.weight600,
    marginBottom: 8,
    color: COLOR.TEXT_CONTENT,
  },
  colorText: {
    color: COLOR.TEXT_CONTENT,
  },
  textInput: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.COLOR_TEXT_INPUT,
  },
  containerSelect: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLOR.COLOR_BORDER,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    // paddingRight: 16,
  },
});
export default InputContainer;
