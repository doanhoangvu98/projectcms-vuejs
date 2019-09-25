<template>
   <div class="d-flex" id="wrapper">
     <SidebarContributor></SidebarContributor>
   </div>
</template>

<script>

import SidebarContributor from "./../components/SidebarContributor"

  export default {
      name: 'admin',
      components: {
        SidebarContributor,
      }
  }
</script>