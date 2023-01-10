import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './appRedux/store/configureStore';
const storeConfig = configureStore();
import {NativeBaseProvider} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import './locales/IMLocalize';

import Root from './screens';
import Toast from 'react-native-toast-message';
import {toastConfig} from 'utils/toastConfig';
import {StatusBarHeight} from 'utils/AppConst';
import {withCodePush} from '../codepush';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

function App() {
  Platform.select({
    ios: () => {
      StatusBar.setBarStyle('light-content');
    },
    android: () => {
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    },
  })();
  //Hide Splash screen on app load.
  React.useEffect(() => {
    if (!__DEV__) {
      [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'trace',
        'warn',
      ].forEach(methodName => {
        console[methodName] = () => {};
      });
    }

    SplashScreen.hide();
    return () => {};
  });
  return (
    <Provider store={storeConfig.store}>
      <PersistGate loading={null} persistor={storeConfig.persistor}>
        <NativeBaseProvider>
          <Root />
        </NativeBaseProvider>
        <Toast topOffset={40 + StatusBarHeight} config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

const ReachApp = __DEV__ ? App : withCodePush(App);
export default gestureHandlerRootHOC(ReachApp, {flex: 1});
