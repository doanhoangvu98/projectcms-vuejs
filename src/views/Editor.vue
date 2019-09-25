<template>
   <div class="d-flex" id="wrapper">
     <SidebarEditor></SidebarEditor>
     <Pagecontent></Pagecontent>
   </div>
</template>

<script>

import SidebarEditor from "./../components/SidebarEditor"
import Pagecontent from "./../components/Content"

  export default {
      name: 'admin',
      components: {
        SidebarEditor,
        Pagecontent
      }
  }
</script>