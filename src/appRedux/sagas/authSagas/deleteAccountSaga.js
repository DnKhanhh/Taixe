import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {deleteAccountApi} from 'appRedux/api/authApi';
import {HOT_KEY} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* deleteAccountSaga({payload, type}) {
  const {showLoading = true} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(deleteAccountApi);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.deleteAccountSuccess'),
          },
        });
      }
    },
    null,
    showLoading,
    type,
  );
}
