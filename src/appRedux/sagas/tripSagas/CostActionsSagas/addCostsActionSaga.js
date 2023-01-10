import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {addCostActionApi} from 'appRedux/api/tripApi/addCostApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';
import {t} from 'i18next';
import {addCostActionSuccess} from 'appRedux/actions/tripAction';
export function* addCostsActionSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    onSuccess,
    data = null,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(addCostActionApi, {
        data,
      });
      //   if(result) yield put(addCostActionSuccess(result.data));
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Thêm phí phát sinh thành công',
          },
        });
        yield onSuccess();
        yield callback();
      } else {
        Toast.show({
          type: 'warning',
          props: {
            title: 'Thêm phí phát sinh thất bại',
          },
        });
      }
    },
    null,
    showLoading,
    type,
  );
}
