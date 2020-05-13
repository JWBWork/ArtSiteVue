<template lang="html">

  <section class="register">
    <v-form ref="form" v-model="valid">
      <v-text-field 
      requred
      label="Username"
      v-model="username"
      :rules="usernameRules"
      class="mx-3"></v-text-field>
      <v-text-field
      v-show="registering"
      :requred="registering"
      label="Email"
      v-model="email"
      :rules="emailRules"
      class="mx-3"></v-text-field>
      <v-text-field 
      requred
      label="Password"
      v-model="password"
      :rules="passwordRules"
      class="mx-3"></v-text-field>
      <v-text-field 
      v-show="registering"
      :requred="registering"
      label="Confirm Password"
      v-model="confirmPassword"
      :rules="confirmPasswordRules"
      class="mx-3"></v-text-field>
    
      <v-btn
      v-show="!registering"
      :disabled="!valid"
      color="success"
      @click="login"
      class="ml-3">
        Login
      </v-btn>
      <v-btn
      :disabled="!valid"
      v-on:click="registering ? register() : enableRegistering()"
      :color="registering ? 'success': '' "
      class="ml-3">
        Register
      </v-btn>
      <v-btn 
      @click="reset"
      class="mx-3">Reset</v-btn>
    </v-form>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'register',
    props: [],
    mounted () {

    },
    data () {
      return {
        valid: true,
        registering: false,
        username: '',
        usernameRules: [
          v => (v && v.length > 5 && 12 > v.length) 
          || "Username must be between 5 and 12 characters"
        ],
        password: '',
        passwordRules: [
          v => (v && 12 > v.length && v.length > 5) 
          || "Password Invalid"
          // implement better password rules, spec chars, ect.
        ],
        confirmPassword: '',
        confirmPasswordRules: [
          v => (!this.registering || v == this.password) || "Passwords must match"
        ],
        // email: '',
        email: 'email@test.com', //TODO: remove default value
        emailRules: [ 
          v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      login() {
        let valid = this.$refs.form.validate();
        if (valid) {
          this.$store.dispatch('login', {
            username: this.username,
            password: this.password
          }).then(response => {
            console.log(response)
            this.$router.push({name:'Account'});
          });
        }
      },
      enableRegistering(){
        this.registering = true;
        console.log("enableRegistering", this.registering);
      },
      register(){
        let valid = this.$refs.form.validate();
        if (valid) {
          console.log("Form is valid! Attempting to Register");
          this.$store.dispatch('register', {
            username: this.username,
            email: this.email,
            password: this.password
          }).then(response =>{
            console.log(response);
            this.$store.dispatch('login', {
              username: this.username,
              password: this.password
            }).then(response => {
              console.log(response)
              this.$router.push({name:'Account'});
            });
          });
        }
      },
      reset(){
        this.$refs.form.reset();
        this.registering = false;
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .register {

  }
</style>
