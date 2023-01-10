import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {createBankApi, createGatewayApi} from 'appRedux/api/paymentApi';
import {t} from 'i18next';
import Toast from 'react-native-toast-message';
import {HOT_KEY, SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';

export function* createBankSaga({payload, type}) {
  const {
    showLoading = true,
    fullName,
    accountId,
    branchName,
    bankCode,
    bankNumber,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        createBankApi,
        fullName,
        accountId,
        branchName,
        bankCode,
        bankNumber,
      );
      // console.log('result createBank Saga', result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.addAccountBankSuccess'),
          },
        });
        NavigationServices.navigate(SCENE_NAMES.PAYMENT_SCREEN);
      }
    },
    null,
    showLoading,
    type,
  );
}

export function* createGatewaySaga({payload, type}) {
  const {
    showLoading = true,
    fullName,
    accountId,
    paymentCode,
    paymentNumber,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        createGatewayApi,
        fullName,
        accountId,
        paymentCode,
        paymentNumber,
      );
      // console.log('result createBank Saga', result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.addAccountBankSuccess'),
          },
        });
        NavigationServices.navigate(SCENE_NAMES.PAYMENT_SCREEN);
      }
    },
    null,
    showLoading,
    type,
  );
}
