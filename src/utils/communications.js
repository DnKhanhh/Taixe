import {Platform, Linking, Alert} from 'react-native';
import {showNotification} from './alert';
import {t} from 'i18next';

export async function openURL(url) {
  try {
    await Linking.openURL(url);
  } catch (error) {
    showNotification({message: error.message});
  }
}

export const callNumber = number => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number.replace(/ /g, '')}`;
  } else {
    phoneNumber = `telprompt:${number.replace(/ /g, '')}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert(t('common:phoneNumberWrong'));
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};
