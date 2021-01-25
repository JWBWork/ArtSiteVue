import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Submit from "../views/Submit.vue";
import RegisterLoginPage from "../views/RegisterLoginPage.vue";
import Post from "../views/Post.vue";
import Dashboard from "../views/Dashboard.vue";
import Search from "../views/Search.vue";
// import Chat from "../views/Chat.vue";
import UnderConstruction from "../views/UnderConstruction.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/submit",
    name: "Submit",
    component: Submit,
  },
  {
    path: "/settings",
    name: "Settings",
    component: UnderConstruction,
  },
  {
    path: "/account",
    name: "Account",
    component: User,
    meta: { reqAuth: true },
  },
  {
    path: "/user/:username",
    name: "User",
    component: User,
  },
  {
    path: "/login",
    name: "RegisterLoginPage",
    component: RegisterLoginPage,
  },
  {
    path: "/post/:postId",
    name: "Post",
    component: Post,
    props: true,
  },
  {
    path: "/feed",
    name: "Feed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: "/chat",
  //   name: "Chat",
  //   component: Chat,
  //   meta: { reqAuth: true },
  //   props: true,
  // },
  {
    path: "/search",
    name: "Search",
    component: Search,
    // props: true,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let authenticated = store.getters.authenticated;
  if (to.path != "/login" && to.matched.some((record) => record.meta.reqAuth)) {
    // let authenticated = false //replace with vuex store auth call
    console.log("authenticated status " + authenticated);
    if (!authenticated) {
      console.log("Redirecting to register/login");
      next("/login");
    } else {
      next();
    }
  } else if (to.path == "/login" && authenticated) {
    console.log("Already logged in, directing to account!");
    next("/account");
  } else {
    next();
  }
});

export default router;
