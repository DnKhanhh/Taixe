import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet,Text} from 'react-native';
import AppContainer from 'components/AppContainer';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import SearchAndFilter from 'screens/AddressScreen/components/SearchAndFilter';
import AddressItem from 'screens/AddressScreen/components/AddressItem';
import {COLOR, SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import AppModal from 'components/Modal/AppModal';
import {Formik} from 'formik';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import ModalOptionsAddress from 'screens/AddressScreen/components/ModalOptionsAddress';
import InputContainer from 'components/InputContainer';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getListProvince} from 'appRedux/actions/addressActions';
import {useActions} from 'hooks/useActions';
import {getListProvinceSelector} from 'appRedux/selectors/addressSelector';
import STYLE_GLOBAL from 'utils/StyleGlobal';

const ModalFilterAddressBook = ({showModal, setShowModal, onFilter}) => {
  const [showModalSelectCity, setShowModalSelectCity] = useState(false);
  const {t} = useTranslate();
  const refTimeOut = useRef(null);
  const listCity = useSelectorShallow(getListProvinceSelector);
  const actions = useActions({getListProvince});
  const handleGetListCity = useCallback(() => {
    if (listCity && listCity.length > 0) {
      setShowModalSelectCity(true);
      return;
    }
    actions.getListProvince();
    refTimeOut.current = setTimeout(() => {
      setShowModalSelectCity(true);
    }, 50);
  }, [actions, listCity]);
  useEffect(() => {
    return () => {
      setShowModalSelectCity(false);
      clearTimeout(refTimeOut.current);
    };
  }, []);

  return (
    <AppModal
      iconClose={
        <AppText style={styles.textUnFilter}>
          {t('common:modalbox.unFilter')}
        </AppText>
      }
      titleModal={t('common:modalbox.filter')}
      setShowAppModal={setShowModal}
      showAppModal={showModal}>
      <Formik
        initialValues={{
          contactName: null,
          contactPhone: null,
          cityName: null,
          cityId: null,
        }}
        onSubmit={values => onFilter(values)}>
        {({handleChange, handleSubmit, values, setFieldValue}) => {
          return (
            <>
              <AppView padding={16}>
                <InputContainer
                  placeholder={t(
                    'navigate:scenes.addressScreen.pl.nameContact',
                  )}
                  marginBottom={16}
                  value={values.contactName}
                  onChangeText={handleChange('contactName')}
                  label={t('navigate:scenes.addressScreen.filter.contactName')}
                />
                <InputContainer
                  placeholder={t(
                    'navigate:scenes.addressScreen.pl.phoneContact',
                  )}
                  keyboardType={'phone-pad'}
                  marginBottom={16}
                  value={values.contactPhone}
                  onChangeText={handleChange('contactPhone')}
                  label={t('navigate:scenes.addressScreen.filter.contactPhone')}
                />
                <InputContainer
                  value={values.cityName}
                  press={handleGetListCity}
                  iconLeft={<SVG_NAME.DOWN />}
                  label={t('navigate:scenes.addressScreen.filter.city')}
                  hasClick={true}
                  placeholder={t(
                    'navigate:scenes.addNewVehicle.input.province',
                  )}
                />
              </AppView>
              <AppConfirmButton
                onPressCancel={() => setShowModal(false)}
                onPressConfirm={handleSubmit}
                titleConfirm={t('common:button.apply')}
                styleButton={styles.confirmButton}
              />
              <AppModal
                titleModal={t('common:placeholder.plProvince')}
                dataModal={listCity}
                setShowAppModal={setShowModalSelectCity}
                showAppModal={showModalSelectCity}
                onPressDataModal={item => {
                  setFieldValue('cityId', item.id);
                  setFieldValue('cityName', item.name);
                  setShowModalSelectCity(false);
                }}
              />
            </>
          );
        }}
      </Formik>
    </AppModal>
  );
};
const AddressScreen = ({
  listAddress,
  refreshing,
  onRefresh,
  onGoToDetail,
  onSearch,
  onFilter,
  showModalOptions,
  setShowModalOptions,
  setShowModalFilter,
  showModalFilter,
  loadMore,
  filtersBookAddress,
  defaultFilter,
}) => {
  const {t} = useTranslate();
  const [addressBookIdSelected, setAddressBookIdSelected] = useState(null);
  const handleGoToCreateAddress = () => {
    NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {
      isUpdate: false,
    });
  };
  const handleShowModalOptions = useCallback(
    idAddressSelected => {
      setAddressBookIdSelected(idAddressSelected);
      setShowModalOptions(true);
    },
    [setShowModalOptions],
  );
  useEffect(() => {
    return () => {
      setAddressBookIdSelected(null);
    };
  }, []);

  return (
    <AppContainer
      onPressIcon2={handleGoToCreateAddress}
      stackScreen={true}
      icon2={<SVG_NAME.ADD />}
      back={true}
      title={t('navigate:scenes.addressScreen.title')}>
      <AppView flex={1}>
        <SearchAndFilter
          modalFilter={
            <ModalFilterAddressBook
              onFilter={onFilter}
              setShowModal={setShowModalFilter}
              showModal={showModalFilter}
            />
          }
          onPressIconFilter={() => setShowModalFilter(true)}
          onPressSearch={onSearch}
        />
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          style={styles.flex1}
          contentContainerStyle={
            listAddress && listAddress.length > 0 ? {} : styles.emptyList
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLOR.COLOR_PRIMARY]}
              tintColor={COLOR.COLOR_PRIMARY}
            />
          }
          ListHeaderComponent={() => <AppView marginTop={8} />}
          ListEmptyComponent={() => {
            return (
              <AppText>
                {JSON.stringify(filtersBookAddress) ===
                JSON.stringify(defaultFilter)
                  ? t('navigate:scenes.addressScreen.emptyList')
                  : t('navigate:scenes.addressScreen.emptyFilter')}
              </AppText>
            );
          }}
          data={listAddress}
          renderItem={({item, index}) => (
            <AddressItem
              onLongPress={handleShowModalOptions}
              onPress={onGoToDetail}
              item={item}
              index={index}
            />
          )}
        />
        <ModalOptionsAddress
          setShowModalOption={setShowModalOptions}
          showModalOption={showModalOptions}
          addressBookSelectedId={addressBookIdSelected}
        />
      </AppView>
    </AppContainer>
  );
};
const styles = StyleSheet.create({
  textUnFilter: {
    ...STYLE_GLOBAL.body2,
    color: COLOR.COLOR_PRIMARY,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    paddingBottom: 0,
  },
  flex1: {
    flex: 1,
  },
});
export default AddressScreen;
