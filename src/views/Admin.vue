<template>
  <div class="d-flex" id="wrapper">
    <Menu></Menu>
    <SidebarAdmin></SidebarAdmin>
    <!-- <CreatePage></CreatePage> -->
    <UpdatePage></UpdatePage>
  </div>
</template>

<script>

import SidebarAdmin from "./../components/SidebarAdmin"
import CreatePage from "./../components/release_numbers/Create"
import UpdatePage from "./../components/release_numbers/Update"
import Menu from "./../components/Menu"

export default {
  name: 'admin',
  components: {
    Menu,
    SidebarAdmin,
    // CreatePage,
    UpdatePage
  }
}
</script>