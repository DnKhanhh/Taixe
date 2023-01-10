import {AUTH, OTHER} from 'appRedux/actionsType';

const initialState = {
  versionApp: '',
  openMenu: 0,
};

const otherReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.SIGN_OUT.HANDLER: {
      return {
        ...initialState,
      };
    }
    case OTHER.OPEN_MENU: {
      return {...state, openMenu: state.openMenu + 1};
    }
    case OTHER.GET_APP_VERSION.SUCCESS: {
      return {...state, versionApp: action.payload};
    }
    default:
      return state;
  }
};

export default otherReducer;
