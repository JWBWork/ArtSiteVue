<template lang="html">

  <section fluid class="user" :class="[$vuetify.breakpoint.smAndDown? '':'user-col',]">
      <v-row justify="center">
        <v-col cols="12" md="4" id="user-info-col" class="py-0"
        :style="{'height': $vuetify.breakpoint.smAndDown? 'auto':'88vh'}">
          <v-card class="mx-auto" style="width:100%;">
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="4" md="12" class="py-0">
                  <!-- AVI and avi upload -->
                  <v-list-item>
                    <v-badge icon="mdi-pencil" overlap 
                    :value="accountPage" class="mr-4">
                      <v-avatar @click="accountPage ? $refs.aviFile.click() : ''">
                        <v-img :src="avi_url" v-if="avi_url"></v-img>
                        <v-icon v-else x-large>mdi-account</v-icon>
                      </v-avatar>
                    </v-badge>
                    <input type="file" ref="aviFile" style="display: none"
                    v-on:change="updateUserAvi($event.target.name, $event.target.files)">
                    <v-list-item-content>
                      <v-list-item-title class="headline">
                        {{user.username}}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        since {{createdDisplay}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <!-- <v-btn icon @click="openChat" v-if="userType == 'otherUser'">
                      <v-icon>
                        mdi-forum
                      </v-icon>
                    </v-btn> -->
                  </v-list-item>
                </v-col>

                <v-col cols="12" sm="8" md="12">
                  <!-- bio display / click to edit textarea -->
                  <v-row justify=center>
                    <v-col align=center>
                      <v-badge :value="accountPage" icon="mdi-pencil" 
                      overlap style="width:100%;height:100%;">
                        <div @click="edit.editBio = true">
                          <v-textarea :value="user.bio" ref="biotextarea"
                          label="Bio" auto-grow outlined :disabled="!(accountPage && edit.editBio)" 
                          ></v-textarea>
                        </div>
                        <v-btn v-if="accountPage && edit.editBio" @click="updateUserBio">
                          save
                        </v-btn>
                      </v-badge>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>

            <!-- <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>Following</v-expansion-panel-header>
                <v-expansion-panel-content>
                  blah blah
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels> -->

            <v-card-actions>
              <!-- <v-btn @click="follow" v-if="!following && user.id != $store.getters.user.id"> -->
              <v-btn @click="follow" v-if="!following && userType == 'otherUser'">
                <!-- <v-icon>mdi-plus</v-icon> -->
                follow
              </v-btn>
              <!-- <v-btn @click="unfollow" v-else-if="following && user.id != $store.getters.user.id"> -->
              <v-btn @click="unfollow" v-else-if="following && userType == 'otherUser'">
                unfollow
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
          
        <v-col cols="12" md="8" id="feed-col"
        :style="{'height': $vuetify.breakpoint.smAndDown? '100%':'92vh'}">
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
        accountPage: false,
        feedQuery: null,
        edit: {
          editBio: false,
          aviFile: null
        },
      }
    },
    created () {
      const path = this.$router.currentRoute.path;
      const routerParams = this.$route.params;
      if(path==='/account'){
        console.log('account page')
        this.user = this.$store.getters.user;
        this.accountPage = true;
        this.feedQuery = {
          author_id: this.user.id
        }
      } else {
        const username = this.$route.params.username
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
              // console.log('user page query:', this.feedQuery)
          }).catch(error => {
              console.log(error);
          });
        });
      }
    },
    mounted (){

    },
    methods: {
      updateUserAvi(eventName, aviFiles) {
        var aviFile = aviFiles[0]
        if (aviFile) {
          this.edit.aviFile = aviFile;
          this.updateUser()
        }
      },
      updateUserBio() {
        this.edit.editBio = false;
        this.updateUser();
      },
      updateUser() {
        let formData = new FormData();
        formData.append('userId', this.$store.getters.user.id)
        if (this.edit.aviFile) {
          console.log('appending file to form!')
          formData.append('aviFile', this.edit.aviFile, this.edit.aviFile.name)
        }
        formData.append('bio', this.$refs.biotextarea.$refs.input.value);
        console.log('post user api call to update')
        this.$store.dispatch(
          'updateUser', formData
        ).then(response => {
          console.log(response);
          this.$store.dispatch('setSnackbar', response.data.message);
        }).catch(error => {
          console.log(error);
          this.$store.dispatch('setSnackbar', error.response.data.message);
        });
      },
      follow(){
        this.$store.dispatch(
          'followUser', this.user
        );
      },
      unfollow() {
        this.$store.dispatch(
          'unfollowUser', this.user
        );
      },
      openChat(){
        this.$socket.emit('open_room', {
          fromId: this.$store.getters.user.id,
          userIds: [this.user.id, this.$store.getters.user.id],
        });
        this.$router.push({
            name: 'Chat',
            params: {
                // post: response.data.post
            }
        });
      }
    },
    computed: {
      userType: function() {
        if (this.accountPage) {
          return 'account'
        } else if (this.$store.getters.user == null) {
          return 'guest'
        } else if (this.$store.getters.user.id != this.user.id & this.user.id != this.$store.getters.user.id) {
          return 'otherUser'
        } else {
          return null
        }
      },
      avi_url: function() {
        if (this.edit.aviFile) {
          const preview_url = URL.createObjectURL(this.edit.aviFile);
          return preview_url;
        } else if (this.user.avi) {
          return this.user.avi
        } else {
          return null
        }
      },
      createdDisplay: function() {
        if (this.user.created) {
          return this.user.created.split(" ")[0]
        } else {
          return ''
        }
      },
      following: function() {
        let following = null;
        if (this.$store.getters.user) {
          following  = this.$store.getters.user.following.find(
            user => user.id == this.user.id
          );
        }
        return following
      }
    }
}


</script>

<style scoped lang="scss">
.user {
}
.user-col {
  // height: 90vh;
  // overflow: hidden;
}

#user-info-col {
  position: relative;
  overflow-y: auto;
}

#feed-col {
  overflow-y: auto;
}
</style>
