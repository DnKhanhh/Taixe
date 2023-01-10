import React from 'react';
import AppModal from 'components/Modal/AppModal';
import {Text, Actionsheet, Center, HStack, useDisclose} from 'native-base';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {t} from 'i18next';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {getSize} from 'utils/responsive';
import {COLOR} from 'utils/AppConst';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {onImageLibraryPress, openCamera} from 'utils/imagePicker';
import {uploadFilesSubmit} from 'appRedux/actions/otherActions';
import {useActions} from 'hooks/useActions';

const ImagePickerContext = React.createContext({});

const AppPickerImageProvider = React.memo(({children}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const areaInsets = useSafeAreaInsets();
  const actions = useActions({
    uploadFilesSubmit,
  });
  let responseCallback;
  let responseErrorCallback;
  /**
   * This function is handle take picture and upload image to server
   * */
  const handleTakePicture = React.useCallback(() => {
    onClose?.();
    openCamera((error, data) => {
      if (error) {
        return;
      }

      actions.uploadFilesSubmit({
        imageFile: data,
        callback: (_error, response) => {
          if (__DEV__) {
            console.log('response api Upload Image', response);
          }

          if (!_error) {
            const imageUrl = response?.data?.url || '';
            responseCallback?.(imageUrl);
          } else {
            responseErrorCallback?.(_error);
          }
        },
      });
    });
  }, []);

  const handleSelectPhotos = React.useCallback(() => {
    // must close modal
    onClose?.();

    // handle open Photos
    onImageLibraryPress((error, data) => {
      if (error) {
        return;
      }

      actions.uploadFilesSubmit({
        imageFile: data,
        callback: (_error, response) => {
          if (!_error) {
            const imageUrl = response?.data?.url || '';
            responseCallback?.(imageUrl);
          }
        },
      });
    });
  }, []);

  /**
   * This function is handle open modal select
   * @param {function} callback
   * */
  const onOpenModal = React.useCallback((callback, errorCallback) => {
    onOpen();
    responseCallback = callback;
    responseErrorCallback = errorCallback;
  }, []);

  return (
    <ImagePickerContext.Provider
      value={{
        onOpenModal,
      }}>
      {children}

      <AppModal
        showAppModal={isOpen}
        setShowAppModal={onClose}
        containerStyle={{
          minHeight: 200,
          paddingBottom: areaInsets.bottom,
        }}
        titleModal={t('common:button.option')}>
        <Actionsheet.Item
          _pressed={{
            backgroundColor: 'gray.50',
          }}
          _light={{
            backgroundColor: 'white',
          }}
          onPress={handleTakePicture}>
          <HStack space={'3'} alignItems={'center'}>
            <Center
              style={{
                width: getSize.s(30),
              }}>
              <FontAwesome
                name="camera"
                color={COLOR.COLOR_PRIMARY}
                size={getSize.m(18)}
              />
            </Center>

            <Text
              fontWeight="semibold"
              style={{
                ...STYLE_GLOBAL.body1,
              }}
              allowFontScaling={false}
              >
              {t('common:button.takePicture')}
            </Text>
          </HStack>
        </Actionsheet.Item>

        <Actionsheet.Item
          _pressed={{
            backgroundColor: 'gray.50',
          }}
          _light={{
            backgroundColor: 'white',
          }}
          onPress={handleSelectPhotos}>
          <HStack space={'3'} alignItems={'center'}>
            <Center
              style={{
                width: getSize.s(30),
              }}>
              <FontAwesome
                name="picture-o"
                color={COLOR.COLOR_PRIMARY}
                size={getSize.m(18)}
              />
            </Center>

            <Text
              fontWeight="semibold"
              style={{
                ...STYLE_GLOBAL.body1,
              }}
              allowFontScaling={false}
              >
              {t('common:button.selectPhotos')}
            </Text>
          </HStack>
        </Actionsheet.Item>

        <Actionsheet.Item
          _pressed={{
            backgroundColor: 'gray.50',
          }}
          _light={{
            backgroundColor: 'white',
          }}
          onPress={onClose}>
          <HStack space={'3'} alignItems={'center'}>
            <Center
              style={{
                width: getSize.s(30),
              }}>
              <FontAwesome
                name="times"
                color={COLOR.POP_UP_DANGER}
                size={getSize.m(18)}
              />
            </Center>

            <Text
              color={'danger.600'}
              fontWeight="semibold"
              style={{
                ...STYLE_GLOBAL.body1,
              }}
              allowFontScaling={false}
              >
              {t('common:modalbox.cancel')}
            </Text>
          </HStack>
        </Actionsheet.Item>
      </AppModal>
    </ImagePickerContext.Provider>
  );
});

function useImagePicker() {
  const context = React.useContext(ImagePickerContext);

  return context;
}

export {AppPickerImageProvider, useImagePicker};
