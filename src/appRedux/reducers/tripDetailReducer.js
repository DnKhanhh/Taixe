import {TRIP} from 'appRedux/actionsType';

const initialValues = {
  data: {},
};

const tripDetailReducer = (state = initialValues, action) => {
  console.log('action data payload load', action?.payload?.assignmentStatusId);
  switch (action.type) {
    case TRIP.GET_DETAIL_TRIP_CONTINUE.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default tripDetailReducer;
