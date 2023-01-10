import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

//components
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import ContainerImageUpload from 'components/AppImage/ContainerImageUpload';
import AppImage from 'components/AppImage';

//util
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
//styles
import {getSize} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import AppModal from 'components/Modal/AppModal';
import AppUploadMultiImage from 'components/AppUploadMultiImage';

const ItemPapersReceiveGoods = ({imageChoose, setImageChoose}) => {
  const {t} = useTranslate();
  return (
    <AppView padding={getSize.m(16)} backgroundColor={COLOR.COLOR_BACKGROUND}>
      <AppView marginBottom={getSize.m(8)}>
        <AppView marginBottom={getSize.m(8)}>
          <AppText style={styles.textDelivery}>
            {t('navigate:scenes.inputDataTrip.deliveryPapers')}
          </AppText>
        </AppView>
        <AppUploadMultiImage
          imageChoose={imageChoose}
          setImageChoose={setImageChoose}
        />
      </AppView>
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
});
export default ItemPapersReceiveGoods;
