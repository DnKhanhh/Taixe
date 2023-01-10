import {call, put} from 'redux-saga/effects';
import {getUserProfileSettingApi} from 'appRedux/api/settingApi';
import {invoke} from 'helpers/sagas';
import {settingUserProfileData} from 'appRedux/parsers/settingParser';
import {getUserProfileSettingSuccess} from 'appRedux/actions/settingActions';
export function* getUserProfileSettingSaga({payload, type}) {
  const {
    showLoading,
    callback = () => {},
    accountType,
    profileType,
    open,
    required,
    requiredVerify,
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(
        getUserProfileSettingApi,
        accountType,
        profileType,
        open,
        required,
        requiredVerify,
      );
      console.log('result getUserProfileSettingSaga Saga', result);
      const dataSettingParser = settingUserProfileData(result.data);
      yield put(getUserProfileSettingSuccess(dataSettingParser));
      yield callback(dataSettingParser);
    },
    null,
    showLoading,
    type,
  );
}
