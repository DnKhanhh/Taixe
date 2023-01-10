import React, {useState, useCallback, useEffect} from 'react';
import {TabPersonal} from './view';

//hooks
import {useActions} from 'hooks/useActions';

//actions
import {getListDistrict} from 'appRedux/actions/addressActions';

export default function ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  checkRequiredField,
  setValues,
  setFieldTouched,
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
    <TabPersonal
      listDistrict={listDistrict}
      setSelectedIdProvince={setSelectedIdProvince}
      values={values}
      touched={touched}
      errors={errors}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      checkRequiredField={checkRequiredField}
      setValues={setValues}
      setFieldTouched={setFieldTouched}
    />
  );
}
