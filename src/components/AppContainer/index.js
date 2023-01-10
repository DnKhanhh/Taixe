/* eslint-disable react-native/no-inline-styles */
import {openMenu} from 'appRedux/actions/otherActions';
import {SVG_NAME} from 'assets/path';
import AppView from 'components/AppView';
import {useActions} from 'hooks/useActions';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import NavigationServices from 'navigation/navigationServices';
import React from 'react';
import {
  ActivityIndicator,
  InteractionManager,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR, SCENE_NAMES} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppText from '../AppText';
import {Platform} from 'react-native';
import {CONST_SIZE} from '../../utils/AppConst';
import {StatusBarHeight} from 'utils/AppConst';

const AppContainer = ({
  style,
  title,
  hide = false,
  back = true,
  draw = true,
  children,
  icon1,
  icon2,
  onPressIcon1,
  onPressIcon2,
  buttonTitle,
  onPressButtonTitle,
  iconLogo,
  stackScreen = false,
  onGoBack,
  hasIconBack = true,
  isModal = false,
}) => {
  const actions = useActions({openMenu});

  function goBack() {
    if (typeof onGoBack === 'function') {
      Keyboard.dismiss();
      onGoBack();
    } else {
      Keyboard.dismiss();
      NavigationServices.goBack();
    }
  }

  React.useEffect(() => {
    const eventBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        back && goBack();
        return true;
      },
    );
    return () => eventBackHandler.remove();
  }, [back, onGoBack]);

  const [readyRender, setReadyRender] = React.useState(false);
  React.useEffect(() => {
    const subscriber = InteractionManager.runAfterInteractions(() => {
      if (readyRender) {
        return;
      }
      setReadyRender(true);
    });

    return () => {
      subscriber.done();
    };
  }, [readyRender]);

  return (
    <View style={styles.container}>
      {!hide ? (
        <LinearGradient
          colors={COLOR.COLORS_HEADER_CONTAINER_V2}
          style={[STYLE_GLOBAL.paddingIPX, STYLE_GLOBAL.shadowDefault]}>
          <View style={[styles.headerContainer]}>
            {stackScreen ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                {hasIconBack && (
                  <TouchableOpacity
                    onPress={goBack}
                    disabled={!back}
                    style={{
                      ...styles.btn,
                      opacity: back ? 1 : 0,
                    }}>
                    {isModal ? (
                      <SVG_NAME.CLOSE_ICON_WHITE />
                    ) : (
                      <SVG_NAME.BACK_ICON />
                    )}
                  </TouchableOpacity>
                )}
                <AppText
                  numberOfLines={1}
                  style={[
                    STYLE_GLOBAL.h6,
                    STYLE_GLOBAL.color_secondary,
                    // {marginLeft: 16},
                  ]}>
                  {title}
                </AppText>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => actions.openMenu()}
                disabled={!draw}
                style={{
                  ...styles.btn,
                  opacity: draw ? 1 : 0,
                }}>
                <SVG_NAME.MENU />
              </TouchableOpacity>
            )}
            {!stackScreen && iconLogo ? (
              <View style={styles.iconLogo}>{iconLogo}</View>
            ) : !stackScreen && !iconLogo ? (
              <AppText
                numberOfLines={1}
                style={[
                  STYLE_GLOBAL.h6,
                  STYLE_GLOBAL.color_secondary,
                  styles.title,
                ]}>
                {title}
              </AppText>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              {!icon1 && !icon2 && !buttonTitle && (
                <View
                  style={{
                    height: 36,
                    width: 36,
                  }}
                />
              )}
              <TouchableOpacity onPress={onPressButtonTitle}>
                <AppText
                  style={[
                    STYLE_GLOBAL.body2,
                    STYLE_GLOBAL.weight700,
                    {color: '#003567'},
                  ]}>
                  {buttonTitle}
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressIcon1}>
                {icon1}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressIcon2}
                style={{marginLeft: icon2 ? 8 : 0}}>
                {icon2}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.statusBar} />
      )}

      {false ? (
        <AppView center flex>
          <ActivityIndicator color={COLOR.COLOR_PRIMARY} />
        </AppView>
      ) : (
        <View style={[styles.containerChildren, style]}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>{children}</>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};
export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: getSize.v(64),
    // paddingBottom: 15,
    paddingTop: Platform.select({
      ios: 0,
      android: StatusBarHeight,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize.m(16),
  },
  iconLogo: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    marginRight: 24,
  },
  containerChildren: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.BACKGROUND_GRAY, //COLOR.COLOR_SECONDARY
  },
  btn: {
    height: getSize.v(52),
    width: getSize.v(52),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -16,
  },
});
