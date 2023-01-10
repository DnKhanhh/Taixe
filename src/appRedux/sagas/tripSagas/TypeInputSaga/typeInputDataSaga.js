import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {typeInputDataApi} from 'appRedux/api/tripApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';
import {t} from 'i18next';

export function* typeInputDataSaga({payload, type}) {
  console.log('payload updateTripStatus', payload);
  const {
    showLoading = false,
    callback = () => {},
    id = null,
    data = null,
    // queries = {},
  } = payload || {};
  yield invoke(
    function* execution() {
      console.log('id, data', id, data);
      const result = yield call(typeInputDataApi, {
        id,
        data,
      });
      //   console.log('zzzzKien', result.data);
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
