import NetInfo from '@react-native-community/netinfo';
import { onAppConnectivityChange } from 'appRedux/actions/connectActions';
import { getIsConnectedSelector } from 'appRedux/selectors/connectSelector';
import { getIsLoadingSelector } from 'appRedux/selectors/loadingSelector';
import AppLoading from 'components/AppLoading';
import { useActions } from 'hooks/useActions';
import { AppPickerImageProvider } from 'hooks/useImagePicker';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import { getActiveRouteName } from 'navigation/activeRouteName';
import RootStack from 'navigation/Root';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Host } from 'react-native-portalize';
import NotificationPopup from 'react-native-push-notification-popup';
import FCMService from 'utils/FCMService';

function Screens() {
  const isConnected = useSelectorShallow(getIsConnectedSelector);
  const actions = useActions({
    onAppConnectivityChange,
  });
  const [currentRouteName, setCurrentRouteName] = useState('');
  const isLoading = useSelectorShallow(getIsLoadingSelector);
  const _popup = useRef();
  const onNavigationStateChange = action => {
    // console.log('>>>>ACTION_NAVIGATOR:', {action});
    const routeName = getActiveRouteName(action);
    if (currentRouteName !== routeName) {
      setCurrentRouteName(routeName);
      // change the tracker here to use other Mobile analytics SDK.
    }
  };

  const netInfoListener = useCallback(
    state => {
      if (state.isConnected !== isConnected) {
        actions.onAppConnectivityChange(state.isConnected);
      }
    },
    [isConnected, actions],
  );

  // Subscribe net info
  useEffect(() => {

    const subscribeNetInfo = NetInfo.addEventListener(netInfoListener);

    return () => {
      subscribeNetInfo();
    };
  }, [netInfoListener]);

  // const notify = useMemo(
  //   () => data => {
  //     _popup.current.show({
  //       onPress() {
  //         routeNotify(data.data);
  //       },
  //       appIconSource: require('assets/images/logo.png'),
  //       appTitle: 'Chuxe Logistics',
  //       timeText: 'Now',
  //       title: data.title,
  //       body: data.body,
  //       slideOutTime: 5000,
  //     });
  //   },
  //   [routeNotify],
  // );

  // const routeNotify = useMemo(
  //   () => data => {
  //     console.log('---logdata click notify', data);
  //     if (!data || !data.dataInfo) {
  //       return;
  //     }
  //     try {
  //       const dataInfo = JSON.parse(data.dataInfo);
  //     } catch (error) { }
  //   },
  //   [],
  // );

  useEffect(() => {
    FCMService.requestUserPermission();

    FCMService.getFcmToken((token) => {
      console.log("getFcmToken: ", token);
    })
    //kill app or background
    FCMService.initPushNotifications(notification => {
      const { userInteraction } = notification;
      if (userInteraction) {
        console.log('notification', notification);
        const data = notification.data;
        return;
      }
    });

    FCMService.subscribeToTopic('alldevices');

    // open-app
    FCMService.onMessage(item => {
      console.log('notify onMessage', item);
      try {
        const { notification, data } = item;
        const dataNotificaton = {
          title: notification.title,
          body: notification.body,
          data,
        };

        FCMService.displayLocalNotification(dataNotificaton);
      } catch (error) { }
    });

    //Unmount
    return () => { };
  }, []);

  return (
    <>
      <Host>
        <AppPickerImageProvider>
          <RootStack onNavigationStateChange={onNavigationStateChange} />
        </AppPickerImageProvider>
      </Host>
      <NotificationPopup ref={_popup} />
      {isLoading && <AppLoading />}
    </>
  );
}

export default Screens;
