import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SVG_NAME } from 'assets/path';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import useReactElementHOC from 'hooks/useReactElementHOC';

const AppButtonChangeLanguage = ({ onPress, style }) => {
  const { i18n } = useTranslate();

  const iconGlobal = useReactElementHOC(SVG_NAME.GLOBAL, { s: 18 })
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.viewMultiLanguage, style]}>
        {iconGlobal}
        <AppText style={styles.textChangeLanguage}>
          {i18n.language === 'vi' ? 'VN' : 'EN'}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewMultiLanguage: [
    STYLE_GLOBAL.containerCenter,
    {
      backgroundColor: '#E6EBF0',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 89,
    },
  ],
  textChangeLanguage: [
    STYLE_GLOBAL.buttonLarge,
    { color: '#2E5B83', marginLeft: 4 },
  ],
});
export default AppButtonChangeLanguage;
