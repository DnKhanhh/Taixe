import React from 'react';
import styles from './styles';
import {View, TouchableOpacity} from 'react-native';
import AppText from 'components/AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';

function OptionItem({
  item,
  onPressItem,
  style,
  styleIcon,
  styleText,
  iconRight,
}) {
  const {t} = useTranslate();
  const {title, icon, type} = item || {};
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPressItem(type)}
      disabled={item?.isDisabled}>
      <View style={styles.leftWrapper}>
        <View style={styleIcon}>{icon}</View>
        <AppText
          numberOfLines={1}
          style={[
            STYLE_GLOBAL.body1,
            STYLE_GLOBAL.color_secondary,
            styleText,
            {marginLeft: 18},
          ]}>
          {t(title)}
        </AppText>
      </View>
      {type !== 'DRAWER.SIGNOUT' &&
        (iconRight || <SVG_NAME.BACK_ICON_DRAWER />)}
    </TouchableOpacity>
  );
}

export default React.memo(OptionItem);
