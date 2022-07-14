import axios from 'axios';
import queryString from 'query-string';
import { ROOT_API_URL } from '../constants/common.constant';
const axiosClient = axios.create({
  baseURL: ROOT_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    // if (response.data.data) return response.data.data;
    if (response.data) return response.data;
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    // console.log(error.response);
    if (status === 400) {
      const error = data.message;
      throw new Error(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
