<template>
   <div class="d-flex" id="wrapper">
     <SidebarContributor></SidebarContributor>
     <Pagecontent></Pagecontent>
   </div>
</template>

<script>

import SidebarContributor from "./../components/sidebarcontributor"
import Pagecontent from "./../components/pagecontent"

  export default {
      name: 'admin',
      components: {
        SidebarContributor,
        Pagecontent
      }
  }
</script>