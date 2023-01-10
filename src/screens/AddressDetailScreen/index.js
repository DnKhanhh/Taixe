import React, {useCallback, useEffect, useRef, useState} from 'react';
import AddressDetailScreen from 'screens/AddressDetailScreen/view';
import useSelectorShallow from 'hooks/useSelectorShallowEqual';
import {getListProvinceSelector} from 'appRedux/selectors/addressSelector';
import {useActions} from 'hooks/useActions';
import {
  getListDistrict,
  getListProvince,
  getListWard,
} from 'appRedux/actions/addressActions';
import {
  createAddressBookSubmit,
  updateAddressBookSubmit,
} from 'appRedux/actions/addressBookActions';
import NavigationServices from 'navigation/navigationServices';
const removeFields = values => {
  delete values.cityName;
  delete values.districtName;
  delete values.wardName;
};
export default function ({route}) {
  const {isUpdate, bookAddressSelected} = route.params;
  const listCity = useSelectorShallow(getListProvinceSelector);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [citySelected, setCitySelected] = useState(
    isUpdate ? bookAddressSelected?.cityId : null,
  );
  const [districtSelected, setDistrictSelected] = useState(
    isUpdate ? bookAddressSelected?.districtId : null,
  );
  const [showModalSelectCity, setShowModalSelectCity] = useState(false);
  const [showModalSelectDistrict, setShowModalSelectDistrict] = useState(null);
  const [showModalSelectWard, setShowModalSelectWard] = useState(null);
  const actions = useActions({
    getListProvince,
    getListDistrict,
    getListWard,
    createAddressBookSubmit,
    updateAddressBookSubmit,
  });
  const refTimeOut = useRef(null);

  const handleGetListCity = useCallback(() => {
    if (listCity && listCity.length > 0) {
      setShowModalSelectCity(true);
      return;
    }
    actions.getListProvince();
    refTimeOut.current = setTimeout(() => {
      setShowModalSelectCity(true);
    }, 50);
  }, [actions, listCity]);

  const fetchListDistrict = useCallback(() => {
    if (citySelected) {
      const options = {
        callback: data => {
          setListDistrict(data);
        },
        idProvince: citySelected,
      };
      actions.getListDistrict({...options});
    }
  }, [actions, citySelected]);

  const fetchListWard = useCallback(() => {
    if (districtSelected) {
      const options = {
        callback: data => {
          setListWard(data);
        },
        idDistrict: districtSelected,
      };
      actions.getListWard({...options});
    }
  }, [actions, districtSelected]);
  const handleCreateAddressBook = useCallback(
    values => {
      removeFields(values);
      const options = {
        callback: () => {
          NavigationServices.goBack();
        },
        data: values,
      };
      actions.createAddressBookSubmit({...options});
    },
    [actions],
  );
  const handleUpdateAddressBook = useCallback(
    values => {
      removeFields(values);
      const options = {
        callback: () => {
          NavigationServices.goBack();
        },
        id: bookAddressSelected.id,
        data: values,
      };
      actions.updateAddressBookSubmit({...options});
    },
    [actions, bookAddressSelected?.id],
  );

  useEffect(() => {
    if (citySelected) {
      fetchListDistrict();
    }
    return () => {
      setListDistrict([]);
      setListWard([]);
    };
  }, [citySelected, fetchListDistrict]);

  useEffect(() => {
    if (districtSelected) {
      fetchListWard();
    }
    return () => {
      setListWard([]);
    };
  }, [districtSelected, fetchListWard]);
  useEffect(() => {
    return () => {
      setShowModalSelectDistrict(false);
      setShowModalSelectWard(false);
      setShowModalSelectCity(false);
      clearTimeout(refTimeOut.current);
    };
  }, []);

  return (
    <AddressDetailScreen
      listCity={listCity}
      listDistrict={listDistrict}
      listWard={listWard}
      showModalSelectCity={showModalSelectCity}
      setShowModalSelectCity={setShowModalSelectCity}
      showModalSelectDistrict={showModalSelectDistrict}
      setShowModalSelectDistrict={setShowModalSelectDistrict}
      showModalSelectWard={showModalSelectWard}
      setShowModalSelectWard={setShowModalSelectWard}
      onGetListCity={handleGetListCity}
      setCitySelected={setCitySelected}
      setDistrictSelected={setDistrictSelected}
      onCreateAddressBook={handleCreateAddressBook}
      onUpdateAddressBook={handleUpdateAddressBook}
      isUpdate={isUpdate}
      bookAddressSelected={bookAddressSelected}
    />
  );
}
