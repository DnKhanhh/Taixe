import React from 'react';
import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import styles from './styles';

//Components
import AppText from 'components/AppText';
import AppImage from 'components/AppImage';
import EmptyPayment from '../../../components/EmptyPayment';

//utils
import {COLOR} from 'utils/AppConst';

const ListGateSettingScreen = ({
  onPressItemGateway,
  dataGatewaySetting,
  refreshing,
  refreshData,
}) => {
  const renderItemGateway = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItemGateway(item)}
        style={[
          styles.containerItem,
          (index % 4 === 1 || 2) && styles.marginItem,
        ]}>
        <View style={[styles.wrapItem]}>
          <AppImage
            source={{uri: item.logoUrl}}
            style={styles.logoGateway}
            resizeMode="contain"
          />
          <AppText style={styles.gatewayNameStyle} numberOfLines={1}>
            {item.name}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={{backgroundColor: COLOR.COLOR_BACKGROUND}}
      data={dataGatewaySetting}
      renderItem={renderItemGateway}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      numColumns={4}
      contentContainerStyle={{paddingHorizontal: 16, marginTop: 16}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
      ListEmptyComponent={<EmptyPayment isListBankSetting={true} />}
    />
  );
};

export default React.memo(ListGateSettingScreen);
