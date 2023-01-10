import React, {useCallback, useEffect, useState} from 'react';
import {TabAddress} from './view';

//actions
import {useActions} from 'hooks/useActions';
import {getListDistrict} from 'appRedux/actions/addressActions';

export default function ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  checkRequiredField,
  sameAddress,
  setSameAddress,
  listProvince,
  setValues,
}) {
  const actions = useActions({getListDistrict});

  const [provinceId, setProvinceId] = useState(null);
  const [dataDistrict, setDataDistrict] = useState([]);
  // console.log('dataDistrict: ', dataDistrict);

  const getListDistrictById = useCallback(() => {
    const options = {
      callback: res => {
        setDataDistrict(res);
      },
      idProvince: provinceId,
    };
    actions.getListDistrict({...options});
  }, [provinceId, actions]);

  useEffect(() => {
    if (provinceId) {
      getListDistrictById();
    }
    return () => {};
  }, [provinceId]);

  return (
    <TabAddress
      values={values}
      touched={touched}
      errors={errors}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      checkRequiredField={checkRequiredField}
      sameAddress={sameAddress}
      setSameAddress={setSameAddress}
      listProvince={listProvince}
      setProvinceId={setProvinceId}
      setValues={setValues}
      dataDistrict={dataDistrict}
    />
  );
}
