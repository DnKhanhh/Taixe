import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const configOptions = {
  copyTo: 'cachesDirectory',
  type: types.pdf,
};

const handleError = err => {
  if (DocumentPicker.isCancel(err)) {
    console.log('canceled!');
  } else if (isInProgress(err)) {
    console.log(
      'multiple pickers were opened, only the last will be considered',
    );
  } else {
    throw err;
  }
};

export const openSingleDocumentPicker = async callback => {
  try {
    const pickerResult = await DocumentPicker.pickSingle({
      ...configOptions,
    });
    callback(pickerResult);
    // console.log('picked!', pickerResult);
  } catch (e) {
    handleError(e);
  }
};
