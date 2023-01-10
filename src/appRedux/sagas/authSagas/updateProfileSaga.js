import {put, call} from 'redux-saga/effects';
import {
  updateProfileSuccess,
  getUserInfoSubmit,
} from 'appRedux/actions/authActions';
import {
  updateProfileApi,
  updateProcessTypesApi,
  getUserInfoAttributesApi,
} from 'appRedux/api/authApi';
import {invoke} from 'helpers/sagas';
import {parseUserInfo} from 'appRedux/parsers/authParses';
import {KEY_ACTION_PROFILE, HOT_KEY} from 'utils/AppConst';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';

export function* updateProfileSaga({payload, type}) {
  console.log('payload updateProfile', payload);
  const {
    showLoading = true,
    callback = () => {},
    keyAction,
    checkFieldVerify,
    accountTypeFlag = null,
    ...dataUpdate
  } = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(updateProfileApi, dataUpdate);
      // console.log('result updateProfile Saga', result);
      const dataInfoParse = parseUserInfo({
        ...result.data,
        accountTypeFlag: accountTypeFlag || result.data.accountTypeFlag,
      });
      yield put(updateProfileSuccess(dataInfoParse)); //check with BE has update profile address when update???
      // console.log('result dataUserProfileParse Saga', dataInfoParse);
      if (result.message === HOT_KEY.SUCCESS) {
        if (keyAction === KEY_ACTION_PROFILE.UPDATE_AFTER_COMPLETED) {
          Toast.show({
            type: 'success',
            props: {
              title: checkFieldVerify
                ? t('common:updateFieldVerifySuccess')
                : t('common:updateAccountSuccess'),
            },
          });
          yield put(
            getUserInfoSubmit({
              keyAction: KEY_ACTION_PROFILE.GET_USER_INFOR_AFTER_UPDATE,
            }),
          ); //temp for test
          // NavigationServices.goBack();
        }
        // else if (keyAction === KEY_ACTION_PROFILE.UPDATE_DRAFT_DATA) {
        //   Toast.show({
        //     type: 'warning',
        //     props: {
        //       title: t('common:toastMessage.setDraftDataSuccess'),
        //     },
        //   });
        //   NavigationServices.goBack();
        // }
      }
      yield callback(dataInfoParse);
    },
    null,
    showLoading,
    type,
  );
}

export function* updateProcessTypeSaga({payload, type}) {
  console.log('payload updateProcessTypeSaga', payload);
  const {showLoading = true, callback = () => {}, data} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(updateProcessTypesApi, data);
      yield callback(result);
      const dataInfoParse = parseUserInfo(result.data);
      yield put(updateProfileSuccess(dataInfoParse));
    },
    null,
    showLoading,
    type,
  );
}

export function* getUserInfoAttributesSaga({payload, type}) {
  console.log('payload getUserInfoAttributesSaga', payload);
  const {showLoading = true, callback = () => {}, accountType} = payload || {};
  yield invoke(
    function* execution() {
      const result = yield call(getUserInfoAttributesApi, accountType);
      yield callback(result.data);
    },
    null,
    showLoading,
    type,
  );
}
