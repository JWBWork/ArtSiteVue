<template lang="html">

  <section class="dashboard">
    <Feed :query='feedQuery'/>
  </section>

</template>

<script lang="js">
  import Feed from '@/components/Feed';

  export default  {
    name: 'dashboard',
    props: [],
    components: {
      Feed,
    },
    data () {
      return {
        feedQuery: {
          'feed': {
            'userId': this.$store.getters.user.id
          }
        },
      }
    },
    created() {

    },
    mounted () {

    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
.dashboard {
}
</style>
