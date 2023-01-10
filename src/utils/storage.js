import AsyncStorage from '@react-native-async-storage/async-storage';

function clear() {
  return AsyncStorage.clear();
}

async function get(key, defaultValue = null) {
  try {
    console.log('key', key);
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

function set(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

function remove(key) {
  return AsyncStorage.removeItem(key);
}

function multiGet(...keys) {
  return AsyncStorage.multiGet([...keys]).then(stores => {
    const data = {};
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1]);
    });
    return data;
  });
}

function multiRemove(...keys) {
  return AsyncStorage.multiRemove([...keys]);
}

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
};
