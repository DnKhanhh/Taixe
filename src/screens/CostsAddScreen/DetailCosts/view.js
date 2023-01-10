import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

//components
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppPickerInput from 'components/AppPickerInput';
import AppTextInput from 'components/AppTextInput';
import AppImage from 'components/AppImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppUploadMultiImage from 'components/AppUploadMultiImage';
import AppModal from 'components/Modal/AppModal';
import AppModalDialog from 'components/Modal/AppModalDialog';

//util
import useTranslate from 'hooks/useTranslate';
//styles
import {getSize} from 'utils/responsive';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import ModalDeleteCosts from 'screens/CostsAddScreen/components/Modal/ModalDeleteCosts';
import NavigationServices from 'navigation/navigationServices';

const DetailCosts = ({
  idTripGone,
  dataDetailCost,
  handleEditAddCostSubmit,
  handleDeleteAddCostSubmit,
}) => {
  const {t} = useTranslate();
  const [showModalDeleteCosts, setShowModalDeleteCosts] = useState(false);
  // console.log('dataDetail', dataDetailCost);
  const [showModalTypeFee, setShowModalTypeFee] = useState(false);
  const [showModalDialog, setShowModalDialog] = useState(false);
  const DATA_TYPE_FEE = [
    {
      id: 1,
      title: 'Chi phí liên quan',
    },
    {
      id: 2,
      title: 'Chi phí rửa xe',
    },
    {
      id: 3,
      title: 'Thuê phụ xe',
    },
    {
      id: 4,
      title: 'Ăn trưa',
    },
    {
      id: 5,
      title: 'Phạt hao hụt',
    },
  ];
  console.log(
    'chec',
    dataDetailCost?.documents
      ?.map(item => {
        return item.file;
      })
      .map(
        ({createdAt, updatedAt, createdBy, updatedBy, size, id, ...rest}) => {
          return rest;
        },
      ),
  );
  const initialValues = {
    journeyId: dataDetailCost?.journeyId ?? '',
    priceTypeId: dataDetailCost?.priceTypeId ?? '',
    amountByDriver: dataDetailCost?.amountByDriver ?? '',
    noteByDriver: dataDetailCost?.noteByDriver ?? '',
    files:
      dataDetailCost?.documents.length > 0
        ? dataDetailCost?.documents
            ?.map(item => {
              return item.file;
            })
            .map(
              ({
                createdAt,
                updatedAt,
                createdBy,
                updatedBy,
                size,
                id,
                ...rest
              }) => {
                return rest;
              },
            )
        : [],
  };

  return (
    <AppContainer
      title={t('Chi tiết phát sinh')}
      back={true}
      stackScreen={true}
      onGoBack={() => setShowModalDialog(true)}>
      <ScrollView style={styles.container}>
        <AppView
          padding={getSize.m(16)}
          backgroundColor={COLOR.COLOR_BACKGROUND}
          marginBottom={getSize.m(8)}>
          <AppView
            backgroundColor={
              dataDetailCost?.statusId === 'cost_driver_transporter_pending'
                ? COLOR.YELLOW_200
                : dataDetailCost?.statusId === 'cost_driver_active'
                ? '#CDF3C6'
                : dataDetailCost?.statusId === 'cost_driver_cancelled'
                ? '#DFE0E2'
                : 'red'
            }
            width={getSize.m(65)}
            alignCenter
            marginBottom={getSize.m(8)}>
            <AppText
              style={{
                ...STYLE_GLOBAL.body2,
                paddingVertical: getSize.m(2),
                color:
                  dataDetailCost?.statusId === 'cost_driver_transporter_pending'
                    ? COLOR.STATUS_WAITING_TEXT
                    : dataDetailCost?.statusId === 'cost_driver_active'
                    ? COLOR.COLOR_PRIMARY_THIRD
                    : COLOR.TEXT_CONTENT,
              }}>
              {dataDetailCost?.statusId === 'cost_driver_transporter_pending'
                ? 'Chờ duyệt'
                : dataDetailCost?.statusId === 'cost_driver_active'
                ? 'Đã duyệt'
                : dataDetailCost?.statusId === 'cost_driver_cancelled'
                ? 'Từ chối'
                : ''}
            </AppText>
          </AppView>
          <AppText style={styles.textStatus}>
            Ghi chú duyệt nếu có thì hiển thị
          </AppText>
        </AppView>
        <View
          style={{
            height: getSize.m(12),
            backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
          }}
        />
        <Formik
          enableReinitialize
          // validationSchema={REPORT_TROUBLE_SCHEMA}
          initialValues={initialValues}
          onSubmit={values => {
            // console.log('vava', values);
            const formData = new FormData();

            values?.files?.forEach(tg => formData.append('files', tg)),
              formData.append('journeyId', values?.journeyId);
            formData.append('priceTypeId', values?.priceTypeId);
            formData.append('amountByDriver', values?.amountByDriver);
            formData.append('noteByDriver', values?.noteByDriver);
            // console.log('zzzz', formData);

            handleEditAddCostSubmit(formData);
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <AppView style={styles.container}>
              <KeyboardAwareScrollView
                extraScrollHeight={40}
                keyboardShouldPersistTaps="handled"
                extraHeight={getSize.v(160)}
                showsVerticalScrollIndicator={false}>
                <AppView margin={getSize.m(16)}>
                  <AppView>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Loại phí
                    </AppText>
                    <AppPickerInput
                      style={{marginTop: getSize.m(8)}}
                      placeholder="Chọn loại phí"
                      onPressIcon={() => setShowModalTypeFee(true)}
                      selectedName={values?.priceTypeId}
                      isSelectOne={true}
                      // error={touched.cusErrorType && errors.cusErrorType}
                      // messageError={t(`${errors.cusErrorType}`)}
                    />
                  </AppView>
                  <AppView marginBottom={getSize.m(16)}>
                    <AppText
                      required={true}
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Số tiền(VNĐ)
                    </AppText>
                    <AppTextInput
                      containerStyle={{marginTop: getSize.m(8)}}
                      placeholder="Nhập số tiền"
                      onChangeText={handleChange('amountByDriver')}
                      value={values?.amountByDriver}
                      // error={
                      //   touched.troubleshootingGuide &&
                      //   errors.troubleshootingGuide
                      // }
                      // messageError={t(`${errors.troubleshootingGuide}`)}
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
                      onChangeText={handleChange('noteByDriver')}
                      value={values?.noteByDriver}
                      // error={touched.cusErrorNote && errors.cusErrorNote}
                      // messageError={t(`${errors.cusErrorNote}`)}
                    />
                  </AppView>

                  <AppView marginBottom={getSize.m(32)}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body2,
                        ...STYLE_GLOBAL.weight600,
                      }}>
                      Hình ảnh minh chứng(5 ảnh)
                    </AppText>
                    {/* <AppView rowAlignCenter marginTop={getSize.m(16)}> */}
                    {/* <ListImageUpload
                      name="files"
                      listImg={values?.files || ''}
                      setFieldValue={setFieldValue}
                    /> */}
                    <AppUploadMultiImage
                      imageChoose={values?.files || null}
                      setFieldValue={setFieldValue}
                    />
                    {/* </AppView> */}
                  </AppView>
                </AppView>
              </KeyboardAwareScrollView>
              {idTripGone ? (
                <AppView />
              ) : (
                <AppConfirmButton
                  titleConfirm="Cập nhật"
                  titleCancel="Xoá"
                  onPressConfirm={handleSubmit}
                  onPressCancel={() => {
                    setShowModalDeleteCosts(!showModalDeleteCosts);
                  }}
                />
              )}

              {/* modal type trouble */}
              <AppModal
                titleModal={'Loại phí'}
                showAppModal={showModalTypeFee}
                setShowAppModal={setShowModalTypeFee}
                dataModal={DATA_TYPE_FEE}
                onPressDataModal={item => {
                  setFieldValue('priceTypeId', item?.title);
                  setShowModalTypeFee(false);
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
                onPressConfirm={() => NavigationServices.goBack()}
                onPressCancel={() => {
                  setShowModalDialog(false);
                }}
              />
            </AppView>
          )}
        </Formik>
      </ScrollView>

      <ModalDeleteCosts
        dataDetailCost={dataDetailCost}
        showModal={showModalDeleteCosts}
        setShowModal={setShowModalDeleteCosts}
        handleDeleteAddCostSubmit={handleDeleteAddCostSubmit}
      />
    </AppContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.COLOR_BACKGROUND,
  },
  textTitle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],
  textStatus: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {paddingVertical: getSize.m(2)},
  ],
});
export default DetailCosts;
