import React, {useCallback, useState, useEffect} from 'react';
import {DriverInfoStartScreen} from './view';

//hooks
import {useActions} from 'hooks/useActions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';

//actions
import {
  getListProvince,
  getListDistrict,
} from 'appRedux/actions/addressActions';

//reducer
import {getListProvinceSelector} from 'appRedux/selectors/addressSelector';

export default function () {
  const actions = useActions({getListProvince});
  const allProvince = useSelectorShallow(getListProvinceSelector);

  useEffect(() => {
    if (allProvince?.length > 0) {
      return;
    }
    actions.getListProvince();
    return () => {};
  }, [actions, allProvince?.length]);
  return <DriverInfoStartScreen listProvince={allProvince} />;
}
