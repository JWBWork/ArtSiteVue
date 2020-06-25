<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-card>
      <v-card-title class="mb-n5">New</v-card-title>
      <VBar class="feedBox">
        <Feed :tileMode="true" />
      </VBar>
    </v-card>
    <v-card>
      <v-card-title class="mb-n5">Popular</v-card-title>
      <VBar class="feedBox">
        <Feed :tileMode="true" />
      </VBar>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Feed from "@/components/Feed.vue";
import VBar from "v-bar";

export default {
  name: "Home",
  components: {
    Feed,
    VBar
  }
};
</script>

<style>
.feedBox {
  height: 70vh;
  /* overflow-y: scroll; */
  border-radius: 4px;
  border-style: solid;
  border-color: rgb(60, 60, 60, 0.8);
  border-width: 1px;
  margin: 0 15px 0 15px;
}
</style>
