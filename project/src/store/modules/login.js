/**
 * Created by csh on 2018/9/21.
 */

import utils from '../../utils/tools.js'

const state = {
    m_name: '', //登录名this.$store.state.login.m_name
    mch_id: '', //当前id
    token: '', //
}
const getters = { //实时监听state值的变化(最新状态)
    getMchId(state) { //承载变化的mch_id的值
        return state.mch_id
    },
    getMchName(state) { //承载变化的mch_id的值
        return state.m_name
    },
    getToken(state) { //承载变化的mch_id的值
        return state.token
    },
};
const actions = {

}
const mutations = { //组件里这样使用this.$store.commit('changeScenic',id)
    changeAdmin(state, obj) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        console.log(obj)
        state.m_name = obj.name;
        state.mch_id = obj.id;
        state.token = obj.token;
        utils.setStore('m_name', obj.name);
        utils.setStore('mch_id', obj.id);
        utils.setStore('token', obj.token);
    },
}
utils.getStore('m_name') ? state['m_name'] = utils.getStore('m_name') : ''
utils.getStore('mch_id') ? state['mch_id'] = utils.getStore('mch_id') : ''
utils.getStore('token') ? state['token'] = utils.getStore('token') : ''

export default {
    state,
    mutations,
    actions,
    getters,
};