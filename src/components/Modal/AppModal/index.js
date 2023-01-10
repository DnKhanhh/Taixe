/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Portal} from 'react-native-portalize';
import {View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import styles from './styles';
import ModalBox from 'react-native-modalbox';
import {SVG_NAME} from 'assets/path';
import AppText from 'components/AppText';
import AppTextInput from 'components/AppTextInput';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import useTranslate from 'hooks/useTranslate';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getSize} from 'hooks/useIconSvgResizeHOC';
import {Keyboard} from 'react-native';
import AppView from 'components/AppView';

function AppModal({
  iconTitle,
  titleModal,
  timeOutModal = undefined,
  containerStyle,
  children,
  showAppModal = false,
  setShowAppModal,
  closeModal,
  dataModal = undefined,
  onPressDataModal,
  maxHeight = '90%',
  textTitleModalStyle,
  borderTopWidth = true,
  containerSearch = false,
  placeholderSearch,
  iconClose = <SVG_NAME.CLOSE_ICON />,
  onPressSearch,
  onSubmitSearch,
  height,
  loadMoreModal,
  keyWordItem = '',
  initialSelectedIdValues,
  initialSelectedNameValues,
  iconLeft,
  scroll = false,
  keyValue,
  isFullscreen = false,
  isShowItemSeparatorComponent = false,
  swipeToClose = true,
  dividerHeader = false,
  onClosed = undefined,
  isLocalSearch = false,
  ...otherProps
}) {
  const {t} = useTranslate();
  const [scrolled, setScrolled] = useState(false);
  //search input
  const [searchKey, setSearchKey] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    setSelectedItem({
      [keyWordItem]: initialSelectedIdValues,
      name: initialSelectedNameValues,
    });
    return () => {};
  }, [initialSelectedIdValues, initialSelectedNameValues, keyWordItem]);
  const typingTimeoutRef = useRef(null);

  const onSearch = useCallback(() => {
    Keyboard.dismiss();
    onPressSearch?.(searchKey);
  }, [onPressSearch, searchKey]);

  const handleSearchTextChange = values => {
    setSearchKey?.(values);
    if (!onSubmitSearch) {
      return;
    }
    if (!isLocalSearch) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onSubmitSearch?.(values);
      }, 500);
    } else {
      onSubmitSearch?.(values);
    }
  };

  useEffect(() => {
    return () => {
      setSearchKey(null);
    };
  }, []);

  useEffect(() => {
    if (scrolled) {
      loadMoreModal?.();
    }
    return () => {};
  }, [scrolled]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.containerItem,
          keyWordItem !== ''
            ? selectedItem?.[keyWordItem] == item?.[keyWordItem] && {
                backgroundColor: '#E8F5FF',
              }
            : null,
        ]}
        onPress={() => {
          onPressDataModal(item);
          setSelectedItem(item);
        }}
        disabled={
          keyWordItem !== ''
            ? selectedItem?.[keyWordItem] == item?.[keyWordItem]
            : false
        }>
        {item.icon && <View style={{marginRight: 18}}>{item.icon}</View>}
        <AppText
          style={[
            STYLE_GLOBAL.body1,
            STYLE_GLOBAL.color_textContent,
            STYLE_GLOBAL.flex1,
            item.code === 'delete' && {color: COLOR.STATUS_ERROR_BORDER},
          ]}>
          {(item.title ? t(item.title) : t(item.name)) ||
            (keyValue && item?.[keyValue])}
        </AppText>

        {keyWordItem !== ''
          ? selectedItem?.[keyWordItem] == item?.[keyWordItem] && (
              <SVG_NAME.CHECK style={{marginRight: 16}} />
            )
          : null}
      </TouchableOpacity>
    );
  };
  function EmptyList() {
    return (
      <View style={styles.emptyListStyle}>
        <AppText>{t('common:noData')}</AppText>
      </View>
    );
  }

  const renderItemSeparatorComponent = () =>
    !isShowItemSeparatorComponent ? null : (
      <AppView borderTopWidth={1} borderColor={COLOR.GRAY} />
    );

  const getDataList = React.useMemo(() => {
    if (!isLocalSearch) {
      return dataModal || [];
    }

    return (dataModal || [])?.filter(item => {
      return item.name?.unUnicodeMatch?.(searchKey || '');
    });
  }, [dataModal, isLocalSearch, searchKey]);

  return (
    <Portal>
      <ModalBox
        style={[
          styles.viewModal,
          containerStyle,
          {maxHeight, height},
          containerSearch && {height: '80%'},
          isFullscreen && {paddingBottom: 0},
        ]}
        position="bottom"
        isOpen={showAppModal}
        onClosed={() => {
          console.log('aaed');
          setShowAppModal?.(false);
          onClosed?.();
          setSearchKey?.(null);
          if (timeOutModal) timeOutModal();
        }}
        backdropOpacity={0.3}
        swipeToClose={swipeToClose}
        backButtonClose={true}
        {...otherProps}>
        <View>
          {titleModal ? (
            iconLeft ? (
              <>
                <View
                  style={[
                    styles.titleModalContainer,
                    dividerHeader && {
                      borderBottomWidth: 1,
                      borderColor: COLOR.COLOR_BORDER,
                    },
                  ]}>
                  <TouchableOpacity onPress={() => setShowAppModal(false)}>
                    {iconLeft}
                  </TouchableOpacity>
                  <AppText
                    style={[
                      STYLE_GLOBAL.subTitle2,
                      STYLE_GLOBAL.weight700,
                      STYLE_GLOBAL.color_textContent,
                      textTitleModalStyle,
                    ]}>
                    {titleModal}
                  </AppText>
                  <View style={{height: 24, aspectRatio: 1}} />
                </View>
              </>
            ) : (
              <>
                <View style={[styles.titleModalContainer]}>
                  <View style={{height: 24, aspectRatio: 1}} />
                  <AppText
                    style={[
                      STYLE_GLOBAL.subTitle2,
                      STYLE_GLOBAL.weight700,
                      STYLE_GLOBAL.color_textContent,
                      textTitleModalStyle,
                    ]}>
                    {titleModal}
                  </AppText>

                  <TouchableOpacity onPress={() => setShowAppModal(false)}>
                    {iconClose}
                  </TouchableOpacity>
                </View>
                {borderTopWidth ? (
                  <View
                    style={{borderTopWidth: 1, borderColor: COLOR.COLOR_BORDER}}
                  />
                ) : null}
              </>
            )
          ) : (
            <View style={{paddingTop: isFullscreen ? 0 : 16}} />
          )}
          {containerSearch ? (
            <AppTextInput
              onSubmitEditing={onSearch}
              returnKeyType={'search'}
              value={searchKey}
              onChangeText={handleSearchTextChange}
              containerStyle={styles.containerSearch}
              placeholder={
                placeholderSearch || t('common:textInput.hintSearch')
              }
              placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
              iconLeft={
                <TouchableOpacity onPress={onSearch}>
                  <SVG_NAME.SEARCH />
                </TouchableOpacity>
              }
            />
          ) : null}
          {dataModal && (
            <FlatList
              data={getDataList || []}
              keyExtractor={(item, index) =>
                item.key || item.vehicleGroupId || item.id || index.toString()
              }
              ItemSeparatorComponent={renderItemSeparatorComponent}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
              style={{
                height: dataModal?.length > 0 ? 'auto' : getSize.v(200),
                maxHeight: maxHeight,
              }}
              contentContainerStyle={[
                dataModal && dataModal.length !== 0
                  ? {paddingBottom: 16}
                  : {flex: 1},
              ]}
              onScroll={e => {
                setScrolled(true);
              }}
              onEndReached={() => {
                if (scrolled) {
                  loadMoreModal?.();
                }
              }}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={EmptyList}
              ListFooterComponent={
                <View style={{paddingBottom: getBottomSpace()}} />
              }
            />
          )}
        </View>
        {children}
      </ModalBox>
    </Portal>
  );
}

export default React.memo(AppModal);
