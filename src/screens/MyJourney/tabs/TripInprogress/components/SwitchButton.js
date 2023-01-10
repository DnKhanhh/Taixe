import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {SVG_NAME} from 'assets/path';
import AppText from 'components/AppText';
import {SWITCH_BUTTON_TRIP_PROCESSS} from 'screens/MyJourney/constant';
import AppView from 'components/AppView';
//Utils
import useTranslate from 'hooks/useTranslate';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
const ItemButton = ({item, onPress, state = 'normal'}) => {
  const {t} = useTranslate();
  const renderBackgroundButton = {
    normal: '#D2D2D2',
    selected: '#FFFFFF',
  };
  const renderTextColorButton = {
    normal: COLOR.BLUE_4,
    selected: COLOR.BLUE_DARK2,
  };
  return (
    <TouchableOpacity
      style={[
        styles.buttonSwitch,
        {backgroundColor: renderBackgroundButton[state]},
      ]}
      onPress={onPress}>
      <AppView rowAlignCenter center>
        {item.id === 1 ? (
          <SVG_NAME.ICON_INFO marginRight={10} />
        ) : (
          <SVG_NAME.ICON_ROUTE marginRight={10} />
        )}
        <AppText
          style={[
            styles.textButtonSwitch,
            {color: renderTextColorButton[state]},
          ]}>
          {t(`${item.title}`)}
        </AppText>
      </AppView>
    </TouchableOpacity>
  );
};
function SwitchButton({tabSelected, setTabSelected}) {
  return (
    <View style={styles.viewButtonSwitch}>
      {SWITCH_BUTTON_TRIP_PROCESSS.map((item, index) => (
        <ItemButton
          key={item.id}
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
    // borderRadius: 54,
    // alignItems: 'center',
    // width: '60%',
    // padding: 4,
    // backgroundColor: COLOR.COLOR_SECONDARY,
  },
  textButtonSwitch: [
    STYLE_GLOBAL.buttonMedium,
    {
      textAlign: 'center',
      paddingVertical: 12,
    },
  ],
  buttonSwitch: {
    // borderRadius: 86,
    backgroundColor: COLOR.COLOR_PRIMARY,
    flex: 1,
  },
});
