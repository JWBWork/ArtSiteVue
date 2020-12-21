<template lang="html">

  <section class="comments">
    <v-subheader>Comments</v-subheader>
    <v-card v-for="(comment, i) in comments" :key="i">
      <v-list-item>
        <router-link link :to="`/user/${comment.username}`">
          <v-list-item-avatar>
            <v-img :src="comment.avi" v-if="comment.avi"></v-img>
            <v-icon v-else x-large>mdi-account</v-icon>
          </v-list-item-avatar>
        </router-link>

        <v-list-item-content>
          <router-link link :to="`/user/${comment.username}`">
            <v-list-item-title>
              {{comment.username}}
            </v-list-item-title>
          </router-link>
          <v-list-item-subtitle>
            {{comment.body}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <div v-if="$store.getters.authenticated">
      <v-textarea dense outlined auto-grow 
      label="Comment" v-model="comment" 
      hide-details="auto" append-icon="mdi-comment">
      </v-textarea>
      <v-btn icon @click="submitComment" :loading="submittingComment">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'comments',
    props: [
      'comments',
      'postId'
    ],
    mounted () {

    },
    data () {
      return {
        submittingComment: false,
        comment: ''
      }
    },
    methods: {
      submitComment(){
        this.$store.dispatch(
          'submitComment', {
            postId: this.postId,
            comment: this.comment,
            authorId: this.$store.getters.user.id
          }
        ).then(response => {
          console.log(response)
          // this.comments.push(this.comment);
          this.comments.push({
            body: this.comment,
            author_id: this.$store.getters.user.id,
            avi: this.$store.getters.user.avi,
            username: this.$store.getters.user.username
          });
          this.comment = "";
        }).catch(error => {
          // TODO: check for auth error and logout
          console.log(error);
          this.$store.dispatch('setSnackbar', error.response.data.message);
          // this.$router.push('Login');
        });
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
.comments {
}

a {
  text-decoration: none;
}
</style>
