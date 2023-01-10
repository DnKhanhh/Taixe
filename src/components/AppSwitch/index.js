/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import AppText from '../AppText';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
const AppSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 24,
          width: 80,
          backgroundColor: '#fff',
          borderRadius: getRoundCorner ? 16 : 0,
          //   borderWidth: 1,
          //   borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 1 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText
            style={{
              color: getSelectionMode === 1 ? 'white' : selectionColor,
            }}>
            {option1}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 2 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText
            style={{
              color: getSelectionMode === 2 ? 'white' : selectionColor,
            }}>
            {option2}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AppSwitch;
