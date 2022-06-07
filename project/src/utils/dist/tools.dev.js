"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomWord = randomWord;
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _vue = _interopRequireDefault(require("vue"));

var _elementUi = _interopRequireWildcard(require("element-ui"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// axios.defaults.withCredentials = true;
// import router from '@/router/index'
// const vue = new Vue({
//     router
// // });
_vue["default"].use(_elementUi["default"]);

_vue["default"].prototype.$message = _elementUi.Message;

function randomWord(randomFlag, min, max) {
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 随机产生

  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }

  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }

  return str;
}

var _default = {
  getUrl: function getUrl() {
    // var hostname = location.hostname;
    if (location.hostname == 'test.com') {
      return 'https://test.com';
    } else {
      return 'https://main.com';
    }
  },
  //转成表单再传值
  changeJson: function changeJson(data) {
    var str = '';

    for (var item in data) {
      str += encodeURIComponent(item) + '=' + data[item] + '&';
    }

    return str;
  },
  //提示弹框
  tip: function tip(type, msg) {
    (0, _elementUi.Message)({
      type: type,
      duration: 2 * 1000,
      message: msg,
      offset: 200
    });
  },
  // 电话号码验证
  checkTel: function checkTel() {
    var tel = this.tel;

    if (tel) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel)) {
        this.$message.error('电话号码格式有误，请重新填写');
      }
    } else {
      this.$message({
        message: '电话号码不能为空',
        duration: 2 * 1000,
        type: 'warning'
      });
    }
  },
  global: {
    API_URL: process.env.API_HOST
  },
  //socket时间戳
  formatTimestamp: function formatTimestamp(date) {
    var str = date.getFullYear().toString();

    if (date.getMonth() < 10) {
      str += "0";
    }

    str += date.getMonth() + 1;

    if (date.getDate() < 10) {
      str += "0";
    }

    str += date.getDate();

    if (date.getHours() < 10) {
      str += "0";
    }

    str += date.getHours();

    if (date.getMinutes() < 10) {
      str += "0";
    }

    str += date.getMinutes();

    if (date.getSeconds() < 10) {
      str += "0";
    }

    str += date.getSeconds();
    return str;
  },
  //生成一个唯一的
  getUUID: function getUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }

    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  },

  /**
   * 数据请求
   * post 参数用data
   * get 参数用params
   */
  http: function http(param, callback) {
    // Cookies.set('TOKEN','6399b00b3faf4bc7b5a6930efd5fd9f1');
    var _this = this;

    var URL = param.url;
    var isdevelopment = '';
    URL = param.url.replace('/api/', process.env.API_HOST); // URL = param.url.replace('/api/', 'https://testmalladmin.ljsy8.com')
    // console.log(process.env.API_HOST, URL)
    // if(param.method=='GET'||param.method=='get'){
    //   //param.params.token=localStorage.getItem("res");
    // }else{
    //   param.data.token=localStorage.getItem("res");
    // };
    // console.log(URL)

    if (process.env.NODE_ENV == 'development') {
      isdevelopment = '/api';
    } else {
      // isdevelopment = '';//接口域名和网站域名一致时
      isdevelopment = process.env.API_HOST; //接口域名和网站域名不一致时
    } // console.log(isdevelopment + param.url)


    (0, _axios["default"])({
      method: param.method || "GET",
      url: isdevelopment + param.url,
      // url: URL,
      withCredentials: param.cookie || true,
      //是否需要带cookie[{key:7c0696adafdb42e79c860001cc9333ef}]
      params: param.params || {},
      data: param.data || {},
      // headers: param.headers || { 'Content-Type': 'application/json;charset=UTF-8'},
      headers: param.headers || {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': _jsCookie["default"].get("TOKEN")
      },
      // headers: param.headers || { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: param.dataType || 'json',
      //body: param.data || {},
      emulateJSON: true
    }).then(function (data) {
      // console.log(data.data);
      if (data.data.code == 200) {
        callback && callback(data.data);
      } else if (data.data.code == 303) {
        location.href = data.data.data.url; // setTimeout(()=>{
        //     location.href=data.data.datas.url;
        // },2000)
      } else {
        callback && callback(data.data);

        _this.tip('error', data.data.msg);
      } // console.log(param.successTip)        
      // if (data.data.status == "0") {
      //     callback && callback(data.data.data);
      //     //查询类成功不需弹框
      //     if (param.successTip) {
      //         _this.tip('success', data.data.msg);
      //     }
      //     if (param.login) {
      //         _this.tip('success', data.data.msg);
      //     }
      // } else if (data.data.status == "-2") {
      //     Cookies.remove('loginAccount');
      //     _this.tip('error', data.data.msg);
      //     setTimeout(() => {
      //         vue.$router.go(0)
      //     }, 1500)
      // } else {
      //     _this.tip('error', data.data.msg);
      // }

    }, function (data) {
      console.log(data);
    });
  },

  /**
   * 存储localStorage
   */
  setStore: function setStore(name, content) {
    if (!name) return;

    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }

    window.localStorage.setItem(name, content);
  },

  /**
   * 获取localStorage
   */
  getStore: function getStore(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },

  /**
   * 删除localStorage
   */
  removeStore: function removeStore(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },

  /**
   * 阿拉伯数字转换为简写汉字
   */
  Arabia_To_SimplifiedChinese: function Arabia_To_SimplifiedChinese(Num) {
    for (var i = Num.length - 1; i >= 0; i--) {
      Num = Num.replace(",", ""); //替换Num中的“,”

      Num = Num.replace(" ", ""); //替换Num中的空格
    }

    if (isNaN(Num)) {
      //验证输入的字符是否为数字
      //alert("请检查小写金额是否正确");
      return;
    } //字符处理完毕后开始转换，采用前后两部分分别转换


    var part = String(Num).split(".");
    var newchar = ""; //小数点前进行转化

    for (var i = part[0].length - 1; i >= 0; i--) {
      if (part[0].length > 10) {
        //alert("位数过大，无法计算");
        return "";
      } //若数量超过拾亿单位，提示


      var tmpnewchar = "";
      var perchar = part[0].charAt(i);

      switch (perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;

        case "1":
          tmpnewchar = "一" + tmpnewchar;
          break;

        case "2":
          tmpnewchar = "二" + tmpnewchar;
          break;

        case "3":
          tmpnewchar = "三" + tmpnewchar;
          break;

        case "4":
          tmpnewchar = "四" + tmpnewchar;
          break;

        case "5":
          tmpnewchar = "五" + tmpnewchar;
          break;

        case "6":
          tmpnewchar = "六" + tmpnewchar;
          break;

        case "7":
          tmpnewchar = "七" + tmpnewchar;
          break;

        case "8":
          tmpnewchar = "八" + tmpnewchar;
          break;

        case "9":
          tmpnewchar = "九" + tmpnewchar;
          break;
      }

      switch (part[0].length - i - 1) {
        case 0:
          tmpnewchar = tmpnewchar;
          break;

        case 1:
          if (perchar != 0) tmpnewchar = tmpnewchar + "十";
          break;

        case 2:
          if (perchar != 0) tmpnewchar = tmpnewchar + "百";
          break;

        case 3:
          if (perchar != 0) tmpnewchar = tmpnewchar + "千";
          break;

        case 4:
          tmpnewchar = tmpnewchar + "万";
          break;

        case 5:
          if (perchar != 0) tmpnewchar = tmpnewchar + "十";
          break;

        case 6:
          if (perchar != 0) tmpnewchar = tmpnewchar + "百";
          break;

        case 7:
          if (perchar != 0) tmpnewchar = tmpnewchar + "千";
          break;

        case 8:
          tmpnewchar = tmpnewchar + "亿";
          break;

        case 9:
          tmpnewchar = tmpnewchar + "十";
          break;
      }

      newchar = tmpnewchar + newchar;
    } //替换所有无用汉字，直到没有此类无用的数字为止


    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
      newchar = newchar.replace("零亿", "亿");
      newchar = newchar.replace("亿万", "亿");
      newchar = newchar.replace("零万", "万");
      newchar = newchar.replace("零零", "零");
    } //替换以“一十”开头的，为“十”


    if (newchar.indexOf("一十") == 0) {
      newchar = newchar.substr(1);
    } //替换以“零”结尾的，为“”


    if (newchar.lastIndexOf("零") == newchar.length - 1) {
      newchar = newchar.substr(0, newchar.length - 1);
    }

    return newchar;
  }
};
exports["default"] = _default;