import React from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';

const RequestQuoteScreen = () => {
  const {t} = useTranslate();
  return (
    <AppContainer
      title={t('navigate:scenes.requestQuote.title')}
      stackScreen={true}
      back={true}>
      <AppView>
        <AppText>RequestQuoteScreen</AppText>
      </AppView>
    </AppContainer>
  );
};

export default RequestQuoteScreen;
