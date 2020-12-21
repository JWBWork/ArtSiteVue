<template lang="html">
    <v-form ref="form"
            v-model="valid">

        <!-- Title -->
        <v-text-field v-model="title"
                      :counter="35"
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
        <v-img class="previewImage" v-if="previewImage" :src="previewImage"></v-img>

        <!-- Image Tagging -->
        <v-combobox v-model="submissionTags"
                    :delimiters="[',',' ']"
                    :items="existingTags"
                    chips
                    clearable
                    label="Picture Tags"
                    multiple
                    prepend-icon="mdi-tag"
                    solo
                    :search-input.sync="tagText"
                    ref="tagComboBox">
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

        <v-textarea label='Description' v-model='description'></v-textarea>

        <!-- TOS agreement -->
        <span>tos goes here ...</span>
        <v-checkbox v-model="tos_agree"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required></v-checkbox>

        <!-- Submit and Reset -->
        <v-btn :disabled="!valid"
        :loading="submittingPost"
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
    name: 'post-form',
    props: [],
    mounted () {

    },
    data: () => ({
        valid: true,
        title: '',
        imagefile: null,
        previewImage: null,
        titleRules: [
            v => !!v || 'Title is required',
            v => (v && v.length <= 35) || 'Title must be less than 35 characters',
        ],
        select: null,
        tagText: '',
        tagTimer: null,
        submissionTags: [],
        // existingTags: ['Streaming', 'Eating'],
        existingTags: [],
        description: '',
        tos_agree: false,
        submittingPost: false
    }),
    methods: {
        validate() {
            let valid = this.$refs.form.validate()
            if (valid) {
                this.submittingPost = true;
                // Post to cloudfront THEN post to backend? 
                // Don't need to handle their image data on my server
                // and will have to deal with cloudfront somehow
                let formData = new FormData();
                formData.append('image', this.imagefile, this.imagefile.name)
                formData.append('title', this.title);
                formData.append('description', this.description);
                formData.append('tags', this.submissionTags);
                formData.append('user_id', this.$store.getters.user.id);

                console.log('image upload valid!');
                // axios.post(
                this.$store.dispatch(
                    'submitPost', formData
                ).then(response => {
                    console.log(response)
                    this.$router.push({
                        // name: 'Post',
                        path: `/post/${response.data.post.id}`,
                        params: {
                            post: response.data.post
                        }
                    })
                }).catch(error => {
                    console.log(error);
                    this.submittingPost = false;
                    if (error.response) {
                        this.$store.dispatch('setSnackbar', error.response.data.message);
                    } else {
                        console.console.error(error);
                        this.$store.dispatch('setSnackbar', error);
                    }
                    // this.$refs.form.reset();
                    // this.$router.push('Login');
                    // this.$store.dispatch('setSnackbar', error.response.data.message);
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
        updateTags(text){
            // console.log(this.tagText);
            if (this.tagTimer){
                clearTimeout(this.tagTimer);
                this.tagTimer = null;
            }
            var _this = this
            this.tagTimer = setTimeout(
                function(){ 
                    console.log("Searching", text); 
                    axios.get('/tag', {
                        params: {'text': text}
                    }).then(response => {
                        console.log(response.data.tags);
                        _this.existingTags = response.data.tags;
                        _this.tagTimer = null;
                    }).catch(error => {
                        console.log(error);
                        _this.existingTags = [];
                        _this.tagTimer = null;
                    })
                    // this.tagTimer = null
                    // this.existingTags = ['Streaming', 'Eating', text];
                }, 300
            );
        }
    },
    computed: {
        // existingTags(){
        //     console.log(this.tagText);
        //     if (this.tagTimer){
        //         clearTimeout(this.tagTimer);
        //         this.tagTimer = null;
        //     }
        //     this.tagTimer = setTimeout(
        //         function(){ 
        //             console.log("Searching", this.tagText); 
        //             this.tagTimer = null
        //             return ['Streaming', 'Eating'];
        //         }, 2000
        //     );
        //     // return ['Streaming', 'Eating'];
        // }
    },
    watch: {
        // tagText: function(curText, prevText){
        tagText: function(curText){
            // console.log(prevText, '->', curText);
            if(curText){
                this.updateTags(curText)
            }
        },
        imagefile: function(file){
            const previewUrl = URL.createObjectURL(file);
            this.previewImage = previewUrl
        },
        submissionTags: function(newTags, oldTags){
            if (newTags.length > oldTags.length) {
                this.tagText = '';
            }
        }
    }
}


</script>

<style scoped lang="scss">
.post-form {
}
</style>
