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
          <router-link link to="/about">
            <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link link to="/submit">
            <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-upload</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Submit</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <v-list-item link>
              <v-list-item-action>
                  <v-icon>mdi-tune</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-item link>
              <v-list-item-action>
                  <v-icon>mdi-view-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>Account</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
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
