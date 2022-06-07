/**
 *
 * @description 登录授权相关
 *
 */

import Cookies from 'js-cookie'
import store from '@/store'
import utils from '../utils/tools.js'

// 获取登录态
export function getToken() {
    return Cookies.get('user_token')
}

// 设置登录态
export function setToken(xxx) {
    return Cookies.set('user_token', xxx, { expires: 60 })
}

// 设置登录名
export function setUserInfo(xxx) {
    return Cookies.set('user_id', xxx, { expires: 60 })
}

// 登录
export function doLogin(tel, code) {

    return new Promise((resolve, reject) => {

        utils.http({
            url: `/api/services/member/login?phone=${tel}&verifycode=${code}`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
                phone: tel,
                verifycode: code,
                pagename: "登录注册",
                visitpath: '',
                channelsource: 0,
                channelname: '自然流量',
                syscode: 1,
                sysname: 'pc',
                platformcode: 1,
                platformname: 'iptop'
            }
        }, (data) => {
            //返回接口数据
            resolve(data)
        });

    });
}

export function getMebId(token) {

    return new Promise((resolve, reject) => {

        utils.http({
            url: '/api/services/member/getMemberInfoByToken/' + token,
            method: "GET",
            headers: { "Content-Type": "application/json" },
            params: {}
        }, (data) => {
            //返回接口数据

            resolve(data)
        });

    });
}

// 登出
export function loginOut() {
    Cookies.remove('user_token');
    Cookies.remove('user_id');
    Cookies.remove('memberId');
}