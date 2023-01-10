import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidBadgeIconType, AndroidImportance } from '@notifee/react-native';
import { COLOR } from './AppConst';
// import AppConfigs from './appConfigs';
const AppIcon = require('assets/images/AppIcon.png')
export default class FCMService {
	static initPushNotifications = (onNotification = () => { }) => {
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log('Message handled in the background!', remoteMessage);
			onNotification(remoteMessage, 'background');
		});
	};

	static getDefaultChannel = () => {
		return notifee.createChannel({
			id: 'fcm_fallback_notification_channel',
			name: 'tripical channel',
			description: 'A channel to categorise your notifications',
			sound: 'default',
			importance: AndroidImportance.HIGH,
			vibration: true,
			badge: true,
		});
	}

	static displayLocalNotification = async ({ title, body, data }) => {
		FCMService.requestUserPermission();

		const channel = await FCMService.getDefaultChannel();

		await notifee.displayNotification({
			title: title || '',
			body: body || '',
			android: {
				channelId: channel,
				sound: 'default',
				importance: AndroidImportance.HIGH,
				smallIcon: '@drawable/ic_stat_ic_notification',
				smallIconLevel: 3,
				color: COLOR.COLOR_PRIMARY_SECOND,
				colorized: true,
				largeIcon: AppIcon
			},
			ios: {
				sound: 'default'
			},
			data: data || {}
		})

	}

	static checkAndAskPermission = (callback = () => { }) => {
		messaging()
			.hasPermission()
			.then(r => {
				console.log('permission fcm', r);
				if (r) {
					callback(true);
				} else {
					callback(false);
				}
			})
			.catch(e => {
				console.log('permission fcm', e);
				callback(false);
			});
	};

	static onMessage = (callback = () => { }) => {
		messaging().onMessage(remoteMessage => {
			console.log('nossss', remoteMessage);

			callback(remoteMessage);
		});
	};

	static getFcmToken = async (callback = token => { }) => {
		messaging().hasPermission().then((authStatus) => {
			const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

			if (enabled) {
				try {
					messaging()
						.getToken()
						.then(token => {
							console.log({ token });
							if (token) {
								callback(token);
							}
						});
		
				} catch (error) {
					console.log('error>>', error);
				}
			} 
			else {
				FCMService.requestUserPermission()
			.then((res) => {
				if (res) {
					console.log('Permission is authorized: ', res);
					FCMService.getFcmToken(callback);
				}
			});
			}
		});
	};

	static setBadge(number) {
		try {
			notifee.setBadgeCount(Number(number));
		}
		catch (error) { }
	}

	static subscribeToTopic = topic => {
		return messaging().subscribeToTopic(topic);
	};

	static requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission({
			alert: true,
			sound: true,
			badge: true,
		});

		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);
			return true;
		}

		return false;
	};
}
