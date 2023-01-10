import {put, select} from 'redux-saga/effects';
import {getIsConnectedSelector} from 'appRedux/selectors/connectSelector';
import {
  showLoading,
  onFetching,
  nonFetching,
  hideLoading,
} from 'appRedux/actions/loadingActions';
import {handleErrorMessage} from './handleError';
import {t} from 'i18next';
import Toast from 'react-native-toast-message';
import APIUtils from 'utils/apiUtils';
import {signOutSubmit} from 'appRedux/actions/authActions';


export function* invoke(execution, handleError, showDialog, actionType) {
  try {
    const isConnected = yield select(getIsConnectedSelector);
    if (!isConnected) {
      Toast.show({
        type: 'warning',
        props: {
          title: t('common:message.NOT_INTERNET'),
        },
      });
      return;
    }
    if (showDialog) {
      yield put(showLoading(actionType));
    }
    yield put(onFetching(actionType));
    yield* execution();
    yield put(nonFetching(actionType));
    if (showDialog) {
      yield put(hideLoading(actionType));
    }
  } catch (error) {
    console.info(`Saga Invoke Error [${actionType}]>>>>>`, {error});
    yield put(nonFetching(actionType));
    if (showDialog) {
      yield put(hideLoading(actionType));
    }
    const errorMessage = handleErrorMessage(error);

    if (errorMessage && errorMessage.status === 'EXP_TOKEN') {
      yield put(signOutSubmit());
      APIUtils.setAccessToken(null);
    }
    if (typeof handleError === 'function') {
      yield handleError(errorMessage);
    } else {
      yield Toast.show({
        type: 'warning',
        props: {
          title: errorMessage?.message,
        },
      });
    }
  }
}
