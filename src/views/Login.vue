<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop is-3-widescreen box">
        <h2 class="title">LOGIN</h2>
        <p v-if="loginError">{{ loginError }}</p>
        <p v-if="accessToken">Login Successful</p>
        <form @submit.prevent="loginSubmit">
          <div class="field">
            <div class="control has-icons-left">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input"  v-model="email">
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
        password: ''
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
        let email = this.email;
        let password = this.password;
        this.$store.dispatch('login', { email, password
        }).then(() => {
          //console.log(response);
          this.$router.push({ path: '/admin'});
        }).catch((error) => {
            //console.log(error);
        })
      }
    },
    created() {
      this.fetchAccessToken();
    }
  }
</script>
