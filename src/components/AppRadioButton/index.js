import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AppText from 'components/AppText';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import AppView from 'components/AppView';
import useTranslate from 'hooks/useTranslate';

function AppRadioButton({
  data = [],
  value,
  containerStyle,
  contentStyle,
  onPress,
  touchableStyle,
  titleStyle,
  textStyle,
  hasBorderFocus = false,
  disabled,
  numberOfLinesText = 1,
  changeColorSelected = false,
  changeColorActive = false,
  buttonContentStyle = {},
}) {
  const {t} = useTranslate();
  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {data.map(res => {
          return res.key !== null ? (
            <TouchableOpacity
              key={res.key}
              style={[
                // styles.rbWrapper,
                value === res.key && hasBorderFocus && styles.shadow,
                value === res.key
                  ? [
                      styles.activeStyle,
                      {
                        backgroundColor: !changeColorActive
                          ? null
                          : COLOR.BLUE_SUPPORT_100,
                      },
                    ]
                  : [
                      styles.unActiveStyle,
                      {
                        borderColor: !changeColorActive
                          ? null
                          : COLOR.COLOR_BORDER,
                      },
                    ],
                contentStyle,
              ]}
              onPress={() => onPress(res)}
              disabled={disabled}>
              <AppView paddingRight={12} row center style={buttonContentStyle}>
                <TouchableOpacity
                  style={[
                    value === res.key
                      ? [
                          styles.checkedStyle,
                          {
                            borderColor: !changeColorSelected
                              ? COLOR.COLOR_PRIMARY_SECOND
                              : COLOR.COLOR_PRIMARY_THIRD,
                          },
                        ]
                      : styles.unCheckedStyle,
                    touchableStyle,
                  ]}
                  onPress={() => onPress(res)}
                  disabled={disabled}>
                  {value === res.key && (
                    <View
                      style={[
                        styles.selected,
                        {
                          backgroundColor: !changeColorSelected
                            ? COLOR.COLOR_PRIMARY_SECOND
                            : COLOR.COLOR_PRIMARY_THIRD,
                        },
                      ]}
                    />
                  )}
                </TouchableOpacity>
                {res.title && (
                  <AppView>
                    <AppText
                      style={[
                        STYLE_GLOBAL.body1,
                        titleStyle,
                        value === res.key &&
                          hasBorderFocus && {fontWeight: '700'},
                      ]}
                      numberOfLines={numberOfLinesText}>
                      {t(res.title)}
                    </AppText>
                    {res.subTitle && (
                      <AppText
                        numberOfLines={1}
                        style={[
                          STYLE_GLOBAL.body1,
                          {color: COLOR.TEXT_GREY_SECONDARY},
                          textStyle,
                        ]}>
                        {t(res.subTitle)}
                      </AppText>
                    )}
                  </AppView>
                )}
                <AppText
                  numberOfLines={1}
                  style={[
                    STYLE_GLOBAL.body1,
                    {color: COLOR.TEXT_CONTENT},
                    textStyle,
                  ]}>
                  {t(res.text)}
                </AppText>
              </AppView>
            </TouchableOpacity>
          ) : (
            <View />
          );
        })}
      </View>
    </View>
  );
}

export default React.memo(AppRadioButton);

const RADIO_BUTTON_STYLE = {
  height: 20,
  width: 20,
  borderRadius: 20,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 6,
};
const RBWRAPPER = {
  alignItems: 'center',
  flexDirection: 'row',
  // paddingRight: 12,
  // marginRight: 12,
};
const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  rbWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 12,
  },
  unCheckedStyle: {
    ...RADIO_BUTTON_STYLE,
    borderColor: '#C2CFDB',
  },
  checkedStyle: {
    ...RADIO_BUTTON_STYLE,
    borderColor: COLOR.COLOR_PRIMARY_SECOND,
  },
  activeStyle: {
    ...RBWRAPPER,
  },
  unActiveStyle: {...RBWRAPPER},
  selected: {
    width: 12,
    height: 12,
    borderRadius: 20,
    // backgroundColor: changeColorSelected
    //   ? COLOR.COLOR_PRIMARY_SECOND
    //   : COLOR.COLOR_PRIMARY_THIRD,
  },
  shadow: {
    //temp for confirm shadow, use backgroundColor at View when has shadow
    // ...Platform.select({
    //   android: {elevation: 3},
    //   ios: {
    //     shadowColor: COLOR.BORDER_FOCUS_TEXT_INPUT,
    //     shadowOpacity: 2,
    //     shadowRadius: 4,
    //     shadowOffset: {
    //       width: 0,
    //       height: 0,
    //     },
    //   },
    // }),
    borderWidth: 1,
    borderColor: COLOR.COLOR_PRIMARY,
    borderRadius: 4,
  },
});
