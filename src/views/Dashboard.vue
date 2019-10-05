<template>
  <div class="d-flex" id="wrapper">
    <Menu></Menu>
    <Sidebar></Sidebar>
    <!-- <CreatePage></CreatePage> -->
    <!-- <UpdatePage></UpdatePage> -->
    <!-- <ManagementPage></ManagementPage> -->
    <router-view></router-view>
  </div>
</template>

<script>

import Sidebar from "./../components/Sidebar"
import CreatePage from "./../components/release_numbers/Create"
import UpdatePage from "./../components/release_numbers/Update"
import ManagementPage from "./../components/release_numbers/Management"
import Menu from "./../components/Menu"

export default {
  name: 'dashboard',
  components: {
    Menu,
    Sidebar,
    // CreatePage,
    //UpdatePage
    // ManagementPage
    //CreatePage
  }
}
</script>