export const getListTripSelector = state => state.trip.data;
export const getVehicleInfoSelector = state => state.trip.vehicleInfo;
export const getTripSelector = state => state.trip.data;
export const getCurrentTripSelector = state => state.trip.currentTrip;
export const getListCostPendingSelector = state => state.tripCostActions.data;
export const getListCostActiveSelector = state =>
  state.tripCostActions.dataActive;
