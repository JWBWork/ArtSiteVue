<template lang="html">

  <section class="tag-chip" @click.stop>
    <v-chip @mouseover="show = true" @mouseleave="show = false" class="mx-1">
      <v-avatar left v-show="show">
        <v-icon>mdi-plus</v-icon>
      </v-avatar>
      {{tag}}
      <v-avatar right v-show="show">
        <v-icon @click="search">
          mdi-magnify
        </v-icon>
      </v-avatar>
    </v-chip>
  </section>

</template>

<script lang="js">
  import api from "@/api";

  export default  {
    name: 'tag-chip',
    props: ["tag"],
    mounted () {

    },
    data () {
      return {
        show: false
      }
    },
    methods: {
      search(){
        console.log(`#${this.tag}`);
        this.$router.push({
          name: `Search`,
          query: { searchQuery: `#${this.tag}` },
        });
        }
    },
    computed: {

    },
    watch: {
    }
}


</script>

<style scoped>
.tag-chip {
  /* position: fixed; */
}

#tooltip {
  /* display: inline;
  position: relative; */
  /* left: -45px;
  top: 0px; */
}
</style>
