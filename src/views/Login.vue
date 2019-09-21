<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop is-3-widescreen box">
        <h2 class="title">LOGIN</h2>
        <p v-if="loginError">{{ loginError }}</p>
        <p v-if="accessToken">Login Successful</p>
        <form @submit.prevent="loginSubmit">
          <p if="errors.length">
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
          </p>
          <div class="field">
            <div class="control has-icons-left">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. vu@gmail.com" class="input" v-model="email">
            </div>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left">
             <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input"  v-model="password">
            </div>
          </div>
          </div>
          <div class="field">
           <input class="button is-success" type="submit" value="Login">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        errorMessage: {
          message1: "Email or Password is missing. Please try again!",
          message2: "Please enter your email!",
          message3: "Please enter your password!",
          message4: "Email or Password incorrect!"
        }
      }
    },
    computed: {
      ...mapState([
        'loggingIn',
        'loginError',
        'accessToken'
      ])
    },
    methods: {
      ...mapActions([
        'fetchAccessToken',
        'login'
      ]),
      loginSubmit() {
        this.errors = [];
        let email = this.email;
        let password = this.password;
        this.$store.dispatch('login', { email, password
        }).then(() => {
          alert("Welcome "+this.email);
          this.$router.push({ path: '/admin'});
        }).catch((e) => {
          if(!this.email && !this.password){
            this.errors.push(this.errorMessage.message1)
          }else if(!this.email){
            this.errors.push(this.errorMessage.message2)
          } else if(!this.password){
            this.errors.push(this.errorMessage.message3)
          } else{
            this.errors.push(this.errorMessage.message)
          }
        })
      }
    },
    created() {
      this.fetchAccessToken();
    }
  }
</script>
