import React from 'react';
import AppSearchAndFilter from './view';
export default function ({
  onPressSearch,
  onPressIconFilter,
  modalFilter,
  placeholder,
  onSubmitSearch,
  disabledButtonSearch,
  filter,
  checkResetFilter,
  styleContainer,
  styleTextInput,
}) {
  return (
    <AppSearchAndFilter
      {...{
        onPressSearch,
        onPressIconFilter,
        modalFilter,
        placeholder,
        onSubmitSearch,
        disabledButtonSearch,
        filter,
        checkResetFilter,
        styleContainer,
        styleTextInput,
      }}
    />
  );
}
