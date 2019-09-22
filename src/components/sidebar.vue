<template>
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Manager</div>
      <div class="list-group list-group-flush"> 
        <a href="#" class="list-group-item list-group-item-action bg-light">Release Number</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">User admin</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Category</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Article</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Image</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Member</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Settings</a>
      </div>
    </div>
</template>

<script>
export default {
   
}
</script>

<style>
#sidebar-wrapper {
  min-height: 100vh;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}
#sidebar-wrapper .sidebar-heading {
padding: 0.875rem 1.25rem;
font-size: 1.2rem;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}
.sidebar-heading{
  background-color: #0095ff;
}
</style>