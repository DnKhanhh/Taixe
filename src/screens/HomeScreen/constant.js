import React from 'react';
import {SVG_NAME} from 'assets/path';
import AppIcons from 'utils/AppIcons';
export const ORDER_OPTION = {
  CREATE_ORDER: 'CREATE_ORDER',
  MY_ORDER: 'MY_ORDER',
};

export const DIRECTORY_OPTION = {
  MYJOURNEY: 'MYJOURNEY',
  INFO_ACCOUNT: 'INFO_ACCOUNT',
  OTHER_SETTING: 'OTHER_SETTING'
};

export const QUOTE_OPTION = {
  REQUEST_QUOTE: 'REQUEST_QUOTE',
  LIST_QUOTE: 'LIST_QUOTE',
};
export const ACCOUNT_OPTIONS = {
  DRIVER_INFORMATION: 'DRIVER_INFORMATION',
  LIST_VEHICLE: 'LIST_VEHICLE',
  LIST_DRIVER: 'LIST_DRIVER',
  PAYMENT: 'PAYMENT',
  SUPPORT_SCREEN: 'SUPPORT_SCREEN',
  DETAIL_DRIVER_INFO: 'DETAIL_DRIVER_INFO',
  ANOTHER_INFORMATION: 'ANOTHER_INFORMATION',
};
export const SWITCH_OPTIONS = {
  DASH_BOARD: 'DASH_BOARD',
  DIRECTORY: 'DIRECTORY',
};

export const HELP_OPTION = {
  CALL_HOTLINE: 'CALL_HOTLINE',
  CALL_ZALO: 'CALL_ZALO',
  CALL_FACEBOOK: 'CALL_FACEBOOK',
};
export const SWITCH_BUTTON = [
  {
    id: 101,
    title: 'navigate:scenes.home.directory',
    key: SWITCH_OPTIONS.DIRECTORY,
  },
  {
    id: 102,
    title: 'navigate:scenes.home.dashBoard',
    key: SWITCH_OPTIONS.DASH_BOARD,
  },
];

export const RENDER_BUTTONS_QUOTE = [
  {
    id: 201,
    icon: AppIcons.MYJOURNEY,
    title: 'navigate:scenes.home.myjourney',
    key: DIRECTORY_OPTION.MYJOURNEY,
  },
  {
    id: 202,
    icon: AppIcons.INFOR_ACCOUNT,
    title: 'navigate:scenes.home.infoAccount',
    key: DIRECTORY_OPTION.INFO_ACCOUNT,
  },
  {
    id: 203,
    icon: AppIcons.OTHER_SETTING,
    title: 'navigate:scenes.otherSetting.title',
    key: DIRECTORY_OPTION.OTHER_SETTING,
  },
];
export const DATA_LIST_ACCOUNT = [
  {
    id: 301,
    title: 'navigate:scenes.infoDriver.title',
    icon: AppIcons.CAR_OWNER_INFO,
    key: ACCOUNT_OPTIONS.DETAIL_DRIVER_INFO,
  },
  {
    id: 302,
    title: 'navigate:scenes.listDriver.title',
    icon: AppIcons.DRIVER_LIST,
    key: ACCOUNT_OPTIONS.LIST_DRIVER,
  },
  {
    id: 303,
    title: 'navigate:scenes.payment.title',
    icon: AppIcons.PAYMENT_INFO,
    key: ACCOUNT_OPTIONS.PAYMENT,
  },
  {
    id: 304,
    title: 'navigate:scenes.otherSetting.title',
    icon: AppIcons.OTHER_INFO,
    key: ACCOUNT_OPTIONS.ANOTHER_INFORMATION,
  },
  {
    id: 305,
    title: 'navigate:scenes.driverInfo.title',
    icon: AppIcons.ACCOUNT_INFO,
    key: ACCOUNT_OPTIONS.DRIVER_INFORMATION,
  },
];
export const RENDER_BUTTON_ORDER = [
  {
    id: 401,
    title: 'navigate:scenes.home.createOrder',
    icon: AppIcons.CREATE_ORDER,
    key: ORDER_OPTION.CREATE_ORDER,
  },
  {
    id: 402,
    title: 'navigate:scenes.home.myOrder',
    icon: AppIcons.MY_ORDER,
    key: ORDER_OPTION.MY_ORDER,
  },
];
export const RENDER_BUTTON_HELP = [
  {
    id: 501,
    code: 'hotline',
    title: 'navigate:scenes.home.callHotline',
    icon: AppIcons.PHONE_HOTLINE,
    key: HELP_OPTION.CALL_HOTLINE,
  },
  {
    id: 502,
    code: 'facebook',
    title: 'navigate:scenes.home.smsFacebook',
    icon: AppIcons.MESSENGER,
    key: HELP_OPTION.CALL_FACEBOOK,
  },
  {
    id: 503,
    code: 'zalo',
    title: 'navigate:scenes.home.smsZalo',
    icon: AppIcons.ZALO,
    key: HELP_OPTION.CALL_ZALO,
  },
];
