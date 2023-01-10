import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import {openSingleDocumentPicker} from 'utils/DocumentPicker';
import {openURL} from 'utils/communications';
import {onImageLibraryPress} from 'utils/imagePicker';

//component
import AppView from 'components/AppView';
import AppImage from 'components/AppImage';
import AppText from 'components/AppText';
import AppModalDialog from 'components/Modal/AppModalDialog';
import AppModal from 'components/Modal/AppModal';

//actions
import {uploadPDFSubmit, deletePDFSubmit} from 'appRedux/actions/otherActions';
import {useActions} from 'hooks/useActions';
import {getSize} from 'hooks/useIconSvgResizeHOC';

const DATA_OPTIONS = [
  {
    id: 1,
    code: 'upload_file_pdf',
    title: 'common:modalbox.uploadFilePdf',
    // icon: <SVG_NAME.FILE_PLUS />,
  },
  {
    id: 2,
    code: 'upload_image',
    title: 'common:modalbox.uploadImage',
    icon: <SVG_NAME.IMAGE_PLUS />,
  },
  {
    id: 3,
    code: 'cancel_upload',
    title: 'common:modalbox.cancel',
    icon: <SVG_NAME.CLOSE_OPTION />,
  },
];

const ListDocumentUpload = ({
  listPdf = [],
  styleContainer,
  titleText,
  setFieldValue,
  disabled,
  name,
  error,
  touched,
  messageError,
  values,
  handleSubmit,
  keyWordFieldUpload,
  orderDataDraft,
  titleButton,
}) => {
  const {t} = useTranslate();
  const [listPdfUrl, setListPdfUrl] = useState(
    orderDataDraft?.orderDocumentFiles?.map(item => item?.document) || [],
  );
  const actions = useActions({
    uploadPDFSubmit,
    deletePDFSubmit,
  });
  const [showModalSelectOption, setShowModalSelectOption] = useState(false);
  const handleDeleteFilePdf = useCallback(
    (item, index) => {
      console.log('item delete', item);
      console.log('indexFilePdf delete', index);
      const options = {
        callback: res => {
          console.log('res delete file pdf', res);
          const temp = [...listPdfUrl];
          temp.splice(index, 1);
          setListPdfUrl(temp);
          setShowModalDeleteOrderRoutes(false);
          setCheckHasUpLoaded(true);
        },
        id: item?.id,
      };
      actions.deletePDFSubmit({...options});
    },
    [actions, listPdfUrl],
  );

  const handlePressUploadImage = useCallback(() => {
    onImageLibraryPress((error, data) => {
      console.log('LOG images:', 'error?', error, ', data:', data);
      if (error) {
        return;
      }
      const options = {
        callback: res => {
          setListPdfUrl([...listPdfUrl, res]);
          setCheckHasUpLoaded(true);
        },
        pdfFile: data,
      };
      actions.uploadPDFSubmit({...options});
    });
  }, [actions, listPdfUrl]);

  const handleOpenDocumentPicker = useCallback(() => {
    openSingleDocumentPicker(data => {
      const options = {
        callback: res => {
          setListPdfUrl([...listPdfUrl, res]);
          setCheckHasUpLoaded(true);
        },
        pdfFile: {assets: [data]},
      };
      actions.uploadPDFSubmit({...options});
    });
  }, [actions, listPdfUrl]);

  const RenderItem = ({item, index, onPressDeleteItem}) => {
    return (
      <>
        <AppView style={{marginBottom: getSize.m(16)}} />
        <AppView style={styles.itemContainer}>
          <AppView row alignItems={'center'}>
            <SVG_NAME.PAPERCLIP />
            <AppView flex>
              <TouchableOpacity onPress={() => openURL(item.url)}>
                <AppText numberOfLines={1} style={styles.txtFileName}>
                  {item?.name}
                </AppText>
              </TouchableOpacity>
            </AppView>
          </AppView>
          <AppView>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={onPressDeleteItem}>
              <SVG_NAME.TRASH_GREY />
            </TouchableOpacity>
          </AppView>
        </AppView>
      </>
    );
  };

  // const handleShowToast = () => {
  //   Toast.show({
  //     type: 'danger',
  //     props: {
  //       title: t('common:toast.errorPdf'),
  //     },
  //   });
  // };
  const [showModalDeleteOrderRoutes, setShowModalDeleteOrderRoutes] =
    useState(false);
  const [filePdfDelete, setFilePdfDelete] = useState(false);
  const [indexFilePdf, setIndexFilePdf] = useState(null);
  const [checkHasUpLoaded, setCheckHasUpLoaded] = useState(false);

  console.log('indexFilePdf', indexFilePdf);
  useEffect(() => {
    return () => {
      setShowModalDeleteOrderRoutes(false);
      setCheckHasUpLoaded(false);
    };
  }, []);

  // useEffect(() => {
  //   if (!checkHasUpLoaded && listPdfUrl.length > 0) {
  //     setFieldValue(
  //       keyWordFieldUpload,
  //       listPdfUrl.map(item => ({
  //         documentId: item?.id,
  //       })),
  //     );
  //   } else {
  //     setFieldValue(keyWordFieldUpload, []);
  //   }
  // }, [listPdfUrl, setFieldValue, checkHasUpLoaded]);

  useEffect(() => {
    if (checkHasUpLoaded && listPdfUrl.length > 0) {
      setFieldValue(
        keyWordFieldUpload,
        listPdfUrl.map(item => ({
          documentId: item?.id,
        })),
      );
    } else if (checkHasUpLoaded && listPdfUrl.length == 0) {
      setFieldValue(keyWordFieldUpload, []);
    }
  }, [listPdfUrl, setFieldValue, checkHasUpLoaded]);

  const onPressItemModalOption = item => {
    switch (item.code) {
      case 'upload_file_pdf':
        handleOpenDocumentPicker();
        break;
      case 'upload_image':
        handlePressUploadImage();
        break;
      case 'cancel_upload':
        setShowModalSelectOption(false);
        break;
      default:
        console.log('not Select Options');
    }
  };

  return (
    <AppView style={[styles.container, styleContainer]}>
      <TouchableOpacity
        disabled={listPdfUrl.length > 9 ? true : false}
        style={styles.buttonUploadFile}
        onPress={() => setShowModalSelectOption(true)}>
        <AppView
          flex
          marginHorizontal={getSize.m(8)}
          row
          alignItems="center"
          justifyContent="center">
          <SVG_NAME.UP_LOAD />
          <AppText
            style={{
              ...STYLE_GLOBAL.body2,
              color: COLOR.COLOR_PRIMARY,
              marginLeft: getSize.m(8),
            }}>
            {titleButton || t('common:createOrder.title.chooseFileLicense')}
          </AppText>
        </AppView>
      </TouchableOpacity>
      {/*  */}
      {listPdfUrl.map((item, index) => {
        return (
          <RenderItem
            key={index}
            item={item}
            index={index}
            onPressDeleteItem={() => {
              console.log('index item click', index);
              setShowModalDeleteOrderRoutes(true);
              setFilePdfDelete(item);
              setIndexFilePdf(index);
            }}
          />
        );
      })}

      <AppModal
        titleModal={t('common:modalbox.modalTitleOptions')}
        showAppModal={showModalSelectOption}
        setShowAppModal={setShowModalSelectOption}
        dataModal={DATA_OPTIONS}
        onPressDataModal={item => {
          // console.log(item);
          setShowModalSelectOption(false);
          onPressItemModalOption(item);
        }}
      />

      <AppModalDialog
        type={'danger'}
        titleModal={t('common:modalbox.titleDeleteFilePdfLicense')}
        showModalDialog={showModalDeleteOrderRoutes}
        contentModal={t('common:modalbox.contentDeleteFilePdfLicense')}
        setShowModalDialog={setShowModalDeleteOrderRoutes}
        titleConfirm={t('common:button.confirm')}
        titleCancel={t('common:modalbox.cancel')}
        onPressConfirm={() => handleDeleteFilePdf(filePdfDelete, indexFilePdf)}
      />
    </AppView>
  );
};

export default React.memo(ListDocumentUpload);

const styles = StyleSheet.create({
  itemContainer: {
    padding: getSize.m(12),
    paddingRight: getSize.m(24),
    borderRadius: getSize.m(8),
    height: getSize.v(45),
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtFileName: {
    marginLeft: getSize.m(8),
  },
  buttonDelete: {
    paddingVertical: 10,
  },
  buttonUploadFile: {
    width: getSize.m(157),
    height: getSize.m(29),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR.COLOR_PRIMARY,
  },
});
