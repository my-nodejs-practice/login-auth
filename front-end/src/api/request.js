import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
// import store from '@/store';
// import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  // config => {
  //   // 发送请求前的处理逻辑
  //   if (store.getters.token) {
  //     // 将token添加到请求header中
  //     config.headers['X-Token'] = getToken();
  //   }
  //   return config;
  // },
  error => {
    // 请求出错处理逻辑
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  // Determine the request status by custom code
  response => {
    const res = response.data;

    // 如果接口返回code不等于0，则判断出错了。
    if (res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else if (code === 400) {
      // 这里假设接口返回400，表示登录失效
      MessageBox.confirm('登录失效，重新登录?', '提示', {
        confirmButtonText: '去登录',
        cancelButtonText: '取消',
        type: 'warning',
      });
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
