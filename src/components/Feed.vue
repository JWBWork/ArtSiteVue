<template lang="html">

  <section>
    
    <v-col cols="12" :style='masonry'>
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
    // props: ['query', 'tileMode', 'postsArray'],
    props: {
      query: Object,
      tileMode: Boolean,
      // ensure this works for postArray in mounted bullshit?
      postsArray: {
        type: [Object, Array],
        default: null
      },
      cols: {
        type: Number,
        default: 1
      }
    },
    components: {Post},
    mounted () {
      this.$nextTick(() => {
        if (this.postsArray) {
          console.log('this.postsArray')
          console.log(this.postsArray)
          this.posts = this.postArray;
        } else {
          axios.get(
            '/post', {params: this.query}
          ).then(response => {
            this.posts = response.data.posts;
          }).catch(e => {
            console.log(e);
          });
        }
        // console.log(`Feed recieved ${this.posts.length} posts`)
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
      masonry() {
        if (this.tileMode) {
          let cols = this.cols ? this.cols : 2;
          return {
            'column-count': cols,
            'column-gap': '0.5em'
          }
        } else {
          return {}
        }
      }
    },
    watch: {
      postsArray(val) {
        this.posts = val;
      }
    }
}


</script>

<style scoped lang="scss">
.feed {
}

// .masonry {
//   column-count: 3;
//   column-gap: 0.5em;
// }

.post {
  display: inline-block;
  margin: 0;
  width: 100%;
}
</style>
