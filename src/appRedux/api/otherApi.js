import utils from 'utils/apiUtils';
import {UPLOAD_API_PATH} from './PathApi';

export const getAppVersionForceUpdateApi = async () => {
  return {number_version_ios: '1.0.0', number_version_android: '1.0.0'};
};
export const uploadImagesApi = imageFile => {
  console.log('UploadImage API run');
  return utils.uploadFile(`${UPLOAD_API_PATH.UPLOAD_IMAGE_PATH}`, imageFile);
};
