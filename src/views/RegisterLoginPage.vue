<template lang="html">

  <section class="register-login-page">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <Register/>
      </v-col>
    </v-row>
  </section>

</template>

<script lang="js">
import Register from "@/components/Register.vue"

  export default  {
    name: 'register-login-page',
    props: [],
    components: {
      Register
    },
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
  .register-login-page {

  }
</style>
