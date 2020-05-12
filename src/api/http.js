import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

axios.interceptors.request.use(function (config) {
  console.log("请求")
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  console.log("返回")
  return response;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

export function get({ url, params }) {
  return new Promise((resolve, reject) => {
    http.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export function post({ url, data }) {
  return new Promise((resolve, reject) => {
    http.post(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}