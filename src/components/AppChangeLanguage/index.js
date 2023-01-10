import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import useTranslate from 'hooks/useTranslate';

//Components
import AppText from 'components/AppText';
import ModalBox from 'react-native-modalbox';

//Utils
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR, CONST_SIZE} from 'utils/AppConst';

const LANGUAGES = [
  {
    code: 'vi',
    label: 'common:changeLanguage.Vietnamese',
    icon: <SVG_NAME.FLAG_VN />,
  },
  // {
  //   code: 'en',
  //   label: 'common:changeLanguage.English',
  //   icon: <SVG_NAME.FLAG_EN />,
  // },
];

function AppChangeLanguage({
  showModalChangeLanguage,
  setShowModalChangeLanguage,
  containerStyle,
  otherProps,
}) {
  const {t, i18n} = useTranslate();

  const selectedLanguageCode = i18n.language;
  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };
  return (
    <ModalBox
      style={[styles.viewModal, containerStyle]}
      position="bottom"
      isOpen={showModalChangeLanguage}
      onClosed={() => setShowModalChangeLanguage(false)}
      backdropOpacity={0.3}
      {...otherProps}>
      <View>
        <View
          style={[
            STYLE_GLOBAL.containerBetween,
            {
              paddingHorizontal: CONST_SIZE.DEFAULT_PADDING_HORIZONTAL,
              paddingVertical: CONST_SIZE.ITEM_PADDING_VERTICAL,
            },
          ]}>
          <View style={{width: 30, height: 30}} />
          <AppText>{t('common:titleLanguage')}</AppText>
          <TouchableOpacity onPress={() => setShowModalChangeLanguage(false)}>
            <SVG_NAME.CLOSE_ICON />
          </TouchableOpacity>
        </View>
        <View style={{borderTopWidth: 1, borderColor: COLOR.COLOR_BORDER}} />
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;
          return (
            <TouchableOpacity
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => {
                setLanguage(language.code);
                setShowModalChangeLanguage(false);
              }}>
              {language.icon}
              <AppText
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {t(`${language.label}`)}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </ModalBox>
  );
}

export default React.memo(AppChangeLanguage);
