import axios from "axios";
import global from "../global/index";

axios.defaults.baseURL = global.apiUrl;
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
  response => {
    let data = response.data;
    if (data && data.code === "401") {
      console.log("未登录");
      location.href = "/login";
    }

    return response;
  },
  err => {
    if (err && err.response) {
      // err.response.status
      if (err.response.status === "401") {
        location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

axios.install = Vue => {
  Vue.prototype.$axios = axios;
};

export default axios;
