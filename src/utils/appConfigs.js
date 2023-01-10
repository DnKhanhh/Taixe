import { Platform } from 'react-native';
import Config from 'react-native-config';

export const ENV_KEY = {
	PRODUCTION: 'PRODUCTION',
	DEVELOP: 'DEVELOPMENT',
};

const AppConfigs = {
	ENV_KEY: Config?.ENV,
	API_URL: Config?.API_URL,
	APP_NAME: Config?.APP_NAME,
	APP_VERSION_NAME: Platform.select({ios: Config?.IOS_APP_VERSION_CODE, android: Config?.ANDROID_APP_VERSION_NAME}),
	APP_VERSION_CODE: Platform.select({ios: Config?.IOS_BUNDLE_CODE, android: Config?.ANDROID_APP_VERSION_CODE}),
	APP_VERSION: Platform.select({ios: `${Config?.IOS_APP_VERSION_CODE}(${Config?.IOS_BUNDLE_CODE})`, android: `${Config?.ANDROID_APP_VERSION_NAME}(${Config?.ANDROID_APP_VERSION_CODE})`}),
	CP_DEPLOYMENT_KEY: {
		ANDROID: {
			STAGING: Config?.ANDROID_CP_DEPLOYMENT_STAGING_KEY || "",
			PRODUCTION: Config?.ANDROID_CP_DEPLOYMENT_PRODUCTION_KEY || ""
		},
		IOS: {
			STAGING: Config?.IOS_CP_DEPLOYMENT_STAGING_KEY || "",
			PRODUCTION: Config?.IOS_CP_DEPLOYMENT_PRODUCTION_KEY || ""
		}
	}
};

export default AppConfigs;