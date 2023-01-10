/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Platform} from 'react-native';

//components
import AppText from '../AppText';
import AppTextInput from 'components/AppTextInput';
import NavigationServices from 'navigation/navigationServices';

//utils
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import {getSize} from 'utils/responsive';
import {COLOR} from 'utils/AppConst';
import {useTranslation} from 'react-i18next';

const AppContainer_Search = ({
  style,
  title,
  hide = false,
  back = true,
  add = true,
  children,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {!hide ? (
        <View style={[STYLE_GLOBAL.paddingIPX, STYLE_GLOBAL.shadowDefault]}>
          <View style={styles.headerContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => NavigationServices.goBack()}
                disabled={!back}
                style={{
                  ...styles.btnIconHeader,
                  opacity: back ? 1 : 0,
                }}>
                <SVG_NAME.BACK_ICON />
              </TouchableOpacity>

              <AppText
                numberOfLines={1}
                style={[
                  STYLE_GLOBAL.h4,
                  STYLE_GLOBAL.color_primary,
                  styles.title,
                ]}>
                {title}
              </AppText>

              <TouchableOpacity
                disabled={!add}
                style={{
                  ...styles.btnIconHeader,
                  opacity: add ? 1 : 0,
                }}>
                <SVG_NAME.ADD />
              </TouchableOpacity>
            </View>

            <View style={{marginHorizontal: 16, marginTop: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppTextInput
                  containerStyle={{
                    maxWidth: '90%',
                    borderWidth: 1,
                    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
                    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
                  }}
                  placeholder={t('scenes.main.search.title')}
                  placeholderTextColor={COLOR.COLOR_TEXT_INPUT}>
                  <SVG_NAME.SEARCH />
                </AppTextInput>
                <View style={{paddingHorizontal: 8}}>
                  <TouchableOpacity>
                    <SVG_NAME.FILTER />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 8,
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity style={styles.btn}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                    }}>
                    <AppText
                      style={[
                        STYLE_GLOBAL.h3,
                        STYLE_GLOBAL.weight400,
                        STYLE_GLOBAL.color_textContent,
                        {paddingHorizontal: 10},
                      ]}>
                      {t('scenes.main.search.addressname')}
                    </AppText>
                    <View style={{paddingHorizontal: 6}}>
                      <SVG_NAME.DOWN />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, {marginLeft: 10}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                    }}>
                    <AppText
                      style={[
                        STYLE_GLOBAL.h3,
                        STYLE_GLOBAL.weight400,
                        STYLE_GLOBAL.color_textContent,
                        {paddingHorizontal: 20},
                      ]}>
                      {t('scenes.main.search.allstatus')}
                    </AppText>
                    <View style={{paddingHorizontal: 6}}>
                      <SVG_NAME.DOWN />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={STYLE_GLOBAL.paddingIPX} />
      )}

      <View
        style={[
          {flex: 1, height: '100%', width: '100%', backgroundColor: '#fff'},
          style,
        ]}>
        {children}
      </View>
    </View>
  );
};

export default AppContainer_Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  headerContainer: {
    minHeight: getSize.v(40),
    paddingBottom: getSize.m(5),
  },
  title: {
    textAlign: 'center',
    paddingVertical: getSize.m(5),
  },
  btnIconHeader: {
    paddingVertical: getSize.m(5),
    zIndex: 10,
    paddingHorizontal: getSize.m(16),
  },
  btn: {
    maxHeight: getSize.v(40),
    borderRadius: getSize.s(4),
    backgroundColor: '#E6EBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    flexDirection: 'row',
  },
});
