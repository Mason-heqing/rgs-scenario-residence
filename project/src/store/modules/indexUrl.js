/**
 * Created by csh on 2018/9/21.
 */

import utils from '../../utils/tools.js'

const state = {
    indexUrl: '', //景区id//组件里this.$store.state.project.projectId
}
const getters = { //实时监听state值的变化(最新状态)
    getIndexUrl(state) { //承载变化的scenic_id的值
        return state.indexUrl
    },
};
const actions = {

}
const mutations = { //组件里这样使用this.$store.commit('changeProjectId',id)
    changeIndexUrl(state, id) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.indexUrl = id;
        utils.setStore('indexUrl', id)
    },
}
utils.getStore('indexUrl') ? state['indexUrl'] = utils.getStore('indexUrl') : ''

export default {
    state,
    mutations,
    actions,
    getters,
};