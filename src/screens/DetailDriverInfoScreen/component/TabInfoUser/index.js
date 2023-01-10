import React, {useCallback, useEffect, useState} from 'react';
import TabUserInfo from './view';
import {useActions} from 'hooks/useActions';
import {updateProfileSubmit} from 'appRedux/actions/authActions';
import {
  getListDistrict,
  getListProvince,
} from 'appRedux/actions/addressActions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getListProvinceSelector} from 'appRedux/selectors/addressSelector';

export default function ({userProfile, ...props}) {
  const actions = useActions({
    updateProfileSubmit,
    getListProvince,
    getListDistrict,
  });
  const listProvince = useSelectorShallow(getListProvinceSelector);
  const [listDistrict, setListDistrict] = useState([]);
  const [provinceIdSelected, setProvinceIdSelected] = useState(null);

  const fetchListDistrict = useCallback(() => {
    const options = {
      callback: res => {
        setListDistrict(res);
      },
      idProvince: provinceIdSelected,
    };
    actions.getListDistrict(options);
  }, [actions, provinceIdSelected]);

  useEffect(() => {
    if (listProvince?.length > 0) {
      return;
    }
    actions.getListProvince();
  }, [actions]);

  useEffect(() => {
    if (provinceIdSelected) {
      fetchListDistrict();
    }
  }, [provinceIdSelected]);

  return (
    <TabUserInfo
      setProvinceIdSelected={setProvinceIdSelected}
      listProvince={listProvince}
      listDistrict={listDistrict}
      {...props}
    />
  );
}
