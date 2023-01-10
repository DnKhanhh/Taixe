import {call} from 'redux-saga/effects';
import {
  getListBankApi,
  getListBankSettingApi,
  getListGatewayApi,
  getListGatewaySettingApi,
} from 'appRedux/api/paymentApi';
import {invoke} from 'helpers/sagas';

export function* getListBankSaga({payload, type}) {
  const {showLoading = true, callback = () => {}, page, limit} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListBankApi, page, limit);
      // console.log('result getListBank Saga', result);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}

export function* getListBankSettingSaga({payload, type}) {
  const {showLoading = true, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListBankSettingApi);
      // console.log('result getListBankSetting Saga', result);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}

export function* getListGatewaySaga({payload, type}) {
  const {showLoading = true, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListGatewayApi);
      // console.log('result getListGatewayApi Saga', result);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}

export function* getListGatewaySettingSaga({payload, type}) {
  const {showLoading = true, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getListGatewaySettingApi);
      // console.log('result getListGatewaySettingApi Saga', result);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}
