import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import SwitchButton from 'screens/MyJourney/tabs/TripInprogress/components/SwitchButton';
import PagerView from 'react-native-pager-view';
import TripInProgressInfo from 'screens/MyJourney/tabs/TripInprogress/tabs/TripInProgressInfo';
import TripInProgressRoute from 'screens/MyJourney/tabs/TripInprogress/tabs/TripInProgressRoute';

const TripInProgressDetailScreen = ({route, pageNumberInitial}) => {
  const [tabSelected, setTabSelected] = useState(pageNumberInitial ?? 0);
  const paperRef = React.useRef();
  useEffect(() => {
    paperRef.current?.setPage(tabSelected);
  }, [tabSelected]);
  const {t} = useTranslate();
  return (
    <AppContainer
      title="Chi tiết chuyến đi"
      back
      onPressIcon2={() => setShowModalOptions(true)}
      stackScreen>
      <AppView flex={1} backgroundColor={COLOR.WHITE}>
        <AppView center>
          <SwitchButton
            setTabSelected={setTabSelected}
            tabSelected={tabSelected}
          />
        </AppView>
        <PagerView
          showPageIndicator={false}
          ref={paperRef}
          initialPage={tabSelected}
          onPageSelected={e => {
            setTabSelected(e?.nativeEvent.position);
          }}
          style={STYLE_GLOBAL.flex1}>
          <TripInProgressInfo />
          <TripInProgressRoute />
        </PagerView>
      </AppView>
    </AppContainer>
  );
};
const styles = StyleSheet.create({
  title: {
    ...STYLE_GLOBAL.subTitle2,
    ...STYLE_GLOBAL.weight600,
    color: COLOR.STATUS_SUCCESS_TEXT,
  },
  container: {
    flex: 1,
    marginBottom: 15,
  },
});
export default TripInProgressDetailScreen;
