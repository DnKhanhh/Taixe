import React, {useEffect, useState} from 'react';
import {View, ImageBackground, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//Components
import AppText from 'components/AppText';
import AppModal from 'components/Modal/AppModal';
//style
import styles from './styles';
//Utils
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import {COLOR} from 'utils/AppConst';
//constants
import SwitchButton from './components/switchButton';
import RenderHelpOptionButton from './components/renderHelpOption';
import {openMenu} from 'appRedux/actions/otherActions';
import {useActions} from 'hooks/useActions';
import AppView from 'components/AppView';
import Directory from 'screens/HomeScreen/tabs/Directory';
import Dashboard from 'screens/HomeScreen/tabs/Dashboard';
import PagerView from 'react-native-pager-view';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppIcons from 'utils/AppIcons';
import AppContainer from 'components/AppContainer';

const HomeScreen = ({}) => {
  const paperRef = React.useRef();

  const {t} = useTranslate();
  const actions = useActions({openMenu});
  const [showModalHelp, setShowModalHelp] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);
  useEffect(() => {
    paperRef.current?.setPage(tabSelected);
  }, [tabSelected]);
  return (
    <AppContainer hide={true} flex={1}>
      <View style={styles.viewHeader}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imageBackgroundStyle}
          source={require('assets/images/dashboard.png')}>
          <View style={styles.viewContentHeader}>
            {AppIcons.ICON_LOGO}
            <AppView row>
              <TouchableOpacity onPress={() => actions.openMenu()}>
                {AppIcons.MENU}
              </TouchableOpacity>
              <AppView marginLeft={24}>
                <TouchableOpacity>
                  {AppIcons.NOTIFICATION_ICON}
                </TouchableOpacity>
              </AppView>
            </AppView>
          </View>
        </ImageBackground>
      </View>

      <AppView style={styles.viewBody}>
        <Directory />
        <TouchableOpacity
          style={styles.btnHelper}
          onPress={() => setShowModalHelp(true)}>
          <LinearGradient
            style={styles.viewHelper}
            colors={COLOR.LINEAR_GREEN_HELP}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}>
            <View style={styles.viewButtonHelper}>
              <AppView paddingLeft={5} marginRight={2} flex>
                {AppIcons.HEAD_PHONE}
              </AppView>
              <AppView center absolute left={42}>
                <AppText style={styles.textHelper}>
                  {t('navigate:scenes.home.help')}
                </AppText>
              </AppView>
              <AppView absolute right={0}>
                {AppIcons.HELP_RIGHT}
              </AppView>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </AppView>

      <AppModal
        showAppModal={showModalHelp}
        setShowAppModal={setShowModalHelp}
        style={styles.viewModalHelp}
        borderTopWidth={false}
        textTitleModalStyle={styles.textTitleModal}
        titleModal={t('navigate:scenes.home.help')}>
        <AppView bottom={-5} alignSelf={'flex-end'} absolute zIndex={-1}>
          {AppIcons.ELLIPSE}
        </AppView>
        <AppView>
          <RenderHelpOptionButton />
        </AppView>
        <AppView height={50} />
      </AppModal>
    </AppContainer>
  );
};

export default HomeScreen;
