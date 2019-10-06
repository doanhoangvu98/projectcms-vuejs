<template>
  <div class="col-sm-6 offset-sm-3 text-center" id="login">
    <form class="form-signin form-group" @submit.prevent="loginSubmit(event)">
      <h2 class="h3 mb-3 font-weight-normal" id="title">総合ジャーナル</h2>
	    <p if="errors.length">
        <ul>
          <li v-for="error in errors" v-bind:key="error" id="error">{{ error }}</li>
        </ul>
      </p>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input  id="inputEmail" class="form-control" placeholder="メールの入力" v-model="email" autofocus>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="パスワードの入力" v-model="password">
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit" value="Login" id="submit">ログイン</button>
      </div>
    </form>
  </div>
</template>

<script>
import VueSweetalert from './../services/SweetAlert'
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        user: {},
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        errorMessage: {
          message1: "情報処理の中に、エーラが発生しました。", // loi ngoai le
          message2: "メールを入力してください", // email trong
          message3: "パスワードを入力してください。", // password trong
          message4: "ユーザー情報が正しくない。", // email, password sai
          message5: "メールは6文字から６４文字まで入力してください。", // email vuot qua 64 ki tu
          message6: "パスワードは6文字から７２文字まで入力してください。",  // password vuot qua 72
          message7: "無効なメール" // sai dinh dang email
        }
      }
    },
    methods: {
      loginSubmit: function (event) {
        let email = this.email;
        let password = this.password;
        this.errors = [];
          if(!this.email){
            this.errors.push(this.errorMessage.message2)
          }
          if(!this.password){
            this.errors.push(this.errorMessage.message3)
          }
          if(this.email){
            if(this.email.length > 64){
              this.errors.push(this.errorMessage.message5)
            }
            if(!this.reg.test(this.email)){
              this.errors.push(this.errorMessage.message7)
            }
          }
          if(this.password.length > 72){
            this.errors.push(this.errorMessage.message6)
          } 
          if(this.errors.length != 0) {
            event.preventDefault();
          }
        this.$store.dispatch('login', { email, password
        }).then((response)=> {
          this.$router.push({ path: '/dashboard'});
          window.location.reload()
          VueSweetalert.success()
        }).catch((e) => {
          this.errors.push(this.errorMessage.message4)
          // VueSweetalert.failure()
        })
      },
    }
  }
</script>

<style>
  #login {
    margin-top: 8em;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    background-color: #ffffff;
  }
  .form-signin {
    border: 1px solid black;
    width: 100%;
    max-width: 600px;
    padding: 30px 110px;
    margin: 0 auto;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #000000;
    border-radius: 0%;
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
    /* list-style: none; */
    text-align: left;
  }
  li {
    font-size: 15px;
    font-weight: bold;
    color: #ff0000;
  }
  #title{
    padding-bottom: 20px;
    font-weight: bold;
  }
  #submit{
    background-color: #5b9bd5;
    border: 1px solid #000000;
    border-radius: 0%;
  }
</style>