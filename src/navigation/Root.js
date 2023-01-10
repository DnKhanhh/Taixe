import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from './navigationServices';

import ChangePhoneOrEmailScreen from 'screens/auth/ChangePhoneOrEmailScreen';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';
import NewPasswordScreen from 'screens/auth/NewPasswordScreen';
import DetailBankInfoScreen from 'screens/PaymentScreen/screens/DetailBankInfoScreen';
import ListBankSettingScreen from 'screens/PaymentScreen/screens/ListPaymentSettingScreen/ListBankSettingScreen';
import DriverInformationScreen from 'screens/DriverInformationScreen';
import SearchScreen from '../screens//SearchScreen';
import ChangePasswordScreen from '../screens/auth/ChangePasswordScreen';
import SelectOTPScreen from '../screens/auth/SelectOTPScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpFormScreen from '../screens/auth/SignUpFormScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOTPScreen';
import GreetingScreen from '../screens/GreetingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SettingScreen from '../screens/SettingScreen';
import SupportScreen from '../screens/SupportScreen';
import AddressDetailScreen from 'screens/AddressDetailScreen';
import AddressScreen from 'screens/AddressScreen';
import VerifyOTPChangeScreen from 'screens/auth/VerifyOTPChangeScreen';
import ChangeLanguageScreen from 'screens/ChangeLanguageScreen';
import DetailDriverInfoScreen from 'screens/DetailDriverInfoScreen';
import HomeScreen from 'screens/HomeScreen';
import MyJourneyScreen from 'screens/MyJourney';
import SenderInfoStartScreen from 'screens/DriverInfoStartScreen';
import CreateNewOrderScreen from 'screens/CreateNewOrderScreen';
import MyOrderScreen from 'screens/MyOrderScreen';
import RequestQuoteScreen from 'screens/RequestQuoteScreen';
import ListQuoteScreen from 'screens/ListQuoteScreen';
import DetailGatewayInfoScreen from 'screens/PaymentScreen/screens/DetailGatewayInfoScreen';
import TripDetailScreen from 'screens/TripDetailScreen';
import ServiceTransDetailScreen from 'screens/ServiceTransDetailScreen';
import DetailTripRouteMap from 'screens/TripDetailScreen/component/DetailTripRouteMap';
import TripInProgressDetailScreen from 'screens/MyJourney/tabs/TripInprogress/TripInProgressDetail/view';
import CostsAddScreen from 'screens/CostsAddScreen';
import AddCostsAction from 'screens/CostsAddScreen/AddCostsAction';
import DetailCosts from 'screens/CostsAddScreen/DetailCosts';
import TypeInputDataTrip from 'screens/MyJourney/tabs/TripInprogress/components/TypeInputDataTrip';
import TripRecall from 'screens/MyJourney/tabs/TripRecall';
import TripReject from 'screens/MyJourney/tabs/TripReject';
import TripSchedule from 'screens/MyJourney/tabs/TripSchedule';
import ReportTroubleTrip from 'screens/ReportTroubleTrip';
import MapDirection from 'screens/MyJourney/tabs/TripInprogress/components/MapDirection';
import MapView from 'screens/MapView';
const Stack = createNativeStackNavigator();

