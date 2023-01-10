import React from 'react';
import styles from './styles';
import {View, TouchableOpacity} from 'react-native';
import AppText from 'components/AppText';
import {SVG_NAME} from 'assets/path';

function InfoByRow({title, value, addMoreInfo, iconPhone, onPress}) {
  const _onPress = React.useCallback(() => {
    typeof onPress === 'function' && onPress();
  }, [onPress]);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <View style={styles.valueContent}>
        <AppText style={styles.value}>{value}</AppText>
        {addMoreInfo && (
          <View style={styles.addMoreInfoContent}>
            <AppText style={styles.addMoreInfoValue}>{addMoreInfo}</AppText>
            {iconPhone && (
              <TouchableOpacity onPress={_onPress}>
                <SVG_NAME.ICON_PHONE />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default React.memo(InfoByRow);
