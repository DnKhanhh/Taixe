import React, {useCallback} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
//componets
import AppText from 'components/AppText';
//style
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
//contant
import useTranslate from 'hooks/useTranslate';
import {HELP_OPTION, RENDER_BUTTON_HELP} from '../constant';
import {HOT_LINE} from 'utils/AppConst';
import {callNumber} from 'utils/communications';
import { getSize } from 'utils/responsive';

function RenderHelpOptionButton() {
  const {t} = useTranslate();
  const callHotline = number => {
    callNumber(number);
  };
  const onPressItemHelp = useCallback(title => {
    switch (title) {
      case HELP_OPTION.CALL_HOTLINE:
        callHotline(HOT_LINE.PHONE);
        break;
      case HELP_OPTION.CALL_FACEBOOK:
        Alert.alert('Call FB');
        break;
      case HELP_OPTION.CALL_ZALO:
        Alert.alert('Call Zalo');
        break;
      default:
        break;
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      {RENDER_BUTTON_HELP.map(item => {
        return (
          <View key={item.id} style={styles.viewButtonModal}>
            <TouchableOpacity
              onPress={() => onPressItemHelp(item.key)}
              style={
                item.code === 'hotline'
                  ? [
                      styles.buttonContentItemHelp,
                      {backgroundColor: COLOR.COLOR_PRIMARY_SECOND},
                    ]
                  : styles.buttonContentItemHelp
              }>
              <View style={styles.viewTextIconBtnModal}>
                {item.icon}
                <AppText
                  style={
                    item.code === 'hotline'
                      ? [
                          styles.textContentModal,
                          STYLE_GLOBAL.weight700,
                          STYLE_GLOBAL.color_secondary,
                        ]
                      : styles.textContentModal
                  }>
                  {t(`${item.title}`)}
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}
export default React.memo(RenderHelpOptionButton);
const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    marginTop: getSize.m(12),
  },
  viewTextIconBtnModal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getSize.m(16),
    paddingHorizontal: getSize.m(16),
  },
  viewButtonModal: {
    alignItems: 'center',
    paddingTop: getSize.m(12),
    paddingBottom: getSize.m(2)
  },
  buttonContentItemHelp: {
    width: '75%',
    borderRadius: getSize.s(54),
    backgroundColor: COLOR.COLOR_SECONDARY,
    borderWidth: getSize.s(1.5),
    borderColor: COLOR.COLOR_PRIMARY_SECOND,
  },
  textContentModal: [
    STYLE_GLOBAL.buttonLarge,
    STYLE_GLOBAL.color_textContent,
    STYLE_GLOBAL.weight400,
    {textAlign: 'center', paddingLeft: getSize.m(14)},
  ],
});
