import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {ICON_SIZE} from 'utils/AppConst';

function AppIcon({type = 'svg', name, style, onPress, disabled, stroke, fill}) {
  const Container = onPress ? TouchableOpacity : View;
  switch (type) {
    case 'svg': {
      const IconSgv = name;
      if (!IconSgv) {
        return <View />;
      }
      return (
        <Container style={style} disabled={disabled} onPress={onPress}>
          <IconSgv
            {...(style?.color ? {fill: style?.color} : null)}
            width={style?.width || ICON_SIZE.LARGE}
            height={style?.height || ICON_SIZE.LARGE}
            stroke={stroke}
            {...(fill ? {fill} : {})}
          />
        </Container>
      );
    }
    default:
      return <Icon onPress={onPress} as={type} name={name} style={style} />;
  }
}

export default React.memo(AppIcon);
