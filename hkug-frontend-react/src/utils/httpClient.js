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
//   // TODO: Add Auth headers
//   return config;
// }, error => Promise.reject(error)); // Should be a configration error

// Response Interceptor
// TODO: Error Handling
client.interceptors.response.use(res => res.data, (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    // Most likely a network problem
    return Promise.reject(error);
  }
  // Something happened in setting up the request that triggered an Error
  return Promise.reject(error);
});

export default client;
