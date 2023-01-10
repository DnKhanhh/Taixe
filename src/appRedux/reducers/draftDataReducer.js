import {OTHER} from 'appRedux/actionsType';

const initialState = {
  userDraftInfo: {},
  driverDraftInfo: {},
};

const draftDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTHER.SET_USER_DRAFT_INFO.SUCCESS: {
      return {
        ...state,
        userDraftInfo: action.payload,
      };
    }
    case OTHER.SET_DRIVER_DRAFT_INFO.SUCCESS: {
      return {
        ...state,
        driverDraftInfo: action.payload,
      };
    }
    default:
      break;
  }
};

export default draftDataReducer;
