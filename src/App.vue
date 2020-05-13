<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <SideNav />
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense 
    :hide-on-scroll="$vuetify.breakpoint.smAndDown">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>HF</v-toolbar-title>
      <v-spacer></v-spacer>
      <LogoutBtn v-show="$store.getters.authenticated"/>
      <v-btn v-show="!$store.getters.authenticated" @click="$router.push('/login')">Log In</v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <router-view :key="$route.path"/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- <v-footer app>
      <span>&copy; 2019</span>
    </v-footer> -->
  </v-app>

</template>

<script>
  // import UploadPicture from "./components/UploadPicture";
  import SideNav from "./components/SideNav";
  import LogoutBtn from "./components/LogoutBtn";

  export default {
    components: {
      // UploadPicture,
      SideNav,
      LogoutBtn
    },

    props: {
      source: String
    },

    data: () => ({
      drawer: null
    }),

    created() {
      this.$vuetify.theme.dark = true;
    }
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
</style>
