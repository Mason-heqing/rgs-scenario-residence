/**
 * Created by csh on 2018/9/21.
 */

import utils from '../../utils/tools.js'

const state = {
    userName: '', //登录名this.$store.state.userInfo.userName
    creatTime: '', //当前id
    token: '', //
}
const getters = { //实时监听state值的变化(最新状态)
    getName(state) { //承载变化的mch_id的值
        return state.userName
    },
    getCreatTime(state) { //承载变化的mch_id的值
        return state.creatTime
    },
    // getToken(state) { //承载变化的mch_id的值
    //     return state.token
    // },
};
const actions = {

}
const mutations = { //组件里这样使用this.$store.commit('changeUserInfo',id)
    changeUserInfo(state, obj) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        console.log(obj)
        state.userName = obj.userName;
        state.creatTime = obj.createTime;
        utils.setStore('userName', obj.userName);
        utils.setStore('createTime', obj.createTime);
    },
}
utils.getStore('userName') ? state['userName'] = utils.getStore('userName') : ''
utils.getStore('createTime') ? state['createTime'] = utils.getStore('createTime') : ''

export default {
    state,
    mutations,
    actions,
    getters,
};