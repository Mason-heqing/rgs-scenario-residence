/**
 * Created by csh on 2018/9/21.
 */

import utils from '../../utils/tools.js'

const state = {
    projectId: '', //景区id//组件里this.$store.state.project.projectId
    projectName:'',
}
const getters = { //实时监听state值的变化(最新状态)
    getProjectId(state) { //承载变化的scenic_id的值
        return state.projectId
    },
    getprojectName(){
        return state.projectName
    },
};
const actions = {

}
const mutations = { //组件里这样使用this.$store.commit('changeProjectId',id)
    changeProjectId(state, id) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.projectId = id;
        utils.setStore('projectId', id)
    },
    changeProjectName(state, name) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.projectName = name;
        utils.setStore('projectName', name)
    },
}
utils.getStore('projectId') ? state['projectId'] = utils.getStore('projectId') : '';
utils.getStore('projectName') ? state['projectName'] = utils.getStore('projectName') : ''

export default {
    state,
    mutations,
    actions,
    getters,
};