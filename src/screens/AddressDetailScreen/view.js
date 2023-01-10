import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {Formik} from 'formik';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import InputContainer from 'components/InputContainer';
import AppModal from 'components/Modal/AppModal';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import NavigationServices from 'navigation/navigationServices';
import ModalOptionsAddress from 'screens/AddressScreen/components/ModalOptionsAddress';
import {SCHEMA_ADDRESS} from 'screens/AddressDetailScreen/contants';
import {Section} from 'components/Section';
const AddressDetailScreen = ({
  isUpdate,
  bookAddressSelected,
  onGetListCity,
  listCity,
  listDistrict,
  setShowModalSelectCity,
  showModalSelectCity,
  setCitySelected,
  showModalSelectDistrict,
  setShowModalSelectDistrict,
  setShowModalSelectWard,
  showModalSelectWard,
  listWard,
  setDistrictSelected,
  onCreateAddressBook,
  onUpdateAddressBook,
}) => {
  const [showModalOptions, setShowModalOptions] = useState(false);
  useEffect(() => {
    return () => {
      setShowModalOptions(false);
    };
  }, []);

  const initialValues = {
    addressName: isUpdate ? bookAddressSelected.addressName : '',
    buildingName: isUpdate ? bookAddressSelected.buildingName : '',
    contactName: isUpdate ? bookAddressSelected.contactName : '',
    contactPhone: isUpdate ? bookAddressSelected.contactPhone : '',
    address: isUpdate ? bookAddressSelected.address : '',
    cityId: isUpdate ? bookAddressSelected.cityId : '',
    cityName: isUpdate ? bookAddressSelected.city.name : '',
    districtId: isUpdate ? bookAddressSelected.districtId : '',
    districtName: isUpdate ? bookAddressSelected.district.name : '',
    wardId: isUpdate ? bookAddressSelected.wardId : '',
    wardName: isUpdate ? bookAddressSelected.ward.name : '',
  };
  const {t} = useTranslate();
  return (
    <AppContainer
      title={
        isUpdate
          ? t('navigate:scenes.addressScreen.detail')
          : t('navigate:scenes.addressScreen.createNew')
      }
      back={true}
      onPressIcon2={() => setShowModalOptions(true)}
      icon2={isUpdate ? <SVG_NAME.DOT /> : null}
      stackScreen={true}>
      <Formik
        validationSchema={SCHEMA_ADDRESS}
        initialValues={initialValues}
        onSubmit={values =>
          isUpdate ? onUpdateAddressBook(values) : onCreateAddressBook(values)
        }>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => {
          return (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <AppView style={styles.container}>
                  <Section
                    openDefault={true}
                    headerTitle={t(
                      'navigate:scenes.addressScreen.infoContact',
                    )}>
                    <AppView
                      backgroundColor={COLOR.COLOR_BACKGROUND}
                      padding={16}>
                      <InputContainer
                        required={true}
                        placeholder={t('navigate:scenes.addressScreen.pl.name')}
                        marginBottom={16}
                        label={t('navigate:scenes.addressScreen.labels.name')}
                        value={values.addressName}
                        error={touched.addressName && errors.addressName}
                        onChangeText={handleChange('addressName')}
                        messageError={t(errors.addressName)}
                      />
                      <InputContainer
                        required={true}
                        placeholder={t(
                          'navigate:scenes.addressScreen.pl.buildingName',
                        )}
                        marginBottom={16}
                        value={values.buildingName}
                        error={touched.buildingName && errors.buildingName}
                        onChangeText={handleChange('buildingName')}
                        messageError={t(errors.buildingName)}
                        label={t(
                          'navigate:scenes.addressScreen.labels.buildingName',
                        )}
                      />
                      <InputContainer
                        required={true}
                        marginBottom={16}
                        value={values.contactName}
                        error={touched.contactName && errors.contactName}
                        onChangeText={handleChange('contactName')}
                        placeholder={t(
                          'navigate:scenes.addressScreen.pl.nameContact',
                        )}
                        messageError={t(errors.contactName)}
                        label={t(
                          'navigate:scenes.addressScreen.labels.nameContact',
                        )}
                      />
                      <InputContainer
                        required={true}
                        keyboardType={'phone-pad'}
                        marginBottom={16}
                        value={values.contactPhone}
                        error={touched.contactPhone && errors.contactPhone}
                        onChangeText={handleChange('contactPhone')}
                        placeholder={t(
                          'navigate:scenes.addressScreen.pl.phoneContact',
                        )}
                        messageError={t(errors.contactPhone)}
                        label={t(
                          'navigate:scenes.addressScreen.labels.phoneContact',
                        )}
                      />
                    </AppView>
                  </Section>
                  <Section
                    headerTitle={t('navigate:scenes.addressScreen.address')}>
                    <AppView
                      padding={16}
                      backgroundColor={COLOR.COLOR_BACKGROUND}>
                      <InputContainer
                        required={true}
                        label={t(
                          'navigate:scenes.addNewVehicle.input.province',
                        )}
                        hasClick={true}
                        press={onGetListCity}
                        placeholder={t('common:placeholder.plProvince')}
                        value={values.cityName}
                        iconLeft={<SVG_NAME.DOWN />}
                        error={errors.cityName && touched.cityName}
                        messageError={t(errors.cityName)}
                      />
                      <InputContainer
                        required={true}
                        press={() => setShowModalSelectDistrict(true)}
                        label={t(
                          'navigate:scenes.addNewVehicle.input.district',
                        )}
                        hasClick={true}
                        placeholder={t('common:placeholder.plDistrict')}
                        value={values.districtName}
                        iconLeft={<SVG_NAME.DOWN />}
                        error={errors.districtName && touched.districtName}
                        messageError={t(errors.districtName)}
                      />
                      <InputContainer
                        required={true}
                        press={() => setShowModalSelectWard(true)}
                        label={t('navigate:scenes.addNewVehicle.input.ward')}
                        hasClick={true}
                        placeholder={t('common:placeholder.plWard')}
                        value={values.wardName}
                        iconLeft={<SVG_NAME.DOWN />}
                        error={errors.wardName && touched.wardName}
                        messageError={t(errors.wardName)}
                      />
                      <InputContainer
                        required={true}
                        label={t(
                          'navigate:scenes.addNewVehicle.input.ward_street',
                        )}
                        error={touched.address && errors.address}
                        onChangeText={handleChange('address')}
                        value={values.address}
                        placeholder={t('common:placeholder.plWardStreet')}
                        messageError={t(errors.address)}
                      />
                    </AppView>
                  </Section>
                </AppView>
              </ScrollView>
              <ModalOptionsAddress
                isDetailScreen={true}
                addressBookSelectedId={bookAddressSelected?.id}
                setShowModalOption={setShowModalOptions}
                showModalOption={showModalOptions}
              />
              <AppConfirmButton
                titleConfirm={
                  isUpdate
                    ? t('common:button.saveChange')
                    : t('common:button.add')
                }
                onPressConfirm={handleSubmit}
                onPressCancel={() => NavigationServices.goBack()}
              />
              <AppModal
                titleModal={t('common:placeholder.plProvince')}
                dataModal={listCity}
                setShowAppModal={setShowModalSelectCity}
                showAppModal={showModalSelectCity}
                onPressDataModal={item => {
                  setFieldValue('cityId', item.id);
                  setFieldValue('cityName', item.name);
                  setFieldValue('districtId', '');
                  setFieldValue('districtName', '');
                  setFieldValue('wardId', '');
                  setFieldValue('wardName', '');
                  setCitySelected(item.id);
                  setShowModalSelectCity(false);
                }}
              />
              <AppModal
                titleModal={t('common:placeholder.plDistrict')}
                dataModal={listDistrict}
                setShowAppModal={setShowModalSelectDistrict}
                showAppModal={
                  showModalSelectDistrict && listDistrict.length > 0
                }
                onPressDataModal={item => {
                  setFieldValue('districtId', item.id);
                  setFieldValue('districtName', item.name);
                  setFieldValue('wardId', '');
                  setFieldValue('wardName', '');
                  setDistrictSelected(item.id);
                  setShowModalSelectDistrict(false);
                }}
              />
              <AppModal
                titleModal={t('common:placeholder.plWard')}
                dataModal={listWard}
                setShowAppModal={setShowModalSelectWard}
                showAppModal={showModalSelectWard && listWard.length > 0}
                onPressDataModal={item => {
                  setFieldValue('wardId', item.id);
                  setFieldValue('wardName', item.name);
                  setShowModalSelectWard(false);
                }}
              />
            </>
          );
        }}
      </Formik>
    </AppContainer>
  );
};
const styles = StyleSheet.create({
  title: {
    ...STYLE_GLOBAL.subTitle2,
    ...STYLE_GLOBAL.weight600,
    color: COLOR.STATUS_SUCCESS_TEXT,
  },
  container: {
    flex: 1,
    marginBottom: 15,
  },
});
export default AddressDetailScreen;
