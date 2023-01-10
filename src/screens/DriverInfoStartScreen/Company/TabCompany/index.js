import React, {useState, useCallback, useEffect} from 'react';
import {TabCompany} from './view';

//hooks
import {useActions} from 'hooks/useActions';

//actions
import {getListDistrict} from 'appRedux/actions/addressActions';

export default function ({
  listProvince,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  checkRequiredField,
  setValues,
}) {
  const actions = useActions({getListDistrict});
  const [selectedIdProvince, setSelectedIdProvince] = useState(null);
  const [listDistrict, setListDistrict] = useState([]);

  const getListDistrictFollowIdProvince = useCallback(() => {
    const options = {
      callback: res => {
        setListDistrict(res);
      },
      idProvince: selectedIdProvince,
    };
    actions.getListDistrict({...options});
  }, [actions, selectedIdProvince]);

  useEffect(() => {
    if (selectedIdProvince) {
      getListDistrictFollowIdProvince();
    }
    return () => {};
  }, [selectedIdProvince]);

  return (
    <TabCompany
      listProvince={listProvince}
      listDistrict={listDistrict}
      setSelectedIdProvince={setSelectedIdProvince}
      values={values}
      touched={touched}
      errors={errors}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      checkRequiredField={checkRequiredField}
      setValues={setValues}
    />
  );
}
