import iView from "iview";
import axios from "axios";
import global from "../global/index";

axios.defaults.baseURL = global.apiUrl;
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    iView.Notice.error({
      desc: `${error.message}`,
      duration: 0
    });
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      iView.Notice.error({
        title: `${error.response.status}`,
        desc: `${error.response.data.msg}`,
        duration: 0
      });
    } else {
      iView.Notice.error({
        desc: `${error.message}`,
        duration: 0
      });
    }
    return Promise.reject(error);
  }
);

axios.install = Vue => {
  Vue.prototype.$axios = axios;
};

export default axios;
