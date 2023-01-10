import React from 'react';
import {SVG_NAME} from 'assets/path';
export const ORDER_OPTION = {
  CREATE_ORDER: 'CREATE_ORDER',
  MY_ORDER: 'MY_ORDER',
};

export const QUOTE_OPTION = {
  REQUEST_QUOTE: 'REQUEST_QUOTE',
  LIST_QUOTE: 'LIST_QUOTE',
};
export const ACCOUNT_OPTIONS = {
  SENDER_INFORMATION: 'SENDER_INFORMATION',
  LIST_VEHICLE: 'LIST_VEHICLE',
  LIST_DRIVER: 'LIST_DRIVER',
  PAYMENT: 'PAYMENT',
  SUPPORT_SCREEN: 'SUPPORT_SCREEN',
  DETAIL_SENDER_INFO: 'DETAIL_SENDER_INFO',
  ADDRESS_SCREEN: 'ADDRESS_SCREEN',
};
export const SWITCH_OPTIONS = {
  DASH_BOARD: 'DASH_BOARD',
  DIRECTORY: 'DIRECTORY',
};

export const SWITCH_OPTIONS_TRIP_DETAIL = {
  INFO_DETAIL: 'DASH_BOARD',
  TRIP_DETAIL: 'TRIP_DETAIL',
};

export const SWITCH_OPTIONS_DIRECTORY = {
  TRIP_GONE: 'TRIP_GONE',
  TRIP_INPROGRESS: 'TRIP_INPROGRESS',
  TRIP_CONTINUE: 'TRIP_CONTINUE',

  TRIP_RECALL: 'TRIP_RECALL',
  TRIP_REFUSE: 'TRIP_REFUSE',
  TRIP_SCHEDULE: 'TRIP_SCHEDULE',
};

export const HELP_OPTION = {
  CALL_HOTLINE: 'CALL_HOTLINE',
  CALL_ZALO: 'CALL_ZALO',
  CALL_FACEBOOK: 'CALL_FACEBOOK',
};
export const SWITCH_BUTTON = [
  {
    title: 'navigate:scenes.home.directory',
    key: SWITCH_OPTIONS.DIRECTORY,
  },
  {
    title: 'navigate:scenes.home.dashBoard',
    key: SWITCH_OPTIONS.DASH_BOARD,
  },
];

export const SWITCH_BUTTON_TRIP_DETAIL = [
  {
    title: 'Thông tin',
    key: SWITCH_OPTIONS_TRIP_DETAIL.INFO_DETAIL,
    id: 1,
  },
  {
    title: 'Lộ trình',
    key: SWITCH_OPTIONS_TRIP_DETAIL.TRIP_DETAIL,
    id: 2,
  },
];

export const SWITCH_BUTTON_TRIP_PROCESSS = [
  {
    title: 'Thông tin',
    key: SWITCH_OPTIONS_TRIP_DETAIL.INFO_DETAIL,
    id: 1,
  },
  {
    title: 'Lộ trình',
    key: SWITCH_OPTIONS_TRIP_DETAIL.TRIP_DETAIL,
    id: 2,
  },
];

export const SWITCH_BUTTON_DIRECTORY = [
  {
    title: 'navigate:scenes.home.tripGone',
    key: SWITCH_OPTIONS_DIRECTORY.TRIP_GONE,
    id: 1,
  },
  {
    title: 'navigate:scenes.home.tripInprogress',
    key: SWITCH_OPTIONS_DIRECTORY.TRIP_INPROGRESS,
    id: 2,
  },
  {
    title: 'navigate:scenes.home.tripContinue',
    key: SWITCH_OPTIONS_DIRECTORY.TRIP_CONTINUE,
    id: 3,
  },

  {
    title: 'Chuyến bị thu hồi',
    key: SWITCH_OPTIONS_DIRECTORY.TRIP_RECALL,
    id: 4,
  },
  {
    title: 'Chuyến đi bạn từ chối',
    key: SWITCH_OPTIONS_DIRECTORY.TRIP_REFUSE,
    id: 5,
  },
  {
    title: 'Lịch các chuyến đi',
    key: SWITCH_OPTIONS_DIRECTORY.TRIP_SCHEDULE,
    id: 6,
  },

  // {
  //   title: 'navigate:scenes.home.tripContinue',
  //   key: SWITCH_OPTIONS_DIRECTORY.MORE_OPTION,
  //   id: 4,
  // },
];

