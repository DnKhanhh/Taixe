import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import AppText from 'components/AppText';
import {SWITCH_BUTTON} from '../constant';
//Utils
import useTranslate from 'hooks/useTranslate';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
const ItemButton = ({item, onPress, state = 'normal'}) => {
  const {t} = useTranslate();
  const renderBackgroundButton = {
    normal: 'transparent',
    selected: COLOR.SEGMENT_ACTIVE,
  };
  const renderTextColorButton = {
    normal: COLOR.TEXT_GREY_SECONDARY,
    selected: COLOR.COLOR_SECONDARY,
  };
  return (
    <TouchableOpacity
      style={[
        styles.buttonSwitch,
        {backgroundColor: renderBackgroundButton[state]},
      ]}
      onPress={onPress}>
      <AppText
        style={[
          styles.textButtonSwitch,
          {color: renderTextColorButton[state]},
        ]}>
        {t(`${item.title}`)}
      </AppText>
    </TouchableOpacity>
  );
};
function SwitchButton({tabSelected, setTabSelected}) {
  return (
    <View style={styles.viewButtonSwitch}>
      {SWITCH_BUTTON.map((item, index) => (
        <ItemButton
          key={item.key}
          state={tabSelected === index ? 'selected' : 'normal'}
          item={item}
          onPress={() => setTabSelected(index)}
        />
      ))}
    </View>
  );
}
export default React.memo(SwitchButton);
const styles = StyleSheet.create({
  viewButtonSwitch: {
    flexDirection: 'row',
    borderRadius: 54,
    alignItems: 'center',
    width: '60%',
    padding: 4,
    backgroundColor: COLOR.COLOR_SECONDARY,
  },
  textButtonSwitch: [
    STYLE_GLOBAL.buttonMedium,
    {
      textAlign: 'center',
      paddingVertical: 8,
    },
  ],
  buttonSwitch: {
    borderRadius: 86,
    backgroundColor: COLOR.COLOR_PRIMARY,
    flex: 1,
  },
});
