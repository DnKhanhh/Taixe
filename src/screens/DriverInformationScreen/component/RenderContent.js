import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SVG_NAME} from 'assets/path';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {COLOR} from 'utils/AppConst';
import {DRIVER_INFORMATION} from '../constant';
//Components
import AppText from 'components/AppText';
import ListViewCustom from 'components/ListViewCustom';
import OptionItem from 'components/OptionItem';

const renderSeparatorComponent = () => {
  return (
    <View
      style={{borderWidth: 1, borderColor: COLOR.COLOR_BACKGROUND_TEXT_INPUT}}
    />
  );
};

const RenderContent = ({data, title, style, onPressOptionsItem}) => {
  const renderItem = ({item}) => {
    return (
      <OptionItem
        item={item}
        onPressItem={onPressOptionsItem}
        style={styles.containerItem}
        styleText={{color: COLOR.TEXT_CONTENT}}
        iconRight={
          item.type !== DRIVER_INFORMATION.DELETE_ACCOUNT &&
          !item.isDisabled && <SVG_NAME.USER_RIGHT />
        }>
        {item.icon}
      </OptionItem>
    );
  };

  return (
    <View style={[style, {paddingBottom: 8}]}>
      <View style={{paddingLeft: 24, paddingVertical: 16}}>
        <AppText
          style={[
            STYLE_GLOBAL.subTitle2,
            STYLE_GLOBAL.weight600,
            {color: COLOR.COLOR_BIG_TITLE},
          ]}>
          {title}
        </AppText>
      </View>
      <View style={styles.container}>
        <ListViewCustom
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparatorComponent}
        />
      </View>
    </View>
  );
};

export default React.memo(RenderContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.COLOR_BACKGROUND,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  containerItem: {
    padding: 24,
  },
});
