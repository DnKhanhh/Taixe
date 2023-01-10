import {invoke} from 'helpers/sagas';
import {call, put} from 'redux-saga/effects';
import {editCostActionApi} from 'appRedux/api/tripApi/addCostApi';
import Toast from 'react-native-toast-message';
import {HOT_KEY} from 'utils/AppConst';
import {t} from 'i18next';
import {addCostActionSuccess} from 'appRedux/actions/tripAction';
export function* editCostsActionSaga({payload, type}) {
  const {
    showLoading = false,
    callback = () => {},
    onSuccess,
    id = null,
    data = null,
  } = payload || {};
  yield invoke(
    function* execution() {
      // console.log('abce', data);
      const result = yield call(editCostActionApi, {id, data});
      //   if(result) yield put(addCostActionSuccess(result.data));
      if (result.message === HOT_KEY.SUCCESS) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Sửa phí phát sinh thành công',
          },
        });
        yield onSuccess();
        yield callback();
      } else {
        Toast.show({
          type: 'warning',
          props: {
            title: 'Sửa phí phát sinh thất bại',
          },
        });
      }
    },
    null,
    showLoading,
    type,
  );
}
