<template lang="html">

  <section class="submit">
    <UploadPicture/>
  </section>

</template>

<script lang="js">
  import UploadPicture from '@/components/UploadPicture.vue'

  export default  {
    name: 'submit',
    props: [],
    components: {
      UploadPicture,
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
