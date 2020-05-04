<template lang="html">
    <v-form ref="form"
            v-model="valid"
            lazy-validation>

        <!-- Title -->
        <v-text-field v-model="title"
                      :counter="10"
                      :rules="titleRules"
                      label="Title"
                      required></v-text-field>

        <!-- Image Upload -->
        <v-file-input accept="image/*"
                      v-model="imagefile"
                      label="Image upload"
                      show-size
                      prepend-icon="mdi-image"
                      :rules="[v => !!v || 'Item is required']"></v-file-input>

        <!-- Image Tagging -->
        <v-combobox v-model="submissionTags"
                    :items="existingTags"
                    chips
                    clearable
                    label="Picture Tags"
                    multiple
                    prepend-icon="mdi-tag"
                    solo>
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove(item)">
                    <strong>{{ item }}</strong>&nbsp;
                </v-chip>
            </template>
        </v-combobox>

        <!-- TOS agreement -->
        <span>tos goes here ...</span>
        <v-checkbox v-model="tos_agree"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required></v-checkbox>

        <!-- Submit and Reset -->
        <v-btn :disabled="!valid"
               color="success"
               class="mr-4"
               @click="validate">
            Upload
        </v-btn>
        <v-btn color="error"
               class="mr-4"
               @click="reset">
            Reset Form
        </v-btn>
    </v-form>
</template>

<script lang="js">
    import axios from 'axios'

  export default  {
    name: 'upload-picture',
    props: [],
    mounted () {

    },
    data: () => ({
        valid: true,
        title: '',
        imagefile: null,
        titleRules: [
            v => !!v || 'Title is required',
            v => (v && v.length <= 35) || 'Title must be less than 35 characters',
        ],
        select: null,
        tos_agree: false,
        submissionTags: [],
        existingTags: ['Streaming', 'Eating'],
    }),
    methods: {
        validate() {
            let valid = this.$refs.form.validate()
            if (valid) {
                let formData = new FormData();
                formData.append('image', this.imagefile, this.imagefile.name)
                formData.append('title', this.title);
                formData.append('tags', this.submissionTags)

                console.log('image upload valid!');
                axios.post(
                    'image', formData
                ).then(response => {
                    console.log(response)
                }).catch(e => {
                    this.errors.push(e)
                });
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        remove(item) {
            this.submissionTags.splice(this.submissionTags.indexOf(item), 1)
            this.submissionTags = [...this.submissionTags]
        },
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .upload-picture {

  }
</style>
