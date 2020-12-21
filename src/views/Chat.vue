<template lang="html">

  <section class="chat">
    <v-container fill-height align-start>
      <!-- <v-row> -->
        <v-col cols='3'>
          <v-container v-if="chats">
            <v-card v-for="chat in chats" :key='chat.room_name'>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="chat.users[0].avi" v-if="chat.users[0].avi"></v-img>
                  <v-icon v-else x-large>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content @click="selectChat(chat.room_name)">
                  <v-list-item-title>
                    {{chat.users[0].username}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-container>
          <v-container v-else>
            no chats!
          </v-container>
        </v-col>
        <v-col cols='9'>
          <v-card
            fill-height
            height='88vh'
            v-if="selectedChat"
            class="d-flex align-center flex-column"
          >
            <v-card
              v-for="(msg, i) in selectedChat.messages"
              :key="i"
              class="pa-2"
              width="100%"
              outlined
              tile
            >
              <div 
                width="100%" 
                :class="msg.authorId == $store.getters.user.id ? 'float-right' : 'float-left'">
                {{msg.body}}
              </div>
            </v-card>
            <v-card class='pa-2 mt-auto' width="100%" tile>
              <v-text-field outlined append-icon="mdi-send" v-model="message"
              @keyup.enter.prevent='sendMessage'
              @click:append='sendMessage'></v-text-field>
            </v-card>
          </v-card>
          <v-container v-else>
            no chat selected!
          </v-container>
        </v-col>
      <!-- </v-row> -->
    </v-container>
  </section>

</template>

<script lang="js">
  // import axios from 'axios';

  export default  {
    name: 'chat',
    props: [],
    mounted () {
    },
    data () {
      return {
        'selectedRoomName': null,
        'message': ''
      }
    },
    methods: {
      selectChat(roomName) {
        console.log("SELECTED ", roomName)
        this.selectedRoomName = roomName;
      },
      sendMessage(){
        this.$socket.emit('message', {
          roomName: this.selectedChat.roomName,
          timestamp: Date.now(),
          authorId: this.$store.getters.user.id,
          body: this.message
        })
        this.message = "";
      }
    },
    computed: {
      chats() {
        return this.$store.getters.chats;
      },
      // currentChatMessages() {
      selectedChat() {
        console.log("UPDATING SELECTED CHAT")
        if (this.$store.getters.chats) {
          return this.$store.getters.chats.find(chat => chat.room_name == this.selectedRoomName)
        } else {
          return null
        }
      }
    }
}


</script>

<style scoped lang="scss">
.chat {
  height: 90vh;
}
</style>
