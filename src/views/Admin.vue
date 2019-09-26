<template>
  <div class="d-flex" id="wrapper">
    <Menu></Menu>
    <SidebarAdmin></SidebarAdmin>
    <!-- <CreatePage></CreatePage> -->
    <!-- <UpdatePage></UpdatePage> -->
    <!-- <ManagementPage></ManagementPage> -->
    <router-view></router-view>
  </div>
</template>

<script>

import SidebarAdmin from "./../components/SidebarAdmin"
import CreatePage from "./../components/release_numbers/Create"
import UpdatePage from "./../components/release_numbers/Update"
import ManagementPage from "./../components/release_numbers/Management"
import Menu from "./../components/Menu"

export default {
  name: 'admin',
  components: {
    Menu,
    SidebarAdmin,
    // CreatePage,
    //UpdatePage
    // ManagementPage
    CreatePage
  }
}
</script>