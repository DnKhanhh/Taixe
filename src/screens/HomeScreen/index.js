import HomeScreen from './view';
import messaging from '@react-native-firebase/messaging';

import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//Screen
//component
import AppText from 'components/AppText';
import OptionItem from 'components/OptionItem';
import AppHotline from 'components/AppHotline';
import AppImage from 'components/AppImage';
import AppModalDialog from 'components/Modal/AppModalDialog';

//Utils
import { SCENE_NAMES } from 'utils/AppConst';
import { SVG_NAME } from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import { COLOR } from 'utils/AppConst';
import useTranslate from 'hooks/useTranslate';
//Navigation
import NavigationServices from 'navigation/navigationServices';
import { signOutSubmit } from 'appRedux/actions/authActions';
import { useActions } from 'hooks/useActions';
import Drawer from 'react-native-drawer';

import { getOpenMenuSelector } from 'appRedux/selectors/otherSelector';
import { getUserInfoSelector } from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import { statusTransfer, checkUserCompletedForm } from 'utils/appUtils';

import { useStatusColor } from 'hooks/useStatusColor';
import { getSize } from 'utils/responsive';

const optionListDrawer = [
  {
    ID: 1,
    title: 'navigate:scenes.changeLanguage.title',
    icon: <SVG_NAME.GLOBAL_ICON_DRAWER />,
    type: 'DRAWER.CHANGE_LANGUAGE_SCREEN',
    scene: SCENE_NAMES.CHANGE_LANGUAGE_SCREEN,
  },
  {
    ID: 2,
    title: 'navigate:scenes.support.title',
    icon: <SVG_NAME.HELP />,
    type: 'DRAWER.SUPPORT',
    scene: SCENE_NAMES.SUPPORT_SCREEN,
  },
  {
    ID: 3,
    title: 'navigate:scenes.setting.title',
    icon: <SVG_NAME.SETTING_DRAWER />,
    type: 'DRAWER.SETTING_SCREEN',
    scene: SCENE_NAMES.SETTING_SCREEN,
  },
  {
    ID: 4,
    title: 'navigate:scenes.logout.title',
    icon: <SVG_NAME.LOGOUT />,
    type: 'DRAWER.SIGNOUT',
  },
];

