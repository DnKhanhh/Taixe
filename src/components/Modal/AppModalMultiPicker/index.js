import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import AppText from 'components/AppText';
import {COLOR} from 'utils/AppConst';
import styles from './styles';
import ModalBox from 'react-native-modalbox';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppCheckBox from 'components/AppCheckBox';
import AppButton from 'components/AppButton';
import AppTextInput from 'components/AppTextInput';
import {t} from 'i18next';
import {Portal} from 'react-native-portalize';
import _ from 'lodash';

const zip = (a1, a2) =>
  a1.map((x, i) => ({...x, checked: a2[i] ? a2[i] : false}));

function getMatch(a, b) {
  let matches = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i].vehicleGroupId && a[i].vehicleGroupId === b[j].vehicleGroupId) {
        matches.push(true);
        break;
      } else if (a[i].id && a[i].id === b[j].id) {
        matches.push(true);
        break;
      }
      // add another values if not vehicleGroupId (else if ...)
    }
    if (!matches[i]) {
      matches.push(false);
    }
  }
  return matches;
}

function AppModalMultiPicker({
  iconTitle,
  titleModal,
  containerStyle,
  children,
  showAppModal,
  setShowAppModal,
  closeModal,
  dataModal = [],
  onPressDataModal,
  dataCheckedBox = [],
  name,
  setFieldValue,
  selectedGroupNameRegister,
  setSelectedGroupNameRegister,
  keyType,
  keyTypename,
  maxHeight = '90%',
  loadMoreModal,
  onPressSearch,
  onSubmitSearch,
  debounceTimeSearch = true,
  hideSearchInput = false,
  onClear,
  isLocalSearch = false,
  ...otherProps
}) {
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = React.useState([]);

  const getDataParser = React.useCallback((dataModal, dataCheckedBox) => {
    const initChecked = getMatch(dataModal, dataCheckedBox);
    const listTemp = dataModal?.map((item, index) => ({
      ...item,
      isSelected: initChecked[index] ? true : false,
    }));

    return listTemp;
  }, []);

  useEffect(() => {
    setData([...getDataParser(dataModal, dataCheckedBox)]);
    return () => {};
  }, [dataModal, dataCheckedBox]);

  const renderItem = ({item, index}) => {
    const itemRender = getFieldItem(keyType, item);
    return (
      <TouchableOpacity
        onPress={() => {
          if (getDataList?.length === data?.length) {
            const temp = [...data];
            temp[index].isSelected = !temp[index].isSelected;
            setData(temp);
          } else {
            const indexSelected = data?.findIndex(itemData =>
              _.isEqual(itemData, item),
            );
            if (indexSelected != -1) {
              const temp = [...data];
              temp[indexSelected].isSelected = !temp[indexSelected].isSelected;
              setData(temp);
            }
          }
        }}>
        <View style={styles.containerItemRender}>
          <AppText
            style={[
              STYLE_GLOBAL.body1,
              STYLE_GLOBAL.color_textContent,
              STYLE_GLOBAL.flex1,
            ]}>
            {itemRender.nameRender}
          </AppText>
          <AppCheckBox
            colorChecked={COLOR.COLOR_PRIMARY}
            isChecked={item?.isSelected}
            onPress={() => {
              if (getDataList?.length === data?.length) {
                const temp = [...data];
                temp[index].isSelected = !temp[index].isSelected;
                setData(temp);
              } else {
                const indexSelected = data?.findIndex(itemData =>
                  _.isEqual(itemData, item),
                );
                if (indexSelected != -1) {
                  const temp = [...data];
                  temp[indexSelected].isSelected =
                    !temp[indexSelected].isSelected;
                  setData(temp);
                }
              }
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleSetFieldValue = (result, resultFilter) => {
    name && setFieldValue?.(name, result);
    keyTypename && setFieldValue?.(keyTypename, resultFilter);
  };

  const onPressApply = () => {
    const resultFilter = data?.filter(item => item?.isSelected);
    setSelectedGroupNameRegister?.(resultFilter);

    const result = resultFilter?.map(items => {
      if (items.vehicleGroupId) {
        return items.vehicleGroupId;
      } else if (items.id) {
        return items.id;
      }
      // add another values if not vehicleGroupId
    });
    handleSetFieldValue?.(result, resultFilter);
  };

  function EmptyList() {
    return (
      <View style={styles.emptyListStyle}>
        <AppText>{t('common:noData')}</AppText>
      </View>
    );
  }
  const [searchKey, setSearchKey] = useState('');
  const typingTimeoutRef = useRef(null);
  const onSearch = useCallback(() => {
    onPressSearch?.(searchKey);
  }, [onPressSearch, searchKey]);
  const handleSearchTextChange = values => {
    setSearchKey?.(values);
    if (!onSubmitSearch) {
      return;
    }
    if (debounceTimeSearch) {
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
      setSearchKey?.(null);
    };
  }, []);
  function FooterComponent({item}) {
    return (
      <View style={styles.viewButtonFooter}>
        <AppButton
          title={t('common:button.apply')}
          styleText={[
            STYLE_GLOBAL.body1,
            STYLE_GLOBAL.color_secondary,
            STYLE_GLOBAL.weight700,
          ]}
          onPress={() => {
            onPressApply();
            setShowAppModal?.(false);
          }}
        />
      </View>
    );
  }
  useEffect(() => {
    if (scrolled) {
      loadMoreModal?.();
    }
    return () => {};
  }, [scrolled]);

  const getDataList = React.useMemo(() => {
    if (!isLocalSearch) {
      return data || [];
    }

    return (data || [])?.filter(item => {
      const itemRender = getFieldItem(keyType, item);

      return itemRender.nameRender?.unUnicodeMatch?.(searchKey || '');
    });
  }, [data, isLocalSearch, keyType, searchKey]);

  return (
    <Portal>
      <ModalBox
        style={[styles.viewModal, containerStyle, {maxHeight}]}
        position="bottom"
        isOpen={showAppModal}
        backButtonClose={true}
        onClosed={() => {
          setShowAppModal?.(false);
          setData([...getDataParser(dataModal, dataCheckedBox)]);
          setSearchKey?.('');
          onClear?.();
        }}
        backdropOpacity={0.3}
        {...otherProps}>
        <View>
          {titleModal ? (
            <>
              <View style={styles.titleModalContainer}>
                <View style={styles.emptyTitleModal} />
                <AppText>{titleModal}</AppText>
                <TouchableOpacity
                  onPress={() => {
                    setShowAppModal?.(false);
                    setData([...getDataParser(dataModal, dataCheckedBox)]);
                  }}>
                  <SVG_NAME.CLOSE_ICON />
                </TouchableOpacity>
              </View>
              <View style={styles.lineTitleModal} />
            </>
          ) : (
            <View style={{paddingTop: 16}} />
          )}
        </View>
        {hideSearchInput ? null : (
          <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <AppTextInput
              onSubmitEditing={onSearch}
              returnKeyType={'search'}
              containerStyle={styles.containerTextInput}
              placeholder={t('common:textInput.hintSearch')}
              placeholderTextColor={COLOR.COLOR_TEXT_INPUT}
              value={searchKey}
              onChangeText={handleSearchTextChange}
              iconLeft={
                <TouchableOpacity onPress={onSearch}>
                  <SVG_NAME.SEARCH />
                </TouchableOpacity>
              }
            />
          </View>
        )}

        {dataModal && (
          <FlatList
            data={getDataList}
            keyExactor={item => item.key || item.id}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={<EmptyList />}
            contentContainerStyle={[
              {paddingHorizontal: 16, paddingBottom: 12},
              dataModal && dataModal.length !== 0 ? {} : {flex: 1},
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
          />
        )}
        <FooterComponent />
        {children}
      </ModalBox>
    </Portal>
  );
}

export default React.memo(AppModalMultiPicker);

const getFieldItem = (type, item) => {
  switch (type) {
    case 'vehicleGroup':
      return {
        nameRender: item?.vehicleGroup?.name,
      };
    case 'name': //case test, add another values if not vehicleGroup
      return {
        nameRender: item?.name,
      };
    default:
      return {
        nameRender: item?.name || item?.title,
      };
  }
};
