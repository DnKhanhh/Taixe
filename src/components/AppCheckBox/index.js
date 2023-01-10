import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {SVG_NAME} from 'assets/path';
import {COLOR, CONST_SIZE} from 'utils/AppConst';
import {useIconResizeHOC} from 'hooks/useIconSvgResizeHOC';
import AppView from 'components/AppView';
function AppCheckBox({
  title,
  containerStyle,
  children,
  colorChecked = COLOR.COLOR_PRIMARY_SECOND,
  isChecked,
  onPress,
  disabled,
  style,
}) {
  const checkedStyle = useMemo(() => {
    return [styles.checkedBoxStyle(colorChecked)];
  }, [colorChecked]);

  const CheckBox = useIconResizeHOC(SVG_NAME.CHECKED_BOX, {w: 10, h: 8});
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={
        disabled
          ? {
              opacity: 0.5,
            }
          : {}
      }>
      <AppView row style={style}>
        <AppView
          style={[
            styles.checkBoxStyle,
            containerStyle,
            isChecked && checkedStyle,
          ]}>
          {CheckBox}
        </AppView>
        {children}
      </AppView>
    </TouchableOpacity>
  );
}

export default React.memo(AppCheckBox);

const styles = StyleSheet.create({
  checkBoxStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CACBCE',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 8,
    flexDirection: 'row',
  },
  checkedBoxStyle: color => ({
    backgroundColor: color,
    borderWidth: 0,
  }),
});
