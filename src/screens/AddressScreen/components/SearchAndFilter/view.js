import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AppTextInput from 'components/AppTextInput';
import {COLOR} from 'utils/AppConst';
import {SVG_NAME} from 'assets/path';
import useTranslate from 'hooks/useTranslate';
import AppView from 'components/AppView';

const SearchAndFilter = ({onPressSearch, onPressIconFilter, modalFilter}) => {
  const {t} = useTranslate();
  const [searchKey, setSearchKey] = useState('');
  const onSearch = useCallback(() => {
    onPressSearch(searchKey);
  }, [onPressSearch, searchKey]);
  useEffect(() => {
    return () => {
      setSearchKey(null);
    };
  }, []);

  return (
    <>
      <View style={styles.viewSearch}>
        <AppTextInput
          onSubmitEditing={onSearch}
          returnKeyType={'search'}
          containerStyle={styles.containerTextInput}
          placeholder={t('common:textInput.hintSearch')}
          placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
          value={searchKey}
          iconLeft={
            <TouchableOpacity onPress={onSearch}>
              <SVG_NAME.SEARCH />
            </TouchableOpacity>
          }
          onChangeText={setSearchKey}
        />
        <AppView marginHorizontal={16}>
          <TouchableOpacity onPress={onPressIconFilter}>
            <SVG_NAME.FILTER_BLUE />
          </TouchableOpacity>
        </AppView>
      </View>
      {modalFilter && modalFilter}
    </>
  );
};
const styles = StyleSheet.create({
  containerTextInput: {
    borderWidth: 1,
    borderColor: COLOR.COLOR_BORDER_TEXT_INPUT,
    backgroundColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT,
    flex: 1,
  },
  viewSearch: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default React.memo(SearchAndFilter);
