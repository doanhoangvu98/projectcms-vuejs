<template>
  <div class="d-flex" id="wrapper">
    <Menu></Menu>
    <SidebarAdmin></SidebarAdmin>
    <Pagecontent></Pagecontent>
  </div>
</template>

<script>

import SidebarAdmin from "./../components/SidebarAdmin"
import Pagecontent from "./../components/Content"
import Menu from "./../components/Menu"

  export default {
      name: 'admin',
      components: {
        SidebarAdmin,
        Pagecontent,
        Menu
      }
  }
</script>