import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TextInput,
} from 'react-native';
import {scalePortrait} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import {DEFAULT_PREFIX_FONT_FAMILY} from '../AppText/appFont';
import AppModal from 'components/Modal/AppModal';
//conponents
import AppText from 'components/AppText';
import {SVG_NAME} from 'assets/path';
const AppTextInputPicker = ({
  //textInput
  styleTextInputPicker,
  placeholderTextInput,
  valuesInput,
  keyboardType,
  onChangeText,
  textInputStyle,
  hasShadow,
  containerStyle,
  error,
  editable = true,
  valueType,
  handleChange,
  //picker
  valuePicker,
  placeholderPicker,
  onPressIcon,
  icon,
  dataInput = [],
  styleItem,
  stylePlaceHolderText,
  styleItemText,
  isSelectOne = false,
  selectedName,
  disabled,
  keyType,
  //modal
  dataOptions,
  titleModal,
  titleModalStyle,
  optionSelected,
  onPressDataModal,
  messageError,
  errorLabelStyle,
}) => {
  const handleOnPress = () => {
    Keyboard.dismiss();
    onPressIcon();
    setShowModal(true);
  };
  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <View
        style={
          !focus
            ? [
                styles.container,
                containerStyle,
                hasShadow && styles.shadow,
                !editable && {
                  backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
                },
                error && {borderColor: COLOR.STATUS_ERROR_BORDER},
              ]
            : [
                styles.container,
                containerStyle,
                hasShadow && styles.shadow,
                styles.focus,
                !editable && {
                  backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
                },
                error && !focus && {borderColor: COLOR.STATUS_ERROR_BORDER},
              ]
        }>
        <TextInput
          clearButtonMode="never"
          styleTextInputPicker={styleTextInputPicker}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
          placeholder={placeholderTextInput}
          value={valuesInput}
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize="none"
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            !editable && {color: COLOR.COLOR_TEXT_INPUT},
            textInputStyle,
          ]}
          textAlignVertical="center"
          includeFontPadding={false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        <View style={styles.viewLine} />
        <TouchableOpacity onPress={handleOnPress} disabled={disabled}>
          <View style={{flexDirection: 'row'}}>
            {dataInput.length !== 0 && !isSelectOne ? (
              dataInput.map((item, index) => {
                const itemRender = getFieldItem(keyType, item);
                return (
                  <View style={[styleItem]} key={index}>
                    <AppText style={[styleItemText]}>
                      {itemRender.nameRender}
                    </AppText>
                  </View>
                );
              })
            ) : isSelectOne && optionSelected ? (
              <AppText style={[styles.selectOneText, styleItemText]}>
                {optionSelected?.title || ''}
              </AppText>
            ) : (
              <AppText
                style={[STYLE_GLOBAL.body1, {color: COLOR.COLOR_TEXT_INPUT}]}>
                {placeholderPicker}
              </AppText>
            )}
            {disabled ? null : (
              <TouchableOpacity onPress={handleOnPress} disabled={disabled}>
                {icon || <SVG_NAME.DOWN />}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {error && (
        <AppText style={[styles.txtError, errorLabelStyle]}>
          {messageError}
        </AppText>
      )}
      <AppModal
        titleModal={titleModal || placeholderTextInput}
        titleModalStyle={titleModalStyle}
        showAppModal={showModal}
        setShowAppModal={setShowModal}
        dataModal={dataOptions}
        onPressDataModal={value => {
          setShowModal(false);
          onPressDataModal(value);
        }}
        keyWordItem={'id'}
      />
    </>
  );
};
export default AppTextInputPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    height: scalePortrait(45, 76),
    minHeight: 45,
    paddingLeft: scalePortrait(12),
    paddingRight: scalePortrait(8),
    borderRadius: CONST_SIZE.BORDER_RADIUS_TEXT_INPUT,
    alignItems: 'center',
    borderColor: COLOR.COLOR_BORDER,
    borderWidth: 1,
    flexDirection: 'row',
  },
  textInput: [
    {
      flex: 1,
      width: '100%',
      height: '100%',
      fontSize: scalePortrait(16),
      color: COLOR.TEXT_CONTENT,
      fontFamily: `${DEFAULT_PREFIX_FONT_FAMILY}-Regular`,
    },
  ],
  viewLine: {
    backgroundColor: COLOR.COLOR_BORDER,
    width: getSize.m(1),
    height: '100%',
    right: getSize.v(5),
  },
  placeHolderText: [STYLE_GLOBAL.body1, {color: COLOR.COLOR_TEXT_INPUT}],
  itemText: [STYLE_GLOBAL.body1, {color: COLOR.BLACK}],
  selectOneText: [STYLE_GLOBAL.body1, {color: COLOR.BLACK}],
  focus: {
    borderColor: COLOR.BORDER_FOCUS_TEXT_INPUT,
    borderWidth: 3,
  },
  txtError: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: getSize.m(12) - 2,
    paddingHorizontal: getSize.m(5),
    marginBottom: getSize.m(3),
    position: 'absolute',
    bottom: 0,
  },
});
const getFieldItem = (type, item) => {
  switch (type) {
    case 'name': //case test, add another values if not vehicleGroup
      return {
        nameRender: item?.name,
      };
    default:
      return {
        nameRender: item?.title || item.name,
      };
  }
};
