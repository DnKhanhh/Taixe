import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';

const ListQuoteScreen = () => {
  const {t} = useTranslate();
  return (
    <AppContainer
      title={t('navigate:scenes.listQuote.title')}
      stackScreen={true}
      back={true}>
      <AppView>
        <AppText>ListQuoteScreen</AppText>
      </AppView>
    </AppContainer>
  );
};

export default ListQuoteScreen;
