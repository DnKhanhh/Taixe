import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scalePortrait} from 'utils/responsive';

//Components
import AppText from 'components/AppText';
import AppImage from 'components/AppImage';

//utils
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

//hooks
import useTranslate from 'hooks/useTranslate';

const EmptyPayment = ({
  style,
  styleImage,
  styleText,
  isListBankSetting = false,
}) => {
  const {t} = useTranslate();
  return (
    <View style={style}>
      <View style={styles.containerEmptyContainer}>
        <AppImage
          source={require('assets/images/emptyPayment.png')}
          style={[styles.emptyPaymentStyle, styleImage]}
        />
        <AppText style={[styles.emptyPaymentTextStyle, styleText]}>
          {isListBankSetting
            ? t('common:textContent.emptyListBankSetting')
            : t('common:textContent.emptyListBank')}
        </AppText>
      </View>
    </View>
  );
};

export default EmptyPayment;

const styles = StyleSheet.create({
  containerEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyPaymentStyle: {
    resizeMode: 'contain',
    width: scalePortrait(320),
    height: scalePortrait(220),
  },
  emptyPaymentTextStyle: [
    STYLE_GLOBAL.body1,
    {color: COLOR.COLOR_TEXT_TITLE_INTRO, marginTop: 8},
  ],
});
