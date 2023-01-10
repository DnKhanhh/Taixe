import React, {useCallback, useEffect, useState} from 'react';
import TabInfoAddress from './view';
import {useActions} from 'hooks/useActions';
import {updateProfileSubmit} from 'appRedux/actions/authActions';
import {
  getListDistrict,
  getListProvince,
} from 'appRedux/actions/addressActions';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getListProvinceSelector} from 'appRedux/selectors/addressSelector';

export default function ({userProfile, ...props}) {
  const listProvince = useSelectorShallow(getListProvinceSelector);
  const [listDistrict, setListDistrict] = useState([]);
  const [provinceIdSelected, setProvinceIdSelected] = useState(
    userProfile?.contactCityId,
  );
  const [provinceIdSelectedPermanent, setProvinceIdSelectedPermanent] =
    useState(userProfile?.permanentAddressCityId);
  const [listDistrictPermanent, setListDistrictPermanent] = useState([]);
  const actions = useActions({
    updateProfileSubmit,
    getListProvince,
    getListDistrict,
  });
  const fetchListDistrict = useCallback(
    ({setList, provinceSelected}) => {
      const options = {
        callback: res => {
          setList(res);
        },
        idProvince: provinceSelected,
      };
      actions.getListDistrict(options);
    },
    [actions],
  );

  useEffect(() => {
    if (listProvince?.length > 0) {
      return;
    }
    actions.getListProvince();
    return () => {};
  }, [actions, listProvince?.length]);

  useEffect(() => {
    if (provinceIdSelected) {
      setTimeout(() => {
        fetchListDistrict({
          setList: setListDistrict,
          provinceSelected: provinceIdSelected,
        });
      }, 400);
    }
    return () => {};
  }, [fetchListDistrict, provinceIdSelected]);

  useEffect(() => {
    if (provinceIdSelectedPermanent) {
      fetchListDistrict({
        setList: setListDistrictPermanent,
        provinceSelected: provinceIdSelectedPermanent,
      });
    }
    return () => {};
  }, [fetchListDistrict, provinceIdSelectedPermanent]);

  return (
    <TabInfoAddress
      listProvince={listProvince}
      listDistrict={listDistrict}
      listDistrictPermanent={listDistrictPermanent}
      setProvinceIdSelectedPermanent={setProvinceIdSelectedPermanent}
      setProvinceIdSelected={setProvinceIdSelected}
      userProfile={userProfile || {}}
      {...props}
    />
  );
}
