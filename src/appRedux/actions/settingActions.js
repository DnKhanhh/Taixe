import {SETTING} from 'appRedux/actionsType';

export const getUserProfileSettingSubmit = payload => ({
  type: SETTING.USER_PROFILE_SETTING.HANDLER,
  payload,
});

export const getUserProfileSettingSuccess = payload => ({
  type: SETTING.USER_PROFILE_SETTING.SUCCESS,
  payload,
});
