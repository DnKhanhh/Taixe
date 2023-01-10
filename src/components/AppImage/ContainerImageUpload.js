import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
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

const ContainerImageUpload = ({
  name,
  style,
  uri,
  titleText,
  isAvatar = false,
  placeholder,
  setFieldValue,
  callback,
  isPickPhoto = true,
  widthContainer = 152,
  widthContainerButtonUpload = 36,
  disabled,
  errors,
  error,
  isCropped,
  required,
}) => {
  const {t} = useTranslate();
  const actions = useActions({
    uploadFilesSubmit,
  });
  const [imageUrl, setImageUrl] = useState(
    uri !== null && uri !== '' ? uri : null,
  );

  //check cho nay
  // console.log('imageUrl: ', imageUrl);

  useEffect(() => {
    setImageUrl(uri !== null && uri !== '' ? uri : null);
    return () => {};
  }, [uri]);

  const handlePressUpload = () => {
    onImageLibraryPress((error, data) => {
      console.log('LOG images:', 'error?', error, ', data:', data);
      if (error) {
        return;
      }
      actions.uploadFilesSubmit({
        imageFile: data,
        callback: (_errorImage, response) => {
          console.log('response api Upload Image', response.data);
          if (!_errorImage) {
            const imageFileUrl = response.data.url;
            setImageUrl(imageFileUrl);
            setFieldValue(name, imageFileUrl);
            callback && callback(imageFileUrl);
          }
        },
      });
    });
  };

  const picker = useImagePicker();

  const onOpenModal = React.useCallback(() => {
    Keyboard.dismiss();
    picker?.onOpenModal(
      response => {
        if (response) {
          console.log('response: ', response);
          setImageUrl(response);
          setFieldValue(name, response);
        }
      },
      err => {
        console.log('err: ', err);
      },
      isCropped,
      isAvatar,
    );
  }, [name, picker, setFieldValue, isCropped]);

  return (
    <View style={style}>
      {isAvatar ? (
        <View>
          {imageUrl ? (
            <>
              <View
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  padding: 4,
                  borderRadius: 50,
                  borderColor: COLOR.COLOR_BORDER,
                }}>
                <AppImage
                  source={{uri: imageUrl}}
                  style={[
                    styles.imageAvatar,
                    {
                      width: widthContainer - 4,
                      height: widthContainer - 4,
                    },
                  ]}
                />
              </View>
              {!isPickPhoto ? null : (
                <View
                  style={[
                    styles.buttonUploadAvatarImage,
                    {
                      width: widthContainerButtonUpload,
                      height: widthContainerButtonUpload,
                    },
                    errors && {borderColor: 'red'},
                  ]}>
                  <TouchableOpacity onPress={onOpenModal} disabled={disabled}>
                    <SVG_NAME.CAMERA_AVATAR />
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : !isPickPhoto ? null : (
            <View
              style={[
                styles.borderAvatar,
                error
                  ? {borderColor: COLOR.STATUS_ERROR_BORDER}
                  : {borderColor: COLOR.COLOR_BORDER},
              ]}>
              <TouchableOpacity
                style={[
                  styles.uploadImageAvatarStyle,
                  {width: widthContainer},
                  disabled && {
                    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
                  },
                ]}
                onPress={onOpenModal}
                disabled={disabled}>
                <SVG_NAME.CAMERA />
                <AppText
                  style={[
                    STYLE_GLOBAL.body2,
                    STYLE_GLOBAL.weight600,
                    styles.textImageUpload,
                  ]}>
                  {t('common:button.uploadImage')}
                  {required && <AppText style={styles.required}>*</AppText>}
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View>
          <View style={[styles.borderImage, errors && {borderColor: 'red'}]}>
            {imageUrl !== null ? (
              <TouchableOpacity onPress={onOpenModal} disabled={disabled}>
                <AppImage source={{uri: imageUrl}} style={styles.imageFile} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.uploadImageStyle,
                  disabled && {
                    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED,
                  },
                ]}
                onPress={onOpenModal}
                disabled={disabled}>
                <SVG_NAME.CAMERA />
                <AppText
                  style={[
                    STYLE_GLOBAL.body2,
                    STYLE_GLOBAL.weight600,
                    styles.textImageUpload,
                  ]}>
                  {placeholder || t('common:button.uploadImage')}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
          {titleText && <AppText style={styles.textImage}>{titleText}</AppText>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  borderImage: {
    borderStyle: 'dashed',
    borderWidth: 1,
    padding: 8,
    borderRadius: 16,
    borderColor: COLOR.COLOR_BORDER,
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
  borderAvatar: {
    borderWidth: 1,
    borderStyle: 'dashed',
    // borderColor: COLOR.COLOR_BORDER,
    borderRadius: 152,
    padding: 4,
  },
  imageAvatar: {
    width: 148,
    height: 148,
    resizeMode: 'contain',
    borderRadius: 76,
  },
  buttonUploadAvatarImage: {
    width: 36,
    height: 36,
    position: 'absolute',
    backgroundColor: COLOR.COLOR_SECONDARY,
    bottom: 2,
    right: 2,
    borderRadius: 100,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImageAvatarStyle: {
    backgroundColor: COLOR.COLOR_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 76,
  },
  textImageUpload: {color: COLOR.TEXT_IMAGE_UPLOAD, marginTop: 4},
  required: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
    color: '#DA294A',
  },
});

export default React.memo(ContainerImageUpload);
