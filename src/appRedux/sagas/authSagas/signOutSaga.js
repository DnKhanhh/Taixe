import APIUtils from 'utils/apiUtils';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

export function* signOutSaga() {
  try {
    APIUtils.setAccessToken(null);
  } catch (error) {}

  yield NavigationServices.resetActionTo(SCENE_NAMES.SIGN_IN);
}
