import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {deleteBankApi, deleteGatewayApi} from 'appRedux/api/paymentApi';
import {t} from 'i18next';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';

export function* deleteBankSaga({payload, type}) {
  const {showLoading = true, callback = () => {}, id} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(deleteBankApi, id);
      // console.log('result deleteBank Saga', result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.deleteAccountBankSuccess'),
          },
        });
        yield callback(result);
      }
    },
    null,
    showLoading,
    type,
  );
}

export function* deleteGatewaySaga({payload, type}) {
  const {showLoading = true, callback = () => {}, id} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(deleteGatewayApi, id);
      // console.log('result deleteGatewaySaga Saga', result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.deleteAccountBankSuccess'),
          },
        });
        yield callback(result);
      }
    },
    null,
    showLoading,
    type,
  );
}
