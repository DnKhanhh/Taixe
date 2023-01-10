import React, {useMemo, useState, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import AppModalDialog from 'components/Modal/AppModalDialog';
import {SVG_NAME} from 'assets/path';
import {upgradeAccountSubmit} from 'appRedux/actions/authActions';
import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import NavigationServices from 'navigation/navigationServices';

//hooks
import useTranslate from 'hooks/useTranslate';
import {useStatusColor} from 'hooks/useStatusColor';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {useActions} from 'hooks/useActions';

//utils
import {statusTransfer} from 'utils/appUtils';
import STYLE_GLOBAL from 'utils/StyleGlobal';

const Header = ({isPersonal, setFieldValue, values, companyName}) => {
  const user = useSelectorShallow(getUserInfoSelector);
  const {t} = useTranslate();
  const actions = useActions({upgradeAccountSubmit});

  const colorStatusPoint = useStatusColor(
    user?.userProfile?.status,
  ).colorPointStatus;
  const colorContainer = useStatusColor(
    user?.userProfile?.status,
  ).colorBackgroundStatus;

  const pointStatusColor = useMemo(() => {
    return [styles.pointStatusIntro(colorStatusPoint)];
  }, [colorStatusPoint]);
  const textStatusColor = useMemo(() => {
    return [styles.textStatusIntro(colorStatusPoint)];
  }, [colorStatusPoint]);
  const containerStatus = useMemo(() => {
    return [styles.containerStatusIntro(colorStatusPoint)];
  }, [colorStatusPoint]);

  const containerColor = useMemo(() => {
    return [styles.backgroundStatusColor(colorContainer)];
  }, [colorContainer]);

  const [showPopupChangeType, setShowPopupChangeType] = useState(false);

  const handleChangeType = useCallback(() => {
    actions.upgradeAccountSubmit();
    setShowPopupChangeType(false);
    return () => {
      setShowPopupChangeType(null);
    };
  }, [actions]);

  return (
    <AppView>
      {isPersonal ? (
        <>
          <AppView marginBottom={24} rowAlignCenter>
            <ContainerImageUpload
              name={'avatarUrl'}
              widthContainerButtonUpload={26}
              widthContainer={92}
              uri={values.avatarUrl}
              isAvatar={true}
              setFieldValue={setFieldValue}
            />
            <AppView flexGrow marginLeft={16}>
              <AppView space={'between'} rowAlignCenter>
                <AppView>
                  <AppText style={styles.textSub1}>
                    {t('navigate:scenes.carOwnerInfoStart.step2.joinedSince')}
                  </AppText>
                  <AppText style={styles.textSub1}>
                    {t('navigate:scenes.carOwnerInfoStart.step2.lastUpdate')}
                  </AppText>
                </AppView>
                <AppView>
                  <AppText style={styles.textSub2}>
                    {user?.userProfile?.createdAt}
                  </AppText>
                  <AppText style={styles.textSub2}>
                    {user?.userProfile?.updatedAt}
                  </AppText>
                </AppView>
              </AppView>
              <AppView marginTop={8}>
                <AppView style={[containerStatus, containerColor]}>
                  <AppView style={pointStatusColor} />
                  <AppText style={textStatusColor}>
                    {t(`${statusTransfer(user?.userProfile?.status).nameStatus}`)}
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>

          <AppView style={styles.buttonRegister}>
            <Pressable onPress={() => setShowPopupChangeType(true)}>
              <AppText style={styles.textButton}>
                {t('navigate:scenes.carOwnerInfoStart.btn.buttonRegister')}
              </AppText>
            </Pressable>
          </AppView>
        </>
      ) : (
        <>
          <AppView alignCenter marginBottom={24}>
            <ContainerImageUpload
              name={'avatarUrl'}
              widthContainerButtonUpload={26}
              widthContainer={92}
              uri={values.avatarUrl}
              isAvatar={true}
              setFieldValue={setFieldValue}
            />
            <AppView marginVertical={8}>
              <AppText style={[STYLE_GLOBAL.subTitle1, STYLE_GLOBAL.weight700]}>
                {companyName || 'Tên công ty'}
              </AppText>
            </AppView>

            <AppView>
              <AppView style={[containerStatus, containerColor]}>
                <AppView style={pointStatusColor} />
                <AppText style={textStatusColor}>
                  {t(`${statusTransfer(user?.userProfile?.status).nameStatus}`)}
                </AppText>
              </AppView>
            </AppView>
          </AppView>
        </>
      )}

      <AppModalDialog
        iconTitle={<SVG_NAME.PERSONAL_TO_COMPANY />}
        onPressConfirm={handleChangeType}
        type="changeType"
        fillButtonTop={true}
        titleModal={t('common:modalbox.titleChangeType')}
        showModalDialog={showPopupChangeType}
        contentModal={t('common:modalbox.youWantUpgradeAccount')}
        setShowModalDialog={setShowPopupChangeType}
        titleConfirm={t('common:button.confirm')}
        titleCancel={t('common:modalbox.cancel')}
      />
    </AppView>
  );
};
const styles = StyleSheet.create({
  buttonRegister: {
    borderRadius: 4,
    borderColor: COLOR.COLOR_PRIMARY,
    borderWidth: 1,
    paddingVertical: 8,
    marginBottom: 24,
  },
  textButton: {
    ...STYLE_GLOBAL.body1,
    color: COLOR.COLOR_PRIMARY,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerStatusIntro: color => ({
    borderWidth: 1,
    borderRadius: 2,
    borderColor: color,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  }),
  pointStatusIntro: color => ({
    width: 12,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: color,
    marginRight: 4,
  }),
  textStatusIntro: color => [STYLE_GLOBAL.body2, {color: color}],
  container: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  backgroundStatusColor: color => ({
    backgroundColor: color,
  }),
  textSub1: {
    textAlign: 'left',
    color: COLOR.TEXT_GREY_SECONDARY,
    ...STYLE_GLOBAL.body2,
  },
  textSub2: {
    textAlign: 'right',
    color: COLOR.TEXT_CONTENT,
    ...STYLE_GLOBAL.body2,
  },
  textStatus: {
    ...STYLE_GLOBAL.body2,
    color: '#892300',
  },
});
export default Header;
