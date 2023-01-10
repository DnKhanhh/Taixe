import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {deleteAddressBookApi} from 'appRedux/api/addressBookApi';
import {HOT_KEY} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* deleteAddressBookSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, id = null} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(deleteAddressBookApi, id);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('navigate:scenes.addressScreen.deleteSuccess'),
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
