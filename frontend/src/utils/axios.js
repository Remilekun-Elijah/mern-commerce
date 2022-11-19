import Alert from './alert';
import Storage from './storage'

const config = {
 authProps: ['token', 'user'],
 pageUrls: {login: '/login'}
} 
class API_INSTANCE {
 constructor ({ timeout = 100000, url, token } = {}) {
  this.timeout = timeout;
  this.url = url;
  this.token = token;
 }

 create(instance) {
  const API = instance;

  API.defaults.baseURL = this.url;
  API.defaults.timeout = this.timeout;

  API.defaults.headers.common['Authorization'] = this.token || Storage.get(config.authProps[0]);

  const handleSessionExpired = (error) => {
   const isNotAuth = ['authorization', 'auth', 'authorized', 'access forbidden', 'jwt expired', 'jwt', 'Forbidden...You are using an expired token', 'invalid signature'].find(msg => error?.response?.data?.error?.toLowerCase().includes(msg?.toLowerCase()) || error?.response?.data?.message?.toLowerCase().includes(msg?.toLowerCase()))
   const cb = () => setTimeout(_ => window.location.href = config.pageUrls.login, 2000),
    message = 'Session expired, please login again.';

   if ([403].includes(error?.response?.status) && isNotAuth) {
    Storage.remove(config.authProps[0]);
    Storage.remove(config.authProps[1]);
    Alert({ type: 'error', message, cb });
   } else {
    return Promise.reject(error?.response?.data);
   }
  };

  const handleSuccess = (response) => {
   return response;
  };

  API.interceptors.response.use(handleSuccess, handleSessionExpired)

  API.interceptors.request.use(configs => {
   return configs;
  }, error => {
   return Promise.reject(error);
  });

  return API
 }
}


export default API_INSTANCE;