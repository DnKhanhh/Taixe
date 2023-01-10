/* eslint-disable no-unused-vars */
import {
  ACCOUNT_STATUS,
  GPS_STATUS,
  REGEX_DATE_SHORT,
  SCENE_NAMES,
} from './AppConst';
import {t} from 'i18next';
import Toast from 'react-native-toast-message';
import moment, {isDate} from 'moment-timezone';
import NavigationServices from 'navigation/navigationServices';
import {Linking} from 'react-native';

export const replaceAt = (string, index, replacement) => {
  if (index >= string.length) {
    return;
  }
  return string.substring(0, index) + replacement + string.substring(index + 1);
};

export const hidePhone = phone => {
  for (let i = phone.length - 3; i < phone.length; i++) {
    phone = replaceAt(phone, i, '*');
  }
  return phone;
};

export const hideEmail = target => {
  let email = target;
  let hiddenEmail = '';
  for (let i = 0; i < email.length; i++) {
    if (i > 5 && i < email.indexOf('@')) {
      hiddenEmail += '*';
    } else {
      hiddenEmail += email[i];
    }
  }
  return hiddenEmail;
};

export const hideEmailSelect = target => {
  let email = target;
  let hiddenEmail = '';
  for (let i = 0; i < email.length; i++) {
    if (i > 4 && i < email.indexOf('@')) {
      if (hiddenEmail.length >= 10) {
        hiddenEmail.slice(0, hiddenEmail.length - 1);
      } else {
        hiddenEmail += '*';
      }
    } else {
      hiddenEmail += email[i];
    }
  }
  return hiddenEmail;
};

export const dateSelect = date => {
  if (!date) {
    return '';
  }
  try {
    const choseDate = new Date(date);
    const time = [
      choseDate.getDate() > 9 ? choseDate.getDate() : '0' + choseDate.getDate(),
      choseDate.getMonth() + 1 > 9
        ? choseDate.getMonth() + 1
        : '0' + (choseDate.getMonth() + 1),
      choseDate.getFullYear(),
    ].join('/');
    return time;
  } catch (error) {
    console.log('Parser dateSelect error', error);
    return '';
  }
};

//date put api
export const datePostToApi = date => {
  if (!date) {
    return '';
  }
  try {
    const postDate = new Date(date);
    const time = [
      postDate.getFullYear(),
      postDate.getMonth() + 1 > 9
        ? postDate.getMonth() + 1
        : '0' + (postDate.getMonth() + 1),
      postDate.getDate() > 9 ? postDate.getDate() : '0' + postDate.getDate(),
    ].join('-');
    return time;
  } catch (error) {
    console.log('DatePostToApi error', error);
    return '';
  }
};

export const monthSelect = date => {
  if (!date) {
    return '';
  }
  try {
    const choseDate = new Date(date);
    const time = [
      choseDate.getMonth() + 1 > 9
        ? choseDate.getMonth() + 1
        : '0' + (choseDate.getMonth() + 1),
      choseDate.getFullYear(),
    ].join('/');
    return time;
  } catch (error) {
    console.log('Parser monthSelect error', error);
    return '';
  }
};

export const formatTimeRemain = time => {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export const statusTransfer = status => {
  let nameStatus = '';
  let changeNameStatus = '';
  switch (status) {
    case ACCOUNT_STATUS.UNFINISHED:
      nameStatus = 'common:status.unfinished';
      changeNameStatus = 'unfinished';
      break;
    case ACCOUNT_STATUS.LOCKED:
      nameStatus = 'common:status.locked';
      changeNameStatus = 'locked';
      break;
    case ACCOUNT_STATUS.WORKING:
      nameStatus = 'common:status.working';
      changeNameStatus = 'working';
      break;
    case ACCOUNT_STATUS.STOP_WORKING:
      nameStatus = 'common:status.stop_working';
      changeNameStatus = 'stop_working';
      break;
    case ACCOUNT_STATUS.PENDING_APPROVAL:
      nameStatus = 'common:status.pending_approval';
      changeNameStatus = 'pending_approval';
      break;
    case ACCOUNT_STATUS.NEED_UPDATE:
      nameStatus = 'common:status.need_update';
      changeNameStatus = 'need_update';
      break;
    case ACCOUNT_STATUS.DRAFT:
      nameStatus = 'common:status.draft';
      changeNameStatus = 'draft';
      break;
    case ACCOUNT_STATUS.CLOSED:
      nameStatus = 'common:status.closed';
      changeNameStatus = 'closed';
      break;
    case ACCOUNT_STATUS.PENDING_UPGRADE_REVIEW: {
      nameStatus = 'common:status:pending_upgrade';
      changeNameStatus = 'pending_upgrade_review';
      break;
    }
    default:
      nameStatus = 'common:status.draft';
      changeNameStatus = 'draft';
      break;
  }
  return {nameStatus, changeNameStatus};
};

export const statusGpsTransfer = status => {
  let nameStatus = '';
  let changeNameStatus = '';
  switch (status) {
    case GPS_STATUS.CONNECTED:
      nameStatus = 'common:statusGPS.connected';
      changeNameStatus = 'connected';
      break;
    case GPS_STATUS.UNCONNECTED:
      nameStatus = 'common:statusGPS.unconnected';
      changeNameStatus = 'unconnected';
      break;
    default:
      nameStatus = 'common:statusGPS.unconnected';
      changeNameStatus = 'unconnected';
      break;
  }
  return {nameStatus, changeNameStatus};
};

// format dateString to string or Date to string by a formatString
export function dateTimeFormat(date, formatString = 'DD/MM/YYYY') {
  if (!date) {
    return '';
  }

  try {
    if (typeof date === 'string') {
      // console.log('>>>> check date: ', date, REGEX_DATE_SHORT.test(date));
      if (REGEX_DATE_SHORT.test(date)) {
        REGEX_DATE_SHORT.lastIndex = 0;
        // console.log('>>>>> current date checked: ', date);
        return moment(date, 'DD/MM/YYYY').format(formatString);
      } else {
        return moment(new Date(date)).format(formatString);
      }
    } else if (date instanceof Date) {
      return moment(date).format(formatString);
    } else {
      return '';
    }
  } catch (error) {
    console.log('Parser date error: ', error);
    return '';
  }
}

export function validateNumber(number) {
  if (!isNaN(number) && parseFloat(number) >= 0) {
    return true;
  }

  return false;
}

export function validateOnlyNumber(number) {
  var letters = /^[0-9]+$/;

  if (number.match(letters)) {
    return true;
  }

  return false;
}

export const isEmail = email => {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    email,
  );
};

