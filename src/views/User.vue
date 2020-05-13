<template lang="html">

  <section fluid class="user" :class="[$vuetify.breakpoint.smAndDown? '':'user-col',]">
      <v-row>
        <v-col cols="12" md="3" id="user-info-col" 
        :style="{'height': $vuetify.breakpoint.smAndDown? 'auto':'88vh'}">
          <h1>{{user.username}}</h1>
          <h6>joined {{user.created}}</h6>
          <p>
            should put a bio option in the user class on the database, 
            and create a post method to update user data
          </p>
        </v-col>
        <v-col cols="12" md="9" id="feed-col"
        :style="{'height': $vuetify.breakpoint.smAndDown? '100%':'88vh'}">
          <Feed v-if="feedQuery" :query="feedQuery"/>
        </v-col>
      </v-row>
  </section>

</template>

<script lang="js">
  import Feed from '@/components/Feed';
  import axios from 'axios';

  export default  {
    name: 'user',
    props: [],
    components: {Feed,},
    data () {
      return {
        user: {},
        feedQuery: null
      }
    },
    created () {
      const path = this.$router.currentRoute.path;
      console.log('path', path);
      const routerParams = this.$route.params;
      console.log('routerParams', routerParams);
      if(path==='/account'){
        console.log('account page')
        this.user = this.$store.getters.user;
        this.feedQuery = {
          author_id: this.user.id
        }
      } else {
        // TODO: get user data with API call and make feed query wit their username!
        // var _this = this; //used for setting data in API call
        const username = this.$route.params.username
        // var _this = this;
        this.$nextTick(() => {
          axios.get(
              '/user', {params: {username: username}}
          ).then(response => {
              console.log(response);
              const user = response.data.user;
              this.user = user;
              this.feedQuery = {
                author_id: user.id
              }
              console.log('user page query:', this.feedQuery)
          }).catch(error => {
              console.log(error);
          });
        });
      }
    },
    mounted (){

    },
    methods: {
    },
    computed: {
    }
}


</script>

<style scoped lang="scss">
  .user {
    
  }
  .user-col{
    height: 88vh;
    overflow: hidden;
  }

  #user-info-col {
    position: relative;
    overflow-y: auto;
  }

  #feed-col {
    // height: 88vh;
    overflow-y: auto;
  }
</style>
