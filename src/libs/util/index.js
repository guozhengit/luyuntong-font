const util = {
  setSessionStorageItem(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  getSessionStorageItem(key) {
    let json = sessionStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    } else {
      return undefined;
    }
  }
};

util.install = Vue => {
  Vue.prototype.$util = util;
};

export default util;
