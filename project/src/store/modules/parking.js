import utils from '../../utils/tools.js'

const state = {
    appSecret: '', //appSecret//组件里this.$store.state.parking.appSecret
    parkingId:'', //parkingId//车场ID组件里this.$store.state.parking.parkingId
    parkingName:'', //parkingId//车场名称组件里this.$store.state.parking.parkingName
}
const getters = { //实时监听state值的变化(最新状态)
    getAppSecret(state) { //承载变化的scenic_id的值
        return state.appSecret
    },
    getParkingId(){
        return state.parkingId
    },
    getParkingName(){
        return state.parkingName
    },
};
const actions = {

}
const mutations = { //组件里这样使用this.$store.commit('changeAppSecret',appSecret)
    changeAppSecret(state, appSecret) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.appSecret = appSecret;
        utils.setStore('appSecret', appSecret)
    },
    changeParkingId(state, id) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.parkingId = id;
        utils.setStore('parkingId', id)
    },
    changeParkingName(state, name) { //改变scenic_id值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.parkingName = name;
        utils.setStore('parkingName', name)
    },
}
utils.getStore('appSecret') ? state['appSecret'] = utils.getStore('appSecret') : '';
utils.getStore('parkingId') ? state['parkingId'] = utils.getStore('parkingId') : ''
utils.getStore('parkingName') ? state['parkingName'] = utils.getStore('parkingName') : ''

export default {
    state,
    mutations,
    actions,
    getters,
};