export default function RootDrawerNavigation({ }) {
  const user = useSelectorShallow(getUserInfoSelector);
  const userProfile = user?.userProfile;
  //Filter color follow account status
  const colorStatusProfile = useStatusColor(
    userProfile?.status,
  ).colorBackgroundStatus;
  const statusColorProfile = useMemo(() => {
    return [styles.statusBackground(colorStatusProfile)];
  }, [colorStatusProfile]);

  const textColorStatusProfile = useStatusColor(
    userProfile?.status,
  ).colorTextStatus;
  const textStatusColorProfile = useMemo(() => {
    return [styles.statusText(textColorStatusProfile)];
  }, [textColorStatusProfile]);
  const { t } = useTranslate();
  const actions = useActions({ signOutSubmit });
  const openMenu = useSelectorShallow(getOpenMenuSelector);
  const [showModalSignOut, setShowModalSignOut] = useState(false);
  async function requestUserPermission() {
    await messaging().requestPermission();
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  const onPressOptionItem = type => {
    switch (type) {
      case 'DRAWER.CHANGE_LANGUAGE_SCREEN':
        NavigationServices.navigate(SCENE_NAMES.CHANGE_LANGUAGE_SCREEN);
        break;
      case 'DRAWER.SUPPORT':
        NavigationServices.navigate(SCENE_NAMES.SUPPORT_SCREEN);
        break;
      case 'DRAWER.SETTING_SCREEN':
        NavigationServices.navigate(SCENE_NAMES.SETTING_SCREEN);
        break;
      case 'DRAWER.SIGNOUT':
        setShowModalSignOut(true);
        // actions.signOutSubmit();
        break;
      default:
        break;
    }
  };

  const CustomDrawerContent = useCallback(() => {
    const renderButton = ({ item }) => {
      return (
        <OptionItem
          item={item}
          onPressItem={() => {
            onPressOptionItem(item.type);
            if (item.type !== 'DRAWER.SIGNOUT') {
              setTimeout(() => {
                menuRight.current.close();
              }, 500);
            }
          }}>
          {item.icon}
        </OptionItem>
      );
    };
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          zIndex: 10,
        }}
        source={require('assets/images/drawer_background.png')}>
        <View style={{ flex: 1 }}>

          <View
            style={{
              flex: 1,
              maxHeight: getSize.v(120),
              alignItems: 'center',
              paddingTop: getSize.m(24),
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: getSize.m(24),
            }}
          >
            {userProfile.avatarUrl ? (
              <AppImage
                source={{uri: userProfile?.avatarUrl}}
                style={styles.avatarStyle}
                resizeMode="cover"
              />
            ) : (
              <SVG_NAME.AVATAR />
            )}
            <View
              style={{
                justifyContent: 'center',
                marginLeft: 10,
                maxWidth: '90%',
                marginRight: 12,
              }}>
              <AppText
                style={[
                  STYLE_GLOBAL.body1,
                  STYLE_GLOBAL.weight700,
                  STYLE_GLOBAL.color_textTitleDrawer,
                  { marginTop: 10 },
                ]}>
                {userProfile?.name}
              </AppText>
              <View style={statusColorProfile}>
                <AppText style={[STYLE_GLOBAL.body2, textStatusColorProfile]}>
                  {t(statusTransfer(userProfile?.status).nameStatus)}
                </AppText>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              data={optionListDrawer}
              renderItem={renderButton}
              keyExtractor={item => item.ID}
              showsVerticalScrollIndicator={false}
            />

            <View style={{ paddingLeft: 16, paddingBottom: 36 }}>
              <LinearGradient
                colors={['#0EB05F', '#0EB05F']}
                style={styles.linearGradient}>
                <View style={{ marginBottom: 10 }}>
                  <TouchableOpacity>
                    <SVG_NAME.MESSENGER_ICON_DRAWER />
                  </TouchableOpacity>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: '#fff' }}>
                  <TouchableOpacity style={{ paddingTop: 10 }}>
                    <SVG_NAME.ZALO_ICON_DRAWER />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <View style={{ paddingRight: 48 }}>
                <AppHotline />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }, [
    statusColorProfile,
    textStatusColorProfile,
    userProfile?.avatarUrl,
    userProfile?.name,
    userProfile?.status,
  ]);
  const menuRight = useRef(null);
  const drawerStyles = {
    drawer: { 
      shadowColor: '#000000', 
      shadowOpacity: 1, 
      shadowRadius: 0,
     },
    main: {},
  };

  useEffect(() => {
    if (openMenu) {
      menuRight.current.open();
    }
  }, [openMenu]);

  //check status transporter if unfinished -> update information else dashboard
  useEffect(() => {
    checkUserCompletedForm(userProfile?.status);
  }, [userProfile?.status]);
  return (
    <Drawer
      type="overlay"
      ref={menuRight}
      content={
        <CustomDrawerContent cbClick={() => {menuRight.current.close()}} />
      }
      tapToClose={true}
      side="right"
      openDrawerOffset={0.2}
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      styles={drawerStyles}
      tweenHandler={ratio => ({
        main: { opacity: Platform.OS === 'ios' ? (2 - ratio) / 2 : 1 },
      })}
      >
      <HomeScreen />
      <AppModalDialog
        type={'warning'}
        titleModal={t('common:modalbox.signOut.title')}
        showModalDialog={showModalSignOut}
        contentModal={t('common:modalbox.signOut.content')}
        setShowModalDialog={setShowModalSignOut}
        titleConfirm={t('common:button.confirm')}
        titleCancel={t('common:modalbox.cancel')}
        onPressConfirm={() => actions.signOutSubmit()}
      />
    </Drawer>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    width: '25%',
    borderRadius: getSize.s(8),
    alignItems: 'center',
    marginBottom: getSize.m(10),
    paddingVertical: getSize.m(20),
    opacity: 0.8,
    justifyContent: 'flex-start',
  },
  statusBackground: colorBackground => ({
    backgroundColor: colorBackground,
    borderRadius: getSize.s(2),
    marginVertical: getSize.m(4),
    paddingVertical: getSize.m(2),
    alignItems: 'center',
  }),
  statusText: color => ({
    color: color,
    paddingHorizontal: getSize.m(18),
  }),
  avatarStyle: {
    width: getSize.m(44),
    height: getSize.m(44),
    borderRadius: 100,
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderColor: '#F07F23',
    borderWidth: 1,
  },
});
