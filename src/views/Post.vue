<template lang="html">

  <section class="post">
    <Post v-if="post" :post="post"></Post>
  </section>

</template>

<script lang="js">
  import Post from '@/components/Post';
  import axios from 'axios';

  export default  {
    name: 'post',
    props: [],
    components: {Post},
    mounted () {
      const routerParams = this.$route.params;
      console.log('routerParams', routerParams);
      if (routerParams.post){
        var post = routerParams.post
        // Assuimg the author is the logged in user after submit
        post.author_username = this.$store.getters.user.username;
        this.post = routerParams.post;
      } else {
        this.$nextTick(() => {
          axios.get(
              '/post', {params: {id: routerParams.postId}}
          ).then(response => {
              console.log(response);
              this.post = response.data.posts[0];
          }).catch(error => {
              console.log(error);
          });
        });
      }
    },
    data () {
      return {
        post: null
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .post {

  }
</style>
