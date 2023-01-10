import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppImage from 'components/AppImage';
import {getSize} from 'hooks/useIconSvgResizeHOC';

const TransRoMoocScreen = ({dataDetailTrip}) => {
  const {t} = useTranslate();
  return (
    <AppContainer
      title="Chi tiết dịch vụ vận chuyển"
      back={true}
      stackScreen={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        backgroundColor={'#ffffff'}>
        <AppView>
          <AppView rowAlignCenter margin={16}>
            <SVG_NAME.ICON_INVENTORY_BLUE />
            <AppText
              style={{
                ...STYLE_GLOBAL.subTitle2,
                ...STYLE_GLOBAL.weight700,
                color: COLOR.BLUE_7,
                marginLeft: 18,
              }}>
              Dịch vụ vận chuyển Rơ-mooc
            </AppText>
          </AppView>

          <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />
          <AppView marginHorizontal={16} marginTop={16}>
            <AppView rowAlignCenter marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 0.3,
                }}>
                Loại rơ-mooc:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 0.7,
                }}>
                {dataDetailTrip?.romoocType?.name ?? 'default'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 0.3,
                }}>
                Vận hành:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 0.7,
                }}>
                {dataDetailTrip?.romooc?.isAuto
                  ? 'Tự vận hành'
                  : 'Không tự vận hành'}
              </AppText>
            </AppView>

            <AppView rowAlignCenter marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 0.3,
                }}>
                Biển số:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 0.7,
                }}>
                {dataDetailTrip?.romooc?.licensePalateNo ?? 'default'}
              </AppText>
            </AppView>
            {/* 
            <AppView rowAlignCenter marginBottom={8}>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.GRAY5,
                  flex: 0.3,
                }}>
                Tính chất:
              </AppText>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  flex: 0.7,
                }}>
                Khô
              </AppText>
            </AppView> */}
            <AppView>
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                }}>
                Giấy đăng kiểm
              </AppText>
              <AppView rowAlignCenter wrap marginTop={10}>
                <AppView column alignCenter>
                  <AppView
                    padding={9}
                    borderColor={COLOR.TEXT_IMAGE_UPLOAD}
                    borderWidth={1}
                    borderStyle={'dashed'}
                    marginRight={12}
                    borderRadius={8}>
                    <AppImage
                      source={
                        dataDetailTrip?.romooc?.registrationImage1Url
                          ? {uri: dataDetailTrip?.romooc?.registrationImage1Url}
                          : require('assets/images/dashboard.png')
                      }
                      style={{
                        width: getSize.s(90),
                        height: getSize.s(90),
                        borderRadius: 8,
                      }}
                    />
                  </AppView>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      color: COLOR.TEXT_CONTENT,
                      marginTop: 5,
                    }}>
                    File 1
                  </AppText>
                </AppView>
                <AppView column alignCenter>
                  <AppView
                    padding={9}
                    borderColor={COLOR.TEXT_IMAGE_UPLOAD}
                    borderWidth={1}
                    borderStyle={'dashed'}
                    marginRight={12}
                    borderRadius={8}>
                    <AppImage
                      source={
                        dataDetailTrip?.romooc?.registrationImage2Url
                          ? {uri: dataDetailTrip?.romooc?.registrationImage2Url}
                          : require('assets/images/dashboard.png')
                      }
                      style={{
                        width: getSize.s(90),
                        height: getSize.s(90),
                        borderRadius: 8,
                      }}
                    />
                  </AppView>
                  <AppText
                    style={{
                      ...STYLE_GLOBAL.body1,
                      color: COLOR.TEXT_CONTENT,
                      marginTop: 5,
                    }}>
                    File 2
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </ScrollView>
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
  lineBold: {
    marginTop: 16,
    width: '100%',
    borderWidth: 5,
    borderColor: '#D2D2D2',
    opacity: 0.3,
  },
});
export default TransRoMoocScreen;
