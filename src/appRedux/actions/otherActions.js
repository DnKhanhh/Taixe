import {OTHER} from 'appRedux/actionsType';

export const getVersionSubmit = payload => ({
  type: OTHER.GET_APP_VERSION.HANDLER,
  payload,
});

export const getVersionSuccess = payload => ({
  type: OTHER.GET_APP_VERSION.SUCCESS,
  payload,
});

export const uploadFilesSubmit = payload => ({
  type: OTHER.UPLOAD_IMAGE.HANDLER,
  payload,
});

export const uploadFilesSuccess = payload => ({
  type: OTHER.UPLOAD_IMAGE.SUCCESS,
  payload,
});

export const openMenu = payload => ({
  type: OTHER.OPEN_MENU,
  payload,
});

export const setUserDraftInfo = payload => ({
  type: OTHER.SET_USER_DRAFT_INFO.SUCCESS,
  payload,
});
