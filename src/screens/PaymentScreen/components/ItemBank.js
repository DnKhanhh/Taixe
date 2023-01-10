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

import {parseDataUserBank} from 'appRedux/parsers/bankParser';

function ItemBank({item, index, onPressItemBank}) {
  const itemBank = parseDataUserBank(item);

  const {t} = useTranslate();
  return (
    <TouchableOpacity onPress={() => onPressItemBank(item)}>
      <View style={[styles.viewContainerFlatList]}>
        <AppImage
          source={{uri: itemBank.logoBank}}
          style={styles.logoBankStyle}
          resizeMode="contain"
        />
        <View style={styles.containerBankInfo}>
          <AppText style={styles.textFullNameStyle}>
            {itemBank.fullName}
          </AppText>
          <AppText style={styles.textBankNameStyle}>
            {itemBank.bankName} - {itemBank.fullBankName}
          </AppText>
          <AppText style={styles.textBranchNameStyle}>
            {itemBank.branchName}
          </AppText>
          {itemBank.isDefault && (
            <View style={styles.containerDefaultBank}>
              <AppText style={styles.textDefaultBank}>
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
export default React.memo(ItemBank);

const styles = StyleSheet.create({
  viewContainerFlatList: {
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 16,
  },
  logoBankStyle: {
    width: scalePortrait(44),
    height: scalePortrait(44),
    borderRadius: 100,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  containerBankInfo: {
    flex: 4,
    marginLeft: 16,
  },
  textFullNameStyle: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight700,
    STYLE_GLOBAL.color_textContent,
    {textTransform: 'uppercase', flex: 1, flexWrap: 'wrap'},
  ],
  textBankNameStyle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {textTransform: 'uppercase', marginVertical: 4, flexWrap: 'wrap', flex: 1},
  ],
  textBranchNameStyle: [
    STYLE_GLOBAL.body2,
    {
      color: COLOR.TEXT_GREY_SECONDARY,
    },
  ],
  containerDefaultBank: {
    backgroundColor: '#CEECFF',
    paddingHorizontal: 6,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  textDefaultBank: [STYLE_GLOBAL.body2, {color: '#002A8E'}],
});
