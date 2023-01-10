import React from 'react';
import {StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import { t } from 'i18next';

const Dashboard = () => {
  return (
    <AppView center style={styles.container}>
      <AppText>{t('common:msg_developing_feature')}</AppText>
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.DASH_BOARD_BACKGROUND,
  },
});
export default Dashboard;
