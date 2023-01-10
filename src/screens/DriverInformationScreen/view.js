import React from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import {DETAIL_INFORMATION} from './constant';

//Components
import AppContainer from 'components/AppContainer';
import SummaryDriverInfo from './component/SummaryDriverInfo';
import AppModalDialog from 'components/Modal/AppModalDialog';
import RenderContent from './component/RenderContent';

//hooks
import useTranslate from 'hooks/useTranslate';
import AppView from 'components/AppView';
import {ACCOUNT_STATUS} from 'utils/AppConst';

function SenderInformationScreen({
  userProfile,
  signInOptions,
  onPressOptionsItem,
  setShowModalDelete,
  showModalDelete,
  onDeleteAccount,
  securityOptions,
  onChangeStatus,
  setShowModalChangeStatus,
  showModalChangeStatus,
}) {
  const {t} = useTranslate();
  const {avatarUrl, name, status, rating, createdAt, updatedAt} = userProfile;
  const infoModalChangeStatus = {
    [ACCOUNT_STATUS.STOP_WORKING]: {
      type: 'success',
      titleModal: t('common:modalbox.confirmChangeWorking'),
      contentModal: t('common:modalbox.youWantChangeWorking'),
    },
    [ACCOUNT_STATUS.WORKING]: {
      type: 'warning',
      titleModal: t('common:modalbox.warningChangeStopWorking'),
      contentModal: t('common:modalbox.youWantChangeStopWorking'),
    },
  };
  return (
    <AppContainer
      title={t('navigate:scenes.transporterInfo.title')}
      back={true}
      stackScreen={true}>
      <ScrollView style={styles.container}>
        <View style={styles.containerIntro}>
          <SummaryDriverInfo
            avatarUrl={avatarUrl}
            nameUser={name}
            ratingUser={rating}
            createdAt={createdAt}
            updatedAt={updatedAt}
            statusUser={status}
          />
        </View>
        <RenderContent
          title={t('common:textContent.titleInformation')}
          data={DETAIL_INFORMATION}
          onPressOptionsItem={onPressOptionsItem}
        />
        <RenderContent
          title={t('common:textContent.titleSignInInformation')}
          data={signInOptions}
          onPressOptionsItem={onPressOptionsItem}
        />
        <AppView paddingBottom={60}>
          <RenderContent
            title={t('common:textContent.titleSecurityInformation')}
            data={securityOptions}
            onPressOptionsItem={onPressOptionsItem}
          />
        </AppView>
      </ScrollView>
      <AppModalDialog
        onPressConfirm={onDeleteAccount}
        type="danger"
        titleModal={t('common:modalbox.deleteAccount')}
        showModalDialog={showModalDelete}
        contentModal={t('common:modalbox.youWantDeleteAccount')}
        setShowModalDialog={setShowModalDelete}
        titleConfirm={t('common:modalbox.agree')}
        titleCancel={t('common:modalbox.cancel')}
      />
      <AppModalDialog
        onPressConfirm={() => onChangeStatus(status)}
        type={infoModalChangeStatus[status]?.type}
        titleModal={infoModalChangeStatus[status]?.titleModal}
        showModalDialog={showModalChangeStatus}
        contentModal={infoModalChangeStatus[status]?.contentModal}
        setShowModalDialog={setShowModalChangeStatus}
        titleConfirm={t('common:modalbox.agree')}
        titleCancel={t('common:modalbox.cancel')}
      />
    </AppContainer>
  );
}

export default React.memo(SenderInformationScreen);
