import React, {Fragment} from 'react';
import {View, ScrollView} from 'react-native';

export default function ListViewCustom(props) {
  const {
    data,
    renderItem,
    style,
    ItemSeparatorComponent,
    keyExtractor = (item, index) => (item.id || index).toString(),
    scrollEnable = false,
  } = props;
  const Container = scrollEnable ? ScrollView : View;
  return (
    <Container style={style}>
      {data.map((value, index) => {
        if (typeof ItemSeparatorComponent === 'function') {
          return (
            <Fragment key={keyExtractor(value, index)}>
              {renderItem({item: value, index})}
              {index < data.length - 1 && ItemSeparatorComponent()}
            </Fragment>
          );
        }
        return renderItem({item: value, index});
      })}
    </Container>
  );
}
