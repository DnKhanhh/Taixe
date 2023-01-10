import utils from 'utils/apiUtils';
import {SETTING_API_PATH} from './PathApi';

export const getUserProfileSettingApi = (
  accountType,
  profileType,
  open,
  required,
  requiredVerify,
) => {
  console.log('getUserProfileSettingApi run');
  return utils.get(
    `${SETTING_API_PATH.GET_USER_PROFILE_SETTING_PATH}?accountType=${accountType}&profileType=${profileType}&open=${open}&required=${required}&requiredVerify=${requiredVerify}`,
  );
};
