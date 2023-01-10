import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

//component
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';

//utils
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

const InputContainer = ({
  label,
  placeholder,
  required,
  children,
  iconLeft,
  marginRight,
  marginLeft,
  marginTop,
  flex,
  onChangeText,
  error,
  messageError,
  keyboardType,
  hasClick,
  press,
  editable,
  disabled,
  ...props
}) => {
  const handlePress = () => {
    Keyboard.dismiss();
    press();
  }
  return (
    <AppView
      flex={flex}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginTop={marginTop}
      style={styles.textInputContainer}>
      <AppText style={styles.textLabel} required={required}>
        {label}
      </AppText>
      {children ? (
        children
      ) : hasClick ? (
        <TouchableOpacity onPress={handlePress} disabled={disabled}>
          <AppTextInput
            keyboardType={keyboardType}
            messageError={messageError}
            error={error}
            onChangeText={onChangeText}
            required={required}
            editable={editable}
            placeholder={placeholder}
            {...props}>
            {iconLeft && iconLeft}
          </AppTextInput>
        </TouchableOpacity>
      ) : (
        <AppTextInput
          keyboardType={keyboardType}
          messageError={messageError}
          error={error}
          onChangeText={onChangeText}
          required={required}
          placeholder={placeholder}
          editable={editable}
          {...props}>
          {iconLeft && iconLeft}
        </AppTextInput>
      )}
    </AppView>
  );
};
export default InputContainer;

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 24,
  },
  textLabel: {
    ...STYLE_GLOBAL.body2,
    ...STYLE_GLOBAL.weight400,
    marginBottom: 8,
    color: COLOR.TEXT_CONTENT,
  },
});
