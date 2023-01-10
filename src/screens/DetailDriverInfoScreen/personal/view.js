import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';

import {useValidateUserProfile} from './constant';
import _ from 'lodash';

//utils
import {getFieldNameRequiredVerify} from 'utils/appUtils';
import STYLE_GLOBAL from 'utils/StyleGlobal';

//Components
import AppContainer from 'components/AppContainer';
import AppConfirmButton from 'components/AppButton/AppConfirmButton';
import SummaryUserInfo from '../component/SummaryUserInfo';
import AppModalDialog from 'components/Modal/AppModalDialog';
import TabInfoAddress from '../component/TabInfoAddress';
import PersonalInformation from '../component/PersonalInformation';
import {Section} from 'components/Section';
import NoteInvalidNotify from '../component/NoteInvalidNotify';

//hooks
import useTranslate from 'hooks/useTranslate';
import {useCheckStatusAccount} from 'hooks/useCheckStatusAccount';

function PersonalDriverInformation({
  onPressSubmitUpdate,
  userProfile,
  dataUserProfileSetting,
  setCheckFieldVerify,
  checkFieldVerify,
  tickSameAddress,
  setTickSameAddress,
  invalidValidation,
  noteInvalidValidation,
}) {
  const {
    name,
    status,
    gender,
    dob,
    createdAt,
    updatedAt,
    personalIdNumber,
    idDateIssue,
    idPlaceIssue,
    frontImageOfId,
    backImageOfId,
    avatarUrl,
    rating,
    contactCityId,
    contactDistrictId,
    contactAddress,
    permanentAddressCityId,
    permanentAddressDistrictId,
    permanentAddress,
    contactDistrictName,
    contactCityName,
    permanentAddressCityName,
    permanentAddressDistrictName,
  } = userProfile || {};

  const initialValues = {
    avatarUrl: avatarUrl,
    name: name,
    dob: dob,
    gender: gender,
    personalIdNumber: personalIdNumber,
    idDateIssue: idDateIssue,
    idPlaceIssue: idPlaceIssue,
    frontImageOfId: frontImageOfId,
    backImageOfId: backImageOfId,
    contactCityId: contactCityId || '',
    contactDistrictId: contactDistrictId || '',
    contactAddress: contactAddress || '',
    contactDistrictName: contactDistrictName || '',
    contactCityName: contactCityName || '',
    permanentAddressCityId: permanentAddressCityId,
    permanentAddressDistrictId: permanentAddressDistrictId,
    permanentAddressCityName: permanentAddressCityName || '',
    permanentAddressDistrictName: permanentAddressDistrictName || '',
    permanentAddress: permanentAddress || '',
  };
  console.log('initialValues Personal', initialValues);
  const {t} = useTranslate();
  const [checkedValuesChange, setCheckedValuesChange] = useState(false);
  const [nameFieldChange, setNameFieldChange] = useState([]);
  const [showModalConfirmChange, setShowModalConfirmChange] = useState(false);
  const checkEditProfile = useCheckStatusAccount(status).editableInput;
  const scrollRef = useRef(null);
  const formRef = useRef(null);

  //check field required follow admin setting
  const dataRequiredUserProfileSetting = dataUserProfileSetting?.required;
  const checkRequiredField = fields => {
    return dataRequiredUserProfileSetting?.includes(fields);
  };
  //validate dynamic follow admin setting
  const {EDIT_PROFILE_FORM_SCHEME} = useValidateUserProfile(checkRequiredField);

  //check field required verify follow admin setting
  const dataRequiredVerifyUserProfileSetting =
    dataUserProfileSetting?.requiredVerify;

  //function when onPress Cancel update profile
  const onPressCancelUpdateProfiles = (resetForm = () => {}) => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({y: 0, x: 0, animated: true}); // scroll To Top Screen
    resetForm;
    setCheckedValuesChange(false);
  };

  //function when onSubmit Form
  const onSubmit = async values => {
    // console.log('values submit', values);
    if (checkFieldVerify) {
      setShowModalConfirmChange(true);
    } else {
      onPressSubmitUpdate(values);
    }
  };
  //get Validation Log from admin
  useEffect(() => {
    let timeOut = null;
    if (invalidValidation) {
      const touched = {};

      Object.keys(invalidValidation || {})?.map(itemKey => {
        touched[itemKey] = true;
      });

      formRef?.current?.setTouched(touched);
      timeOut = setTimeout(() => {
        formRef.current?.setErrors(invalidValidation);
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [invalidValidation]);

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validateOnChange
      validate={values => {
        let keysError = Object.keys(invalidValidation);
        // const errors = {};
        const errors = {...invalidValidation};
        keysError.forEach(item => {
          if (!_.isEqual(values[item], initialValues[item])) {
            delete errors[item];
          }
        });
        if (checkRequiredField('frontImageOfId')) {
          if (!values.frontImageOfId) {
            errors.frontImageOfId = t(
              'common:validation.string.requiredFrontImageOfId',
            );
          }
        }

        if (checkRequiredField('backImageOfId')) {
          if (!values.backImageOfId) {
            errors.backImageOfId = t(
              'common:validation.string.requiredBackImageOfId',
            );
          }
        }

        if (checkRequiredField('gender')) {
          if (!values.gender) {
            errors.gender = t('common:validation.string.requiredGender');
          }
        }

        //check values change with initialValues
        if (!_.isEqual(values, initialValues)) {
          const fieldChanges = _.differenceWith(
            _.toPairs(values),
            _.toPairs(initialValues),
            _.isEqual,
          );
          const resultFieldChanges = fieldChanges?.map(item => item[0]);
          if (
            dataRequiredVerifyUserProfileSetting.some(item =>
              resultFieldChanges.includes(item),
            )
          ) {
            setCheckFieldVerify(true);
            setNameFieldChange(resultFieldChanges);
          }
          setCheckedValuesChange(true);
        }
        return errors;
      }}
      validationSchema={EDIT_PROFILE_FORM_SCHEME}
      onSubmit={onSubmit}>
      {({
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
        handleSubmit,
        setFieldTouched,
        resetForm,
      }) => {
        return (
          <AppContainer
            title={t('navigate:scenes.detailTransporterInfo.title')}
            back={true}
            stackScreen={true}>
            <ScrollView ref={scrollRef} style={styles.container}>
              <NoteInvalidNotify title={noteInvalidValidation} />
              <Section
                openDefault={true}
                headerTitle={t('common:textContent.titleInformation')}>
                <View style={styles.contentStyle}>
                  <SummaryUserInfo
                    fieldNameUpload="avatarUrl"
                    value={values.avatarUrl}
                    setFieldValue={setFieldValue}
                    disabled={!checkEditProfile}
                    nameUser={name}
                    statusUser={status || 'unfinished'}
                    ratingUser={rating}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                  />
                </View>
                <PersonalInformation
                  handleChange={handleChange}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  checkRequiredField={checkRequiredField}
                  setFieldTouched={setFieldTouched}
                  checkEditProfile={checkEditProfile}
                />
              </Section>
              <View style={{paddingBottom: 60}}>
                <Section
                  openDefault={false}
                  headerTitle={t('common:textContent.address')}>
                  <TabInfoAddress
                    tickSameAddress={tickSameAddress}
                    setTickSameAddress={setTickSameAddress}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    userProfile={userProfile || {}}
                    checkRequiredField={checkRequiredField}
                    checkEditProfile={checkEditProfile}
                  />
                </Section>
              </View>
            </ScrollView>

            {checkedValuesChange && (
              <AppConfirmButton
                onPressCancel={() => onPressCancelUpdateProfiles(resetForm())}
                hasCheckBox={true}
                onPressConfirm={handleSubmit}
                titleConfirm={t('common:button.save')}
              />
            )}

            <AppModalDialog
              type="warning"
              titleModal={t('common:modalbox.confirm')}
              showModalDialog={showModalConfirmChange}
              contentModal={t('common:modalbox.contentConfirmUpdate', {
                fieldName: getFieldNameRequiredVerify(
                  nameFieldChange,
                  dataUserProfileSetting?.originRequiredVerify,
                ),
              })}
              setShowModalDialog={setShowModalConfirmChange}
              titleConfirm={t('common:modalbox.agree')}
              titleCancel={t('common:modalbox.cancel')}
              onPressConfirm={() => onPressSubmitUpdate(values)}
              onPressCancel={() => {
                // onPressCancelUpdateProfiles(resetForm()); //reset initial form
                setShowModalConfirmChange(false);
              }}
            />
          </AppContainer>
        );
      }}
    </Formik>
  );
}

export default React.memo(PersonalDriverInformation);
