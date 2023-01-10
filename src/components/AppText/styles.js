import {scaleLandscape} from 'utils/responsive';
import FONT_CONST from './appFont';
const {FONT_FAMILY} = FONT_CONST;

/*
  map props to Fontstyles
*/
export function mapPropsToFontStyle(props) {
  let fontWeight = '';
  let fontSize = 14;
  if (props && props.style && typeof props.style === 'object') {
    fontWeight = '';
    let ifontWeight = '';
    if (Array.isArray(props.style)) {
      for (let i of props.style) {
        if (i && i.fontWeight) {
          ifontWeight = i.fontWeight;
        }
        if (i && i.fontSize && Number(i.fontSize)) {
          fontSize = i.fontSize;
        }
      }
    } else {
      if (props.style.fontWeight) {
        ifontWeight = props.style.fontWeight;
      }
      if (props.style.fontSize && Number(props.style.fontSize)) {
        fontSize = props.style.fontSize;
      }
    }
    if (Number(ifontWeight)) {
      if (Number(ifontWeight) < 400) {
        fontWeight = 'light';
      } else if (Number(ifontWeight) === 400) {
        fontWeight = 'regular';
      } else if (Number(ifontWeight) === 500) {
        fontWeight = 'medium';
      } else if (Number(ifontWeight) >= 600) {
        fontWeight = 'bold';
      } else {
        fontWeight = '';
      }
    }
  }

  const familyDefaul = 'regular';
  const newProps = {
    fontFamily: !fontWeight
      ? FONT_FAMILY[`${familyDefaul.toUpperCase()}`]
      : FONT_FAMILY[`${fontWeight.toUpperCase()}`],
    fontSize: scaleLandscape(fontSize),
  };

  return newProps;
}
