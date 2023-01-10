/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {View, TouchableOpacity, Keyboard, TextInput} from 'react-native';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import styles from './styles';
import {SVG_NAME} from 'assets/path';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import AppView from 'components/AppView';
function Counter(props) {
  /*
        limit amount min max
    */
  const {
    amount = 0,
    minAmount = 1,
    maxAmount = 9999,
    updateAmount,
    valueType,
    error,
    style,
    messageError,
    disabled,
    errorTextStyle,
    placeHolder,
    whiteBack = false,
  } = props;
  const [changeAmount, setChangeAmount] = useState(amount);
  /*
        pass props to parents
    */
  const applyAmount = useCallback(
    amountUpdate => {
      updateAmount?.(valueType, amountUpdate);
    },
    [updateAmount, valueType],
  );
  useEffect(() => {
    if (amount !== changeAmount) {
      setChangeAmount(amount);
    }
  }, [amount, changeAmount]);
  /*
        update amount
    */
  const onPressUpdateAmount = useCallback(
    type => () => {
      Keyboard.dismiss();

      switch (type) {
        case 'desc':
          if (Number(changeAmount || '0') - 1 < minAmount) {
            return;
          }
          applyAmount(Number(changeAmount || '0') - 1);
          break;
        case 'asc':
          if (Number(changeAmount || '0') + 1 > maxAmount) {
            return;
          }

          applyAmount(Number(changeAmount || '0') + 1);
          break;
        default:
          break;
      }
    },
    [changeAmount, minAmount, applyAmount, maxAmount],
  );
  const placeHolderColor = {
    color: '#A0A1A7',
  };
  return (
    <AppView>
      <AppView
        style={[
          styles.container,
          style,
          {
            backgroundColor: disabled
              ? COLOR.COLOR_BACKGROUND_TEXT_INPUT_DISABLED
              : whiteBack
              ? COLOR.COLOR_BACKGROUND
              : COLOR.COLOR_BACKGROUND_TEXT_INPUT,
          },
          error && {borderColor: COLOR.STATUS_ERROR_BORDER},
        ]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={disabled ? () => {} : onPressUpdateAmount('desc')}
            disabled={amount === 0 || disabled}>
            <View style={styles.iconContainer}>
              <SVG_NAME.MINUS />
            </View>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.amountContainer}>
            <TextInput
              style={{
                flex: 1,
                color: COLOR.TEXT_CONTENT,
                width: '100%',
                textAlign: 'center',
                fontSize: getSize.m(14),
                lineHeight: getSize.m(14) * 1.3,
              }}
              placeholder={placeHolder || ''}
              placeholderTextColor={placeHolderColor.color}
              value={(changeAmount || '').toString()}
              keyboardType="numeric"
              editable={!disabled}
              maxLength={12}
              selectTextOnFocus
              onChangeText={value => {
                let valueTemp = value?.replace(/\,/g, '.') || minAmount;
                const regex = /(^[0-9]+$)|(^[0-9]*(\,|\.)[0-9]{0,1}$)/g;
                if (regex.test(valueTemp)) {
                  if (Number(valueTemp) < minAmount) {
                    applyAmount(minAmount);
                  } else if (Number(valueTemp) < maxAmount) {
                    applyAmount(valueTemp);
                  }
                }
              }}
            />
          </View>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={disabled ? () => {} : onPressUpdateAmount('asc')}
            disabled={disabled}>
            <View style={styles.iconContainer}>
              <SVG_NAME.PLUS_COUNTER />
            </View>
          </TouchableOpacity>
        </View>
      </AppView>
      {error && (
        <AppText style={[styles.errorText, errorTextStyle]}>
          {messageError || ''}
        </AppText>
      )}
    </AppView>
  );
}

export default React.memo(Counter);
