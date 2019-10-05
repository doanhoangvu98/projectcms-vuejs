<template>
  <nav class="navbar navbar-expand-lg border-bottom fixed-top ">
    <a class="navbar-brand" href="#">総合ジャーナル</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" 
            aria-haspopup="true" aria-expanded="false">狩野
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <!-- <a class="dropdown-item" @click="logout">Logout</a> -->
            <span v-if="isLoggedIn"><a class="dropdown-item" @click="logout">ログアウト</a></span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
  logout() {
    //console.log(this.$store.getters.isLoggedIn)
    this.$store.dispatch('logout')
    .then(() => {
      //console.log(this.$store.getters.isLoggedIn)
      this.$router.push('/login')
    })
    },
    check_authen(){
      this.$store.dispatch('check_authen')
      .then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style>
  nav {
    background-color:#5B9BD5;
  }
  a.navbar-brand {
    color: #fff;
    padding-left: 30px;
  }
  #navbarDropdown{
     color: #fff;
  }
</style>