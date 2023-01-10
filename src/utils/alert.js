import {Alert} from 'react-native';

export function showAlertConfirm(
  config = {
    title: 'Thêm tài khoản thành công',
    message: '',
    titleOK: 'Có',
    titleCancel: 'Không',
  },
  callbackConfirm = () => {},
  callbackCancel = () => {},
) {
  const {message, title, titleOK = 'OK', titleCancel = 'Huỷ'} = config;
  Alert.alert(
    title,
    message,
    [
      {
        text: titleCancel,
        onPress: () => {
          if (typeof callbackCancel === 'function') {
            callbackCancel();
          }
        },
        style: 'cancel',
      },
      {
        text: titleOK,
        onPress: () => {
          if (typeof callbackConfirm === 'function') {
            callbackConfirm();
          }
        },
      },
    ],
    {cancelable: false},
  );
}

export function showAlertNotification(
  config = {title: '', message: ''},
  callback = () => {},
  options = {cancelable: false},
) {
  const {message, title} = config;
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => {
          if (typeof callback === 'function') {
            callback();
          }
        },
      },
    ],
    options,
  );
}
