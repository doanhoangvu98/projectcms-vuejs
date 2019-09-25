<template>
   <div class="d-flex" id="wrapper">
     <SidebarEditor></SidebarEditor>
   </div>
</template>

<script>

import SidebarEditor from "./../components/SidebarEditor"

  export default {
      name: 'admin',
      components: {
        SidebarEditor,
      }
  }
</script>