import {call, put} from 'redux-saga/effects';
import {signUpApi} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import {BRANCH_NAME} from 'utils/AppConst';
import {signInSubmit} from 'appRedux/actions/authActions';

export function* signUpSaga({payload, type}) {
  const {showLoading = true, data, callback = () => {}} = payload || {};
  const {phone, email, password, fullName, typeUser, companyName} = data;
  yield invoke(
    function* execution() {
      yield call(
        signUpApi,
        phone,
        email,
        password,
        typeUser,
        companyName,
        fullName,
        BRANCH_NAME,
      );
      yield callback();
      yield put(signInSubmit({phoneOrEmail: phone, password}));
    },
    null,
    showLoading,
    type,
  );
}
