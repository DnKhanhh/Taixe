import React, {useMemo, useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {statusTransfer} from 'utils/appUtils';
import {COLOR, ACCOUNT_STATUS, KEY_ACTION_PROFILE} from 'utils/AppConst';
import LinearGradient from 'react-native-linear-gradient';
import NavigationServices from 'navigation/navigationServices';

//Components
import AppText from 'components/AppText';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';
import AppButton from 'components/AppButton';
import AppModalDialog from 'components/Modal/AppModalDialog';

//hooks
import useTranslate from 'hooks/useTranslate';
import {useStatusColor} from 'hooks/useStatusColor';
import {useActions} from 'hooks/useActions';
import {upgradeAccountSubmit} from 'appRedux/actions/authActions';

const SummaryDriverInfo = ({
  fieldNameUpload,
  value,
  disabled,
  setFieldValue,
  nameUser,
  ratingUser,
  statusUser,
  createdAt,
  updatedAt,
  isPersonal = true,
}) => {
  const {t} = useTranslate();
  const [showPopupChangeType, setShowPopupChangeType] = useState(false);
  const actions = useActions({upgradeAccountSubmit});

  //Filter color follow account status
  const colorStatusPoint = useStatusColor(statusUser).colorPointStatus;
  const pointStatusColor = useMemo(() => {
    return [styles.pointStatusIntro(colorStatusPoint)];
  }, [colorStatusPoint]);

  const handleChangeType = useCallback(() => {
    actions.upgradeAccountSubmit({
      keyAction: KEY_ACTION_PROFILE.CHANGE_TYPE_COMPANY_INFORMATION,
    });
    setShowPopupChangeType(false);
    return () => {
      setShowPopupChangeType(null);
    };
  }, [actions]);

  return (
    <View style={styles.container}>
      <ContainerImageUpload
        name={fieldNameUpload}
        uri={value}
        isAvatar={true}
        setFieldValue={setFieldValue}
        disabled={disabled}
        widthContainer={92}
        widthContainerButtonUpload={28}
      />
      <AppText
        style={[
          STYLE_GLOBAL.subTitle2,
          STYLE_GLOBAL.weight700,
          STYLE_GLOBAL.color_textContent,
          {marginTop: 8},
        ]}>
        {nameUser || t('common:textContent.nameUser')}
      </AppText>
      {statusTransfer(statusUser).changeNameStatus ===
      ACCOUNT_STATUS.PENDING_APPROVAL ? (
        <View>
          <View style={[STYLE_GLOBAL.containerCenter]}>
            <View style={pointStatusColor} />
            <AppText style={styles.pointStatusText}>
              {t(`${statusTransfer(statusUser).nameStatus}`)}
            </AppText>
          </View>
        </View>
      ) : (
        <>
          <View
            style={[STYLE_GLOBAL.containerCenter, styles.containerStatusPoint]}>
            <View style={[STYLE_GLOBAL.containerCenter]}>
              <View style={pointStatusColor} />
              <AppText style={styles.pointStatusText}>
                {t(`${statusTransfer(statusUser).nameStatus}`)}
              </AppText>
            </View>

            <View style={styles.separateStatusPoint} />
            <View style={[STYLE_GLOBAL.containerCenter]}>
              {!ratingUser ? (
                <AppText style={styles.pointStatusText}>
                  {t('common:noInformation')}
                </AppText>
              ) : (
                <View style={[STYLE_GLOBAL.containerCenter]}>
                  <SVG_NAME.STAR />
                  <AppText style={styles.pointStatusText}>{ratingUser}</AppText>
                </View>
              )}
              <TouchableOpacity onPress={() => {}}>
                <SVG_NAME.INFO style={{marginLeft: 5}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rankMarkContainer}>
            <View style={styles.rankContainer}>
              <SVG_NAME.RANK_START />
              <AppText
                style={[
                  STYLE_GLOBAL.body2,
                  STYLE_GLOBAL.color_secondary,
                  {marginLeft: 5},
                ]}>
                Platinum
              </AppText>
            </View>
            <LinearGradient
              style={styles.markContainer}
              colors={COLOR.MARK_LINEAR_GRADIENT}>
              <AppText
                style={[STYLE_GLOBAL.body2, STYLE_GLOBAL.color_secondary]}>
                10000 điểm
              </AppText>
            </LinearGradient>
          </View>
          <View style={styles.containerTextAccountType}>
            <AppText style={styles.textAccountType}>
              {isPersonal
                ? t('common:personalAccount')
                : t('common:companyAccount')}
            </AppText>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 4}}>
            <AppText style={styles.textTitleIntro}>
              {t('common:textContent.createdAt')}
            </AppText>
            <AppText style={styles.textContentIntro}>
              {createdAt || 'mm/yyyy'}
            </AppText>
          </View>
          <View style={{flexDirection: 'row'}}>
            <AppText style={styles.textTitleIntro}>
              {t('common:textContent.updatedAt')}
            </AppText>
            <AppText style={styles.textContentIntro}>
              {updatedAt || 'dd/mm/yyyy'}
            </AppText>
          </View>
          {isPersonal && //confirm with BE status is changed company
            statusTransfer(statusUser).changeNameStatus !==
              ACCOUNT_STATUS.CLOSED &&
            statusTransfer(statusUser).changeNameStatus !==
              ACCOUNT_STATUS.LOCKED && (
              <AppButton
                style={{flex: 1, marginTop: 8, width: '100%'}}
                title={t('common:button.registerCompanyAccount')}
                styleTouchOpacity={styles.buttonRegisterCompanyAccount}
                styleText={[
                  STYLE_GLOBAL.body1,
                  STYLE_GLOBAL.weight700,
                  STYLE_GLOBAL.color_primary,
                ]}
                onPress={() => setShowPopupChangeType(true)}
              />
            )}
        </>
      )}
      <AppModalDialog
        iconTitle={<SVG_NAME.PERSONAL_TO_COMPANY />}
        onPressConfirm={handleChangeType}
        type="success"
        fillButtonTop={true}
        titleModal={t('common:modalbox.titleChangeType')}
        showModalDialog={showPopupChangeType}
        contentModal={t('common:modalbox.youWantUpgradeAccount')}
        setShowModalDialog={setShowPopupChangeType}
        titleConfirm={t('common:button.confirm')}
        titleCancel={t('common:modalbox.cancel')}
      />
    </View>
  );
};

export default React.memo(SummaryDriverInfo);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointStatusIntro: color => ({
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: color,
    marginRight: 8,
  }),
  containerStatusPoint: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separateStatusPoint: {
    marginHorizontal: 10,
    borderRightWidth: 1,
    borderColor: COLOR.COLOR_BORDER,
    height: 16,
  },
  textTitleIntro: [
    STYLE_GLOBAL.caption,
    STYLE_GLOBAL.color_textTitleIntro,
    {marginRight: 8},
  ],
  textContentIntro: [STYLE_GLOBAL.caption, STYLE_GLOBAL.color_textContent],
  pointStatusText: [STYLE_GLOBAL.body2, STYLE_GLOBAL.color_textContent],
  rankMarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  rankContainer: {
    backgroundColor: COLOR.BLUE_DARK2,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  markContainer: {
    backgroundColor: 'red',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  containerTextAccountType: {
    backgroundColor: COLOR.COLOR_PRIMARY_SECOND,
    borderRadius: 13,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  textAccountType: [
    STYLE_GLOBAL.caption,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_secondary,
  ],
  buttonRegisterCompanyAccount: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderColor: COLOR.COLOR_PRIMARY,
    borderWidth: 1,
  },
});
