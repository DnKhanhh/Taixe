import React, {useMemo, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

const DashedLine = ({
  axis = 'horizontal',
  dashGap = 2,
  dashLength = 8,
  dashThickness = 1,
  dashColor = '#B6B6B6',
  dashStyle,
  maxHeigh,
  style,
}) => {
  const [lineLength, setLineLength] = useState(0);
  const isRow = axis === 'horizontal';
  const numOfDashes = Math.ceil(
    (maxHeigh || lineLength) / (dashGap + dashLength),
  );

  const dashStyles = useMemo(
    () => ({
      width: isRow ? dashLength : dashThickness,
      height: isRow ? dashThickness : dashLength,
      marginRight: isRow ? dashGap : 0,
      marginBottom: isRow ? 0 : dashGap,
      backgroundColor: dashColor,
    }),
    [dashColor, dashGap, dashLength, dashThickness, isRow],
  );

  const isMounted = React.useRef(false);

  return (
    <View
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        // console.log('==============> ', [width, height]);
        if (!isMounted.current) {
          setLineLength(isRow ? width : height);
          isMounted.current = true;
        }
      }}
      style={[style, isRow ? styles.row : styles.column]}>
      {[...Array(numOfDashes)].map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return <View key={i} style={[dashStyles, dashStyle]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});

export default DashedLine;
