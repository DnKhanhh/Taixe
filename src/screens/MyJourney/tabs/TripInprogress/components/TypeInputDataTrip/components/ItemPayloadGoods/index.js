import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
//components
import AppView from 'components/AppView';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import AppTextInputPicker from 'components/AppTextInputPicker';
//util
import useTranslate from 'hooks/useTranslate';
import {SVG_NAME} from 'assets/path';
//styles
import {getSize} from 'utils/responsive';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
//constants
import {UNIT_MASS} from './constants';
const ItemPayloadGoods = ({
  valuesInputGood,
  onChangeTextGood,
  setChooseUnit,
  valueNote,
  onChangeTextNote,
  chooseUnit,
}) => {
  const {t} = useTranslate();
  return (
    <AppView padding={getSize.m(16)} backgroundColor={COLOR.COLOR_BACKGROUND}>
      {/* Tải trọng trước nhận: */}
      <AppView row rowAlignCenter space={'between'} marginBottom={getSize.m(8)}>
        <AppText style={styles.textTitle}>
          {t('navigate:scenes.inputDataTrip.payloadBeforeReceiving')}
        </AppText>
        <AppText style={styles.textContent}>30.000 kg</AppText>
      </AppView>
      {/* Dự kiến nhận: */}
      <AppView row rowAlignCenter space={'between'} marginBottom={getSize.m(8)}>
        <AppText style={styles.textTitle}>
          {t('navigate:scenes.inputDataTrip.expectedToReceive')}
        </AppText>
        <AppText style={styles.textContent}>30.000 kg</AppText>
      </AppView>
      {/* Thực nhận: */}
      <AppView row rowAlignCenter space={'between'} marginBottom={getSize.m(8)}>
        <AppText style={styles.textTitle}>
          {t('navigate:scenes.inputDataTrip.actuallyReceived')}
        </AppText>
        <AppText style={styles.textContent}>-------- kg</AppText>
      </AppView>
      {/* Tải trọng sau nhận */}
      <AppView row rowAlignCenter space={'between'} marginBottom={getSize.m(8)}>
        <AppText style={styles.textTitle}>
          {t('navigate:scenes.inputDataTrip.postReceivePayload')}
        </AppText>
        <AppText style={styles.textTitleHeader}>30.000 kg</AppText>
      </AppView>
      <AppView marginVertical={getSize.m(12)}>
        <SVG_NAME.LINE_BOTTOM />
      </AppView>
      {/* thuc nhan */}
      <AppView marginBottom={getSize.m(8)}>
        <AppText style={styles.textBody2W6}>
          {t('navigate:scenes.inputDataTrip.actuallyReceived')}
        </AppText>
        <AppTextInputPicker
          placeholderTextInput={t('common:placeholder.plActuallyReceived')}
          containerStyle={{marginTop: getSize.m(8)}}
          // placeholderPicker={t('common:textContent.ton')}
          placeholderPicker="Đơn vị"
          isSelectOne={true}
          onPressIcon={() => {}}
          keyboardType="numeric"
          dataOptions={UNIT_MASS}
          onPressDataModal={value => {
            setChooseUnit(value);
          }}
          optionSelected={chooseUnit}
          valuesInput={valuesInputGood}
          onChangeText={onChangeTextGood}
        />
      </AppView>
      {/* Ghi chu */}
      <AppView marginBottom={getSize.m(8)}>
        <AppText style={styles.textBody2W6}>
          {t('common:textContent.note')}
        </AppText>
        <AppTextInput
          value={valueNote}
          onChangeText={onChangeTextNote}
          placeholder={t('common:textInput.hintNote')}
          containerStyle={{marginTop: getSize.m(8)}}
          multiline={true}
        />
      </AppView>
    </AppView>
  );
};
const styles = StyleSheet.create({
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
export default ItemPayloadGoods;
