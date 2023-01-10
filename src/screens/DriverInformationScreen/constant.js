import React from 'react';
import {SVG_NAME} from 'assets/path';
import {SCENE_NAMES, ACCOUNT_STATUS} from 'utils/AppConst';

export const DRIVER_INFORMATION = {
  DETAIL_INFORMATION: 'DETAIL_INFORMATION',
  CHANGE_PHONE: 'CHANGE_PHONE',
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_STATUS_ACCOUNT: 'CHANGE_STATUS_ACCOUNT',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
};

export const DETAIL_INFORMATION = [
  {
    id: 100,
    title: 'common:textContent.changeInformation',
    icon: <SVG_NAME.USER />,
    type: DRIVER_INFORMATION.DETAIL_INFORMATION,
    scene: SCENE_NAMES.CHANGE_PHONE,
  },
];

export const signInOptions = (phone, email, isEdit) => {
  return [
    {
      id: 200,
      title: phone || 'common:noInformation',
      icon: <SVG_NAME.USER_PHONE />,
      type: DRIVER_INFORMATION.CHANGE_PHONE,
      scene: SCENE_NAMES.CHANGE_PHONE_OR_EMAIL,
      isDisabled: !isEdit,
    },
    {
      id: 201,
      title: email ? email : 'common:noInformation',
      icon: <SVG_NAME.USER_MAIL />,
      type: DRIVER_INFORMATION.CHANGE_EMAIL,
      scene: SCENE_NAMES.CHANGE_PHONE_OR_EMAIL,
      isDisabled: !isEdit,
    },
  ];
};

export const securityOptions = (nameStatus, isEdit) => {
  if (
    nameStatus === ACCOUNT_STATUS.STOP_WORKING ||
    nameStatus === ACCOUNT_STATUS.WORKING
  ) {
    return [
      {
        id: 300,
        title: 'common:textContent.changePassword',
        icon: <SVG_NAME.USER_RESET />,
        type: DRIVER_INFORMATION.CHANGE_PASSWORD,
        scene: SCENE_NAMES.CHANGE_PHONE,
      },
      {
        id: 301,
        title:
          nameStatus === ACCOUNT_STATUS.STOP_WORKING
            ? 'common:modalbox.active'
            : 'common:modalbox.inactive',
        icon: <SVG_NAME.MINUS_CIRCLE_OPTION />,
        type: DRIVER_INFORMATION.CHANGE_STATUS_ACCOUNT,
        isDisabled: !isEdit,
      },
      {
        id: 302,
        title: 'common:textContent.deleteAccount',
        icon: <SVG_NAME.TRASH_ERROR />,
        type: DRIVER_INFORMATION.DELETE_ACCOUNT,
      },
    ];
  } else {
    return [
      {
        id: 300,
        title: 'common:textContent.changePassword',
        icon: <SVG_NAME.USER_RESET />,
        type: DRIVER_INFORMATION.CHANGE_PASSWORD,
        scene: SCENE_NAMES.CHANGE_PHONE,
      },
      {
        id: 302,
        title: 'common:textContent.deleteAccount',
        icon: <SVG_NAME.TRASH_ERROR />,
        type: DRIVER_INFORMATION.DELETE_ACCOUNT,
      },
    ];
  }
};
