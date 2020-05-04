<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <SideNav />
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>HF</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <UploadPicture />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import UploadPicture from "./components/UploadPicture";
import SideNav from "./components/SideNav";

export default {
  components: {
    UploadPicture,
    SideNav
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
