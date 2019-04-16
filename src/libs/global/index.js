global.apiUrl = window.g.api;

global.install = Vue => {
  Vue.prototype.GLOBAL = global;
};

export default global;
