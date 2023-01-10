import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

function AppLinearGradient({colors, style, props, children, start, end}) {
  return (
    <LinearGradient
      start={start || {x: 2, y: 0}}
      end={end || {x: 0, y: 0}}
      colors={colors}
      style={style}
      {...props}>
      {children}
    </LinearGradient>
  );
}

export default React.memo(AppLinearGradient);
