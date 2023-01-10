import {call} from 'redux-saga/effects';
import {
  getDetailBankInfoApi,
  getDetailGatewayInfoApi,
} from 'appRedux/api/paymentApi';
import {invoke} from 'helpers/sagas';
import {parseDataUserBank} from 'appRedux/parsers/bankParser';
import {parseDataUserGateway} from 'appRedux/parsers/gatewayParser';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

export function* getDetailBankInfoSaga({payload, type}) {
  const {showLoading = true, id} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getDetailBankInfoApi, id);
      // console.log('result getDetailBankInfo Saga', result);
      const parseDataBank = parseDataUserBank(result.data);
      NavigationServices.navigate(SCENE_NAMES.DETAIL_BANK_INFO, {
        detailBankInfo: parseDataBank,
        isUpdate: true,
      });
    },
    null,
    showLoading,
    type,
  );
}

export function* getDetailGatewayInfoSaga({payload, type}) {
  const {showLoading = true, id} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getDetailGatewayInfoApi, id);
      // console.log('result getDetailGatewayInfoApi Saga', result);
      const parseDataGateway = parseDataUserGateway(result.data);
      NavigationServices.navigate(SCENE_NAMES.DETAIL_GATEWAY_INFO, {
        detailGatewayInfo: parseDataGateway,
        isUpdate: true,
      });
    },
    null,
    showLoading,
    type,
  );
}
