/**
 * @file		 : AppModalSearch/index.js
 * @createdAt	: 27-06-2022
 * @handler		: Manh Le	
 * @description	: Modal search cac module lien quan
 * */

import { Keyboard, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import ModalBox from 'react-native-modalbox';
import { Portal } from 'react-native-portalize';
import { COLOR } from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import { SVG_NAME } from 'assets/path';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTranslate from 'hooks/useTranslate';
import { useActions } from 'hooks/useActions';
import {
    getListRelatedSubmit,
} from 'appRedux/actions/vehicleAction';
import AppText from 'components/AppText';
import { RefreshControl } from 'react-native';
import ItemRecord from './components/itemRecord';
import _ from 'lodash';
import PropTypes from 'prop-types'
import { getSize, useIconResizeHOC } from 'hooks/useIconSvgResizeHOC';
import AppView from 'components/AppView';
import { CONST_SIZE } from 'utils/AppConst';
import AppTextInput from 'components/AppTextInput';
import AppButton from 'components/AppButton';
import { getBottomSpace } from 'react-native-iphone-x-helper';

// Check if a string contains any unicode chacracters
String.prototype.isUnicode = function () {
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) >= 192) {
            return true;
        }
    }

    return false;
}

// parse unicode string to un-unicode string
String.prototype.unUnicode = function () {
    var result = this.toLowerCase();
    result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    result = result.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    result = result.replace(/đ/g, "d");
    return result;
}

// match un-unicode lookup string in unicode full string
String.prototype.unUnicodeMatch = function (lookupString) {
    var fullString = this.unUnicode();
    lookupString = lookupString.unUnicode();
    return fullString.indexOf(lookupString) >= 0;
}

const LIMIT_PAGE = 100;

