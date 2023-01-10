import React, {useMemo} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {mapPropsToFontStyle} from './styles';
import {COLOR} from 'utils/AppConst';

const AppText = props => {
  const {style, color, marginBottom, required = false} = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stylesText = [
    (color && {color} || {color: COLOR.TEXT_CONTENT}),
    marginBottom && {marginBottom},
    {...StyleSheet.flatten(style)},
  ];
  const stylesFont = useMemo(
    () => [mapPropsToFontStyle(props), stylesText],
    [props, stylesText],
  );
  return (
    <Text {...props} style={stylesFont} allowFontScaling={false}>
      {props.children || ''}
      {required && <Text style={styles.required} allowFontScaling={false}>*</Text>}
    </Text>
  );
};

AppText.propTypes = {
  numberOfLines: PropTypes.number,
};

AppText.defaultProps = {};

export default React.memo(AppText);

const styles = StyleSheet.create({
  required: {
    fontSize: 14,
    fontWeight: '400',
    color: '#DA294A',
  },
});
// cach dung:
//     - frontWeight: <400 -> light
//     - frontWeight: =400 -> regular (default)
//     - frontWeight: =500 -> medium
//     - frontWeight: >=600 -> bold
//
// // nen set style global h1, h2,...
