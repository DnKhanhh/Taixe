import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from 'components/AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import useTranslate from 'hooks/useTranslate';

const NoteInvalidNotify = ({title}) => {
  const {t} = useTranslate();
  return (
    <View>
      {!title ? null : (
        <View style={styles.noteInvalidValidationContainer}>
          <AppText
            style={[
              STYLE_GLOBAL.body1,
              STYLE_GLOBAL.color_textContent,
              STYLE_GLOBAL.weight600,
            ]}>
            {t('common:warning')}
          </AppText>
          <AppText style={[STYLE_GLOBAL.body2, STYLE_GLOBAL.color_textContent]}>
            {title}
          </AppText>
        </View>
      )}
    </View>
  );
};

export default NoteInvalidNotify;

const styles = StyleSheet.create({
  noteInvalidValidationContainer: {
    backgroundColor: '#FFF2E4',
    borderColor: '#F07F23',
    borderWidth: 1,
    padding: 16,
    margin: 12,
    borderRadius: 4,
  },
});
