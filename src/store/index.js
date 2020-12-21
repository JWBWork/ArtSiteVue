import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import CONST from "@/constants";

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = CONST.BASE_URL; // TODO: set up base URL
// Vue.axios.defaults.baseURL = "http://5b3034f09a41.ngrok.io/"; // TODO: set up base URL
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// TODO: check token expiration on load?
// function authLoad(){
//     let auth_token = localStorage.getItem('auth_token')
// }
function getLocalUser() {
  // TODO: replace with API call, more secure
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
}
function getAuthToken() {
  try {
    const authToken = localStorage.getItem("auth_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    return authToken;
  } catch (e) {
    return null;
  }
}
getLocalUser();
export default new Vuex.Store({
  state: {
    auth_token: getAuthToken(),
    user: getLocalUser(),
    snackbarMessage: null,
    chats: null,
  },
  getters: {
    authenticated(state) {
      return state.auth_token !== null;
    },
    user(state) {
      return state.user;
    },
    snackbarMessage(state) {
      return state.snackbarMessage;
    },
    chats(state) {
      return state.chats;
    },
  },
  mutations: {
    retrieveToken(state, auth_token) {
      console.log("!!!auth_token, user_id", auth_token);
      state.auth_token = auth_token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth_token}`;
      this._vm.$socket.connect();
    },
    removeToken(state) {
      state.auth_token = null;
      axios.defaults.headers.common["Authorization"] = null;
      this._vm.$socket.disconnect();
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    setChats(state, chats) {
      // TODO: store chatlog in locallStore?
      // would have to update on each message push / recieve ...
      state.chats = chats;
    },
    appendChat(state, newChat) {
      const exists = state.chats.some(
        (chat) => chat.room_name == newChat.room_name
      );
      if (exists) {
        state.chats = state.chats.map((chat) => {
          chat = chat.room_name == newChat.room_name ? newChat : chat;
          return chat;
        });
      } else {
        state.chats.push(newChat);
      }
    },
    setSnackbar(state, message) {
      state.snackbarMessage = message;
    },
    resetSnackbar(state) {
      state.snackbarMessage = null;
    },
    appendFollow(state, userToFollow) {
      state.user.following.push(userToFollow);
    },
    removeFollow(state, userToUnfollow) {
      state.user.following = state.user.following.filter(
        (user) => user.id != userToUnfollow.id
      );
    },
    appendMessage(state, message) {
      //TODO: create chat if none exist?
      if (state.chats) {
        var chat = state.chats.find(
          (chat) => chat.roomName == message.roomName
        );
        chat.messages.push(message);
      } else {
        state.chats = [
          {
            roomName: message.roomName,
            messages: [message],
          },
        ];
      }
    },
  },
  actions: {
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", credentials)
          .then((response) => {
            console.log("LOGIN RESPONSE");
            console.log(response);
            const auth_token = response.data.auth_token;
            context.commit("retrieveToken", auth_token);
            localStorage.setItem("auth_token", auth_token);
            context.commit("setUser", response.data.user);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    register(context, new_user_info) {
      return new Promise((resole, reject) => {
        axios
          .post("/register", new_user_info)
          .then((response) => {
            console.log(response);
            resole(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        axios
          .post("/logout")
          .then((response) => {
            console.log(response);
            context.commit("removeToken");
            context.commit("removeUser");
            localStorage.removeItem("auth_token");
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.resposne);
            reject(error);
          });
      });
    },
    SOCKET_connect(context) {
      console.log("SOCKET CONNECTED");
      if (context.state.auth_token) {
        this._vm.$socket.emit("auth", {
          authToken: context.state.auth_token,
          userId: context.state.user.id,
        });
      } else {
        this._vm.$socket.disconnect();
      }
    },
    SOCKET_reject(context, data) {
      console.log("CONNECTION REJECTED!");
      context.dispatch("logout");
      context.dispatch("setSnackbar", data.message);
    },
    SOCKET_user_connected(context, data) {
      context.commit("setChats", data.chats);
    },
    SOCKET_room_opened(context, data) {
      context.commit("appendChat", data.chat);
    },
    SOCKET_message(context, data) {
      console.log("message data!", data);
      context.commit("appendMessage", data);
    },
    submitPost(context, formData) {
      return new Promise((resolve, reject) => {
        axios
          .post("post", formData)
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data.message);
            if (error.response.data.message == "Invalid auth provided") {
              context.dispatch("logout");
            }
            reject(error);
          });
      });
    },
    submitComment(context, comment) {
      return new Promise((resolve, reject) => {
        axios
          .post("comment", comment)
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            // TODO: logout if not authenticated?
            // context.dispatch('logout');
            reject(error);
          });
      });
    },
    setSnackbar(context, message) {
      context.commit("setSnackbar", message);
    },
    resetSnackbar(context) {
      context.commit("resetSnackbar");
    },
    updateUser(context, formData) {
      return new Promise((resolve, reject) => {
        axios
          .post("user", formData)
          .then((response) => {
            console.log(response);
            const user = response.data.user;
            context.commit("setUser", user);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    followUser(context, userToFollow) {
      return new Promise((resolve, reject) => {
        axios
          .post("follow", {
            cmd: "follow",
            follower_id: context.state.user.id,
            followed_id: userToFollow.id,
          })
          .then((response) => {
            console.log(response);
            context.commit("appendFollow", userToFollow);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    unfollowUser(context, userToUnfollow) {
      return new Promise((resolve, reject) => {
        axios
          .post("follow", {
            cmd: "unfollow",
            follower_id: context.state.user.id,
            followed_id: userToUnfollow.id,
          })
          .then((response) => {
            context.commit("removeFollow", userToUnfollow);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
});
