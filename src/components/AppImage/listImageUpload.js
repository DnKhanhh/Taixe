import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AppImage from 'components/AppImage';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import {onImageLibraryPress} from 'utils/imagePicker';
import {uploadFilesSubmit} from 'appRedux/actions/otherActions';
import {useActions} from 'hooks/useActions';
import {useImagePicker} from 'hooks/useImagePicker';

const ListImageUpload = ({
  style,
  name,
  listImg = [],
  titleText,
  setFieldValue,
  disabled,
}) => {
  const {t} = useTranslate();
  const actions = useActions({
    uploadFilesSubmit,
  });
  const picker = useImagePicker();
  const [listImageUrl, setListImageUrl] = useState(listImg);
  const handlePressUpload = index => {
    picker?.onOpenModal((response, _errorImage) => {
      if (!_errorImage) {
        const imageFileUrl = response;
        if (index < listImageUrl.length) {
          let newListImageUrl = [...listImageUrl];
          newListImageUrl[index] = imageFileUrl;
          setListImageUrl(newListImageUrl);
          setFieldValue(name, newListImageUrl);
        } else {
          let newListImageUrl = [...listImageUrl, imageFileUrl];
          setListImageUrl(newListImageUrl);
          setFieldValue(name, newListImageUrl);
        }
      }
    });
  };
  return (
    <View style={[styles.container, style]}>
      {listImageUrl.length > 0 ? (
        <View style={styles.listImg}>
          {listImageUrl?.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.borderImage}>
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={() => handlePressUpload(index)}>
                    <AppImage source={{uri: item}} style={styles.imageFile} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          {listImageUrl.length < 5 && (
            <View style={styles.borderImage}>
              <TouchableOpacity
                disabled={disabled}
                style={styles.uploadImageStyle}
                onPress={() =>
                  handlePressUpload(listImageUrl[listImageUrl.length + 1])
                }>
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
          )}
        </View>
      ) : (
        <View style={styles.borderImage}>
          <TouchableOpacity
            style={styles.uploadImageStyle}
            onPress={() => handlePressUpload(0)}>
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
      )}
      {titleText && <AppText style={styles.textImage}>{titleText}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  listImg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  borderImage: {
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: 8,
    borderRadius: 16,
    borderColor: 'rgba(0.57, 0.62, 0.67, 0.32)',
    marginRight: 10,
    marginBottom: 10,
  },
  imageFile: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  uploadImageStyle: {
    backgroundColor: COLOR.COLOR_BORDER,
    width: 90,
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textImage: [
    STYLE_GLOBAL.body2,
    STYLE_GLOBAL.color_textContent,
    {marginTop: 8, textAlign: 'center'},
  ],
  imageAvatar: {
    marginTop: 8,
    width: 152,
    height: 152,
    resizeMode: 'contain',
    borderRadius: 76,
  },
  buttonUploadAvatarImage: {
    width: 36,
    height: 36,
    position: 'absolute',
    backgroundColor: COLOR.COLOR_SECONDARY,
    bottom: 5,
    right: 5,
    borderRadius: 100,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImageAvatarStyle: {
    backgroundColor: COLOR.COLOR_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  textImageUpload: {color: COLOR.TEXT_IMAGE_UPLOAD, marginTop: 4},
});

export default React.memo(ListImageUpload);
