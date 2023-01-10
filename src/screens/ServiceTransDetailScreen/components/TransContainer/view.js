import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppContainer from 'components/AppContainer';
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';

const TransContainerScreen = ({dataDetailTrip}) => {
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
              Dịch vụ vận chuyển Container rỗng
            </AppText>
          </AppView>

          <AppView style={{...styles.lineBold, borderWidth: 1, marginTop: 0}} />
          {dataDetailTrip &&
            dataDetailTrip?.container?.map((item, index) => {
              return (
                <AppView marginHorizontal={16} marginTop={16} key={index}>
                  <AppView rowAlignCenter marginBottom={8}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: COLOR.GRAY5,
                        flex: 0.25,
                      }}>
                      Loại thùng:
                    </AppText>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: COLOR.TEXT_CONTENT,
                        flex: 0.75,
                      }}>
                      {item?.feetType ?? 'default'}
                    </AppText>
                  </AppView>

                  <AppView rowAlignCenter marginBottom={8}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: COLOR.GRAY5,
                        flex: 0.25,
                      }}>
                      Số lượng:
                    </AppText>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: COLOR.TEXT_CONTENT,
                        flex: 0.75,
                      }}>
                      {item?.quantity ?? 'default'}
                    </AppText>
                  </AppView>

                  <AppView row marginBottom={8}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: COLOR.GRAY5,
                        flex: 0.25,
                      }}>
                      Số thùng:
                    </AppText>

                    <AppView
                      style={{flex: 0.75}}
                      rowAlignCenter
                      space={'around'}
                      backgroundColor={COLOR.DASH_BOARD_BACKGROUND}
                      padding={8}
                      flex={1}
                      borderRadius={8}
                      marginBottom={16}>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body1,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        #01
                      </AppText>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body1,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        51A-1234
                      </AppText>
                      <AppText
                        style={{
                          ...STYLE_GLOBAL.body1,
                          color: COLOR.TEXT_CONTENT,
                        }}>
                        Số seal: 12345678
                      </AppText>
                    </AppView>
                  </AppView>
                </AppView>
              );
            })}
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
export default TransContainerScreen;
