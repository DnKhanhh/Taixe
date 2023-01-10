import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
//components
import AppModal from 'components/Modal/AppModal';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import AppPickerInput from 'components/AppPickerInput';
import AppTextInput from 'components/AppTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppModalDialog from 'components/Modal/AppModalDialog';
import NavigationServices from 'navigation/navigationServices';

//util
import useTranslate from 'hooks/useTranslate';
//styles
import {getSize} from 'utils/responsive';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppUploadMultiImage from 'components/AppUploadMultiImage';

const AddCostsAction = ({idTripProcessing, handlePostAddCostSubmit}) => {
  const {t} = useTranslate();
  const [showModalTypeFee, setShowModalTypeFee] = useState(false);
  const [showModalDialog, setShowModalDialog] = useState(false);
  const REPORT_TROUBLE_SCHEMA = Yup.object().shape({
    amountByDriver: Yup.number().required(
      t('common:validation.string.requiredCusErrorDate'),
    ),
    // cusErrorType: Yup.string().required(
    //   t('common:validation.string.requiredCusErrorType'),
    // ),
    // cusErrorNote: Yup.string().required(
    //   t('common:validation.string.requiredCusErrorNote'),
    // ),
    // troubleshootingGuide: Yup.string().required(
    //   t('common:validation.string.requiredTroubleshootingGuide'),
    // ),
  });
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
  const initialValues = {
    journeyId: idTripProcessing,
    priceTypeId: {},
    amountByDriver: undefined,
    noteByDriver: '',
    files: [],
  };

  return (
    <Formik
      validationSchema={REPORT_TROUBLE_SCHEMA}
      initialValues={initialValues}
      onSubmit={values => {
        // console.log('vava', values.files);
        const formData = new FormData();
        values?.files?.forEach(tg => formData.append('files', tg)),
          formData.append('journeyId', values?.journeyId);
        formData.append('priceTypeId', values?.priceTypeId?.id);
        formData.append('amountByDriver', values?.amountByDriver);
        formData.append('noteByDriver', values?.noteByDriver);
        // console.log('zzzz', formData);

        handlePostAddCostSubmit(formData);
      }}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <AppContainer
          title="Thêm chi phí phát sinh"
          back={true}
          stackScreen={true}
          onGoBack={() => setShowModalDialog(true)}>
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
                    selectedName={values?.priceTypeId?.title}
                    isSelectOne
                    error={touched.priceTypeId && errors.priceTypeId}
                    messageError={t(`${errors.priceTypeId}`)}
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
                    error={touched.amountByDriver && errors.amountByDriver}
                    messageError={t(`${errors.amountByDriver}`)}
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

                <AppView>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body2,
                      ...STYLE_GLOBAL.weight600,
                      marginBottom: 10,
                    }}>
                    Hình ảnh minh chứng(5 ảnh)
                  </AppText>
                  <AppUploadMultiImage
                    imageChoose={values?.files || null}
                    setFieldValue={setFieldValue}
                  />
                </AppView>
              </AppView>
            </KeyboardAwareScrollView>
            <AppConfirmButton
              titleConfirm={t('common:button.confirm')}
              style={{
                marginBottom: getSize.m(-16),
                paddingBottom: getSize.m(16),
              }}
              onPressConfirm={handleSubmit}
              onPressCancel={() => setShowModalDialog(true)}
            />

            {/* modal type trouble */}
            <AppModal
              titleModal={'Loại phí'}
              showAppModal={showModalTypeFee}
              setShowAppModal={setShowModalTypeFee}
              dataModal={DATA_TYPE_FEE}
              onPressDataModal={item => {
                // setFieldValue('priceTypeId', item?.title);
                setFieldValue('priceTypeId', item);
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
        </AppContainer>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  textTitle: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],
});
export default AddCostsAction;