function RootStack({onNavigationStateChange}) {
  return (
    <NavigationContainer
      onStateChange={onNavigationStateChange}
      ref={navigatorRef => {
        NavigationServices.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {height: 0},
          cardOverlayEnabled: true,
          headerBackTitle: null,
          headerTitleAlign: 'center',
          headerTruncatedBackTitle: null,
          headerShown: false,
        }}
        initialRouteName={SCENE_NAMES.GREETING}>
        <Stack.Screen name={SCENE_NAMES.GREETING} component={GreetingScreen} />
        <Stack.Screen name={SCENE_NAMES.HOME} component={HomeScreen} />
        <Stack.Screen
          name={SCENE_NAMES.TRIP_REFUSE_SCREEN}
          component={TripReject}
        />
        <Stack.Screen
          name={SCENE_NAMES.TRIP_RECALL_SCREEN}
          component={TripRecall}
        />
        <Stack.Screen
          name={SCENE_NAMES.TRIP_SCHEDULE_SCREEN}
          component={TripSchedule}
        />
        <Stack.Screen
          name={SCENE_NAMES.MYJOURNEY_SCREEN}
          component={MyJourneyScreen}
        />

        <Stack.Screen name={SCENE_NAMES.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={SCENE_NAMES.SIGN_UP} component={SignUpScreen} />
        <Stack.Screen
          name={SCENE_NAMES.SIGN_UP_FORM}
          component={SignUpFormScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.SETTING_SCREEN}
          component={SettingScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.SUPPORT_SCREEN}
          component={SupportScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_TRIP}
          component={TripDetailScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_TRIP_INPROGRESS}
          component={TripInProgressDetailScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_SERVICE_TRANS}
          component={ServiceTransDetailScreen}
        />
        <Stack.Screen name={SCENE_NAMES.COSTS_ADD} component={CostsAddScreen} />
        <Stack.Screen name={SCENE_NAMES.DETAIL_COSTS} component={DetailCosts} />
        <Stack.Screen name={SCENE_NAMES.MAP_SCREEN} component={MapView} />
        <Stack.Screen
          name={SCENE_NAMES.ADD_COSTS_FORM_SCREEN}
          component={AddCostsAction}
        />

        <Stack.Screen
          name={SCENE_NAMES.REPORT_TROUBLE_TRIP_SCREEN}
          component={ReportTroubleTrip}
        />

        <Stack.Screen
          name={SCENE_NAMES.TYPE_INPUT_DATA_TRIP}
          component={TypeInputDataTrip}
        />
        <Stack.Screen
          name={SCENE_NAMES.MAP_DIRECTION}
          component={MapDirection}
        />

        <Stack.Screen
          name={SCENE_NAMES.DETAIL_TRIP_ROUTE_MAP}
          component={DetailTripRouteMap}
        />
        <Stack.Screen
          name={SCENE_NAMES.SEARCH_SCREEN}
          component={SearchScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.NOTIFICATION_SCREEN}
          component={NotificationScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.SELECT_OTP}
          component={SelectOTPScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.VERIFY_OTP}
          component={VerifyOTPScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.CHANGE_PASSWORD}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.PAYMENT_SCREEN}
          component={PaymentScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.CHANGE_PHONE_OR_EMAIL}
          component={ChangePhoneOrEmailScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.NEW_PASSWORD_SCREEN}
          component={NewPasswordScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DRIVER_INFORMATION}
          component={DriverInformationScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_BANK_INFO}
          component={DetailBankInfoScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_GATEWAY_INFO}
          component={DetailGatewayInfoScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.LIST_BANK_SETTING}
          component={ListBankSettingScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.VERIFY_OTP_CHANGE}
          component={VerifyOTPChangeScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_DRIVER_INFO}
          component={DetailDriverInfoScreen}
        />
        <Stack.Screen name={SCENE_NAMES.ADDRESS} component={AddressScreen} />
        <Stack.Screen
          name={SCENE_NAMES.DETAIL_ADDRESS}
          component={AddressDetailScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.CHANGE_LANGUAGE_SCREEN}
          component={ChangeLanguageScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.DRIVER_INFO_START_SCREEN}
          component={SenderInfoStartScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.CREATE_NEW_ORDER}
          component={CreateNewOrderScreen}
        />
        <Stack.Screen name={SCENE_NAMES.MY_ORDER} component={MyOrderScreen} />
        <Stack.Screen
          name={SCENE_NAMES.REQUEST_QUOTE}
          component={RequestQuoteScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.LIST_QUOTE}
          component={ListQuoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
