import React, {useState, useEffect} from 'react';
import {DeviceEventEmitter, View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screen
import ListGatewaySettingScreen from './ListGatewaySettingScreen';
import ListBankSettingScreen from './ListBankSettingScreen';

//components
import AppContainer from 'components/AppContainer';
import CustomTabTint from 'components/AppNavigation/CustomTabTint';

//utils
import {COLOR, SCENE_NAMES} from 'utils/AppConst';
import useTranslate from 'hooks/useTranslate';

export default function ListPaymentSettingScreen({navigation}) {
  const [getNameScreen, setGetNameScreen] = useState(
    SCENE_NAMES.LIST_BANK_SETTING,
  );
  const {t} = useTranslate();
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'changeScreen',
      data => {
        setGetNameScreen(data.screen);
      },
    );
    return () => subscription.remove();
  }, []);

  return (
    <AppContainer
      title={
        getNameScreen === SCENE_NAMES.LIST_BANK_SETTING
          ? t('navigate:scenes.payment.addTitle')
          : t('navigate:scenes.payment.addTitle')
      }
      back={true}
      stackScreen={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        }}>
        <Tab.Screen
          name={SCENE_NAMES.LIST_BANK_SETTING}
          component={ListBankSettingScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <View>
                  <CustomTabTint
                    focused={focused}
                    title={t('navigate:scenes.payment.tabBank')}
                  />
                </View>
              );
            },
            lazy: true,
          }}
        />
        <Tab.Screen
          name={SCENE_NAMES.LIST_GATEWAY_SETTING}
          component={ListGatewaySettingScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <View>
                  <CustomTabTint
                    focused={focused}
                    title={t('navigate:scenes.payment.tabGateway')}
                  />
                </View>
              );
            },
            lazy: true,
          }}
        />
      </Tab.Navigator>
    </AppContainer>
  );
}
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLOR.BACKGROUND_TOP_TABBAR,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0,
  },
  tabBarIndicatorStyle: {
    height: null,
    top: 0,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
});
