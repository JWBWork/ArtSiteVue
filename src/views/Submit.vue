<template lang="html">

  <section class="submit">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <PostForm/>
      </v-col>
    </v-row>
  </section>

</template>

<script lang="js">
  import PostForm from '@/components/PostForm.vue'

  export default  {
    name: 'submit',
    props: [],
    components: {
      PostForm,
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .submit {

  }
</style>
