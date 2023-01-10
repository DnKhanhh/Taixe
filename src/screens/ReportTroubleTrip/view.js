import React, {useState, useMemo, useEffect} from 'react';
//lib
import * as Yup from 'yup';
import {Formik} from 'formik';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//components
import AppModal from 'components/Modal/AppModal';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppDatePicker from 'components/AppDatePicker';
import AppTextInput from 'components/AppTextInput';
import AppPickerInput from 'components/AppPickerInput';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import ListImageUpload from 'components/AppImage/listImageUpload';
import AppModalDialog from 'components/Modal/AppModalDialog';
import HandleMapView from './HandleMapView';
import AppUploadMultiImage from 'components/AppUploadMultiImage';
//util
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {SCENE_NAMES} from 'utils/AppConst';
import NavigationServices from 'navigation/navigationServices';
import {getAddressNameFromAPI, dateTimeFormat} from 'utils/appUtils';
//style
import {COLOR} from 'utils/AppConst';
import {getSize} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
const deviceHeight = Dimensions.get('window').height;
const DATA_PROBLEM = [
  {
    id: 1,
    title: 'Phương tiện(xe hư, ...)',
  },
  {
    id: 2,
    title: 'Tài xế(bệnh ...)',
  },
  {
    id: 3,
    title: 'Giao thông(Tai nạn, kẹt xe, đường cấm, phạt...)',
  },
  {
    id: 4,
    title: 'Chủ hàng(không tìm thấy địa điểm, không người nhận ...)',
  },
  {
    id: 5,
    title: 'Khác(nhập chi tiết vào ghi chú)',
  },
];
const ReportTroubleTripScreen = ({
  dataDetailTrip,
  onSubmitReportTrouble,
  points,
  vehicleInfo,
}) => {
  const [showLocationCar, setShowLocationCar] = useState(false);
  const [dataLocation, setDataLocation] = useState([]);

  const getLocation = useMemo(() => {
    return setDataLocation(
      dataDetailTrip?.journeyRoutes?.map(
        item => item?.orderRoute?.locationOfCustomer,
      ),
    );
  }, [dataDetailTrip]);

  useEffect(() => {
    getLocation;
    return () => {};
  }, [dataDetailTrip]);

  const {t} = useTranslate();
  const [openModalPickTime, setOpenModalPickTime] = useState(false);
  const [openModalTypeTrouble, setOpenModalTypeTrouble] = useState(false);
  const [openModalChoseLocation, setOpenModalChoseLocation] = useState(false);
  const [showModalDialog, setShowModalDialog] = useState(false);

  const REPORT_TROUBLE_SCHEMA = Yup.object().shape({
    cusErrorDate: Yup.string().required(
      t('common:validation.string.requiredCusErrorDate'),
    ),
    cusErrorType: Yup.string().required(
      t('common:validation.string.requiredCusErrorType'),
    ),
    cusErrorNote: Yup.string().required(
      t('common:validation.string.requiredCusErrorNote'),
    ),
    troubleshootingGuide: Yup.string().required(
      t('common:validation.string.requiredTroubleshootingGuide'),
    ),
  });
  const initialValues = {
    address: '',
    lat: '',
    long: '',
    files: [],
    cusErrorDate: '',
    cusErrorType: '',
    cusErrorNote: '',
    troubleshootingGuide: '',
  };
  return (
    <Formik
      validationSchema={REPORT_TROUBLE_SCHEMA}
      initialValues={initialValues}
      onSubmit={values => onSubmitReportTrouble(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => {
        return (
          <AppContainer
            title="Báo cáo sự cố"
            back={true}
            stackScreen={true}
            onGoBack={() => setShowModalDialog(true)}>
            <AppView style={styles.container}>
              <KeyboardAwareScrollView
                extraScrollHeight={40}
                keyboardShouldPersistTaps="handled"
                extraHeight={getSize.v(160)}
                showsVerticalScrollIndicator={false}
                style={{
                  backgroundColor: COLOR.WHITE,
                  marginBottom: getSize.m(18),
                }}>
                <AppView margin={getSize.m(16)}>
                  <AppView>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Thời gian
                    </AppText>
                    <AppPickerInput
                      style={{marginTop: getSize.m(8)}}
                      placeholder="hh:mm dd/mm/yyyy"
                      selectedName={dateTimeFormat(
                        values?.cusErrorDate,
                        'hh:mm DD-MM-YYYY',
                      )}
                      icon={<SVG_NAME.ICON_CALENDAR />}
                      onPressIcon={() =>
                        setOpenModalPickTime(!openModalPickTime)
                      }
                      isSelectOne={true}
                      error={touched?.cusErrorDate && errors?.cusErrorDate}
                      messageError={t(`${errors?.cusErrorDate}`)}
                    />
                  </AppView>
                  <AppView rowAlignCenter space={'between'}>
                    <AppView flex={1}>
                      <AppText
                        required={true}
                        style={{
                          ...STYLE_GLOBAL.body2,
                          ...STYLE_GLOBAL.weight600,
                        }}>
                        Địa điểm
                      </AppText>
                      <AppPickerInput
                        style={{
                          marginTop: getSize.m(8),
                          marginRight: getSize.m(8),
                        }}
                        placeholder="Chọn địa điểm"
                        selectedName={values?.address}
                        onPressIcon={() => setOpenModalChoseLocation(true)}
                        isSelectOne={true}
                      />
                    </AppView>
                    <TouchableOpacity onPress={() => setShowLocationCar(true)}>
                      <SVG_NAME.ICON_OPEN_MAP
                        style={{marginTop: getSize.m(12)}}
                      />
                    </TouchableOpacity>
                  </AppView>

                  <AppView>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Loại sự cố
                    </AppText>
                    <AppPickerInput
                      style={{marginTop: getSize.m(8)}}
                      placeholder="Chọn loại sự cố"
                      onPressIcon={() => setOpenModalTypeTrouble(true)}
                      selectedName={values?.cusErrorType}
                      isSelectOne={true}
                      error={touched.cusErrorType && errors.cusErrorType}
                      messageError={t(`${errors.cusErrorType}`)}
                    />
                  </AppView>
                  <AppView marginBottom={getSize.m(16)}>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Ghi chú
                    </AppText>
                    <AppTextInput
                      containerStyle={{marginTop: getSize.m(8)}}
                      placeholder={t('common:placeholder.plNote')}
                      multiline={true}
                      maxLength={1000}
                      onChangeText={handleChange('cusErrorNote')}
                      value={values?.cusErrorNote}
                      error={touched.cusErrorNote && errors.cusErrorNote}
                      messageError={t(`${errors.cusErrorNote}`)}
                    />
                  </AppView>
                  <AppView marginBottom={getSize.m(16)}>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Hướng xử lí đề xuất
                    </AppText>
                    <AppTextInput
                      containerStyle={{marginTop: getSize.m(8)}}
                      placeholder="Nhập"
                      multiline={true}
                      onChangeText={handleChange('troubleshootingGuide')}
                      value={values?.troubleshootingGuide}
                      error={
                        touched.troubleshootingGuide &&
                        errors.troubleshootingGuide
                      }
                      messageError={t(`${errors.troubleshootingGuide}`)}
                    />
                  </AppView>
                  <AppView marginBottom={getSize.m(32)}>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Hình ảnh minh chứng(5 ảnh)
                    </AppText>
                    <AppView rowAlignCenter marginTop={getSize.m(16)}>
                      {/* <ListImageUpload
                        name="files"
                        listImg={values?.files || ''}
                        setFieldValue={setFieldValue}
                      /> */}
                      <AppUploadMultiImage
                        imageChoose={values?.files || null}
                        setFieldValue={setFieldValue}
                      />
                    </AppView>
                  </AppView>
                </AppView>
              </KeyboardAwareScrollView>

              <AppConfirmButton
                titleConfirm={t('common:button.confirm')}
                style={{
                  marginBottom: getSize.m(-16),
                  paddingBottom: getSize.m(24),
                }}
                onPressConfirm={handleSubmit}
                onPressCancel={() => setShowModalDialog(true)}
              />
              {/* data time */}
              <AppDatePicker
                openModalDate={openModalPickTime}
                setOpenModalDate={setOpenModalPickTime}
                mode={'datetime'}
                dateDefault={new Date()}
                onConfirm={date => {
                  setOpenModalPickTime(false);
                  const time = dateTimeFormat(date, 'hh:mm DD-MM-YYYY');
                  setFieldValue('cusErrorDate', time);
                }}
              />
              {/* modal type trouble */}
              <AppModal
                titleModal={'Loại sự cố'}
                showAppModal={openModalTypeTrouble}
                setShowAppModal={setOpenModalTypeTrouble}
                dataModal={DATA_PROBLEM}
                onPressDataModal={item => {
                  setFieldValue('cusErrorType', item?.title);
                  setOpenModalTypeTrouble(false);
                }}
              />
              {/* modal location */}
              <AppModal
                titleModal={'Địa điểm trong lộ trình'}
                showAppModal={openModalChoseLocation}
                setShowAppModal={setOpenModalChoseLocation}
                dataModal={dataLocation?.map(item => ({
                  ...item,
                  fullAddress: getAddressNameFromAPI(item),
                }))}
                keyValue={'fullAddress'}
                keyWordItem={'createdAt'}
                onPressDataModal={dataSelected => {
                  setFieldValue('address', dataSelected?.fullAddress);
                  setFieldValue('lat', dataSelected?.lat);
                  setFieldValue('long', dataSelected?.long);
                  setOpenModalChoseLocation(false);
                }}
              />
              <AppModalDialog
                type="warning"
                titleModal={t('common:modalbox.confirm')}
                showModalDialog={showModalDialog}
                contentModal={t('common:modalbox.contentBackReportTrouble')}
                setShowModalDialog={setShowModalDialog}
                titleConfirm={t('common:modalbox.agree')}
                titleCancel={t('common:modalbox.cancel')}
                onPressConfirm={() =>
                  NavigationServices.navigate(
                    SCENE_NAMES.DETAIL_TRIP_INPROGRESS,
                  )
                }
                onPressCancel={() => {
                  setShowModalDialog(false);
                }}
              />

              <AppModal
                isFullscreen={true}
                showAppModal={showLocationCar}
                setShowAppModal={setShowLocationCar}
                isSafeView={true}
                swipeToClose={false}
                height={deviceHeight}
                maxHeight={deviceHeight}>
                <HandleMapView
                  vehicleInfo={vehicleInfo}
                  data={dataDetailTrip}
                  points={points}
                  setShowAppModal={() => setShowLocationCar(false)}
                  onPressConfirm={value => {
                    setFieldValue('address', value?.address);
                    setFieldValue('lat', value?.latitude);
                    setFieldValue('long', value?.longitude);
                    setShowLocationCar(false);
                  }}
                />
              </AppModal>
            </AppView>
          </AppContainer>
        );
      }}
    </Formik>
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
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
  },
  line: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: '#B5B6BA',
  },
});
export default ReportTroubleTripScreen;
