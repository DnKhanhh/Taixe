import React from 'react';
import SearchAndFilter from './view';
export default function ({onPressSearch, onPressIconFilter, modalFilter}) {
  return (
    <SearchAndFilter
      modalFilter={modalFilter}
      onPressSearch={onPressSearch}
      onPressIconFilter={onPressIconFilter}
    />
  );
}
