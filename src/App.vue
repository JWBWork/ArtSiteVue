<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped style="z-index: 11">
      <SideNav />
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      dense
      id="app-bar"
      :hide-on-scroll="$vuetify.breakpoint.smAndDown"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>HF</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        class="mb-0 mt-5"
        v-model="searchString"
        @keyup.enter="search"
      >
        <v-icon slot="prepend" @click="search"> mdi-magnify </v-icon>
        <v-icon slot="append" @click="searchString = ''"> mdi-close </v-icon>
      </v-text-field>
      <v-spacer></v-spacer>
      <router-link
        v-show="$store.getters.authenticated"
        link
        :to="{ name: 'Chat' }"
      >
        <v-icon>mdi-forum</v-icon>
      </router-link>
      <LogoutBtn v-show="$store.getters.authenticated" />
      <v-btn
        v-show="!$store.getters.authenticated"
        @click="$router.push('/login')"
        >Log In</v-btn
      >
    </v-app-bar>

    <v-content id="content">
      <v-container>
        <v-row>
          <v-col cols="12" class="py-0 my-0">
            <router-view :key="$route.path" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>-->
    <v-snackbar :value="snackbarMessage">
      {{ snackbarMessage }}
      <v-btn @click="clearSnackbar">close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
// import UploadPicture from "./components/UploadPicture";
import SideNav from "./components/SideNav";
import LogoutBtn from "./components/LogoutBtn";
import api from "@/api";

export default {
  components: {
    // UploadPicture,
    SideNav,
    LogoutBtn,
  },

  props: {
    // source: String,
  },

  data: () => ({
    drawer: null,
    searchString: "",
  }),

  computed: {
    snackbarMessage() {
      return this.$store.getters.snackbarMessage;
    },
  },

  watch: {
    snackbarMessage() {
      setTimeout(() => {
        this.clearSnackbar();
      }, 3000);
    },
  },

  methods: {
    clearSnackbar() {
      this.$store.dispatch("resetSnackbar");
    },
    search() {
      let trimmedSearchString = this.searchString.trim();
      if (trimmedSearchString != "") {
        api
          .search(trimmedSearchString)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            this.$store.dispatch("setSnackbar", error.response.data.message);
          });
      }
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#app-bar {
  z-index: 10;
}

#content {
  // height: calc(100vh - 48px);
  // overflow-y: auto;
  // height: 80vh;
}
</style>
