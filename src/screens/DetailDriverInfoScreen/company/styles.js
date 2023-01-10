import {StyleSheet} from 'react-native';
import {COLOR} from 'utils/AppConst';
import STYLE_GLOBAL from 'utils/StyleGlobal';
import {scalePortrait} from 'utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  titleInformation: [
    STYLE_GLOBAL.containerBetween,
    {
      marginVertical: 16,
    },
  ],
  contentContainer: {
    borderTopWidth: 3,
    borderTopColor: COLOR.GREEN_2,
  },
  contentStyle: {
    padding: 16,
    backgroundColor: COLOR.COLOR_BACKGROUND,
    marginBottom: 8,
  },
});
