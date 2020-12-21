<template lang="html">

  <section  class="post ma-1" :class="{'tileMode' : tileMode}">

    <v-img contain 
    class="v-img plane-text"
    @click="fullscreen = !fullscreen"
    @mouseleave="hover=false"
    :src="post.s3_url">
      <div id="outer-drawer" v-if="!fullscreen">
        <!-- Area to trigger hover behavior -->
        <div id="hover-area"
          :style="{'width': tileMode ? '100%' : '45%'}"
          @mouseenter="hover=true"></div>

        <!-- info drawr containing info -->
        <VBar
          class="inner-drawer"
          :style="{'width': tileMode ? '100%' : '50%'}"
          :class="{'opaque': hover & !postView}">
          <div v-if="tileMode">
            <v-col cols='12' align="center">
              <h1 class="mt-3" style="overflow:hidden;">{{post.title}}</h1>
              <router-link link :to="{'path': `/user/${post.author_username}`}">
                <v-row align="center" justify="center">
                  <v-avatar class="mx-2">
                    <v-img :src="post.author_avi" v-if="post.author_avi"></v-img>
                    <v-icon v-else x-large>mdi-account</v-icon>
                  </v-avatar>
                  <h6>By {{post.author_username}}</h6>
                </v-row>
              </router-link>
              <v-row align="center" justify="center">
                <v-col cols="10">
                  <div class="description">{{post.description}}</div>
                </v-col>
              </v-row>

              <div class="mt-5" @click.stop>
                <span v-if="$store.getters.authenticated">
                  <v-icon v-show="liked === null | liked === false" @click.stop @click="liked = true">mdi-thumb-up-outline</v-icon>
                  <v-icon v-show="liked === true" @click.stop @click="liked = null">mdi-thumb-up</v-icon>
                  <v-icon v-show="liked === null | liked === true" @click="liked = false">mdi-thumb-down-outline</v-icon>
                  <v-icon v-show="liked === false" @click="liked = null">mdi-thumb-down</v-icon>
                </span>
                <router-link :to="{'path': `/post/${post.id}`}">
                  <v-icon>
                      mdi-link
                  </v-icon>
                </router-link>
                <v-badge
                  :content="post.comments.length"
                  :value="post.comments.length"
                  color="pink"
                  overlap
                >
                  <v-icon @click="fullscreen = !fullscreen">mdi-comment</v-icon>
                </v-badge>
              </div>
            </v-col>
          </div>
          <div v-else @click.stop>
            <v-row>
              <v-col>
                <span class="float-left">
                  <span v-if="$store.getters.authenticated">
                    <v-icon v-show="liked === null | liked === false" @click.stop @click="liked = true">mdi-thumb-up-outline</v-icon>
                    <v-icon v-show="liked === true" @click.stop @click="liked = null">mdi-thumb-up</v-icon>
                    <v-icon v-show="liked === null | liked === true" @click="liked = false">mdi-thumb-down-outline</v-icon>
                    <v-icon v-show="liked === false" @click="liked = null">mdi-thumb-down</v-icon>
                  </span>
                  <router-link :to="{'path': `/post/${post.id}`}">
                    <v-icon>
                        mdi-link
                    </v-icon>
                  </router-link>
                  <v-icon @click="fullscreen = !fullscreen">mdi-arrow-expand</v-icon>
                </span>
              </v-col>
              <v-col>
                <h1 style="overflow:hidden;" class="d-inline">{{post.title}}</h1>
              </v-col>
            </v-row>
            <router-link link :to="{'path': `/user/${post.author_username}`}">
              <v-row align="center" justify="start">
                <v-avatar class="mx-2">
                  <v-img :src="post.author_avi" v-if="post.author_avi"></v-img>
                  <v-icon v-else x-large>mdi-account</v-icon>
                </v-avatar>
                <h6>By {{post.author_username}}</h6>
              </v-row>
            </router-link>
            <span style="white-space: pre-line">{{post.description}}</span>
          </div>

          <div v-if="!tileMode" @click.stop>
            <v-divider></v-divider>
            <Comments :comments="post.comments"
            :postId="post.id"></Comments>
            <v-divider></v-divider>
          </div>
        </VBar>
      </div>
    </v-img>



    <!-- fullscreen sec and comments -->
    <v-overlay :value="fullscreen & !postView" color="black" style="z-index:50;">
      <v-row justify="center" v-show="fullscreen" class="fullscreen">
        <v-col cols="8">
          <v-img contain
            height="90vh"
            width="100vw"
            class="plane-text mb-5"
            @click="fullscreen = !fullscreen"
            @mouseleave="hover=false"
            :src="post.s3_url"></v-img>
          <h1 style="overflow:hidden;" class="d-inline">{{post.title}}</h1>
          <span class="float-right">
            <span v-if="$store.getters.authenticated">
              <v-icon v-show="liked === null | liked === false" @click.stop @click="liked = true">mdi-thumb-up-outline</v-icon>
              <v-icon v-show="liked === true" @click.stop @click="liked = null">mdi-thumb-up</v-icon>
              <v-icon v-show="liked === null | liked === true" @click="liked = false">mdi-thumb-down-outline</v-icon>
              <v-icon v-show="liked === false" @click="liked = null">mdi-thumb-down</v-icon>
            </span>
            <router-link :to="{'path': `/post/${post.id}`}">
              <v-icon>
                  mdi-link
              </v-icon>
            </router-link>
            <v-icon @click="fullscreen = !fullscreen">mdi-arrow-collapse</v-icon>
          </span>
          <router-link link :to="{'path': `/user/${post.author_username}`}">
            <v-row align="center" justify="start">
              <v-avatar class="mx-2">
                <v-img :src="post.author_avi" v-if="post.author_avi"></v-img>
                <v-icon v-else x-large>mdi-account</v-icon>
              </v-avatar>
              <h6>By {{post.author_username}}</h6>
            </v-row>
          </router-link>
          <span style="white-space: pre-line">{{post.description}}</span>
          <v-divider></v-divider>
            <Comments :comments="post.comments"
            :postId="post.id"></Comments>
          <v-divider class="mb-7"></v-divider>
        </v-col>
      </v-row>
    </v-overlay>

    <v-row v-if="postView">
      <v-col cols="12">
        <v-row>
          <v-col>
            <h1 style="overflow:hidden;" class="d-inline">{{post.title}}</h1>
          </v-col>
          <v-col>
            <span class="float-right">
              <span v-if="$store.getters.authenticated">
                <v-icon v-show="liked === null | liked === false" @click.stop @click="liked = true">mdi-thumb-up-outline</v-icon>
                <v-icon v-show="liked === true" @click.stop @click="liked = null">mdi-thumb-up</v-icon>
                <v-icon v-show="liked === null | liked === true" @click="liked = false">mdi-thumb-down-outline</v-icon>
                <v-icon v-show="liked === false" @click="liked = null">mdi-thumb-down</v-icon>
              </span>
              <router-link :to="{'path': `/post/${post.id}`}">
                <v-icon>
                    mdi-link
                </v-icon>
              </router-link>
              <v-icon @click="fullscreen = !fullscreen">mdi-arrow-collapse</v-icon>
            </span>
          </v-col>
        </v-row>
        <router-link link :to="{'path': `/user/${post.author_username}`}">
          <v-row align="center" justify="start">
            <v-avatar class="mx-2">
              <v-img :src="post.author_avi" v-if="post.author_avi"></v-img>
              <v-icon v-else x-large>mdi-account</v-icon>
            </v-avatar>
            <h6>By {{post.author_username}}</h6>
          </v-row>
        </router-link>
        <span style="white-space: pre-line">{{post.description}}</span>
        <v-divider></v-divider>
          <Comments :comments="post.comments"
          :postId="post.id"></Comments>
        <v-divider class="mb-7"></v-divider>
      </v-col>
    </v-row>
  </section>

