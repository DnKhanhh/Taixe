import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';

const MyOrderScreen = () => {
  const {t} = useTranslate();
  return (
    <AppContainer
      title={t('navigate:scenes.myOrder.title')}
      stackScreen={true}
      back={true}>
      <AppView>
        <AppText>My Order</AppText>
      </AppView>
    </AppContainer>
  );
};

export default MyOrderScreen;
