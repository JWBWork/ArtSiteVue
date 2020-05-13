<template lang="html">

  <section class="feed">
    <Post v-for="(post, i) in posts" :key="i" :post="post"/>
  </section>

</template>

<script lang="js">
  import Post from '@/components/Post';
  import axios from 'axios';

  export default  {
    name: 'feed',
    props: ['query'],
    components: {Post},
    mounted () {
      console.log('Feed with query', this.query)
      // var _this = this;
      this.$nextTick(() => {
        console.log('Feed with query', this.query)
        axios.get(
          '/post', {params: this.query}
        ).then(response => {
            console.log(response)
            this.posts = response.data.posts;
        }).catch(e => {
            console.log(e);
        });
      });
    },
    data () {
      return {
        posts: [],
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .feed {

  }
</style>
