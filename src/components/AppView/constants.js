import {getSize} from 'utils/responsive';
import React from 'react';
import {View} from 'react-native';
import useReactElementHOC from 'hooks/useReactElementHOC';

Array.prototype.insertBetweenElement = function (item) {
  let result = [];

  this.forEach((element, index) => {
    if (index <= this.length - 1) {
      result.push(
        childrenWithProps(element, {key: index}),
        childrenWithProps(item, {key: index + 1 + this.length}),
      );
    } else {
      result.push(childrenWithProps(element, {key: index}));
    }
  });

  return result;
};

const SpacingElement = React.memo(({spacing}) => {
  const spacingHeight = parseInt(spacing || 0);
  // console.log('spacingHeight: ', spacingHeight);

  return useReactElementHOC(View, {
    style: {
      height: getSize.v(spacingHeight, spacingHeight * 1.25),
      width: getSize.s(spacingHeight, spacingHeight * 1.25),
    },
  });
});

function childrenWithProps(children, props) {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        ...props,
        style: [child.props.style, props?.style || {}],
      });
    }
    return child;
  });
}

export {SpacingElement};
