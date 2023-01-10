import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';

const ViewBadge = ({badge, containerStyle}) => {
  if (!badge) {
    return <></>;
  }
  return (
    <View style={[styles.containerViewBadge, containerStyle]}>
      <View style={badge ? styles.badgeStyle : styles.noBadgeStyle} />
    </View>
  );
};

export default React.memo(ViewBadge);

const styles = StyleSheet.create({
  containerViewBadge: {
    zIndex: 10,
    position: 'absolute',
    right: -10,
    top: 1,
  },
  badgeStyle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  noBadgeStyle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: COLOR.COLOR_SECONDARY,
  },
});
