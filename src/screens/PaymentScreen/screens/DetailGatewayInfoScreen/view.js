import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {
  NAMESPACE_DETAIL,
  NAMESPACE_CREATE,
  CREATE_BANK_FORM_SCHEME,
} from './constant';
import _ from 'lodash';

//Components
import AppContainer from 'components/AppContainer';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import AppImage from 'components/AppImage';
import AppButton from 'components/AppButton';
import AppModalDialog from 'components/Modal/AppModalDialog';
import AwareScrollView from 'components/AwareScrollView';

//utils
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

//Utils
import useTranslate from 'hooks/useTranslate';
import NavigateServices from 'navigation/navigationServices';

const DetailGatewayInfoScreen = ({
  onPressSubmit,
  isUpdate,
  detailGatewayInfo,
  showModalDeleteGateway,
  setShowModalDeleteGateway,
  onPressDeleteSubmit,
  onPressSetDefault,
}) => {
  const {t} = useTranslate();
  console.log('itemBank', detailGatewayInfo);
  const [checkedValuesChange, setCheckedValuesChange] = useState(false);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (isUpdate) {
      setEditable(false);
    }
    return () => {};
  }, []);

  const initialValues = {
    fullName: isUpdate ? detailGatewayInfo.fullName : '',
    paymentNumber: isUpdate ? detailGatewayInfo.paymentNumber : '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        // console.log(values);
        onPressSubmit(values);
      }}
      validate={values => {
        if (!_.isEqual(values, initialValues)) {
          setCheckedValuesChange(true);
        }
      }}
      validationSchema={CREATE_BANK_FORM_SCHEME}>
      {({handleChange, values, touched, errors, handleSubmit}) => {
        return (
          <AppContainer
            draw={false}
            stackScreen={true}
            title={t(`${isUpdate ? NAMESPACE_DETAIL : NAMESPACE_CREATE}`)}>
            <AwareScrollView>
              <View style={styles.container}>
                <React.Fragment>
                  <View style={styles.gatewayContainer}>
                    <AppImage
                      source={{
                        uri: isUpdate
                          ? detailGatewayInfo?.logoGateway
                          : detailGatewayInfo?.logoUrl,
                      }}
                      style={styles.logoGatewayStyle}
                      resizeMode="contain"
                    />
                    <View style={{marginLeft: 16}}>
                      <AppText style={styles.textGatewayNameStyle}>
                        {isUpdate
                          ? detailGatewayInfo?.gatewayName
                          : detailGatewayInfo?.name}{' '}
                      </AppText>
                      {isUpdate && detailGatewayInfo?.isDefault && (
                        <View style={styles.containerDefaultGateway}>
                          <AppText style={styles.textDefaultGateway}>
                            {t('common:default')}
                          </AppText>
                        </View>
                      )}
                    </View>
                  </View>
                  <AppText style={styles.textTitle} required={true}>
                    {t('common:textContent.paymentNumber')}
                  </AppText>
                  <AppTextInput
                    containerStyle={styles.textInput}
                    editable={editable}
                    placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                    placeholder={t('common:textInput.hintGatewayNumber')}
                    error={touched.paymentNumber && errors.paymentNumber}
                    messageError={t(`${errors.paymentNumber}`)}
                    onChangeText={handleChange('paymentNumber')}
                    value={values.paymentNumber}
                  />

                  <AppText style={styles.textTitle} required={true}>
                    {t('navigate:scenes.payment.fullName')}
                  </AppText>
                  <AppTextInput
                    containerStyle={styles.textInput}
                    editable={editable}
                    placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
                    placeholder={t('common:textInput.hintName')}
                    error={touched.fullName && errors.fullName}
                    messageError={t(`${errors.fullName}`)}
                    onChangeText={handleChange('fullName')}
                    value={values.fullName}
                  />

                  {isUpdate && !detailGatewayInfo?.isDefault ? (
                    <View style={{flexDirection: 'row', marginTop: 12}}>
                      <AppButton
                        style={{flex: 1, marginRight: 16}}
                        title={t('common:button.toDefault')}
                        styleTouchOpacity={styles.buttonSetDefault}
                        styleText={[
                          STYLE_GLOBAL.body1,
                          STYLE_GLOBAL.color_primary,
                          STYLE_GLOBAL.weight600,
                        ]}
                        onPress={() =>
                          onPressSetDefault(isUpdate && detailGatewayInfo?.id)
                        }
                      />
                      <AppButton
                        style={[STYLE_GLOBAL.flex1]}
                        title={t('common:button.deleteAccount')}
                        styleText={[
                          STYLE_GLOBAL.body1,
                          STYLE_GLOBAL.weight600,
                          {color: COLOR.COLOR_TEXT_TITLE_INTRO},
                        ]}
                        styleTouchOpacity={{
                          backgroundColor: COLOR.COLOR_BACKGROUND,
                        }}
                        onPress={() => {
                          setShowModalDeleteGateway(true);
                        }}
                      />
                    </View>
                  ) : isUpdate && detailGatewayInfo.isDefault ? (
                    // <View style={styles.checkboxContainer}>
                    //   <AppCheckBox
                    //     colorChecked={COLOR.COLOR_PRIMARY}
                    //     isChecked={isDefault}
                    //     onPress={() => setIsDefault(!isDefault)}
                    //   />
                    //   <AppText style={styles.checkBoxDefault}>
                    //     {t('common:button.toDefault')}
                    //   </AppText>
                    // </View>
                    <AppButton
                      style={[STYLE_GLOBAL.flex1]}
                      title={t('common:button.deleteAccount')}
                      styleText={[
                        STYLE_GLOBAL.body1,
                        STYLE_GLOBAL.weight600,
                        {color: COLOR.COLOR_SECONDARY},
                      ]}
                      styleTouchOpacity={{
                        backgroundColor: COLOR.POP_UP_DANGER,
                      }}
                      onPress={() => {
                        setShowModalDeleteGateway(true);
                      }}
                    />
                  ) : null}
                </React.Fragment>
              </View>
            </AwareScrollView>
            {checkedValuesChange && (
              <AppConfirmButton
                onPressCancel={() => NavigateServices.goBack()}
                onPressConfirm={handleSubmit}
                titleConfirm={t('common:button.saveChange')}
              />
            )}
            <AppModalDialog
              type="danger"
              titleModal={t('common:modalbox.deleteAccount')}
              showModalDialog={showModalDeleteGateway}
              setShowModalDialog={setShowModalDeleteGateway}
              onPressConfirm={() =>
                onPressDeleteSubmit(isUpdate && detailGatewayInfo?.id)
              }
              titleConfirm={t('common:modalbox.delete')}
              titleCancel={t('common:modalbox.cancel')}
              contentModal={t('common:modalbox.contentDeleteBank')}
            />
          </AppContainer>
        );
      }}
    </Formik>
  );
};

export default React.memo(DetailGatewayInfoScreen);
