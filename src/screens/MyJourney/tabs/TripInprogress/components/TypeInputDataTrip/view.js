import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//components
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
//util
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
//styles
import {getSize} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
//components
// import ItemPayloadGoods from './components/ItemPayloadGoods';
// import ItemPapersReceiveGoods from './components/ItemPapersReceiveGoods';
import AppUploadMultiImage from 'components/AppUploadMultiImage';
import AppTextInputPicker from 'components/AppTextInputPicker';
import AppTextInput from 'components/AppTextInput';
import AppModalDialog from 'components/Modal/AppModalDialog';
import NavigationServices from 'navigation/navigationServices';

const TypeInputDataTrip = ({dataJourneyRoute, handleConfirmTypeInputData}) => {
  const {t} = useTranslate();
  const [showModalDialog, setShowModalDialog] = useState(false);
  const [chooseUnit, setChooseUnit] = useState();
  const UNIT_MASS = [
    {
      id: 1,
      code: 'kg',
      title: 'Kg',
    },
    {
      id: 2,
      code: 'ton',
      title: 'Tấn',
    },
  ];
  const TYPE_INPUT_DATA_SCHEMA = Yup.object().shape({
    actualGoodWeight: Yup.string().required('Vui lòng nhập thực nhận'),
    noteByDriver: Yup.string().required('Vui lòng nhập ghi chú'),
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
  const initialValues = {
    actualGoodWeight: '',
    noteByDriver: '',
    files: [],
  };
  return (
    <Formik
      validationSchema={TYPE_INPUT_DATA_SCHEMA}
      initialValues={initialValues}
      onSubmit={values => {
        const formData = new FormData();
        values?.files?.forEach(tg => formData.append('files', tg)),
          formData.append('actualGoodWeight', values?.actualGoodWeight);
        formData.append('noteByDriver', values?.noteByDriver);
        handleConfirmTypeInputData(formData);
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
          title={t('navigate:scenes.inputDataTrip.title')}
          back={true}
          stackScreen={true}
          onGoBack={() => setShowModalDialog(true)}>
          <AppView style={styles.container}>
            <KeyboardAwareScrollView>
              <AppView margin={16}>
                <AppView
                  padding={getSize.m(16)}
                  backgroundColor={COLOR.BLUE_SUPPORT_100}
                  borderRadius={getSize.m(8)}>
                  <AppView
                    row
                    rowAlignCenter
                    spacing={getSize.m(8)}
                    marginBottom={getSize.m(4)}>
                    <View
                      style={{
                        backgroundColor:
                          dataJourneyRoute?.orderRoute?.locationType ===
                          'pickup'
                            ? COLOR.BLUE_SUPPORT_500
                            : COLOR.TOAST_WARNING_BORDER,
                        paddingVertical: 1,
                        paddingHorizontal: 7,
                        borderRadius: 36,
                        borderWidth: 4,
                        borderColor: COLOR.WHITE,
                      }}>
                      <AppText
                        style={[STYLE_GLOBAL.caption, {color: COLOR.WHITE}]}>
                        {dataJourneyRoute?.locNumber ?? 'default'}{' '}
                      </AppText>
                    </View>
                    <AppView
                      rowAlignCenter
                      style={{
                        ...styles.itemType,
                        borderColor:
                          dataJourneyRoute?.orderRoute?.locationType ===
                          'pickup'
                            ? COLOR.BLUE_SUPPORT_500
                            : COLOR.TOAST_WARNING_BORDER,
                      }}>
                      <AppView>
                        {dataJourneyRoute?.orderRoute?.locationType ===
                        'pickup' ? (
                          <SVG_NAME.ARROW_LEFT />
                        ) : (
                          <SVG_NAME.ARROW_RIGHT />
                        )}
                      </AppView>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.caption,
                          color:
                            dataJourneyRoute?.orderRoute?.locationType ===
                            'pickup'
                              ? COLOR.BLUE_SUPPORT_500
                              : COLOR.TOAST_WARNING_BORDER,
                          marginLeft: 7,
                        }}>
                        {dataJourneyRoute?.orderRoute?.locationType === 'pickup'
                          ? 'Giao'
                          : 'Nhận'}{' '}
                      </AppText>
                    </AppView>
                  </AppView>

                  <AppView row rowAlignCenter spacing={getSize.m(16)}>
                    <AppText style={styles.textDelivery}>
                      {
                        dataJourneyRoute?.orderRoute?.locationOfCustomer
                          .buildingName
                      }
                      ,{' '}
                      {dataJourneyRoute?.orderRoute?.locationOfCustomer.address}
                      ,{' '}
                      {
                        dataJourneyRoute?.orderRoute?.locationOfCustomer.ward
                          .name
                      }
                      ,{' '}
                      {
                        dataJourneyRoute?.orderRoute?.locationOfCustomer
                          .district.name
                      }
                      ,{' '}
                      {
                        dataJourneyRoute?.orderRoute?.locationOfCustomer.city
                          .name
                      }
                      ,{' '}
                    </AppText>
                  </AppView>
                </AppView>
              </AppView>
              <AppView style={{...styles.lineBold, marginTop: 0}} />

              <AppView margin={16}>
                <AppText
                  required={true}
                  style={{
                    ...STYLE_GLOBAL.subTitle2,
                    ...STYLE_GLOBAL.weight700,
                    color: COLOR.TEXT_FOCUSED_TOP_TABBAR,
                    marginBottom: 10,
                  }}>
                  Tải trọng hàng hoá{' '}
                </AppText>
                <AppView backgroundColor={COLOR.COLOR_BACKGROUND}>
                  {/* Tải trọng trước nhận: */}
                  <AppView
                    rowAlignCenter
                    space={'between'}
                    marginBottom={getSize.m(8)}>
                    <AppText style={styles.textTitle}>
                      {t(
                        'navigate:scenes.inputDataTrip.payloadBeforeReceiving',
                      )}
                    </AppText>
                    <AppText style={styles.textContent}>30.000 kg</AppText>
                  </AppView>
                  {/* Dự kiến nhận: */}
                  <AppView
                    row
                    rowAlignCenter
                    space={'between'}
                    marginBottom={getSize.m(8)}>
                    <AppText style={styles.textTitle}>
                      {t('navigate:scenes.inputDataTrip.expectedToReceive')}
                    </AppText>
                    <AppText style={styles.textContent}>30.000 kg</AppText>
                  </AppView>
                  {/* Thực nhận: */}
                  <AppView
                    row
                    rowAlignCenter
                    space={'between'}
                    marginBottom={getSize.m(8)}>
                    <AppText style={styles.textTitle}>
                      {t('navigate:scenes.inputDataTrip.actuallyReceived')}
                    </AppText>
                    <AppText style={styles.textContent}>-------- kg</AppText>
                  </AppView>
                  {/* Tải trọng sau nhận */}
                  <AppView
                    row
                    rowAlignCenter
                    space={'between'}
                    marginBottom={getSize.m(8)}>
                    <AppText style={styles.textTitle}>
                      {t('navigate:scenes.inputDataTrip.postReceivePayload')}
                    </AppText>
                    <AppText style={styles.textTitleHeader}>30.000 kg</AppText>
                  </AppView>
                  <AppView marginVertical={getSize.m(12)}>
                    <SVG_NAME.LINE_BOTTOM />
                  </AppView>
                  {/* thuc nhan */}
                  <AppView marginBottom={getSize.m(8)}>
                    <AppText style={styles.textBody2W6}>
                      {t('navigate:scenes.inputDataTrip.actuallyReceived')}
                    </AppText>
                    <AppTextInputPicker
                      placeholderTextInput={t(
                        'common:placeholder.plActuallyReceived',
                      )}
                      containerStyle={{marginTop: getSize.m(8)}}
                      // placeholderPicker={t('common:textContent.ton')}
                      placeholderPicker="Đơn vị"
                      isSelectOne
                      onPressIcon={() => {}}
                      keyboardType="numeric"
                      dataOptions={UNIT_MASS}
                      onPressDataModal={value => {
                        setChooseUnit(value);
                      }}
                      optionSelected={chooseUnit}
                      valuesInput={values.actualGoodWeight}
                      onChangeText={handleChange('actualGoodWeight')}
                      error={
                        touched.actualGoodWeight && errors.actualGoodWeight
                      }
                      messageError={t(`${errors.actualGoodWeight}`)}
                    />
                  </AppView>
                  {/* Ghi chu */}
                  <AppView marginBottom={getSize.m(8)}>
                    <AppText style={styles.textBody2W6}>
                      {t('common:textContent.note')}
                    </AppText>
                    <AppTextInput
                      value={values.noteByDriver}
                      onChangeText={handleChange('noteByDriver')}
                      placeholder={t('common:textInput.hintNote')}
                      containerStyle={{marginTop: getSize.m(8)}}
                      multiline
                      error={touched.noteByDriver && errors.noteByDriver}
                      messageError={t(`${errors.noteByDriver}`)}
                    />
                  </AppView>
                </AppView>
              </AppView>
              <AppView style={{...styles.lineBold, marginTop: 0}} />

              <AppView margin={16}>
                <AppText
                  required
                  style={{
                    ...STYLE_GLOBAL.subTitle2,
                    ...STYLE_GLOBAL.weight700,
                    color: COLOR.TEXT_FOCUSED_TOP_TABBAR,
                    marginBottom: 10,
                  }}>
                  Giấy tờ nhận hàng{' '}
                </AppText>
                <AppView backgroundColor={COLOR.COLOR_BACKGROUND}>
                  <AppView marginBottom={getSize.m(8)}>
                    <AppView marginBottom={getSize.m(8)}>
                      <AppText style={styles.textDelivery}>
                        {t('navigate:scenes.inputDataTrip.deliveryPapers')}
                      </AppText>
                    </AppView>
                    <AppUploadMultiImage
                      imageChoose={values?.files || null}
                      setFieldValue={setFieldValue}
                    />
                  </AppView>
                </AppView>
              </AppView>
            </KeyboardAwareScrollView>
            <AppConfirmButton
              hasCancelButton={false}
              titleConfirm={t('common:button.confirm')}
              style={{paddingVertical: getSize.m(12)}}
              onPressConfirm={handleSubmit}
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
  itemType: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 35,
  },
  textDelivery: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],
  textTitleHeader: [
    STYLE_GLOBAL.subTitle1,
    STYLE_GLOBAL.weight700,
    {color: COLOR.BLUE_7},
  ],
  textTitle: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textGrey],
  textContent: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent],
  textDelivery: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],

  textTitleHeader: [
    STYLE_GLOBAL.subTitle1,
    STYLE_GLOBAL.weight700,
    {color: COLOR.BLUE_7},
  ],
  textTitle: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textGrey],
  textContent: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent],
  textBody2W6: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
});
export default TypeInputDataTrip;
