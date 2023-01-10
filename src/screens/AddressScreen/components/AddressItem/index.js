import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
const AddressItem = ({item, index, onPress, onLongPress}) => {
  const {
    addressName,
    isDefault,
    city,
    district,
    contactName,
    contactPhone,
    address,
    id,
  } = item;
  const {t} = useTranslate();
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(id)}
      onPress={() => onPress(id)}
      activeOpacity={0.8}>
      <AppView
        backgroundColor={
          index % 2 === 0
            ? COLOR.COLOR_BACKGROUND
            : COLOR.COLOR_BACKGROUND_TEXT_INPUT
        }
        style={styles.container}>
        <AppView row space={'between'}>
          <AppText style={styles.title}>{addressName}</AppText>
          {isDefault ? (
            <AppView style={styles.tagDefaultContainer}>
              <AppText style={styles.textDefault}>
                {t('navigate:scenes.addressScreen.tagDefault')}
              </AppText>
            </AppView>
          ) : null}
        </AppView>
        <AppView marginTop={8} rowAlignCenter space={'between'}>
          <AppView rowAlignCenter>
            <SVG_NAME.PHONE />
            <AppText style={[styles.text, styles.marginLeft]}>
              {contactPhone}
            </AppText>
          </AppView>
          <AppView rowAlignCenter>
            <SVG_NAME.LOCATION />
            <AppText style={[styles.text, styles.marginLeft]}>
              {city.name}
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.dividerLine} />
        <AppView>
          <AppView marginBottom={8} style={styles.rowSpace}>
            <AppText style={styles.textLight}>
              {t('navigate:scenes.addressInfo.contactPeople')}
            </AppText>
            <AppView maxWidth={'60%'}>
              <AppText
                numberOfLines={1}
                style={[styles.text, styles.textAlignRight]}>
                {contactName}
              </AppText>
            </AppView>
          </AppView>
          <AppView marginBottom={8} style={styles.rowSpace}>
            <AppText style={styles.textLight}>
              {t('navigate:scenes.addressInfo.district')}
            </AppText>
            <AppText style={[styles.text, styles.textAlignRight]}>
              {district.name}
            </AppText>
          </AppView>
          <AppView style={styles.rowSpace}>
            <AppText style={styles.textLight}>
              {t('navigate:scenes.addressInfo.street')}
            </AppText>
            <AppView maxWidth={'60%'}>
              <AppText
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={[styles.text, styles.textAlignRight]}>
                {address}
              </AppText>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textAlignRight: {
    textAlign: 'right',
  },
  textLight: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.TEXT_GREY,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dividerLine: {
    marginVertical: 8,
    backgroundColor: COLOR.COLOR_BORDER,
    height: 1,
  },
  marginLeft: {
    marginLeft: 8,
  },
  text: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.TEXT_BLUE_10,
  },
  textDefault: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.STATUS_DEFAULT_TEXT,
  },
  tagDefaultContainer: {
    backgroundColor: COLOR.COLOR_BACKGROUND_SELECTED,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 2,
  },
  title: {
    ...STYLE_GLOBAL.body1,
    ...STYLE_GLOBAL.weight700,
    color: COLOR.COLOR_PRIMARY,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
export default AddressItem;
