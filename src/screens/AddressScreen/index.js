import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import AddressScreen from 'screens/AddressScreen/view';
import {useActions} from 'hooks/useActions';
import {
  getDetailAddressBookSubmit,
  getListAddressBookSubmit,
} from 'appRedux/actions/addressBookActions';
import NavigationServices from 'navigation/navigationServices';
import {SCENE_NAMES} from 'utils/AppConst';

const LIMIT = 10;
const defaultFilter = {
  page: 1,
  limit: LIMIT,
  lang: 'en',
  orderDirection: 'DESC',
};
export default function ({navigation}) {
  const actions = useActions({
    getListAddressBookSubmit,
    getDetailAddressBookSubmit,
  });
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [listAddressBook, setListAddressBook] = useState([]);
  const [filtersBookAddress, setFiltersBookAddress] = useState({
    ...defaultFilter,
  });
  const [refreshing, setRefreshing] = useState(false);
  const fetchListAddressBook = useCallback(() => {
    const options = {
      callback: data => {
        if (filtersBookAddress.page <= 1) {
          setListAddressBook(data);
        } else {
          setListAddressBook(prevState => [...prevState, ...data]);
        }
      },
      queries: filtersBookAddress,
    };
    actions.getListAddressBookSubmit({...options});
  }, [actions, filtersBookAddress]);
  const refreshData = () => {
    setRefreshing(true);
    setFiltersBookAddress({...defaultFilter});
    setRefreshing(false);
  };
  const loadMore = () => {
    setFiltersBookAddress({
      ...filtersBookAddress,
      page: Math.ceil(listAddressBook.length / LIMIT) + 1,
    });
  };

  const handleGoToDetail = useCallback(
    id => {
      const options = {
        callback: data => {
          NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {
            bookAddressSelected: data,
            isUpdate: true,
          });
        },
        id: id,
      };
      actions.getDetailAddressBookSubmit({...options});
    },
    [actions],
  );
  const handleSearch = useCallback(
    searchKey => {
      if (searchKey === '') {
        setFiltersBookAddress({
          ...defaultFilter,
          page: 1,
        });
      } else {
        setFiltersBookAddress({
          ...filtersBookAddress,
          addressName: searchKey,
          page: 1,
        });
      }
      Keyboard.dismiss();
    },
    [filtersBookAddress],
  );
  const handleFilter = useCallback(
    filter => {
      delete filter?.cityName;
      setFiltersBookAddress({
        ...filtersBookAddress,
        ...filter,
        page: 1,
      });
      setShowModalFilter(false);
    },
    [filtersBookAddress],
  );
  useEffect(() => {
    fetchListAddressBook();
  }, [fetchListAddressBook, filtersBookAddress]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchListAddressBook();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <AddressScreen
      onGoToDetail={handleGoToDetail}
      loadMore={loadMore}
      refreshing={refreshing}
      onRefresh={refreshData}
      listAddress={listAddressBook}
      onSearch={handleSearch}
      onFilter={handleFilter}
      showModalOptions={showModalOptions}
      setShowModalOptions={setShowModalOptions}
      setShowModalFilter={setShowModalFilter}
      showModalFilter={showModalFilter}
      defaultFilter={defaultFilter}
      filtersBookAddress={filtersBookAddress}
    />
  );
}
