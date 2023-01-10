import {ADDRESS} from 'appRedux/actionsType';

const initialValues = {
  data: [],
};

const addressReducer = (state = initialValues, action) => {
  switch (action.type) {
    case ADDRESS.GET_LIST_PROVINCE.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default addressReducer;
