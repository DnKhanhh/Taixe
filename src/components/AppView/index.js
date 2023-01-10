import {isNumber} from 'lodash';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SpacingElement} from './constants';
import _ from 'lodash';
import styles from './styles';
import {getSize} from 'utils/responsive';
const Block = ({
  flex,
  flexShrink,
  flexGrow,
  row,
  rowAlignCenter,
  center,
  column,
  shadow,
  backgroundColor,
  space,
  padding,
  margin,
  alignStart,
  alignCenter,
  alignEnd,
  wrap,
  justifyCenter,
  justifyEnd,
  justifyStart,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  radius,
  height,
  width,
  square,
  round,
  borderWidth,
  relative,
  absolute,
  top,
  left,
  right,
  bottom,
  borderColor,
  children,
  overflow,
  alignSelf,
  style,
  shadowColor,
  opacity,
  elevation,
  maxWidth,
  maxHeight,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  isPaddingIos,
  zIndex,
  borderTopLeftRadius,
  borderTopRightRadius,
  spacing,
  onLayout,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  const blockStyles = [
    isPaddingIos && {
      paddingBottom: Platform.OS === 'ios' ? insets.bottom : 20,
    },
    flex && styles.block,
    flexShrink && styles.flexShrink,
    flexGrow && styles.flexGrow,
    !flex && {flex: 0},
    maxWidth && {maxWidth: getSize.s(maxWidth)},
    maxHeight && {maxHeight: getSize.s(maxHeight)},
    width && {width: getSize.s(width)},
    height && {height: getSize.v(height)},
    row && styles.row,
    rowAlignCenter && styles.rowAlignCenter,
    center && styles.center,
    column && styles.column,
    wrap && {flexWrap: 'wrap'},
    backgroundColor && {
      backgroundColor: backgroundColor,
    },
    padding && {padding: getSize.m(padding)},
    margin && {padding: getSize.m(margin)},
    alignStart && styles.alignStart,
    alignCenter && styles.alignCenter,
    alignEnd && styles.alignEnd,
    justifyCenter && styles.justifyCenter,
    justifyStart && styles.justifyStart,
    justifyEnd && styles.justifyEnd,
    space && {justifyContent: `space-${space}`},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginRight && {marginRight: getSize.m(marginRight)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    radius && {borderRadius: getSize.m(radius)},
    borderWidth && {borderWidth: getSize.v(borderWidth)},
    square && {square},
    round && {round},
    isNumber(opacity) && {opacity: opacity},
    borderColor && {
      borderColor: borderColor,
    },
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    isNumber(top) && {top: top},
    isNumber(left) && {left: left},
    isNumber(right) && {right: right},
    isNumber(bottom) && {bottom: bottom},
    overflow && {overflow},
    alignSelf && {alignSelf},
    borderTopWidth && {borderTopWidth: getSize.v(borderTopWidth)},
    borderRightWidth && {borderRightWidth: getSize.v(borderRightWidth)},
    borderBottomWidth && {borderBottomWidth: getSize.v(borderBottomWidth)},
    borderLeftWidth && {borderLeftWidth: getSize.v(borderLeftWidth)},
    zIndex && {zIndex},
    borderTopLeftRadius && {borderTopLeftRadius},
    borderTopRightRadius && {borderTopRightRadius},
    {...StyleSheet.flatten(style)},
  ];

  const renderChildComponent = React.useMemo(() => {
    if (spacing && _.isArray(children) && children?.length > 1) {
      return children.insertBetweenElement(
        <SpacingElement spacing={spacing} />,
      );
    }

    return children;
  }, [children, row, column]);

  return (
    <View style={blockStyles} {...rest} onLayout={onLayout}>
      {renderChildComponent}
    </View>
  );
};

export default Block;
