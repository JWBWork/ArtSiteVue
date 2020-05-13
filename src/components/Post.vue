<template lang="html">

  <section class="post">
    <v-img contain class="v-img"
    :src="post.s3_url"
    v-on:click.ctrl.exact="postNewtab" 
    @dblclick="toggleFullscreen">
      <div id="outer-drawer" v-bar="{preventParentScroll: true}">
        <div id="hover-area"
          @mouseenter="hover=true"></div>
        <div @mouseleave="hover=false" 
          :class="['inner-drawer', hover? 'opaque':'']">
                <h1 style="overflow:hidden;">{{post.title}}</h1>
                <h6>By {{post.author_username}}</h6>
                <p>This is the description on the image</p>
                <v-divider></v-divider>
                <v-subheader>Comments</v-subheader>
                <p v-for="(comment, i) in post.comments" 
                :key="i" class="comment">
                  {{comment}}
                </p>
                <v-textarea dense outlined auto-grow
                label="Comment" 
                v-model="comment"
                hide-details="auto"
                append-icon="mdi-comment"> 
                </v-textarea>
                <v-btn icon @click="submitComment"
                :loading="submittingComment">
                  <v-icon>mdi-send</v-icon>
                </v-btn>
                <!-- <hr class=""/> -->
                <v-divider></v-divider>
              </div>
      </div>
    </v-img>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'post',
    props: ['post'],
    mounted () {

    },
    data () {
      return {
        hover: false,
        submittingComment: false,
        comment: '',
        // comments: []
      }
    },
    methods: {
      toggleFullscreen(){
        console.log('toggling fullscreen');
      },
      submitComment(){
        console.log('submitting message: ', this.comment)
        this.$store.dispatch(
          'submitComment', {
            postId: this.post.id,
            comment: this.comment,
            authorId: this.$store.getters.user.id
          }
        ).then(response => {
          console.log(response)
          this.post.comments.push(this.comment);
          this.comment = "";
        }).catch(e => {
          console.log(e);
          // this.$router.push('Login');
        });
      },
      postNewtab(){
        console.log('open new tab!')
        let routeData = this.$router.resolve({
          path: `/post/${this.post.id}`, 
          // name: 'routeName', 
          // query: {data: "someData"}
        });
        window.open(routeData.href, '_blank');
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .post {
    margin-bottom: 5px;
  }

  .v-img {
    max-height: 80vh;
  }

  #outer-drawer {
    position: relative;
    height: 100%;
    // max-width: 40%;
    overflow: hidden;
  }

  #hover-area {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    width: 20%;
    max-width: 150px;
    height: auto;
    display: none;
    // background-color: green;
  }

  .inner-drawer{
    position: absolute;
    overflow: auto;
    right: 0;
    top: 0;
    bottom: 0;
    // left: 50%;
    padding: 10px 15px;
    text-align: right;
    // margin-right: 5px;
    max-width: 50%;
    background: rgb(0, 0, 0, 0.4);
    opacity: 0;
    transform: translateX(100%);
    transition: transform 0.5s, opacity 0.5s;
    // max-width: 40%;
  }

  .opaque{
    opacity: 100%;
    transform: translateX(0%);
    transition: transform 0.5s, opacity 0.5s;
  }

  .comment {
    text-align: left;
  }
</style>
