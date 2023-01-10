import React, {useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {COLOR} from 'utils/AppConst';

const AppFlatList = ({
  style,
  data,
  renderItem,
  contentContainerStyle,
  refreshing,
  onRefresh,
  onEndReached,
  ListEmptyComponent,
  ListFooterComponent,
  ...props
}) => {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  return (
    <FlatList
      style={style || {backgroundColor: COLOR.COLOR_BACKGROUND}}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || index.toString}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // fix FlatList onEndReached triggered before reach onEndReachedThreshold
      onEndReached={({distanceFromEnd}) => {
        if (!onEndReachedCalledDuringMomentum) {
          onEndReached();
          setOnEndReachedCalledDuringMomentum(true);
        }
      }}
      onEndReachedThreshold={0.5}
      onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      {...props}
    />
  );
};

export default AppFlatList;
