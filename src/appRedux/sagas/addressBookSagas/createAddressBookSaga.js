import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {createAddressBookApi} from 'appRedux/api/addressBookApi';
import {HOT_KEY} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* createAddressBookSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, data = null} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(createAddressBookApi, data);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('navigate:scenes.addressScreen.addNewSuccess'),
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
