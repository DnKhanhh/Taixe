/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import {COLOR} from 'utils/AppConst';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getIdAddressGoogleSubmit} from 'appRedux/actions/addressActions';
import {useActions} from 'hooks/useActions';
import {getMapNameFromAddress, getShortNameFromAddress} from 'utils/appUtils';
import {useSaveAddress} from 'hooks/useSaveAddress';

const RenderListAddress = ({
  dataAddress = [],
  type,
  detailsAddressInput,
  isGetDetailsFromGoogleApi,
  isUpdate,
  totalLocNumber,
  orderDataDraft,
  orderRoutesDetails,
}) => {
  const actions = useActions({getIdAddressGoogleSubmit});
  const {addItemSelectToRecentAddress} = useSaveAddress();

  // console.log('recentlyAddress', recentlyAddress);
  const RenderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            borderRadius: 8,
            borderWidth: index == 0 ? 0 : 0.5,
            borderColor: COLOR.COLOR_BORDER,
          }}
        />
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={() => {
            addItemSelectToRecentAddress(item);
            const options = {
              callback: res => {
                console.log(res);
              },
              detailsAddress: item,
              // keyActions:
              //   type == KEY_TYPE_STEP.ADDRESS_BOOK
              //     ? KEY_ACTION_ADDRESS.ADDRESS_BOOK
              //     : type == STEP_REQUEST_QUOTE.PICK_UP_ADDESS_MAP ||
              //       type == STEP_REQUEST_QUOTE.DELIVERY_ADDESS_MAP
              //     ? KEY_ACTION_ADDRESS.ADDRESS_RECEIVE_QUOTE
              //     : KEY_ACTION_ADDRESS.ADDRESS_DESTINATIONS,
              // // type == KEY_TYPE_STEP.ADDRESS_BOOK
              // //   ? KEY_ACTION_ADDRESS.ADDRESS_BOOK
              // //   : KEY_ACTION_ADDRESS.ADDRESS_DESTINATIONS,
              typeFromPreviousScreen: type,
              isGetDetailsFromGoogleApi: isGetDetailsFromGoogleApi,
              detailsAddressInput: detailsAddressInput,
              isUpdate: isUpdate,
              totalLocNumber: totalLocNumber,
              orderDataDraft: orderDataDraft,
              orderRoutesDetails: orderRoutesDetails,
            };
            actions.getIdAddressGoogleSubmit({showLoading: true, ...options});
          }}>
          <AppView style={styles.innerButtonContainer}>
            <SVG_NAME.MAP_PIN />
            <AppView style={{marginLeft: getSize.m(8), flex: 1}}>
              <AppText style={styles.txtTitle} numberOfLines={1}>
                {getShortNameFromAddress(item.address_components)}
              </AppText>
              <AppText style={styles.txtSubTitle} numberOfLines={1}>
                {getMapNameFromAddress(item.address_components)}
              </AppText>
            </AppView>
          </AppView>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <AppView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataAddress.length > 0 ? (
          dataAddress.map((item, index) => {
            return <RenderItem key={index} index={index} item={item} />;
          })
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <AppText>No Data</AppText>
          </View>
        )}
      </ScrollView>
    </AppView>
  );
};

export default RenderListAddress;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: getSize.m(16),
  },
  buttonContainer: {
    height: getSize.m(81),
    borderColor: COLOR.COLOR_BORDER,
  },
  innerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: getSize.m(16),
  },
  txtTitle: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '600',
    color: COLOR.TEXT_CONTENT,
  },
  txtSubTitle: {
    ...STYLE_GLOBAL.body2,
    fontWeight: '400',
    color: COLOR.TEXT_GREY_SECONDARY,
  },
});
