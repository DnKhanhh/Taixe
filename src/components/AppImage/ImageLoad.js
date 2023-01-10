import React, {useRef, useState, useEffect, useMemo} from 'react';
import {View, Animated, ActivityIndicator, StyleSheet} from 'react-native';

export default function ImagLoading({style, Wrap = View, ...props}) {
  const [_loading, _setLoading] = useState(true);
  const _anim = useRef(new Animated.Value(0)).current;
  const _mounted = useRef(true);

  const _loadImage = useMemo(
    () => () => {
      Animated.timing(_anim, {toValue: 1, useNativeDriver: true}).start(() => {
        if (_mounted.current) _setLoading(false);
      });
    },
    [_anim],
  );

  useEffect(() => {
    return () => {
      _mounted.current = false;
    };
  });

  return (
    <Wrap style={style}>
      {_loading && (
        <Animated.View
          style={[
            styles.view,
            {},
            {
              opacity: _anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}>
          <ActivityIndicator color="green" />
        </Animated.View>
      )}

      <Animated.Image
        style={[styles.image, {opacity: _anim}]}
        onLoadEnd={_loadImage}
        {...props}
      />
    </Wrap>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
