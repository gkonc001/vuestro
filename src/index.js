//
// This file is only used for the standalone test instance
// this file is not used when Vuestro is used as a Vue plugin
//

/* global Vue */

import Vuestro from './plugin';
Vue.use(Vuestro);

import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';

// disable production tip
Vue.config.productionTip = false;

console.log('VUESTRO DEV MODE');
let oldConsoleLog = console.log;
console.log = function() {
  try {
    let body = [];
    for (let a of arguments) {
      body.push(JSON.stringify(a));
    }
    axios.post('/vuestro-dev-console/log', body);
  } catch (e) {}
  oldConsoleLog(...arguments);
};
let oldConsoleWarn = console.warn;
console.warn = function() {
  try {
    let body = [];
    for (let a of arguments) {
      body.push(JSON.stringify(a));
    }
    axios.post('/vuestro-dev-console/warn', body);
  } catch (e) {}
  oldConsoleWarn(...arguments);
};
let oldConsoleError = console.error;
console.error = function() {
  try {
    let body = [];
    for (let a of arguments) {
      body.push(JSON.stringify(a));
    }
    axios.post('/vuestro-dev-console/error', body);
  } catch (e) {}
  oldConsoleError(...arguments);
};
let oldConsoleInfo = console.info;
console.info = function() {
  try {
    let body = [];
    for (let a of arguments) {
      body.push(JSON.stringify(a));
    }
    axios.post('/vuestro-dev-console/info', body);
  } catch (e) {}
  oldConsoleInfo(...arguments);
};

console.log('-> testing browser-side dev console forwarding');

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  data() {
    return {
      mobile: false, // $root flag for mobile mode
    };
  },
  components: {
    App
  }
});
