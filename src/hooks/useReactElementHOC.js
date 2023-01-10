import React from 'react';

const useReactElementHOC = (WrappedComponent, props) => (
  <WrappedComponent {...props}>
    {props?.children}
  </WrappedComponent>
)

export default useReactElementHOC;