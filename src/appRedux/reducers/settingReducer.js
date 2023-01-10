import {SETTING, AUTH} from 'appRedux/actionsType';

const initialState = {
  setting: {},
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.SIGN_OUT.HANDLER: {
      return {
        ...initialState,
      };
    }
    case SETTING.USER_PROFILE_SETTING.SUCCESS: {
      return {
        ...state,
        setting: {...state.setting, settingUserProfile: action.payload},
      };
    }
    default:
      return state;
  }
};

export default settingReducer;
