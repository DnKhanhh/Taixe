import React from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppText from 'components/AppText';
import Toast from 'react-native-toast-message';
import {COLOR} from 'utils/AppConst';

const RenderToast = ({props}) => {
  const {
    iconLeft,
    iconRight,
    title,
    style,
    backgroundColor,
    borderColor,
    Content,
    onPress,
  } = props;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.toastContainer, style, {backgroundColor, borderColor}]}>
      <View style={styles.rowCenter}>
        {iconLeft}
        {Content && Content}
        <AppText numberOfLines={3} style={[styles.textMessage]}>
          {title}
        </AppText>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()} style={styles.iconRight}>
        {iconRight}
      </TouchableOpacity>
    </Pressable>
  );
};
// custom layout toasts
export const toastConfig = {
  success: ({props}) => {
    const defaultProps = {
      iconLeft: <SVG_NAME.TICK_SQUARE />,
      iconRight: <SVG_NAME.CANCEL_GRAY />,
      backgroundColor: COLOR.TOAST_SUCCESS_BACKGROUND,
      borderColor: COLOR.TOAST_SUCCESS_BORDER,
      ...props,
    };
    return <RenderToast props={defaultProps} />;
  },
  warning: ({props}) => {
    const defaultProps = {
      iconLeft: <SVG_NAME.INFO_CIRCLE />,
      iconRight: <SVG_NAME.CANCEL_GRAY />,
      backgroundColor: COLOR.TOAST_WARNING_BACKGROUND,
      borderColor: COLOR.TOAST_WARNING_BORDER,
      ...props,
    };
    return <RenderToast props={defaultProps} />;
  },
};

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 12,
    paddingRight: 16,
  },
  textMessage: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight600,
    {color: COLOR.TEXT_CONTENT, marginStart: 18},
  ],
  toastContainer: {
    width: '95%',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    flex: 1,
  },
  iconRight: {
    flex: 0.5,
  },
});