export const RENDER_BUTTONS_QUOTE = [
  {
    icon: <SVG_NAME.REQUEST_QUOTE />,
    title: 'navigate:scenes.home.requestQuote',
    key: QUOTE_OPTION.REQUEST_QUOTE,
  },
  {
    icon: <SVG_NAME.LIST_QUOTE />,
    title: 'navigate:scenes.home.listQuote',
    key: QUOTE_OPTION.LIST_QUOTE,
  },
];
export const DATA_LIST_ACCOUNT = [
  {
    id: 1,
    title: 'navigate:scenes.infoDriver.title',
    icon: <SVG_NAME.CAR_OWNER_INFO />,
    key: ACCOUNT_OPTIONS.DETAIL_SENDER_INFO,
  },
  // {
  //   id: 2,
  //   title: 'navigate:scenes.listVehicle.title',
  //   icon: <SVG_NAME.VEHICLE_LIST />,
  //   key: ACCOUNT_OPTIONS.LIST_VEHICLE,
  // },
  {
    id: 3,
    title: 'navigate:scenes.listDriver.title',
    icon: <SVG_NAME.DRIVER_LIST />,
    key: ACCOUNT_OPTIONS.LIST_DRIVER,
  },
  {
    id: 4,
    title: 'navigate:scenes.payment.title',
    icon: <SVG_NAME.PAYMENT_INFO />,
    key: ACCOUNT_OPTIONS.PAYMENT,
  },
  {
    id: 5,
    title: 'navigate:scenes.anotherInformation.title',
    icon: <SVG_NAME.OTHER_INFO />,
    key: ACCOUNT_OPTIONS.ANOTHER_INFORMATION,
  },
  {
    id: 6,
    title: 'navigate:scenes.home.infoAccount',
    icon: <SVG_NAME.ACCOUNT_INFO />,
    key: ACCOUNT_OPTIONS.SENDER_INFORMATION,
  },
  {
    id: 7,
    title: 'navigate:scenes.addressScreen.title',
    icon: <SVG_NAME.ACCOUNT_INFO />,
    key: ACCOUNT_OPTIONS.ADDRESS_SCREEN,
  },
];
export const RENDER_BUTTON_ORDER = [
  {
    title: 'navigate:scenes.home.createOrder',
    icon: <SVG_NAME.CREATE_ORDER />,
    key: ORDER_OPTION.CREATE_ORDER,
  },
  {
    title: 'navigate:scenes.home.myOrder',
    icon: <SVG_NAME.MY_ORDER />,
    key: ORDER_OPTION.MY_ORDER,
  },
];
export const RENDER_BUTTON_HELP = [
  {
    id: 1,
    code: 'hotline',
    title: 'navigate:scenes.home.callHotline',
    icon: <SVG_NAME.PHONE_HOTLINE />,
    key: HELP_OPTION.CALL_HOTLINE,
  },
  {
    id: 2,
    code: 'facebook',
    title: 'navigate:scenes.home.smsFacebook',
    icon: <SVG_NAME.MESSENGER />,
    key: HELP_OPTION.CALL_FACEBOOK,
  },
  {
    id: 3,
    code: 'zalo',
    title: 'navigate:scenes.home.smsZalo',
    icon: <SVG_NAME.ZALO />,
    key: HELP_OPTION.CALL_ZALO,
  },
];
