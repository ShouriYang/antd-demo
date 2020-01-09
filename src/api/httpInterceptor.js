import axios from 'axios'

export const httpInterceptor = () => {
  axios.interceptors.request.use(config => {
    console.log('执行了我')
    const token = localStorage.token
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }, error => {
    return Promise.reject(error)
  });
}
