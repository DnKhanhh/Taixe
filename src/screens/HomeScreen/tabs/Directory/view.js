import React, { useEffect } from 'react';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import RenderListButton from 'screens/HomeScreen/components/renderListButton';
import {
  DATA_LIST_ACCOUNT,
  RENDER_BUTTON_ORDER,
  RENDER_BUTTONS_QUOTE,
} from 'screens/HomeScreen/constant';
import useTranslate from 'hooks/useTranslate';
import styles from 'screens/HomeScreen/styles';
import { ScrollView } from 'react-native';

const CURRENT_INDEX = 0;
const Directory = ({ tabSelected }) => {
  const scrollViewRef = React.useRef(null);
  useEffect(() => {
    if (tabSelected === CURRENT_INDEX) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [tabSelected]);

  const { t } = useTranslate();
  return (
    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
      <AppView marginTop={15}>
        <AppText style={styles.textTitle}>
          {t('navigate:scenes.home.directory')}
        </AppText>
        <RenderListButton data={RENDER_BUTTONS_QUOTE} />
      </AppView>
    </ScrollView>
  );
};
export default React.memo(Directory);