function AppModalSearch({
    isOpen = false,
    onClose = undefined,
    valueSelected = undefined,
    keyDisplay = 'name',
    keyCompare = 'id',
    titleModal = '',
    otherProps,
    isMultipleSelect,
    paramSearch,
    onSelected = undefined
}) {
    const [showModal, setShowModal] = React.useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [totalRecord, setTotalRecord] = useState(0);
    const [dataRelated, setDataRelated] = useState([]);
    const [isScrolled, setScrolled] = useState(false);
    const [keyWork, setKeyWork] = React.useState('');

    const [itemSelected, setItemSelected] = useState([]);
    const [itemSelectedCache, setItemSelectedCache] = useState([]);

    const onDismiss = Keyboard.dismiss;
    const areaInsets = useSafeAreaInsets();
    const { t } = useTranslate();
    const actions = useActions({ getListRelatedSubmit });

    const getDataListRelated = React.useCallback((page = 0) => {
        const options = {
            callback: res => {
                setRefreshing(false);
                setTotalRecord(res?.total || 0);
                if (page <= 1) {
                    setDataRelated(res?.items);
                }
                else {
                    setDataRelated(old => [...old, ...(res?.items || [])]);
                }

                setShowModal(true);
            },
            params: paramSearch,
            lang: 'en',
            limit: LIMIT_PAGE,
            page,
        };

        actions.getListRelatedSubmit({ ...options });

    }, [actions]);

    React.useEffect(() => {

        if (isMultipleSelect) {

            if (valueSelected && valueSelected.length > 0 && dataRelated && (dataRelated.length > 0)) {
                const listSelected = valueSelected?.map((value, index) => {
                    const indexSelected = dataRelated?.findIndex((item) => item?.[keyCompare] == value?.[keyCompare]);

                    return {
                        index: indexSelected,
                        value: indexSelected != -1 ? dataRelated?.[indexSelected] : value
                    }
                });

                setItemSelected(listSelected);
                setItemSelectedCache(listSelected);
            }
        }
        else {
            if (valueSelected && (Object.keys(valueSelected).length > 0) && dataRelated && (dataRelated.length > 0)) {
                const indexSelected = dataRelated?.findIndex((item) => item?.[keyCompare] == valueSelected?.[keyCompare]);

                if (indexSelected != -1) {
                    setItemSelected([{
                        index: indexSelected,
                        value: dataRelated?.[indexSelected]
                    }]);

                    setItemSelectedCache([{
                        index: indexSelected,
                        value: dataRelated?.[indexSelected]
                    }])
                }
            }
        }


        return () => { };
    }, [valueSelected, isMultipleSelect, dataRelated])

    React.useEffect(() => {
        if (isOpen) {
            getDataListRelated()
        }

        return () => { }
    }, [isOpen]);

    const refreshData = () => {
        setRefreshing(true);
        getDataListRelated();
    };

    const loadMore = React.useCallback(() => {
        if (!dataRelated || (totalRecord <= LIMIT_PAGE) || !isScrolled) return;

        const nextPage = Math.ceil((dataRelated ? dataRelated.length : 0) / LIMIT_PAGE);

        if (totalRecord - (nextPage * LIMIT_PAGE) > 0) {
            getDataListRelated(nextPage + 1);
        }

    }, [dataRelated]);

    const handleCloseModal = React.useCallback(() => {
        setShowModal(false);
        onClose?.();
    }, []);

    return (
        <Portal>
            <ModalBox
                style={{
                    height: 'auto',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    paddingBottom: getBottomSpace(),
                    maxHeight: '90%',
                    backgroundColor: COLOR.COLOR_BACKGROUND
                }}
                swipeToClose={false}
                backdropPressToClose={true}
                position='bottom'
                isOpen={showModal}
                onClosed={handleCloseModal}
                backdropOpacity={0.3}
                {...otherProps}
            >
                <AppView
                >
                    {/* Header */}
                    <AppView
                        style={{
                            ...styles.header
                        }}
                        onTouchEnd={onDismiss}
                    >
                        <AppView
                            flex
                            center
                            style={{
                                paddingLeft: getSize.m(44)
                            }}
                        >

                            <AppText
                                style={[
                                    STYLE_GLOBAL.subTitle2,
                                    STYLE_GLOBAL.weight700,
                                    STYLE_GLOBAL.color_textContent,
                                ]}>
                                {titleModal || ""}
                            </AppText>
                        </AppView>

                        <TouchableOpacity
                            onPress={() => {
                                setItemSelected(itemSelectedCache);
                                handleCloseModal();
                            }}
                        >
                            <AppView
                                center
                                style={{
                                    ...styles.btnClose,
                                }}
                            >
                                {
                                    useIconResizeHOC(SVG_NAME.CLOSE_ICON, { s: 24 })
                                }
                            </AppView>
                        </TouchableOpacity>
                    </AppView>

                    {/* Search */}
                    <AppView
                        paddingHorizontal={16}
                        paddingVertical={12}
                        width={'100%'}
                        height={getSize.v(72)}
                    >
                        <AppTextInput
                            value={keyWork}
                            onChangeText={setKeyWork}
                            placeholder={titleModal}
                            containerStyle={{
                                ...STYLE_GLOBAL.body1,
                            }}
                            iconLeft={<SVG_NAME.SEARCH />}
                        />
                    </AppView>
                    {/* content list */}
                    <AppView
                        maxHeight={CONST_SIZE.DEVICE_HEIGHT * 0.9 - getSize.v(52) - getSize.v(72) - areaInsets.bottom - getSize.v(64)}
                    >
                        <FlatList
                            // style={{
                            //     height: 'auto',
                            // }}
                            contentContainerStyle={{
                                height: 'auto',
                                paddingBottom: getSize.m(24)
                            }}
                            ListEmptyComponent={() => (
                                <View
                                    style={{
                                        ...styles.viewNotData
                                    }}
                                >
                                    <AppText>
                                        {t('navigate:scenes.modalSearch.msg_not_found')}
                                    </AppText>
                                </View>
                            )}
                            data={(dataRelated || []).filter((item) => item?.[keyDisplay]?.unUnicodeMatch(keyWork))}
                            renderItem={(infoItem) => <ItemRecord
                                {...infoItem}
                                keyDisplay={keyDisplay}
                                isMultipleSelect={isMultipleSelect}
                                isSelected={itemSelected.findIndex((item) => item.index == infoItem.index) != -1}
                                setItemSelected={(selected) => {
                                    if (isMultipleSelect) {
                                        const dataTemp = [...itemSelected];
                                        const indexSelected = dataTemp.findIndex((e) => e?.index == selected?.index);

                                        if (indexSelected != -1) {
                                            dataTemp.splice(indexSelected, 1);
                                        }
                                        else {
                                            dataTemp.push(selected);
                                        }

                                        setItemSelected(dataTemp);
                                    }
                                    else {
                                        setItemSelected([selected]);
                                        onSelected?.(selected?.value);
                                        handleCloseModal?.();
                                    }

                                }}
                            />
                            }
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={refreshData}
                                />
                            }
                            onScroll={(e) => setScrolled(true)}
                            onEndReachedThreshold={0.5}
                            onEndReached={loadMore}
                        />
                    </AppView>
                    {
                        !isMultipleSelect ? null : (
                            <AppView
                                paddingHorizontal={getSize.m(CONST_SIZE.DEFAULT_PADDING_HORIZONTAL)}
                                height={getSize.v(68)}
                                justifyCenter
                                borderTopWidth={1}
                                borderColor={COLOR.BACKGROUND_GRAY}
                                backgroundColor={COLOR.COLOR_BACKGROUND}
                            >
                                <AppButton
                                    title={t('common:button.apply')}
                                    onPress={() => {
                                        // setItemSelected(itemSelectedCache);
                                        if (isMultipleSelect) {
                                            onSelected?.(itemSelected?.map((e) => e?.value));
                                        }
                                        else {
                                            onSelected?.(itemSelected?.[0]?.value);
                                        }
                                        handleCloseModal?.();
                                    }}
                                />
                            </AppView>
                        )
                    }
                </AppView>
            </ModalBox>
        </Portal>
    )
}

AppModalSearch.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    valueSelected: PropTypes.any,
    keyDisplay: PropTypes.string,
    keyCompare: PropTypes.string,
    titleModal: PropTypes.string,
    otherProps: PropTypes.any,
    isMultipleSelect: PropTypes.bool,
    paramSearch: PropTypes.object,
    onSelected: PropTypes.func,
}

export default React.memo(AppModalSearch);

const styles = StyleSheet.create({
    header: {
        width: '100%',
        minHeight: getSize.v(52),
        paddingHorizontal: getSize.m(16),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLOR.BACKGROUND_GRAY
    },
    headerText: {
        ...STYLE_GLOBAL.subTitle2,
        ...STYLE_GLOBAL.weight600,
        color: COLOR.STATUS_CLOSE_TEXT
    },
    btnClose: {
        width: getSize.v(44),
        aspectRatio: 1,
        borderRadius: getSize.v(44) / 2,
    },
    btnSearch: {
        width: getSize.v(44),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F5F6'
    },
    btnDefault: {
        minHeight: getSize.v(44)
    },
    textButton: {
        ...STYLE_GLOBAL.body2,
        ...STYLE_GLOBAL.weight600
    },
    viewNotData: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});