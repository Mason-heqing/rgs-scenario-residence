/**
 * Created by Leiyalin on 2019/4/3.
 */

// const socket = {
//   // namespaced: true, //避免模块命名冲突，类似style中的scoped
//   state: {
//     data: undefined
//   },
//   mutations: {
//     //储存socket
//     SET_SOCKETDATA: (state, socketData) => {
//       state.data = socketData;
//     }
//   },
//   actions: {}
// }

// export default socket



import utils from '../../utils/tools.js'
const state = {
  data: '这是socket初始信息', //websocket收到的信息this.$store.state.socket.scenic_id

}
const getters = { //实时监听state值的变化(最新状态)
  changeData(state) { //承载变化的scenic_id的值
    return state.data
  },
};

const mutations = { //组件里这样使用this.$store.commit('changeData',id)
  changeData(state, data) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.data = data;
    utils.setStore('socketData', data)
  },
}

const actions = {

}
utils.getStore('socketData') ? state['data'] = utils.getStore('socketData') : ''

export default {
  state,
  mutations,
  actions,
  getters,
};
