import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import styles from './styles';
import {SVG_NAME} from 'assets/path';
import AppView from 'components/AppView';
import VectorIcon from 'utils/vectorIcon';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import formatWithMask from './formatWithMask';

function AppTextInput({
  value,
  placeholder,
  containerStyle,
  textInputStyle,
  keyboardType,
  error,
  messageError,
  hasShadow,
  label,
  onChangeText,
  styleViewInput,
  children,
  refCallback,
  isSecure,
  iconLeft,
  styleTextError,
  editable = true,
  // mask props
  mask,
  placeholderFillCharacter,
  obfuscationCharacter,
  showObfuscatedValue,
  selection,
  // End mask
  // check hidden clearMode
  hiddenClearMode = false,
  multiline = false,
  //
  ...otherProps
}) {
  const [focus, setFocus] = useState(false);
  const [secureEye, setSecureEye] = useState(true);
  const _renderSecureIcon = () => {
    return (
      <TouchableOpacity onPress={() => setSecureEye(!secureEye)}>
        {secureEye ? <SVG_NAME.EYE_OFF_OUTLINE /> : <SVG_NAME.EYE_OUTLINE />}
      </TouchableOpacity>
    );
  };

  const maskArray = React.useMemo(
    () => (typeof mask === 'function' ? mask(value) : mask),
    [mask, value],
  );

  const formattedValueResult = React.useMemo(() => {
    return formatWithMask({text: value || '', mask, obfuscationCharacter});
  }, [mask, obfuscationCharacter, value]);

  const maskHasObfuscation = React.useMemo(
    () => maskArray && !!maskArray.find(maskItem => Array.isArray(maskItem)),
    [maskArray],
  );

  const isValueObfuscated = React.useMemo(
    () => !!maskHasObfuscation && !!showObfuscatedValue,
    [maskHasObfuscation, showObfuscatedValue],
  );
  const [heightText, setHeightText] = useState(0);
  const handleChangeText = React.useCallback(
    text => {
      let textToFormat = text;

      if (isValueObfuscated) {
        textToFormat = formattedValueResult.masked || '';

        if (textToFormat.length > text.length) {
          textToFormat = textToFormat.slice(0, -1);
        } else if (textToFormat.length < text.length) {
          textToFormat = textToFormat + text[text.length - 1];
        }
      }

      const result = formatWithMask({
        text: textToFormat,
        mask,
        obfuscationCharacter,
      });

      onChangeText &&
        onChangeText(result.masked, result.unmasked, result.obfuscated);
    },
    [
      isValueObfuscated,
      mask,
      obfuscationCharacter,
      onChangeText,
      formattedValueResult.masked,
    ],
  );

  const defaultPlaceholder = React.useMemo(() => {
    if (maskArray) {
      return maskArray
        .map(maskChar => {
          if (typeof maskChar === 'string') {
            return maskChar;
          } else {
            return placeholderFillCharacter;
          }
        })
        .join('');
    } else {
      return undefined;
    }
  }, [maskArray, placeholderFillCharacter]);

  const inputValue = isValueObfuscated
    ? formattedValueResult.obfuscated
    : formattedValueResult.masked;

  return (
    <View
      style={
        !focus
          ? [
              styles.container,
              containerStyle,
              // error ? styles.heightWithError : {},
              hasShadow && styles.shadow,
              !editable && {
                backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
              },
              error && {borderColor: COLOR.STATUS_ERROR_BORDER},
              multiline && {
                height: Math.max(getSize.v(100), heightText + getSize.v(40)),
                paddingBottom: getSize.v(16),
              },
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
              multiline && {
                height: Math.max(getSize.v(120), heightText + getSize.v(40)),
                paddingBottom: getSize.v(16),
              },
            ]
      }>
      {error && (
        <AppText style={[styles.txtError, styleTextError]}>
          {messageError}
        </AppText>
      )}
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View
        style={[
          styles.inputContainer,
          (children || iconLeft) && styles.paddingInputContainer,
          styleViewInput,
          multiline && {
            alignItems: 'flex-start',
            paddingTop: 8,
          },
        ]}>
        {iconLeft && <View style={{marginRight: 12}}>{iconLeft}</View>}
        <AppView flex row>
          <TextInput
            clearButtonMode="never"
            placeholder={
              placeholderFillCharacter ? defaultPlaceholder : placeholder
            }
            {...otherProps}
            style={[
              styles.textInput,
              value && focus && !hiddenClearMode && {paddingRight: 35},
              textInputStyle,
              multiline && {
                height: Math.max(getSize.v(120), heightText + getSize.v(24)),
              },
            ]}
            placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
            value={mask ? inputValue : value}
            selection={
              mask
                ? isValueObfuscated
                  ? {start: inputValue.length, end: inputValue.length}
                  : selection
                : undefined
            }
            keyboardType={keyboardType}
            onChangeText={mask ? handleChangeText : onChangeText}
            textAlignVertical={multiline ? 'top' : 'center'}
            includeFontPadding={false}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            autoCapitalize="none"
            blurOnSubmit={!multiline && true}
            ref={refCallback}
            secureTextEntry={secureEye && isSecure}
            editable={editable}
            multiline={multiline}
            onContentSizeChange={event => {
              setHeightText(event.nativeEvent.contentSize.height);
            }}
          />
          {value && focus && !hiddenClearMode ? (
            <AppView
              center
              style={{
                zIndex: 1000,
                width: 30,
                right: 30,
              }}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => onChangeText?.('')}>
                <AppView center>
                  <VectorIcon.Feather
                    name="x"
                    size={getSize.s(10)}
                    color={COLOR.GRAY5}
                  />
                </AppView>
              </TouchableOpacity>
            </AppView>
          ) : null}
        </AppView>

        {children ? children : isSecure && _renderSecureIcon()}
      </View>
    </View>
  );
}

export default React.memo(AppTextInput);
