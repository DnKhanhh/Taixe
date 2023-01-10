import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import AppTextInput from 'components/AppTextInput';
import {COLOR} from 'utils/AppConst';
import {useIconResizeHOC} from 'hooks/useIconSvgResizeHOC';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import AppView from 'components/AppView';

const AppSearchAndFilter = ({
  onPressSearch,
  onPressIconFilter,
  modalFilter,
  placeholder,
  onSubmitSearch,
  disabledButtonSearch,
  styleContainer,
  styleTextInput,
  filter = true,
  checkResetFilter,
}) => {
  const {t} = useTranslate();
  const [searchKey, setSearchKey] = useState('');
  const typingTimeoutRef = useRef(null);
  const onSearch = useCallback(() => {
    onPressSearch?.(searchKey);
  }, [onPressSearch, searchKey]);

  const handleSearchTextChange = values => {
    setSearchKey(values);
    if (!onSubmitSearch) {
      return;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSubmitSearch?.(values);
    }, 500);
  };
  const handleOnPressFilter = () => {
    Keyboard.dismiss();
    onPressIconFilter?.();
  };

  useEffect(() => {
    return () => {
      setSearchKey(null);
    };
  }, []);
  const iconFilter = useIconResizeHOC(SVG_NAME.FILTER_BLUE, {s: 40});

  useEffect(() => {
    if (checkResetFilter) {
      setSearchKey(null);
    }
  }, [checkResetFilter]);

  return (
    <>
      <View style={[styleContainer, styles.viewSearch]}>
        <AppTextInput
          onSubmitEditing={onSearch}
          returnKeyType={'search'}
          containerStyle={[styles.containerTextInput, styleTextInput]}
          placeholder={placeholder || t('common:textInput.hintSearch')}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
          value={searchKey}
          onChangeText={handleSearchTextChange}
          iconLeft={
            <TouchableOpacity
              onPress={onSearch}
              disabled={disabledButtonSearch}>
              <SVG_NAME.SEARCH />
            </TouchableOpacity>
          }
        />
        {!filter ? null : (
          <AppView marginLeft={16}>
            <TouchableOpacity onPress={handleOnPressFilter}>
              {iconFilter}
            </TouchableOpacity>
          </AppView>
        )}
      </View>

      {modalFilter && modalFilter}
    </>
  );
};
const styles = StyleSheet.create({
  containerTextInput: {
    borderWidth: 1,
    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  viewSearch: {
    // backgroundColor: COLOR.COLOR_BACKGROUND,
    // paddingVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default React.memo(AppSearchAndFilter);
