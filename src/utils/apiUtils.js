import axios from 'axios';
import {handleErrorMessage} from 'helpers/handleError';
import {Platform} from 'react-native';
import AppConfigs from 'utils/appConfigs';
const REQUEST_TIMEOUT = 60000;
const API_URL = AppConfigs.API_URL;

export default class APIUtils {
  accessTokenUser = '';
  static setAccessToken(token) {
    this.accessTokenUser = token;
    if (token) {
      this.accessToken = `Bearer ${token}`;
    } else {
      this.accessToken = null;
    }
    console.log('token', token);
  }

  static getAccessToken() {
    return this.accessToken;
  }

  static get(path, params, headers) {
    // console.log('>>>>>Request---->>>>>params', {path: path?.replace('&=&', "&"), params});
    return new Promise((resolve, reject) =>
      axios
        .get(`${API_URL}/${path?.replace('&=&', '&')}`, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'custom-language': 'vi',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
          params,
        })
        .then(response => {
          // console.log('>>>>>>> Response>>>>>> : ' + path + ':', response);
          const {data} = response;
          resolve(data);
          // if (data && data.code === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }

  static post(path, postData, headers) {
    return new Promise((resolve, reject) => {
      console.log('>>>>>>> Request post>>>>>> : ', path, postData);
      axios
        .post(`${API_URL}/${path}`, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'custom-language': 'vi',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
          // if (data && data.status === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static uploadFile(path, file) {
    var fd = new FormData();
    console.log('file', file);
    var newFile = {
      ...file,
      uri:
        Platform.OS === 'android'
          ? file.assets[0].uri
          : file.assets[0].uri.replace('file://', ''),
      name: file.assets[0].fileName || 'my_photo.jpg',
      type: file.assets[0].type || 'image/jpeg',
    };
    fd.append('file', newFile);
    console.log('>>>>>>> Request post>>>>>> : ', path, newFile);
    return new Promise((resolve, reject) =>
      axios
        .post(`${API_URL}/${path}`, fd, {
          Accept: 'application/json',
          timeout: REQUEST_TIMEOUT,
          headers: {
            'custom-language': 'vi',
            'Content-Type': 'multipart/form-data',
            Authorization: this.accessToken,
            // UserId: this.userId,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }

  static postFormData(path, postData) {
    //check!!!

    // const form_data = new FormData();
    // for (let key in postData) {
    //   if (key.endsWith('[]')) {
    //     let values = postData[key].split(',');
    //     console.log('values post', values);
    //     values.forEach(value => {
    //       form_data.append(key, value);
    //     });
    //   } else form_data.append(key, postData[key]);
    // }
    // form_data.append('token', this.accessToken);
    // console.log('>>>>>>> Request>>>>>> : ', form_data);
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/${path}`, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'custom-language': 'vi',
            'Content-Type': 'multipart/form-data',
            Authorization: this.accessToken,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response ', response);
          const {data} = response;
          resolve(data);
          // if (data && data.code === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(handleErrorMessage(err));
        });
    });
  }

  static put(path, updateData) {
    return new Promise((resolve, reject) =>
      axios
        .put(`${API_URL}/${path}`, updateData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
          // if (data && data.code === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(handleErrorMessage(err));
        }),
    );
  }

  static putFormData(path, updateData) {
    return new Promise((resolve, reject) =>
      axios
        .put(`${API_URL}/${path}`, updateData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.accessToken,
          },
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
          // if (data && data.code === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(handleErrorMessage(err));
        }),
    );
  }

  static delete(path, params, headers) {
    return new Promise((resolve, reject) =>
      axios
        .delete(`${API_URL}/${path}`, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'custom-language': 'vi',
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
          data: params,
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          const {data} = response;
          resolve(data);
          // if (data && data.code === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(handleErrorMessage(err));
        }),
    );
  }

  static getGoogleApi(path, params, headers) {
    console.log('>>>>>Request---->>>>>params', {path, params});
    return new Promise((resolve, reject) =>
      axios
        .get(`${API_URL_GOOGLE}/${path}`, {
          timeout: REQUEST_TIMEOUT,
          params,
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ' + path + ':', response);
          const {data} = response;
          resolve(data);
          // if (data && data.code === 200) {
          //   resolve(data);
          // } else {
          //   reject({err: data});
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }
}
