import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function AwareScrollView(props) {
  const {
    children,
    contentContainerStyle,
    disableKBDismissScroll,
    keyboardShouldPersistTaps,
  } = props;
  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={disableKBDismissScroll ? null : {x: 0, y: 0}}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
      {...props}
      contentContainerStyle={contentContainerStyle}>
      {children}
    </KeyboardAwareScrollView>
  );
}

export default React.memo(AwareScrollView);
