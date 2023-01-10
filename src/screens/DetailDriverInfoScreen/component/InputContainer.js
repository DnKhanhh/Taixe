import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
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
        <TouchableOpacity onPress={press} disabled={disabled}>
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
