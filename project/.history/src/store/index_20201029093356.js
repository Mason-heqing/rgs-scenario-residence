import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login'
import userInfo from './modules/userInfo'
import socket from './modules/socket'
import project from './modules/project'
import indexUrl from './modules/indexUrl'

Vue.use(Vuex);

const state = { //要设置的全局访问的state对象
    scenic_id: 'nice'
};
const store = new Vuex.Store({
    modules: {
        login,
        userInfo,
        socket,
        project,
        indexUrl
    }

})

export default store