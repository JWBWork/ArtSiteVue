<template lang="html">

  <section class="logout-btn">
    <v-btn @click="logout">Logout</v-btn>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'logout-btn',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      logout(){
        this.$store.dispatch('logout').then(response =>{
          console.log(response);
          this.$router.push({name: 'Home'});
        }).catch(error => {
          console.log(error);
        });
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .logout-btn {

  }
</style>
