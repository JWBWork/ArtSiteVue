<template lang="html">

  <section>
    <v-col cols="12" :class='{"masonry": tileMode}'>
      <v-row 
      :class='{"post": tileMode}'
      v-for="(post, i) in posts"
      align="start"
      justify="center"
      :key="i">
        <Post :post="post" :tileMode="tileMode"/>
      </v-row>
    </v-col>
  </section>

</template>

<script lang="js">
  import Post from '@/components/Post';
  import axios from 'axios';

  export default  {
    name: 'feed',
    props: ['query', 'tileMode'],
    components: {Post},
    mounted () {
      // console.log('Feed with query', this.query)
      // var _this = this;
      this.$nextTick(() => {
        // console.log('Feed with query', this.query)
        axios.get(
          '/post', {params: this.query}
        ).then(response => {
            // console.log(response)
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

.masonry {
  column-count: 3;
  column-gap: 0.5em;
}

.post {
  display: inline-block;
  margin: 0;
  width: 100%;
}
</style>
