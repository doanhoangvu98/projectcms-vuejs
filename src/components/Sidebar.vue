<template>
  <div class="border-right" id="sidebar-wrapper">
    <p class="title">メニュー一覧</p>
    <div v-if="role == 'superadmin' || role == 'admin'">
      <div class="list-group list-group-flush"> 
        <router-link to='/dashboard/release' class="list-group-item list-group-item-action" 
          id="release"><i class="fa fa-caret-right" aria-hidden="true"></i> 発売号一覧管理
        </router-link>
        <router-link to='/dashboard/user_admin' class="list-group-item list-group-item-action" 
          id="useradmin"><i class="fa fa-caret-right" aria-hidden="true"></i> アドミンユーザー管理
        </router-link>
        <router-link to='/dashboard/category' class="list-group-item list-group-item-action" 
          id="category"><i class="fa fa-caret-right" aria-hidden="true"></i> カテゴリ管理
        </router-link>
        <router-link to='/dashboard/article' class="list-group-item list-group-item-action" 
          id="article"><i class="fa fa-caret-right" aria-hidden="true"></i> 記事一覧管理
        </router-link>
        <a href="#" class="list-group-item list-group-item-action" id="imagesidebar">
          <i class="fa fa-caret-right" aria-hidden="true"></i> 画像管理
        </a>
        <router-link to='/dashboard/member' class="list-group-item list-group-item-action" 
          id="member"><i class="fa fa-caret-right" aria-hidden="true"></i> メンバー一覧管理
        </router-link>
        <router-link to='/dashboard/setting' class="list-group-item list-group-item-action" 
          id="setting"><i class="fa fa-caret-right" aria-hidden="true"></i> 設定管理
        </router-link>
      </div>
    </div>
    <div v-if="role == 'editor'">
      <div class="list-group list-group-flush"> 
        <router-link to='/dashboard/release' class="list-group-item list-group-item-action" 
          id="releasenumber"><i class="fa fa-caret-right" aria-hidden="true"></i> 発売号一覧管理
        </router-link>
        <router-link to='/dashboard/category' class="list-group-item list-group-item-action" 
          id="category"><i class="fa fa-caret-right" aria-hidden="true"></i> カテゴリ管理
        </router-link>
        <router-link to='/dashboard/article' class="list-group-item list-group-item-action" 
          id="article"><i class="fa fa-caret-right" aria-hidden="true"></i> 記事一覧管理
        </router-link>
        <a href="#" class="list-group-item list-group-item-action" id="image_menu">
          <i class="fa fa-caret-right" aria-hidden="true"></i> 画像管理
        </a>
      </div>
    </div>
    <div v-if="role == 'contributor'">
      <div class="list-group list-group-flush"> 
        <router-link to='/dashboard/article' class="list-group-item list-group-item-action" 
          id="article"><i class="fa fa-caret-right" aria-hidden="true"></i> 記事一覧管理
        </router-link>
        <a href="#" class="list-group-item list-group-item-action" id="image_menu">
          <i class="fa fa-caret-right" aria-hidden="true"></i> 画像管理
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      role: ''
    }
  },
  computed: {
    // ...mapGetters(['isSuperAdmin_Admin']),
    // ...mapGetters(['isEditor']),
    // ...mapGetters(['isContributor'])
    isSuperAdmin(){
      return this.$store.getters.isSuperAdmin
    },
    isAdmin(){
      return this.$store.getters.isAdmin
    },
    isEditor(){
      return this.$store.getters.isEditor
    },
    isContributor(){
      return this.$store.getters.isContributor
    },
    getRole(){
      return this.$store.getters.role
    },
  },
  created(){
    this.role = localStorage.getItem("role")
  }
}
</script>

<style>
  .list-group-item{
    color: #8e8b8b;
  }
  .router-link-exact-active {
   color: #000000;
  }
  #sidebar-wrapper {
    min-height: 100vh;
    -webkit-transition: margin .25s ease-out;
    -moz-transition: margin .25s ease-out;
    -o-transition: margin .25s ease-out;
    transition: margin .25s ease-out;
    padding-top: 50px;
    border: 1px solid dark;
  }
  #sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
  }
  #sidebar-wrapper .list-group {
    width: 15rem;
  }
  .sidebar-heading{
    background-color: #5B9BD5;
  }
  .list-group a {
    text-align: left;
    font-weight: bold;
    padding-left: 20px;
  }
  .list-group-item{
    border: 0;
    padding-top: 5px;
  }
  .title{
    padding-left: 5px;
    float:left;
    margin-top: 10px;
    font-size: 15px;
  }
</style>