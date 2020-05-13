import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = "http://127.0.0.1:5000/" // TODO: set up base URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// TODO: check token expiration on load?
// function authLoad(){
//     let auth_token = localStorage.getItem('auth_token')
// }
function getLocalUser(){
    // TODO: replace with API call, more secure
    try {
        return JSON.parse(localStorage.getItem('user'))
    } catch(e) {
        return null
    }
}
function getAuthToken(){
    try {
        const authToken = localStorage.getItem('auth_token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
        return authToken;
    } catch(e) {
        return null
    }
}
getLocalUser();
export default new Vuex.Store({
    state: {
        auth_token: getAuthToken(),
        user: getLocalUser(),
    },
    getters: {
        authenticated(state){
            return state.auth_token !== null
        },
        user(state){
            return state.user
        }
    },
    mutations: {
        retrieveToken(state, auth_token){
            state.auth_token = auth_token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`
        },
        removeToken(state) {
            state.auth_token = null;
            axios.defaults.headers.common['Authorization'] = null
        },
        setUser(state, user) {
            state.user = user;
        },
        removeUser(state) {
            state.user = null;
        }
    },
    actions: {
        login(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post(
                    '/login', credentials
                ).then(response => {
                    console.log(response);
                    const auth_token = response.data.auth_token;
                    context.commit('retrieveToken', auth_token);
                    localStorage.setItem('auth_token', auth_token);
                    this.dispatch('setUser').then(user_response=>{
                        console.log(user_response);
                        resolve(response);
                    });
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },
        register(context, new_user_info) {
            return new Promise((resole, reject) => {
                axios.post(
                    '/register', new_user_info
                ).then(response => {
                    console.log(response);
                    resole(response)
                }).catch(error => {
                    reject(error);
                });
            })
        },
        // auth_status(context) {
        //     const token = context.state.auth_token;
        //     return token ? true : false;
        // },
        logout(context) {
            return new Promise((resolve, reject) => {
                axios.post(
                    '/logout'
                ).then(response => {
                    console.log(response);
                    context.commit('removeToken');
                    context.commit('removeUser');
                    localStorage.removeItem('auth_token');
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    console.log(error.resposne);
                    reject(error);
                });
            });
        },
        setUser(context) {
            return new Promise((resolve, reject) => {
                axios.get(
                    '/user'
                ).then(response => {
                    console.log(response);
                    const user = response.data.user;
                    context.commit('setUser', user);
                    localStorage.setItem('user', JSON.stringify(user));
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },
        submitPost(context, formData){
            return new Promise((resolve, reject) => {
                axios.post(
                    'post', formData
                ).then(response => {
                    console.log(response)
                    resolve(response);
                }).catch(error => {
                    console.log(error);
                    context.dispatch('logout');
                    reject(error);
                });
            });
        },
        submitComment(context, comment){
            return new Promise((resolve, reject) => {
                axios.post(
                    'comment', comment
                ).then(response => {
                    console.log(response);
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    // TODO: logout if not authenticated
                    // context.dispatch('logout');
                    reject(error);
                })
            })
        }
    }
})

