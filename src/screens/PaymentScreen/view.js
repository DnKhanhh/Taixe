import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {NAMESPACE} from './constant';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import ItemBank from './components/ItemBank';
import EmptyPayment from './components/EmptyPayment';
import AppFlatList from 'components/AppFlatList';
import ItemGateway from './components/ItemGateway';

//hooks
import useTranslate from 'hooks/useTranslate';

const PaymentScreen = ({
  dataBank,
  dataGateway,
  refreshing,
  refreshData,
  onPressItemBank,
  onPressItemGateway,
  onPressAddPayment,
  loadMore,
}) => {
  const {t} = useTranslate();
  const renderItemBank = ({item, index}) => (
    <ItemBank item={item} index={index} onPressItemBank={onPressItemBank} />
  );
  const renderItemGateway = ({item, index}) => (
    <ItemGateway
      item={item}
      index={index}
      onPressItemGateway={onPressItemGateway}
    />
  );
  return (
    <AppContainer draw={false} stackScreen={true} title={t(`${NAMESPACE}`)}>
      <View style={{flex: 1, backgroundColor: COLOR.COLOR_BACKGROUND}}>
        <View style={styles.buttonAddBankContainer}>
          <TouchableOpacity onPress={onPressAddPayment}>
            <View style={styles.buttonAddBankStyle}>
              <SVG_NAME.ADD_BANK />
              <AppText style={styles.textButtonAddBank}>
                {t('common:button.addBank')}
              </AppText>
            </View>
          </TouchableOpacity>
          {dataBank.length === 0 && dataGateway.length === 0 && (
            <EmptyPayment />
          )}
        </View>

        <AppFlatList
          data={dataBank}
          renderItem={renderItemBank}
          refreshing={refreshing}
          onRefresh={refreshData}
          onEndReached={loadMore}
          contentContainerStyle={{paddingHorizontal: 16}}
          ListHeaderComponent={
            dataBank &&
            dataBank.length > 0 && (
              <AppText style={styles.titlePayment}>
                {t('navigate:scenes.payment.tabBank')}
              </AppText>
            )
          }
          ListFooterComponent={
            dataGateway &&
            dataGateway.length > 0 && (
              <View
                style={[
                  dataBank.length > 0 && {marginTop: 32},
                  {marginBottom: 48},
                ]}>
                <AppText style={styles.titlePayment}>
                  {t('navigate:scenes.payment.tabGateway')}
                </AppText>
                {dataGateway.map((item, index) =>
                  renderItemGateway({item, index}),
                )}
              </View>
            )
          }
        />
      </View>
    </AppContainer>
  );
};
export default React.memo(PaymentScreen);
