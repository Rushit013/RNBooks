import EnvironmentStore from '../utils/EnvironmentStore';
import RNFetchBlob from 'rn-fetch-blob';

export default class HttpClient {
  static url(path) {
    var host = EnvironmentStore.getApiHost('live');
    return host + '/' + path;
  }

  static async get(path) {
    try {
      let url = this.url(path);
      let response;

      await RNFetchBlob.fetch('GET', url, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
        .then(res => {
          response = res.json();
        })
        .catch((errorMessage, statusCode) => {
          response = null;
          console.log('Service issue:', errorMessage);
        });
      return response;
    } catch (error) {
      console.log('Service issue:', error);
    }
  }

  static async post(path, data) {
    try {
      let url = this.url(path);
      let response;

      await RNFetchBlob.fetch(
        'POST',
        url,
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data,
      )
        .then(res => {
          response = res.text();
        })
        .catch((errorMessage, statusCode) => {
          response = null;
          console.log('Service issue:', errorMessage);
        });
      return response;
    } catch (error) {
      console.log('Service issue:', error);
    }
  }
}
