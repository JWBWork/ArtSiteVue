<template lang="html">

  <section class="search">
    <!-- <Feed :postsArray='this.$route.query.searchResults'/> -->
    <Feed :postsArray='searchResults'/>
  </section>

</template>

<script lang="js">
  import Feed from '@/components/Feed'
  import api from "@/api";

  export default  {
    name: 'search',
    props: [
    ],
    components: {
      Feed
    },
    mounted () {
      this.$nextTick(() => {
        console.log(`this.$route.query.searchQuery ${this.$route.query.searchQuery}`)
        this.search()
      });
    },
    data () {
      return {
        searchResults: []
      }
    },
    methods: {
      search() {
        api.search(
          this.$route.query.searchQuery
        ).then((response) => {
          console.log(`${response.data.posts.length} results`)
          this.searchResults = response.data.posts
        }).catch((error) => {
          this.$store.dispatch("setSnackbar", error);
        });
      }
    },
    computed: {

    },
    watch: {
      "$route.query.searchQuery"() {
        this.search();
      },
    }
}


</script>

<style scoped lang="scss">
.search {
}
</style>
