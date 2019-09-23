<template>
   <div class="d-flex" id="wrapper">
     <SidebarEditor></SidebarEditor>
     <Pagecontent></Pagecontent>
   </div>
</template>

<script>

import SidebarEditor from "./../components/sidebareditor"
import Pagecontent from "./../components/pagecontent"

  export default {
      name: 'admin',
      components: {
        SidebarEditor,
        Pagecontent
      }
  }
</script>