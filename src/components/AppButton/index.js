import {TouchableOpacity, View, Keyboard} from 'react-native';
import React, {useMemo} from 'react';
import styles from './styles';
import AppText from '../AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';
function AppButton({
  style,
  styleTouchOpacity,
  title,
  styleText,
  highlight,
  disabled,
  leftIcon,
  nameIcon,
  typeIcon,
  iconStyle,
  children,
  onPress,
  ...props
}) {
  const styleButton = useMemo(() => {
    return [styles.defaultButton(disabled), styleTouchOpacity];
  }, [styleTouchOpacity, disabled]);

  const styleTitle = useMemo(() => {
    return [styles.defaultText(disabled), styleText];
  }, [styleText, disabled]);

  const handleOnPress = () => {
    Keyboard.dismiss();
    onPress();
  };

  if (highlight) {
    return (
      <View style={style}>
        <TouchableOpacity
          style={[styleButton, styles.hightLight]}
          onPress={handleOnPress}
          {...props}>
          {children ? (
            <View style={[STYLE_GLOBAL.containerCenter]}>
              {children}
              <AppText style={[styleTitle]}>{title}</AppText>
            </View>
          ) : (
            <AppText style={[styleTitle]}>{title}</AppText>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={style}>
      <TouchableOpacity
        style={[styleButton]}
        disabled={disabled}
        onPress={handleOnPress}
        {...props}>
        {children ? (
          <View style={[STYLE_GLOBAL.containerCenter]}>
            {children}
            <AppText style={[styleTitle]}>{title}</AppText>
          </View>
        ) : (
          <AppText style={[styleTitle]}>{title}</AppText>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(AppButton);
