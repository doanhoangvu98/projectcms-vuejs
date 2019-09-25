<template>
  <div class="text-center" id="login">
    <form class="form-signin" @submit.prevent="loginSubmit">
      <h1 class="h3 mb-3 font-weight-normal">LOGIN</h1>
	    <p if="errors.length">
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password">
      <button class="btn btn-lg btn-primary btn-block" type="submit" value="Login">Login</button>
    </form>
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
        user: {},
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
        'token'
      ])
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      loginSubmit() {
        this.errors = [];
        let email = this.email;
        let password = this.password;
        this.$store.dispatch('login', { email, password
        }).then((response)=> {
          //const role = response.data.role;
          this.$router.push({ path: '/admin'});
          // if(role === 'admin'){
          //   alert("Hello "+ role);
          //   this.$router.push({ path: '/admin'});
          // } else if (role == 'editor') {
          //   alert("Hello "+ role);
          //   this.$router.push({ path: '/editor'});
          // }else if (role == 'contributor') {
          //   alert("Hello "+ role);
          //   this.$router.push({ path: '/contributor'});
          // } else {
          //   alert("You do have not permisson to login");
          //   this.$router.push({ path: '/login'});
          // }
        }).catch((e) => {
          if(!this.email && !this.password){
            this.errors.push(this.errorMessage.message1)
          }else if(!this.email){
            this.errors.push(this.errorMessage.message2)
          } else if(!this.password){
            this.errors.push(this.errorMessage.message3)
          } else{
            this.errors.push(this.errorMessage.message4)
          }
        })
      }
    },
  }
</script>

<style>
#login {
  margin-top: 8em;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #ffffff;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
ul{
  list-style: none;
  text-align: left;
}
</style>