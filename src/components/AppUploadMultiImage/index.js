import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

//components
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppImage from 'components/AppImage';

//util
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
//styles
import {getSize} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import ImagePicker from 'react-native-image-crop-picker';

const AppUploadMultiImage = ({
  imageChoose,
  // setImageChoose,
  setFieldValue = undefined,
}) => {
  const {t} = useTranslate();
  // console.log('image chooose final', imageChoose);
  const [visible, setVisible] = useState(false);
  const chooseImage = () => {
    ImagePicker.openPicker({
      quality: 0.8,
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      multiple: true,
    })
      .then(image => {
        const num = [];
        for (let i = 0; i < image.length; i++) {
          num.push({
            uri: image[i].path,
            type: image[i].mime,
            name: 'image' + Date.now(),
          });
        }
        // setImageChoose(num);
        setFieldValue('files', num);
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      quality: 0.8,
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
    })
      .then(image => {
        const num = [];
        for (let i = 0; i < 1; i++) {
          num.push({
            uri: image.path,
            type: image.mime,
            name: 'image' + Date.now(),
          });
        }
        setFieldValue('files', num);
        // setImageChoose(num);
      })
      .finally(() => {
        setVisible(false);
      });
  };
  return (
    <AppView backgroundColor={COLOR.COLOR_BACKGROUND}>
      <AppView marginBottom={getSize.m(8)} rowAlignCenter wrap>
        <View style={styles.borderImage}>
          <TouchableOpacity
            style={styles.uploadImageStyle}
            onPress={() => setVisible(true)}>
            <SVG_NAME.CAMERA />
            <AppText
              style={[
                STYLE_GLOBAL.body2,
                STYLE_GLOBAL.weight600,
                styles.textImageUpload,
              ]}>
              {t('common:button.uploadImage')}
            </AppText>
          </TouchableOpacity>
        </View>
        <AppView rowAlignCenter wrap marginTop={getSize.m(10)}>
          {imageChoose &&
            imageChoose.map((item, index) => {
              return (
                <AppView
                  key={index}
                  padding={getSize.m(5)}
                  borderColor={COLOR.TEXT_IMAGE_UPLOAD}
                  borderWidth={getSize.m(1)}
                  borderStyle={'dashed'}
                  marginRight={getSize.m(12)}
                  borderRadius={getSize.m(8)}>
                  <AppImage
                    source={
                      item?.uri || item?.url
                        ? {uri: item?.uri || item?.url}
                        : require('assets/images/dashboard.png')
                    }
                    style={{
                      width: getSize.s(80),
                      height: getSize.s(80),
                      borderRadius: getSize.m(8),
                    }}
                  />
                </AppView>
              );
            })}
        </AppView>
      </AppView>
      <AppModal
        iconClose={<SVG_NAME.ICON_CLOSE />}
        titleModal={'Tùy chọn'}
        setShowAppModal={setVisible}
        showAppModal={visible}>
        <AppView padding={getSize.m(16)}>
          <TouchableOpacity
            onPress={() => {
              chooseImage();
            }}>
            <AppView rowAlignCenter>
              <SVG_NAME.ICON_NOT_RECEIVE />
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  marginLeft: getSize.m(24),
                }}>
                Từ thư viện ảnh
              </AppText>
            </AppView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openCamera();
            }}>
            <AppView rowAlignCenter paddingTop={getSize.m(24)}>
            <SVG_NAME.CAMERA />
              <AppText
                style={{
                  ...STYLE_GLOBAL.body1,
                  color: COLOR.TEXT_CONTENT,
                  marginLeft: getSize.m(24),
                }}>
                Từ máy ảnh
              </AppText>
            </AppView>
          </TouchableOpacity>
        </AppView>
      </AppModal>
    </AppView>
  );
};
const styles = StyleSheet.create({
  textDelivery: [
    STYLE_GLOBAL.body1,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],
  textTitleHeader: [
    STYLE_GLOBAL.subTitle1,
    STYLE_GLOBAL.weight700,
    {color: COLOR.BLUE_7},
  ],
  textTitle: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textGrey],
  textContent: [STYLE_GLOBAL.body1, STYLE_GLOBAL.color_textContent],
  textBody2W6: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.weight600,
    STYLE_GLOBAL.color_textContent,
  ],
  borderImage: {
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: getSize.m(8),
    borderRadius: getSize.m(16),
    borderColor: 'rgba(0.57, 0.62, 0.67, 0.32)',
    marginRight: getSize.m(10),
    marginBottom: getSize.m(10),
  },
  uploadImageStyle: {
    backgroundColor: COLOR.COLOR_BORDER,
    width: getSize.s(90),
    height: getSize.m(90),
    borderRadius: getSize.m(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textImageUpload: {color: COLOR.TEXT_IMAGE_UPLOAD, marginTop: getSize.m(4)},
});
export default AppUploadMultiImage;
