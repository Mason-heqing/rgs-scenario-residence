import axios from 'axios'
// axios.defaults.withCredentials = true;
import qs from 'qs';
import Vue from 'vue';
// import router from '@/router/index'
// const vue = new Vue({
//     router
// // });
import ElementUI from 'element-ui';
Vue.use(ElementUI)
import { Message } from 'element-ui'
// Vue.use(Message)
Vue.prototype.$message = Message
import Cookies from 'js-cookie';
export function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
export default {
    getUrl() {
        // var hostname = location.hostname;
        if (location.hostname == 'test.com') {
            return 'https://test.com';
        } else {
            return 'https://main.com';
        }


    },
    //转成表单再传值
    changeJson(data) {
        let str = ''
        for (let item in data) {
            str += encodeURIComponent(item) + '=' + data[item] + '&'
        }
        return str
    },
    //提示弹框
    tip(type, msg) {
        Message({
            type: type,
            duration: 2 * 1000,
            message: msg,
            offset:200
        });
    },
    
    // 电话号码验证
    checkTel() {
        var tel = this.tel;
        if (tel) {
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel))) {
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
        API_URL: process.env.API_HOST,
    },
    //socket时间戳
    formatTimestamp(date) {
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
    getUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
      
        var uuid = s.join("");
        return uuid;
    },

    /**
     * 数据请求
     * post 参数用data
     * get 参数用params
     */
    http(param, callback) {
        // Cookies.set('TOKEN','6399b00b3faf4bc7b5a6930efd5fd9f1');
        let _this = this;
        let URL = param.url;
        let isdevelopment = '';
        URL = param.url.replace('/api/', process.env.API_HOST)
            // URL = param.url.replace('/api/', 'https://testmalladmin.ljsy8.com')
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
            isdevelopment = process.env.API_HOST;//接口域名和网站域名不一致时
        }
        // console.log(isdevelopment + param.url)
        axios({
            method: param.method || "GET",
            url: isdevelopment + param.url,
            // url: URL,
            withCredentials: param.cookie || true, //是否需要带cookie[{key:7c0696adafdb42e79c860001cc9333ef}]
            params: param.params || {},
            data: param.data || {},
            // headers: param.headers || { 'Content-Type': 'application/json;charset=UTF-8'},
            headers: param.headers || { 'Content-Type': 'application/json;charset=UTF-8','token':Cookies.get("TOKEN")},
            // headers: param.headers || { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: param.dataType || 'json',
            //body: param.data || {},
            emulateJSON: true
        }).then((data) => {
            // console.log(data.data);
            if(data.data.code==200){
                callback && callback(data.data);
            }else if(data.data.code==303){
                location.href=data.data.data.url;
                // setTimeout(()=>{
                //     location.href=data.data.datas.url;
                // },2000)
            }else{
                callback && callback(data.data);
                _this.tip('error', data.data.msg);
            }
            
            // console.log(param.successTip)        
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

        },function(data){
            console.log(data)
        });



    },


    /**
     * 存储localStorage
     */
    setStore(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    /**
     * 获取localStorage
     */
    getStore(name) {
        if (!name) return;
        return window.localStorage.getItem(name);
    },
    /**
     * 删除localStorage
     */
    removeStore(name) {
        if (!name) return;
        window.localStorage.removeItem(name);
    },


}