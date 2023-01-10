import {takeLatest} from 'redux-saga/effects';
import {PAYMENT} from 'appRedux/actionsType';
import {
  getListBankSaga,
  getListBankSettingSaga,
  getListGatewaySaga,
  getListGatewaySettingSaga,
} from './getListPaymentSaga';
import {createBankSaga, createGatewaySaga} from './createPaymentSaga';
import {deleteBankSaga, deleteGatewaySaga} from './deletePaymentSaga';
import {
  setDefaultBankSaga,
  setDefaultGatewaySaga,
} from './setDefaultPaymentSaga';
import {
  getDetailBankInfoSaga,
  getDetailGatewayInfoSaga,
} from './getDetailPaymentInfoSaga';

export default function* paymentSagas() {
  //Bank
  yield takeLatest(PAYMENT.GET_LIST_BANK.HANDLER, getListBankSaga);
  yield takeLatest(
    PAYMENT.GET_LIST_BANK_SETTING.HANDLER,
    getListBankSettingSaga,
  );
  yield takeLatest(PAYMENT.CREATE_BANK.HANDLER, createBankSaga);
  yield takeLatest(PAYMENT.DELETE_BANK.HANDLER, deleteBankSaga);
  yield takeLatest(PAYMENT.SET_DEFAULT_BANK.HANDLER, setDefaultBankSaga);
  yield takeLatest(PAYMENT.GET_DETAIL_BANK_INFO.HANDLER, getDetailBankInfoSaga);
  //Gateway
  yield takeLatest(PAYMENT.GET_LIST_GATEWAY.HANDLER, getListGatewaySaga);
  yield takeLatest(
    PAYMENT.GET_LIST_GATEWAY_SETTING.HANDLER,
    getListGatewaySettingSaga,
  );
  yield takeLatest(PAYMENT.CREATE_GATEWAY.HANDLER, createGatewaySaga);
  yield takeLatest(PAYMENT.DELETE_GATEWAY.HANDLER, deleteGatewaySaga);
  yield takeLatest(PAYMENT.SET_DEFAULT_GATEWAY.HANDLER, setDefaultGatewaySaga);
  yield takeLatest(
    PAYMENT.GET_DETAIL_GATEWAY_INFO.HANDLER,
    getDetailGatewayInfoSaga,
  );
}