//function get fieldName required verify when transporter update driver info
export const getFieldNameRequiredVerify = (
  dataFieldChange,
  dataProfileSetting,
) => {
  let resultFind = {};
  let result = [];
  dataFieldChange.forEach(element => {
    resultFind = dataProfileSetting.find(data => data.fieldName === element);
    if (resultFind !== undefined) {
      result.push(resultFind?.name);
    }
  });
  return result.join(', ');
};

//function show information for transporter when go screen TransporterInformation
export const checkAndShownStatusInformation = status => {
  const statusName = statusTransfer(status).changeNameStatus;
  switch (statusName) {
    case ACCOUNT_STATUS.PENDING_APPROVAL:
      Toast.show({
        type: 'warning',
        props: {
          title: t('common:toastMessage.pendingInformation'),
        },
      });
      break;
    case ACCOUNT_STATUS.NEED_UPDATE:
      Toast.show({
        type: 'warning',
        props: {
          title: t('common:toastMessage.needUpdateInformation'),
        },
      });
      break;
    case ACCOUNT_STATUS.PENDING_UPGRADE_REVIEW:
      Toast.show({
        type: 'warning',
        props: {
          title: t('common:toastMessage.pendingUpgradeReview'),
        },
      });
      break;
    default:
      console.log('not shown information');
  }
};

//function check status user if not completed form then navigate form to completed
//check status transporter if unfinished -> update information else dashboard
//BE confirm when register unfinished, signIn not submit -> draft
export const checkUserCompletedForm = status => {
  const statusName = statusTransfer(status).changeNameStatus;
  if (
    statusName === ACCOUNT_STATUS.UNFINISHED ||
    statusName === ACCOUNT_STATUS.DRAFT
  ) {
    NavigationServices.navigate(SCENE_NAMES.DRIVER_INFO_START_SCREEN, {
      isFirstUpdate: true,
    });
    Toast.show({
      type: 'warning',
      props: {
        title: t('common:toastMessage.unfinishedInformation'),
      },
    });
  }
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const getMapNameFromAddress = (data = []) => {
  const streetRoute = [];
  if (data.length > 0) {
    if (data[0].types[0] == 'street_number' && data[1].types[0] == 'route') {
      for (let i = 2; i < data.length; i++) {
        streetRoute.push(data[i].long_name);
      }
    }
    if (data[0].types[0] != 'street_number') {
      for (let i = 1; i < data.length; i++) {
        streetRoute.push(data[i].long_name);
      }
    }
    return streetRoute.join(', ');
  } else {
    return '';
  }
};

export const getShortNameFromAddress = (data = []) => {
  const streetRoute = [];
  if (data.length > 0) {
    if (data[0].types[0] == 'street_number' && data[1].types[0] == 'route') {
      streetRoute.push(data[0]?.long_name);
      streetRoute.push(data[1]?.long_name);
      return streetRoute.join(' ');
    } else {
      streetRoute.push(data[0]?.long_name);
      return streetRoute.join('');
    }
    // } else {
    //   getStreetRouteFromAddress(data);
    // }
  } else {
    return '';
  }
};

// import Geolocation from '@react-native-community/geolocation';
// export function getMyLocation(callback) {
//   Geolocation.getCurrentPosition(
//     position => {
//       callback(position);
//     },
//     error => {
//       console.log(error);
//     },
//     // {enableHighAccuracy: false},
//   );
// }

export function openMaps({ lat, lng }, title = 'Vị trí chọn') {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lat},${lng}`;
  const label = title;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });

  Linking.openURL(url);
}

export function openMapsWithAddress(address) {
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
}
export const getAddressNameFromAPI = item => {
  if (!item?.address && !item?.city) {
    return '';
  }
  return (
    item?.buildingName +
    ', ' +
    item?.address +
    ', ' +
    (item?.ward?.name || item?.wardName || '') +
    ', ' +
    (item?.district?.name || item?.districtName || '') +
    ', ' +
    (item?.city?.name || item?.cityName || '')
  );
};

export const getAddressLocationCustomerFullFromApi = data => {
  let address = [];

  if (data?.buildingName) {
    address.push(data?.buildingName);
  }

  if (data?.address) {
    address.push(data?.address);
  }

  if (data?.ward) {
    address.push(data?.ward?.name);
  }

  if (data?.district) {
    address.push(data?.district?.name);
  }

  if (data?.city) {
    address.push(data?.city?.name);
  }

  return (
    (!data?.locationName ? '' : `(${data?.locationName}) `) + address.join(', ')
  );
};
