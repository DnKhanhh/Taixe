import {invoke} from 'helpers/sagas';
import {call} from 'redux-saga/effects';
import {getIdAddressGoogleApi} from 'appRedux/api/addressApi';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';
import _ from 'lodash';

export function* getIdAddressGoogleSaga({payload, type}) {
  // console.log('payload getIdAddressGoogleSaga', payload);
  const {
    showLoading = false,
    callback = () => {},
    detailsAddress = {},
    keyActions = null,
    typeFromPreviousScreen,
    isGetDetailsFromGoogleApi = false,
    detailsAddressInput = {},
    isUpdate,
    totalLocNumber,
    orderDataDraft,
    orderRoutesDetails,
  } = payload || {};
  const data_address_components = {
    address_components: detailsAddress.address_components,
  };
  yield invoke(
    function* execution() {
      const result = yield call(getIdAddressGoogleApi, data_address_components);
      yield callback(result);
      console.log('result id google ->>>>>', result);
      // if (keyActions == KEY_ACTION_ADDRESS.ADDRESS_BOOK) {
      //   NavigationServices.replace(SCENE_NAMES.DETAIL_ADDRESS, {
      //     isUpdate: isUpdate,
      //     bookAddressSelected: {},
      //     detailsIdAddress: {...result.data, ...detailsAddress},
      //     isGetDetailsFromGoogleApi: isGetDetailsFromGoogleApi,
      //     detailsAddressInput: {...detailsAddressInput},
      //   });
      // }
      // if (keyActions == KEY_ACTION_ADDRESS.ADDRESS_DESTINATIONS) {
      //   NavigationServices.push(SCENE_NAMES.DETAIl_ADDRESS_MAP, {
      //     detailsIdAddress: {...result.data, ...detailsAddress},
      //     typeFromPreviousScreen: typeFromPreviousScreen,
      //     isFromAddressBook: false,
      //     isGetDetailsFromGoogleApi: isGetDetailsFromGoogleApi,
      //     detailsAddressInput: {
      //       ...detailsAddressInput,
      //       ...result.data,
      //       ...detailsAddress,
      //     },
      //     totalLocNumber: totalLocNumber,
      //     orderDataDraft: orderDataDraft,
      //     isUpdateOrderRoutes: isUpdate,
      //     orderRoutesDetails: orderRoutesDetails,
      //   });
      // }
      // if (keyActions === KEY_ACTION_ADDRESS.ADDRESS_RECEIVE_QUOTE) {
      //   NavigationServices.navigate(STEP_REQUEST_QUOTE.ADD_LOCATIONS, {
      //     detailsIdAddress: {...result.data, ...detailsAddress},
      //     typeFromPreviousScreen: typeFromPreviousScreen,
      //     isFromAddressBook: false,
      //     isGetDetailsFromGoogleApi: isGetDetailsFromGoogleApi,
      //     detailsAddressInput: {
      //       ...detailsAddressInput,
      //       ...result.data,
      //       ...detailsAddress,
      //     },
      //     totalLocNumber: totalLocNumber,
      //     orderDataDraft: orderDataDraft,
      //     isUpdateOrderRoutes: isUpdate,
      //     orderRoutesDetails: orderRoutesDetails,
      //   });
      // }
    },
    null,
    showLoading,
    type,
  );
}
