<template>
   <div class="d-flex" id="wrapper">
     <SidebarContributor></SidebarContributor>
     <Pagecontent></Pagecontent>
   </div>
</template>

<script>

import SidebarContributor from "./../components/SidebarContributor"
import Pagecontent from "./../components/Content"

  export default {
      name: 'admin',
      components: {
        SidebarContributor,
        Pagecontent
      }
  }
</script>