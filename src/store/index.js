import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "http://127.0.0.1:5000/" // TODO: set up base URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    }
})

