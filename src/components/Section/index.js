import React, {useRef, useState, useEffect} from 'react';
import {Animated, Keyboard, LayoutAnimation, Pressable} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import {toggleAnimation} from 'animations/toggleAnimation';
import _ from 'lodash';
import {getSize} from 'hooks/useIconSvgResizeHOC';
export const Section = ({
  headerTitle,
  children,
  openDefault,
  error,
  headerTitleStyle,
  isDivider = true,
  style,
  icon = <SVG_NAME.DOWN_GREEN />,
  showIconDown = true,
  otherOption,
  changeBackground = false,
  newBackground = {},
  isBottom = true,
  disabled = false,
  styleInActive = {},
  customHeader,
  isTripRouteTab = false,
}) => {
  const animationController = useRef(
    new Animated.Value(openDefaults ? 1 : 0),
  ).current;
  const [openDefaults, setOpenDefaults] = useState(openDefault);
  const [expanded, setExpanded] = useState(null);
  const toggleListItem = () => {
    Keyboard.dismiss();
    const config = {
      duration: 300,
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setExpanded(!expanded);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  useEffect(() => {
    if (error) {
      setOpenDefaults(true);
    }
  }, [error, openDefault]);

  useEffect(() => {
    setExpanded(openDefaults);
  }, [openDefaults]);

  return (
    <AppView
      marginBottom={isBottom ? getSize.m(8) : 0}
      backgroundColor={
        !changeBackground ? COLOR.COLOR_BACKGROUND : newBackground
      }>
      <Pressable disabled={disabled} onPress={toggleListItem}>
        <AppView
          backgroundColor={
            !changeBackground ? COLOR.COLOR_BACKGROUND : newBackground
          }
          borderColor={
            expanded ? COLOR.BACKGROUND_GRAY : COLOR.COLOR_BACKGROUND
          }
          style={expanded ? style : styleInActive}
          borderBottomWidth={isDivider ? getSize.m(2) : 0}
          row
          space={'between'}
          alignCenter
          paddingHorizontal={16}
          paddingTop={isTripRouteTab ? 0 : 16}
          paddingBottom={isTripRouteTab ? 0 : 16}>
          <AppText
            style={[
              STYLE_GLOBAL.subTitle2,
              STYLE_GLOBAL.color_primary,
              STYLE_GLOBAL.weight700,
              headerTitleStyle,
            ]}>
            {headerTitle}
          </AppText>
          {customHeader}
          {showIconDown ? (
            <Animated.View
              style={{
                transform: [{rotateZ: arrowTransform}],
              }}>
              {icon}
            </Animated.View>
          ) : (
            <AppText
              style={[
                STYLE_GLOBAL.body1,
                STYLE_GLOBAL.weight600,
                STYLE_GLOBAL.color_textContent,
              ]}>
              {otherOption}
            </AppText>
          )}
        </AppView>
      </Pressable>
      {expanded && children}
    </AppView>
  );
};
