import {call} from 'redux-saga/effects';
import {changePasswordApi} from 'appRedux/api/authApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';
import {invoke} from 'helpers/sagas';
//navigation
import NavigationServices from 'navigation/navigationServices';

//logic
import {t} from 'i18next';

export function* changePasswordSaga({payload, type}) {
  console.log('>>>>>>>>payload changePassword In', payload);
  const {showLoading = true, callback = () => {}} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        changePasswordApi,
        payload.oldPassword,
        payload.password,
      );
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:changePassword'),
          },
        });
        yield NavigationServices.goBack();
        yield callback(result);
      } else {
        Toast.show({
          type: 'warning',
          props: {
            title: result.message,
          },
        });
      }
    },
    null,
    showLoading,
    type,
  );
}
