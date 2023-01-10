import React from 'react';
import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import styles from './styles';
import {SVG_NAME} from 'assets/path';

//Components
import AppText from 'components/AppText';
import AppImage from 'components/AppImage';
import AppTextInput from 'components/AppTextInput';
import EmptyPayment from '../../../components/EmptyPayment';

//utils
import {COLOR} from 'utils/AppConst';

//Utils
import useTranslate from 'hooks/useTranslate';

const ListBankSettingScreen = ({
  onPressItemBank,
  dataBankSetting,
  refreshing,
  refreshData,
}) => {
  const {t} = useTranslate();

  const ListHeaderComponent = () => {
    return (
      <View style={styles.container}>
        <AppTextInput
          iconLeft={<SVG_NAME.SEARCH />}
          containerStyle={styles.viewTextInput}
          placeholder={t('common:textInput.hintSearchBankName')}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
        />
        <AppText style={styles.listBankTitle}>
          {t('common:textContent.listBank')}
        </AppText>
      </View>
    );
  };

  const renderItemBank = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItemBank(item)}
        style={[
          styles.containerItem,
          (index % 4 === 1 || 2) && styles.marginItem,
        ]}>
        <View style={[styles.wrapItem]}>
          <AppImage
            source={{uri: item.logoUrl}}
            style={styles.logoBank}
            resizeMode="contain"
          />
          <AppText style={styles.bankNameStyle} numberOfLines={1}>
            {item.name}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={{backgroundColor: COLOR.COLOR_BACKGROUND}}
      data={dataBankSetting}
      renderItem={renderItemBank}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      numColumns={4}
      contentContainerStyle={{paddingHorizontal: 16}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
      ListHeaderComponent={<ListHeaderComponent />}
      ListEmptyComponent={<EmptyPayment isListBankSetting={true} />}
    />
  );
};

export default React.memo(ListBankSettingScreen);
