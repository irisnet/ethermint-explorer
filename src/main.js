// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import modal from './components/modalVue/modal';
import {Pagination, Radio} from 'element-ui'


Vue.use(Pagination)
Vue.use(Radio)

import numeral from "numeral"
import moment from "moment"
import ethformatter from "./utils/ethformatter.js"
import utilsConfig from './utils/config'
import utilsNameformatter from './utils/nameformatter.js'
import utilsService from '../public/javascripts/service.js'
import wallet from '../public/javascripts/wallet.js'

var config = new (utilsConfig)();
Vue.prototype.wallet = wallet;
Vue.prototype.nameformatter = new (utilsNameformatter)(config);
Vue.prototype.moment = moment;
Vue.prototype.ethformatter = ethformatter;
Vue.prototype.numeral = numeral;

import web3 from 'web3'

Vue.prototype.web3 = new web3();
Vue.prototype.web3.setProvider(new web3.providers.HttpProvider("http://116.62.62.39:8546"));
Vue.prototype.service = new (utilsService)(Vue.prototype.web3);

import gobal from "./utils/gobal/config"
Vue.prototype.$g = gobal;//注册全局方法
import './assets/stylesheets/normalize.css'
import './assets/stylesheets/style.css'
import store from './vuex/store'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
router.beforeEach((to, from, next) => {
  if ((to.query.lang) && (to.query.lang == 'EN' || to.query.lang == 'CN')) {
    localStorage.locale = to.query.lang;
    i18n.locale = localStorage.locale;
  }
  next()
})

var loacle = localStorage.locale = "EN";

const i18n = new VueI18n({
  locale: loacle,    // 语言标识
  messages: {
    'CN': require('./assets/lang/cn'),   // 中文语言包
    'EN': require('./assets/lang/en')    // 英文语言包
  }
})
Vue.use(modal,i18n)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  i18n,
  template: '<App/>',
  components: {App}
})

