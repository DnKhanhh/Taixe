import {call, put} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {upgradeAccountApi} from 'appRedux/api/authApi';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
import {ACCOUNT_TYPE, HOT_KEY, KEY_ACTION_PROFILE} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* upgradeAccountSaga({payload, type}) {
  const {showLoading = true, keyAction} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(upgradeAccountApi);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:toastMessage.changeTypeCompanySuccess'),
          },
        });
      }
      yield put(
        getUserInfoSubmit({
          accountTypeFlag: ACCOUNT_TYPE.COMPANY,
          showLoading: false,
          keyAction:
            keyAction === KEY_ACTION_PROFILE.CHANGE_TYPE_COMPANY_INFORMATION
              ? KEY_ACTION_PROFILE.CHANGE_TYPE_COMPANY_INFORMATION
              : KEY_ACTION_PROFILE.CHANGE_TYPE_COMPANY_STEP,
        }),
      );
    },
    null,
    showLoading,
    type,
  );
}
