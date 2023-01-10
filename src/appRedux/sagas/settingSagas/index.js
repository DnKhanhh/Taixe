import {takeLatest} from 'redux-saga/effects';
import {SETTING} from 'appRedux/actionsType';
import {getUserProfileSettingSaga} from './getUserProfileSettingSaga';

export default function* settingSagas() {
  yield takeLatest(
    SETTING.USER_PROFILE_SETTING.HANDLER,
    getUserProfileSettingSaga,
  );
}
