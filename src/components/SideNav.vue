<template lang="html">

  <section class="side-nav">
      <v-list dense>
          <router-link link to="/">
            <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link link to="/search">
            <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-magnify</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Search</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link link to="/feed" v-if="loggedIn">
            <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link link to="/settings">
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-tune</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link link to="/login" v-if="!loggedIn">
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-login</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Login/Register</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link link to="/account" v-if="loggedIn">
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                      Account {{$store.getters.user.username ? `(${$store.getters.user.username})` : ''}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </router-link>
          <!-- <router-link link to="/chat" v-if="loggedIn">
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-forum</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Chat</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </router-link> -->
          <router-link link to="/submit" v-if="loggedIn">
            <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-upload</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Submit</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
      </v-list>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'side-nav',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {
      loggedIn(){
        return this.$store.getters.authenticated
      }
    }
}


</script>

<style scoped lang="scss">
.side-nav {
}

a {
  text-decoration: none;
}
</style>
