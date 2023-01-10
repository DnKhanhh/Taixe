import {TRIP} from 'appRedux/actionsType';

const initialValues = {
  data: [],
  vehicleInfo: {},
  currentTrip: {},
};

const tripReducer = (state = initialValues, action) => {
  console.log('action data payload', action.payload);
  switch (action.type) {
    case TRIP.GET_LIST_TRIP_CONTINUE.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case TRIP.GPS_TRACKING_VEHICLE.SUCCESS:
      return {
        ...state,
        vehicleInfo: action.payload,
      };
    case TRIP.UPDATE_TRIP_CONTINUE_ASSIGNMENT_STATUS.SUCCESS:
      return {
        ...state,
        data: state.data.map(i =>
          i.id === action.payload.id ? action.payload : i,
        ),
      };
    case TRIP.DETAILS_CURRENT_TRIP.SUCCESS:
      return {
        ...state,
        currentTrip: action.payload,
      };
    default:
      return state;
  }
};
export default tripReducer;
