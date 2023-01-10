import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//Components
import AppText from 'components/AppText';
import AppModal from 'components/Modal/AppModal';
//style
import styles from './styles';
//Utils
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import {COLOR, LINEARGRADIENT} from 'utils/AppConst';
//constants
import SwitchButton from './components/switchButton';
import {openMenu} from 'appRedux/actions/otherActions';
import {useActions} from 'hooks/useActions';
import AppView from 'components/AppView';
import TripGone from 'screens/MyJourney/tabs/TripGone';
import TripContinue from 'screens/MyJourney/tabs/TripContinue';
import TripInprogress from 'screens/MyJourney/tabs/TripInprogress';
import TripRefuse from 'screens/MyJourney/tabs/TripReject';
import TripRecall from 'screens/MyJourney/tabs/TripRecall';
import TripSchedule from 'screens/MyJourney/tabs/TripSchedule';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import ModalConfirmGetOrder from 'screens/MyJourney/Modal/ModalConfirmGetOrder';
import AppLinearGradient from 'components/AppLinearGradient';
import NavigationServices from 'navigation/navigationServices';
import AppContainer from 'components/AppContainer';

const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;

const MyJourneyScreen = ({handleUpdateTripAssignment}) => {
  const {t} = useTranslate();
  const actions = useActions({openMenu});
  const [tabSelected, setTabSelected] = useState(0);
  return (
    <AppContainer stackScreen title={'Chuyến đi của tôi'}>
      <AppView center>
        <AppView
          center
          style={{
            width: '100%',
            zIndex: 1,
          }}
          backgroundColor={COLOR.DASH_BOARD_BACKGROUND}>
          <SwitchButton
            setTabSelected={setTabSelected}
            tabSelected={tabSelected}
          />
        </AppView>
      </AppView>
      <AppView style={{...styles.viewBody}}>
        {tabSelected === 0 && <TripGone />}
        {tabSelected === 1 && <TripInprogress />}
        {tabSelected === 2 && <TripContinue setTabSelected={setTabSelected} />}
        {tabSelected === 3 && <TripRecall />}
        {tabSelected === 4 && <TripRefuse />}
        {tabSelected === 5 && <TripSchedule />}
      </AppView>
      {/* <ModalConfirmGetOrder
        showModal={showModalGetOrder}
        setShowModal={setShowModalGetOrder}
      /> */}
    </AppContainer>
  );
};

export default MyJourneyScreen;
