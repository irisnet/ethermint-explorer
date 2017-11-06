// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import web3 from 'web3'
import VueI18n from 'vue-i18n'
import numeral from "numeral"
import moment from "moment"
import ethformatter from "./utils/ethformatter.js"

var config = new (require('./utils/config'))();
Vue.prototype.nameformatter = new (require('./utils/nameformatter.js'))(config);
Vue.prototype.moment = moment;
Vue.prototype.ethformatter = ethformatter;
Vue.prototype.numeral = numeral;
Vue.prototype.web3 = new web3();
Vue.prototype.web3.setProvider(new web3.providers.HttpProvider("http://10.10.0.1:8546"));
Vue.prototype.service = new (require('./utils/service.js'))(Vue.prototype.web3);
import {Pagination} from 'element-ui'

Vue.use(Pagination)

import './assets/stylesheets/normalize.css'
import './assets/stylesheets/style.css'

Vue.config.productionTip = false


Vue.use(VueI18n)
router.beforeEach((to, from, next) => {
  if ((to.query.lang)&&(to.query.lang=='EN'||to.query.lang=='CN')) {
    localStorage.locale = to.query.lang
    i18n.locale = localStorage.locale
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: {App}
})
