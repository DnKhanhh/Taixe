/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import styles from './style';
import {scalePortrait} from 'utils/responsive';
function AppMultiInput({
  type,
  placeholderOne,
  placeholderTwo,
  placeholderThree,
  values,
  valueType,
  handleChange,
  containerStyle,
  textInputStyle,
  keyboardType = 'numeric',
  error,
  messageError,
  hasShadow,
  label,
  styleViewInput,
  children,
  refCallback,
  editable,
  ...otherProps
}) {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={
        !focus
          ? [
              styles.container,
              containerStyle,
              hasShadow && styles.shadow,
              {
                backgroundColor: editable
                  ? COLOR.COLOR_BACKGROUND_TEXT_INPUT
                  : COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
              },
              error && {borderColor: COLOR.STATUS_ERROR_BORDER},
            ]
          : [
              styles.container,
              containerStyle,
              hasShadow && styles.shadow,
              {borderColor: '#98CBFF', borderWidth: 3},
              error && !focus && {borderColor: COLOR.STATUS_ERROR_BORDER},
            ]
      }>
      {error && <AppText style={styles.txtError}>{messageError}</AppText>}
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: children ? scalePortrait(12) : 0,
            paddingRight: children ? scalePortrait(8) : 0,
            justifyContent: 'space-between',
          },
          styleViewInput,
        ]}>
        <TextInput
          // clearButtonMode="while-editing"
          placeholder={placeholderOne}
          style={[
            styles.textInput,
            textInputStyle,
            // focus && {marginTop: scalePortrait(-2) },
          ]}
          placeholderTextColor={COLOR.COLOR_TEXT_SECONDARY}
          // value={String(values[valueType.length])}
          value={String(values.length)}
          keyboardType={keyboardType}
          onChangeText={handleChange(valueType.length)}
          textAlignVertical="center"
          includeFontPadding={false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoCapitalize="none"
          blurOnSubmit={true}
          ref={refCallback}
          editable={editable}
          {...otherProps}
        />
        <AppText>-</AppText>
        <TextInput
          // clearButtonMode="while-editing"
          placeholder={placeholderTwo}
          style={[
            styles.textInput,
            textInputStyle,
            // focus && {marginTop: scalePortrait(-2) },
          ]}
          placeholderTextColor={COLOR.COLOR_TEXT_SECONDARY}
          // value={String(values[valueType.width])}
          value={String(values.width)}
          keyboardType={keyboardType}
          onChangeText={handleChange(valueType.width)}
          textAlignVertical="center"
          includeFontPadding={false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoCapitalize="none"
          blurOnSubmit={true}
          ref={refCallback}
          editable={editable}
          {...otherProps}
        />
        <AppText>-</AppText>
        <TextInput
          // clearButtonMode="while-editing"
          placeholder={placeholderThree}
          style={[
            styles.textInput,
            textInputStyle,
            // focus && {marginTop: scalePortrait(-2) },
          ]}
          placeholderTextColor={COLOR.COLOR_TEXT_SECONDARY}
          // value={String(values[valueType.height])}
          value={String(values.height)}
          keyboardType={keyboardType}
          onChangeText={handleChange(valueType.height)}
          textAlignVertical="center"
          includeFontPadding={false}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoCapitalize="none"
          blurOnSubmit={true}
          ref={refCallback}
          editable={editable}
          {...otherProps}
        />
        {children}
      </View>
    </View>
  );
}

export default React.memo(AppMultiInput);
