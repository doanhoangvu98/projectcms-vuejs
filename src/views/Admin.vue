<template>
   <div class="d-flex" id="wrapper">
     <Sidebar></Sidebar>
     <Pagecontent></Pagecontent>
   </div>
</template>

<script>

import Sidebar from "./../components/sidebar"
import Pagecontent from "./../components/pagecontent"

  export default {
      name: 'admin',
      components: {
        Sidebar,
        Pagecontent
      },
      computed: {
        isLoggedIn: function(){
          return this.$store.getters.isLoggedIn
        }
      },
      methods: {
        logout: function(){
          this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ path: '/login'});
          })
        }
      }
  }
</script>