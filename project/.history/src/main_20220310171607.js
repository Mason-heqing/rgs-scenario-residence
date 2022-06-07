// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles/common.scss';
import Vue from 'vue'
import App from './App';
import router from './router';
import store from './store';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import tools from './utils/tools.js';
import utils from './utils/tools.js';
import ElementUI from 'element-ui';
import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import './styles/element-variables.scss';
import './styles/element.scss';
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI, { locale });
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  /* 需要注册百度地图开发者来获取你的ak */
  ak: 'IekAjk0sor8uRqUDkTwmL1oExE1g3jEI'
})
// Vue.use(BaiduMap,{ak:'8EwREgGlo43CLUpOVLwCBsMUkVIlil01'})
import * as socketApi from './utils/socket'
Vue.prototype.socketApi = socketApi
Vue.prototype.$axios = axios
// Vue.prototype.webUrl = 'http://192.168.1.27:9007/'
// Vue.prototype.webUrl = 'https://pre.qy-rgs.com:7009'
// http://pre.qy-rgs.com:9007
// Vue.prototype.webUrl = 'http://pre.qy-rgs.com:9007/'
Vue.prototype.utils = utils;
Vue.prototype.tools = tools;
import jQuery from './lib/jquery-vender.js'
import 'bootstrap'
import 'admin-lte'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import './styles/_all-skins.min.css';


Vue.config.productionTip = false //关闭vue的生产提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
