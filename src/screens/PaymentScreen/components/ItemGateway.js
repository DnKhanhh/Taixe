import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {SVG_NAME} from 'assets/path';
import {scalePortrait} from 'utils/responsive';

//Components
import AppText from 'components/AppText';
import AppImage from 'components/AppImage';

//utils
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

//hooks
import useTranslate from 'hooks/useTranslate';

import {parseDataUserGateway} from 'appRedux/parsers/gatewayParser';

function ItemGateway({item, index, onPressItemGateway}) {
  const itemGateway = parseDataUserGateway(item);

  const {t} = useTranslate();
  return (
    <TouchableOpacity onPress={() => onPressItemGateway(item)}>
      <View style={[styles.viewContainerFlatList]}>
        <AppImage
          source={{uri: itemGateway.logoGateway}}
          style={styles.logoGatewayStyle}
          resizeMode="contain"
        />
        <View style={styles.containerGateInfo}>
          <AppText style={styles.textFullNameStyle}>
            {itemGateway.fullName}
          </AppText>
          <AppText style={styles.textGatewayNameStyle}>
            {itemGateway.gatewayName}
          </AppText>
          {itemGateway.isDefault && (
            <View style={styles.containerDefaultGateway}>
              <AppText style={styles.textDefaultGateway}>
                {t('common:default')}
              </AppText>
            </View>
          )}
        </View>
        <SVG_NAME.RIGHT />
      </View>
    </TouchableOpacity>
  );
}
export default React.memo(ItemGateway);

const styles = StyleSheet.create({
  viewContainerFlatList: {
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 16,
  },
  logoGatewayStyle: {
    width: scalePortrait(44),
    height: scalePortrait(44),
    borderRadius: 100,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  containerGateInfo: {
    flex: 4,
    marginLeft: 16,
  },
  textFullNameStyle: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_textContent,
    {textTransform: 'uppercase', flex: 1, flexWrap: 'wrap'},
  ],
  textGatewayNameStyle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {textTransform: 'uppercase', marginVertical: 4, flexWrap: 'wrap', flex: 1},
  ],
  containerDefaultGateway: {
    backgroundColor: '#CEECFF',
    paddingHorizontal: 6,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  textDefaultGateway: [STYLE_GLOBAL.body2, {color: '#002A8E'}],
});
