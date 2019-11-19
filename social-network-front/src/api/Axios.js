import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    
    if(error.response.data.loggedOut){
          localStorage.clear();
    }
    return Promise.reject(error);
  });

export default axios;