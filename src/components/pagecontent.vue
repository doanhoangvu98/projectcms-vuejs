<template>
    <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light border-bottom">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Admin
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" @click="logout">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container-fluid">
            <h1 class="mt-4">Simple Sidebar</h1>
            <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      role: ''
    }
  },
  // mounted: function(){
  //   this.setrole()
  // },
  methods: {
    setrole: function(){
      let user = JSON.parse(localStorage.getItem('user'))
      // this.role = user.role
    },
    logout: function(){
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push({ path: '/login'})
      })
    }
  }
}
</script>

<style>
#page-content-wrapper {
  min-width: 100vw;
}
#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}
@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
nav {
   background-color: #0095ff;
}
</style>