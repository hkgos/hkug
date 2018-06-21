import axios from 'axios';

import { API_TIMEOUT } from '../constants';

/*
Axios Response Schema
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
*/

const client = axios.create({
  timeout: API_TIMEOUT,
  maxContentLength: Number.POSITIVE_INFINITY,
});

// Request Interceptor
// client.interceptors.request.use((config) => {
//   return config;
// }, error => Promise.reject(error)); // Should be a configration error

// Response Interceptor
client.interceptors.response.use(
  (res) => {
    // Bad practice to check error in a success (2xx) response
    // Since the APIs handle error in this way, don't really have a choice...
    if (res.data.success === false || res.data.success === 0) {
      // try to get the error message
      /* eslint-disable camelcase */
      const { error_message, error_msg } = res.data;
      if (typeof error_message === 'string' && error_message.trim() !== '') {
        const err = new Error(error_message);
        return Promise.reject(err);
      }
      if (typeof error_msg === 'string' && error_msg.trim() !== '') {
        const err = new Error(error_msg);
        return Promise.reject(err);
      }
      /* eslint-enable */
      const err = new Error('未知的錯誤');
      return Promise.reject(err);
    }
    return res.data;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // TODO: Map known API error response to Error object
      const err = new Error(error.response.statusText);
      return Promise.reject(err);
    } else if (error.request) {
      // The request was made but no response was received
      // Most likely a network problem
      const err = new Error('網絡發生問題');
      err.network = true;
      return Promise.reject(err);
    }
    // Something happened in setting up the request that triggered an Error
    const err = new Error('內部錯誤');
    err.internal = true;
    return Promise.reject(err);
  },
);

export default client;
