<template>
  <div class="container">
    <h2 class="is-title">Admin page</h2>
    <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
  </div>
</template>

<script>
  export default {
      name: 'admin',
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
