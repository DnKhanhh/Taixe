import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useTranslate from 'hooks/useTranslate';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import AppView from 'components/AppView';
import AppCheckBox from 'components/AppCheckBox';
import { useIconResizeHOC } from 'hooks/useIconSvgResizeHOC';
import { SVG_NAME } from 'assets/path';

const ItemRecord = ({ item, keyDisplay, index, isSelected, setItemSelected, isMultipleSelect }) => {

    const { t } = useTranslate();

    return (
        <TouchableOpacity
            style={{
                ...styles.itemContainer,
                ...(isSelected ? styles.selected : {})
            }}
            onPress={() => setItemSelected({
                index,
                value: item
            })}
        >
            <Text
                style={{
                    ...styles.itemText
                }}
                allowFontScaling={false}
            >
                {item?.[keyDisplay] || t('navigate:scenes.modalSearch.label_unknown')}
            </Text>

            <AppView flex />

            {
                isMultipleSelect ? (
                    <AppCheckBox
                        isChecked={isSelected}
                        onPress={() => setItemSelected({
                            index,
                            value: item
                        })}
                    />
                )
                    : (
                        <AppView center>
                            {
                                isSelected ? useIconResizeHOC(SVG_NAME.CHECK, { s: 20 }) : null
                            }
                        </AppView>
                    )
            }

        </TouchableOpacity>
    )
}

export default React.memo(ItemRecord);

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        flexDirection: 'row',
    },
    itemText: {
        ...STYLE_GLOBAL.body2,
        color: '#333'
    },
    selected: {
        // backgroundColor: '#EDF8ED'
    },
})