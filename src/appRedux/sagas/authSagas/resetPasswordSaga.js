import {call} from 'redux-saga/effects';
import {resetPasswordApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import Toast from 'react-native-toast-message';
import {HOT_KEY, SCENE_NAMES, BRANCH_NAME} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import {t} from 'i18next';

export function* resetPasswordSaga({payload, type}) {
  console.log('payload resetPasswordSaga ', payload);
  const {
    showLoading = true,
    callback = () => {},
    phoneOrEmail,
    password,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        resetPasswordApi,
        phoneOrEmail,
        BRANCH_NAME,
        password,
      );
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:resetPasswordSuccess'),
          },
        });
        yield NavigationServices.navigate(SCENE_NAMES.SIGN_IN);
        yield callback(result);
      }
    },
    null,
    showLoading,
    type,
  );
}
