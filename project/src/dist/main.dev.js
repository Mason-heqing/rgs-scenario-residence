"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("./styles/common.scss");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _echarts = _interopRequireDefault(require("echarts"));

var _tools = _interopRequireDefault(require("./utils/tools.js"));

var _elementUi = _interopRequireDefault(require("element-ui"));

var _axios = _interopRequireDefault(require("axios"));

var _en = _interopRequireDefault(require("element-ui/lib/locale/lang/en"));

require("./styles/element-variables.scss");

require("./styles/element.scss");

var _vueBaiduMap = _interopRequireDefault(require("vue-baidu-map"));

var socketApi = _interopRequireWildcard(require("./utils/socket"));

var _jqueryVender = _interopRequireDefault(require("./lib/jquery-vender.js"));

require("bootstrap");

require("admin-lte");

require("bootstrap/dist/css/bootstrap.css");

require("font-awesome/css/font-awesome.css");

require("admin-lte/dist/css/AdminLTE.min.css");

require("admin-lte/dist/css/skins/_all-skins.min.css");

require("bootstrap-table/dist/bootstrap-table.min.css");

require("./styles/_all-skins.min.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
_vue["default"].prototype.$echarts = _echarts["default"];
_elementUi["default"].Dialog.props.closeOnClickModal["default"] = false;

_vue["default"].use(_elementUi["default"], {
  locale: _en["default"]
});

_vue["default"].use(_vueBaiduMap["default"], {
  /* 需要注册百度地图开发者来获取你的ak */
  ak: 'IekAjk0sor8uRqUDkTwmL1oExE1g3jEI'
}); // Vue.use(BaiduMap,{ak:'8EwREgGlo43CLUpOVLwCBsMUkVIlil01'})


_vue["default"].prototype.socketApi = socketApi;
_vue["default"].prototype.$axios = _axios["default"]; // Vue.prototype.webUrl = 'http://192.168.1.27:9007/'
// Vue.prototype.webUrl = 'https://pre.qy-rgs.com:7009'
// http://pre.qy-rgs.com:9007
// Vue.prototype.webUrl = 'http://pre.qy-rgs.com:9007/'

_vue["default"].prototype.utils = _tools["default"];
_vue["default"].prototype.tools = _tools["default"];
_vue["default"].config.productionTip = false;
/* eslint-disable no-new */

new _vue["default"]({
  el: '#app',
  router: _router["default"],
  store: _store["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});