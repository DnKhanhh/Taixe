import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {COLOR, SCENE_NAMES, ACCOUNT_STATUS} from 'utils/AppConst';
import APIUtils from 'utils/apiUtils';

import {getUserInfoSelector} from 'appRedux/selectors/authSelector';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
import {useActions} from 'hooks/useActions';

export default function GreetingScreen({navigation}) {
  const userData = useSelectorShallow(getUserInfoSelector);
  // console.log('user info', userData);
  const actions = useActions({getUserInfoSubmit});

  useEffect(() => {
    if (
      userData &&
      userData?.accessToken &&
      userData?.userProfile?.status !== ACCOUNT_STATUS.CLOSED && //temp for waiting BE
      userData?.userProfile?.status !== ACCOUNT_STATUS.LOCKED
    ) {
      const accessToken = userData?.accessToken;
      APIUtils.setAccessToken(accessToken);
      actions.getUserInfoSubmit({
        showLoading: false,
        keyAction: '',
        refreshToken: userData?.refreshToken,
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: SCENE_NAMES.SIGN_IN}],
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLOR.COLOR_PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
