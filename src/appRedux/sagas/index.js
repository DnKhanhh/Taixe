import {fork, all} from 'redux-saga/effects';

//system
import otherSagas from './otherSagas';

//login
import authSagas from './authSagas';

//feature
import paymentSagas from './paymentSagas';

//province
import addressSagas from './addressSagas';

//settings
import settingSagas from './settingSagas';

import addressBookSagas from './addressBookSagas';

import tripSagas from './tripSagas';
export default function* rootSaga() {
  yield all([
    fork(otherSagas),
    fork(authSagas),
    fork(paymentSagas),
    fork(addressSagas),
    fork(settingSagas),
    fork(addressBookSagas),
    fork(tripSagas),
  ]);
}
