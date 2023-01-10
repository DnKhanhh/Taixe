import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import {NAMESPACE} from './constant';

//Components
import AppText from 'components/AppText';
import AppView from 'components/AppView';
//Utils
import {SVG_NAME} from 'assets/path';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';

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
function SettingScreen({}) {
  const {t, i18n} = useTranslate();
  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };
  return (
    <AppContainer
      title={t(`${NAMESPACE}`)}
      back={true}
      draw={false}
      stackScreen={true}>
      <AppView style={styles.buttonContainer}>
        <AppText style={styles.selectedText}>*Version 1.2</AppText>
      </AppView>
      {LANGUAGES.map(language => {
        const selectedLanguage = language.code === selectedLanguageCode;
        return (
          <TouchableOpacity
            key={language.code}
            style={styles.buttonContainer}
            disabled={selectedLanguage}
            onPress={() => setLanguage(language.code)}>
            {language.icon}
            <AppText
              style={[selectedLanguage ? styles.selectedText : styles.text]}>
              {t(`${language.label}`)}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </AppContainer>
  );
}

export default React.memo(SettingScreen);