</template>

<script lang="js">
  import axios from 'axios';
  import VBar from 'v-bar';
  import Comments from '@/components/Comments.vue';
  // import LikeDislike from '@/components/LikeDislike.vue';

  export default  {
    name: 'post',
    props: [
      'post',
      'tileMode',
      'postView'
    ],
    components: {
      VBar, 
      Comments
      // LikeDislike
    },
    mounted () {
      if (this.$store.getters.user) {
        let like = this.post.likes.find(
          like => like.user_id == this.$store.getters.user.id
        )
        if (like) {
          this.liked = like.value;
        }
      }
      var _this = this;
      setTimeout(() => {
        _this.mounted = true;
      }, 1500);
      // this.liked = liked;
    },
    data () {
      return {
        mounted: false,
        hover: false,
        submittingComment: false,
        comment: '',
        fullscreen: false,
        liked: null,
      }
    },
    methods: {
    },
    watch: {
      liked: function(val){
        // TODO: send like via axios
        console.log('LikeDislike ', val)
        if (this.mounted) {
          axios.post(
            '/like', {
              'user_id': this.$store.getters.user.id,
              'post_id': this.post.id,
              'value': val
            }
          ).then(response => {
            console.log(response);
            this.$emit('liked', val);
            // const data = response.data;
          }).catch(error => {
            this.$store.dispatch('setSnackbar', error.response.data.message);
          });
        }
      }
    },
    computed: {
    }
}


</script>

<style scoped lang="scss">
.post {
}

.v-img {
  max-height: 85vh;
  max-width: 100%;
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
  // width: 45%;
  // max-width: 40%;
  height: auto;
  // opacity: 0;
  // background-color: green;
}

.wrapper {
  height: 100%;
}

.inner-drawer {
  position: absolute;
  overflow: auto;
  right: 0;
  top: 0;
  bottom: 0;
  // left: 50%;
  padding: 10px 15px;
  text-align: right;
  // margin-right: 5px;
  // width: 50%;
  background: rgb(0, 0, 0, 0.7);
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.5s, opacity 0.5s;
  // max-width: 40%;
}

.plane-text {
  color: white;
}

.opaque {
  opacity: 100%;
  transform: translateY(0%);
  transition: transform 0.5s, opacity 0.5s;
}

.comment {
  text-align: left;
}

.tileMode {
  // max-height: 500px;
  // max-width: 400px;
  width: auto;
  height: auto;
}

.fullscreen {
  position: fixed;
  z-index: 500;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100vh !important;
  width: 90vw !important;
  overflow-y: scroll;
  overflow-x: hidden;
  // background-color: rgb(0, 0, 0, 0.8);
}

a {
  text-decoration: none;
}

.description {
  white-space: pre-line;
  text-align: left;
}
</style>
