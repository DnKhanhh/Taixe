import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {setDefaultBankApi, setDefaultGatewayApi} from 'appRedux/api/paymentApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY, SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import {t} from 'i18next';

export function* setDefaultBankSaga({payload, type}) {
  const {showLoading = true, id} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(setDefaultBankApi, id);
      // console.log('result setDefaultBank Saga', result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.setDefaultAccountBankSuccess'),
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

export function* setDefaultGatewaySaga({payload, type}) {
  const {showLoading = true, id} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(setDefaultGatewayApi, id);
      // console.log('result setDefaultGatewaySaga Saga', result);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.setDefaultAccountBankSuccess'),
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
