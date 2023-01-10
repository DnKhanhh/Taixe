import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useState, useEffect} from 'react';

const useSaveAddress = () => {
  const [recentlyAddress, setRecentlyAddress] = useState([]);

  const addItemSelectToRecentAddress = async item => {
    if (recentlyAddress?.length > 5) {
      recentlyAddress?.splice(4, 1);
    }
    recentlyAddress?.splice(0, 0, item);
    AsyncStorage.setItem(
      'recentlyAddressStorage',
      JSON.stringify(recentlyAddress),
    );
  };

  const getItemSelectToRecentAddress = async () => {
    AsyncStorage.getItem('recentlyAddressStorage', (err, result) => {
      if (err) {
        return;
      }

      setRecentlyAddress(JSON.parse(result || '[]'));
    });
  };

  useEffect(() => {
    async function functionGetAddress() {
      await getItemSelectToRecentAddress();
    }
    functionGetAddress();
    return () => {};
  }, []);

  return {
    recentlyAddress,
    addItemSelectToRecentAddress,
    getItemSelectToRecentAddress,
  };
};

export {useSaveAddress};
