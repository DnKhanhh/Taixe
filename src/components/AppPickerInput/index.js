import React from 'react';
import {View, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import STYLE_GLOBAL from 'utils/StyleGlobal';
//Components
import AppText from 'components/AppText';
//Utils
import {SVG_NAME} from 'assets/path';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import {getSize} from 'hooks/useIconSvgResizeHOC';

const AppPickerInput = ({
  onPressIcon,
  icon,
  placeholder,
  dataInput = [],
  style,
  styleContainerInput,
  styleItem,
  stylePlaceHolderText,
  styleItemText,
  isSelectOne = false,
  selectedName,
  error,
  messageError,
  errorLabelStyle,
  keyType,
  disabled = false,
  isCreateOrder = false,
}) => {
  const handleOnPress = () => {
    Keyboard.dismiss();
    onPressIcon?.();
  };

  return (
    <View style={{marginBottom: getSize.m(16)}}>
      <TouchableOpacity onPress={handleOnPress} disabled={disabled}>
        <View
          style={[
            styles.container,
            style,
            isCreateOrder
              ? {
                  backgroundColor: COLOR.COLOR_BACKGROUND,
                }
              : {
                  backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
                },
            disabled && {
              backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
            },
            error && {borderColor: COLOR.STATUS_ERROR_BORDER},
          ]}>
          <View style={[styles.containerItemInput, styleContainerInput]}>
            {dataInput.length !== 0 && !isSelectOne ? (
              dataInput.map((item, index) => {
                const itemRender = getFieldItem(keyType, item);
                return (
                  <View style={[styles.containerItem, styleItem]} key={index}>
                    <AppText style={[styles.itemText, styleItemText]}>
                      {itemRender.nameRender}
                    </AppText>
                  </View>
                );
              })
            ) : isSelectOne && selectedName ? (
              <AppText
                style={[
                  styles.selectOneText,
                  disabled && {color: COLOR.COLOR_TEXT_INPUT},
                  styleItemText,
                ]}>
                {selectedName}
              </AppText>
            ) : (
              <AppText style={[styles.placeHolderText, stylePlaceHolderText]}>
                {placeholder}
              </AppText>
            )}
          </View>
          {disabled ? null : (
            <TouchableOpacity
              // style={{flex: 1}}
              onPress={handleOnPress}
              disabled={disabled}>
              {icon || <SVG_NAME.DOWN />}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {error && (
        <AppText style={[styles.txtError, errorLabelStyle]}>
          {messageError}
        </AppText>
      )}
    </View>
  );
};

export default AppPickerInput;

const styles = StyleSheet.create({
  container: {
    borderColor: COLOR.COLOR_BORDER,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: getSize.m(8),
    alignItems: 'center',
    paddingLeft: getSize.m(12),
    paddingRight: getSize.m(2),
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    borderRadius: CONST_SIZE.BORDER_RADIUS_TEXT_INPUT,
    minHeight: getSize.v(45),
  },
  containerItemInput: {
    flexDirection: 'row',
    flex: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  containerItem: {
    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
    borderWidth: 1,
    borderRadius: getSize.m(35),
    paddingVertical: 2,
    paddingHorizontal: getSize.m(8),
    marginRight: 4,
    marginVertical: 2,
    backgroundColor: COLOR.COLOR_SECONDARY,
  },
  placeHolderText: [STYLE_GLOBAL.body1, {color: COLOR.COLOR_TEXT_INPUT}],
  itemText: [STYLE_GLOBAL.body1, {color: COLOR.BLACK}],
  selectOneText: [STYLE_GLOBAL.body1, {color: COLOR.BLACK}],
  txtError: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: getSize.m(12) - 2,
    paddingHorizontal: getSize.m(5),
    marginBottom: -getSize.m(14),
    position: 'absolute',
    bottom: 0,
  },
});

const getFieldItem = (type, item) => {
  switch (type) {
    case 'vehicleGroup':
      return {
        nameRender: item.vehicleGroup.name,
      };
    case 'name': //case test, add another values if not vehicleGroup
      return {
        nameRender: item.name,
      };
    default:
      return {
        nameRender: item.title || item.name,
      };
  }
};
