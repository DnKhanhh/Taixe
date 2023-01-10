import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {updateAddressBookApi} from 'appRedux/api/addressBookApi';
import {HOT_KEY} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* updateAddressBookSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    id = null,
    data = null,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(updateAddressBookApi, id, data);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('navigate:scenes.addressScreen.updateSuccess'),
          },
        });
        yield callback();
      }
    },
    null,
    showLoading,
    type,
  );
}
