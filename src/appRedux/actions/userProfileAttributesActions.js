import {USER_PROFILE_ATTRIBUTES} from 'appRedux/actionsType';

export const getUserProfileAttributes = payload => ({
  type: USER_PROFILE_ATTRIBUTES.USER_PROFILE_ATTRIBUTES.HANDLER,
  payload,
});
