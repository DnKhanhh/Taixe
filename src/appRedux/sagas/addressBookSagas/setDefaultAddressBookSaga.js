import {call} from 'redux-saga/effects';
import {invoke} from 'helpers/sagas';
import {setDefaultAddressBookApi} from 'appRedux/api/addressBookApi';
import {HOT_KEY} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* setDetailAddressBookSaga({payload, type}) {
  const {showLoading = false, callback = () => {}, id = null} = payload || {};
  console.log('getDetailAddressBookSaga', payload);
  yield invoke(
    function* execution() {
      const result = yield call(setDefaultAddressBookApi, id);
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('navigate:scenes.addressScreen.setDefaultSuccess'),
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
