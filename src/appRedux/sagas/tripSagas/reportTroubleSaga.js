import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {reportTroubleApi} from 'appRedux/api/tripApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';
import {t} from 'i18next';
export function* reportTroubleSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    onSuccess,
    id,
    ...data
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(reportTroubleApi, {
        id,
        data,
      });
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: t('common:report_trouble_success'),
          },
        });
        yield onSuccess();
        yield callback(result);
      } else {
        Toast.show({
          type: 'warning',
          props: {
            title: t('common:report_trouble_field'),
          },
        });
      }
    },
    null,
    showLoading,
    type,
  );
}
