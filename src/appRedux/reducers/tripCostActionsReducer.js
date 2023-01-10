import {TRIP} from 'appRedux/actionsType';

const initialValues = {
  data: [],
  dataActive: [],
};

const tripCostActionsReducer = (state = initialValues, action) => {
  //   console.log('action data payload', action.payload);
  switch (action.type) {
    case TRIP.GET_LIST_COST_PENDING.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case TRIP.GET_LIST_COST_ACTIVE.SUCCESS:
      return {
        ...state,
        dataActive: action.payload,
      };

    default:
      return state;
  }
};
export default tripCostActionsReducer;
