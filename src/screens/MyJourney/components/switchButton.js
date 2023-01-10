import React, {useRef, useState} from 'react';
import {TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {SVG_NAME} from 'assets/path';
import AppText from 'components/AppText';
import {SWITCH_BUTTON_DIRECTORY} from '../constant';
//Utils
import useTranslate from 'hooks/useTranslate';
import {COLOR, deviceWidth} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

function SwitchButton({tabSelected, setTabSelected}) {
  const flatListRef = useRef();

  const ItemButton = ({item, onPress, state = 'normal'}) => {
    const {t} = useTranslate();
    const renderBackgroundButton = {
      normal: COLOR.COLOR_BACKGROUND_GRAY,
      selected: COLOR.WHITE,
    };
    const renderTextColorButton = {
      normal: COLOR.BLUE_4,
      selected: COLOR.BLUE_DARK2,
    };
    const renderFontWeightButton = {
      normal: '400',
      selected: '600',
    };
    return (
      <TouchableOpacity
        style={[
          styles.buttonStickyBtnSwitch,
          {backgroundColor: renderBackgroundButton[state]},
        ]}
        onPress={onPress}>
        <AppText
          style={[
            STYLE_GLOBAL.body1,
            styles.textButtonSwitch,
            {color: renderTextColorButton[state]},
            {fontWeight: renderFontWeightButton[state]},
          ]}>
          {t(`${item.title}`)}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {tabSelected === SWITCH_BUTTON_DIRECTORY.length - 1 && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.prevBtn}
          onPress={() => {
            setTabSelected(tabSelected - 1);
            flatListRef.current?.scrollToIndex({
              index: tabSelected - 1,
              animated: true,
              viewPosition: 1,
              viewOffset:
                ([0, 1, 2].some(value => tabSelected === value) && 0) || -50,
            });
          }}>
          <SVG_NAME.ICON_LEFT_GRAY />
        </TouchableOpacity>
      )}
      <FlatList
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        ref={flatListRef}
        horizontal
        data={SWITCH_BUTTON_DIRECTORY}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ItemButton
            key={item.key}
            state={tabSelected === index ? 'selected' : 'normal'}
            item={item}
            onPress={() => {
              setTabSelected(index);
              flatListRef.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 1,
                viewOffset:
                  ([0, 1, 2].some(value => index === value) && 50) ||
                  (index === SWITCH_BUTTON_DIRECTORY.length && 0) ||
                  -50,
              });
            }}
          />
        )}
        keyExtractor={(item, index) => 'key' + index}
      />
      {![0, 1, 2].some(value => tabSelected === value) &&
        tabSelected !== SWITCH_BUTTON_DIRECTORY.length - 1 && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.nextBtn}
            onPress={() => {
              setTabSelected(tabSelected + 1);
              flatListRef.current?.scrollToIndex({
                index: tabSelected + 1,
                animated: true,
                viewPosition: 1,
                viewOffset:
                  ([0, 1, 2].some(value => tabSelected === value) && 0) || -50,
              });
            }}>
            <SVG_NAME.ICON_RIGHT_GRAY />
          </TouchableOpacity>
        )}
    </>
  );
}

export default React.memo(SwitchButton);
const styles = StyleSheet.create({
  viewButtonSwitch: {
    flexDirection: 'row',
    borderRadius: 54,
    alignItems: 'center',
    width: deviceWidth - 20,
    padding: 4,
    backgroundColor: COLOR.COLOR_SECONDARY,
  },
  viewButtonStickySwitch: {
    flexDirection: 'row',
    borderRadius: 0,
    alignItems: 'center',
    width: deviceWidth,
    padding: 4,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
  },
  textButtonSwitch: {
    textAlign: 'center',
    paddingVertical: 12,
  },
  buttonSwitch: {
    borderRadius: 86,
    backgroundColor: COLOR.COLOR_PRIMARY,
    flex: 1,
  },
  buttonStickyBtnSwitch: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    paddingHorizontal: 15,
    minWidth: 100,
  },
  nextBtn: {
    backgroundColor: COLOR.COLOR_BACKGROUND_GRAY,
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevBtn: {
    backgroundColor: COLOR.COLOR_BACKGROUND_GRAY,
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
