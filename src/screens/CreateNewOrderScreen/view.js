import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';

const CreateNewOrderScreen = () => {
  const {t} = useTranslate();
  return (
    <AppContainer
      title={t('navigate:scenes.createNewOrder.title')}
      stackScreen={true}
      back={true}>
      <AppView>
        <AppText>Create new order</AppText>
      </AppView>
    </AppContainer>
  );
};

export default CreateNewOrderScreen;
