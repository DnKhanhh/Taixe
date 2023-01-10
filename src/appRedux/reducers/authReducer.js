import {AUTH, OTHER} from 'appRedux/actionsType';

const initialState = {
  userInfo: {
    refreshToken: '',
    accessToken: '',
    user: {},
  },
  userDraftInfo: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.SIGN_IN.SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case AUTH.SIGN_OUT.HANDLER: {
      return {
        ...initialState,
      };
    }
    case AUTH.GET_USER_INFO.SUCCESS: {
      return {
        ...state,
        userInfo: {...state.userInfo, userProfile: action.payload},
      };
    }
    case AUTH.REFRESH_TOKEN.SUCCESS: {
      return {
        ...state,
        userInfo: {...state.userInfo, accessToken: action.payload},
      };
    }
    case AUTH.UPDATE_PROFILE.SUCCESS: {
      return {
        ...state,
        userInfo: {...state.userInfo, userProfile: action.payload},
      };
    }
    case OTHER.SET_USER_DRAFT_INFO.SUCCESS: {
      return {
        ...state,
        userDraftInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
