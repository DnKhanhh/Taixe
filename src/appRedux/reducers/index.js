import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

// Reducer Imports
import loadingReducer from './loadingReducer';
import connectReducer from './connectReducer';
import errorReducer from './errorReducer';
import auth from './authReducer';
import otherReducer from './otherReducer';
import settingReducer from './settingReducer';
import addressReducer from 'appRedux/reducers/addressReducer';
import tripReducer from 'appRedux/reducers/tripReducer';
import tripDetailReducer from 'appRedux/reducers/tripDetailReducer';
import tripCostActionsReducer from 'appRedux/reducers/tripCostActionsReducer';

//authPersistConfig
const authPersistConfig = {
  key: 'auth1',
  storage: AsyncStorage,
  whitelist: ['userInfo'],
  blacklist: [''],
  version: 1.0,
};

const rootReducer = combineReducers({
  // Reducers
  loading: loadingReducer,
  connect: connectReducer,
  error: errorReducer,
  auth: persistReducer(authPersistConfig, auth),
  other: otherReducer,
  setting: settingReducer,
  address: addressReducer,
  trip: tripReducer,
  tripDetail: tripDetailReducer,
  tripCostActions: tripCostActionsReducer,
});

export default rootReducer;
