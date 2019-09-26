<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="list-group list-group-flush"> 
      <router-link :to="{ path: 'admin/release'}" class="list-group-item list-group-item-action bg-light" 
        id="releasenumber"> <i class="fa fa-caret-right" aria-hidden="true"></i> 発売号一覧管理
      </router-link>
      <!-- <a href="#" class="list-group-item list-group-item-action bg-light" id="releasenumber">
        <i class="fa fa-caret-right" aria-hidden="true"></i> 発売号一覧管理
      </a> -->
      <a href="#" class="list-group-item list-group-item-action bg-light" id="useradmin">
        <i class="fa fa-caret-right" aria-hidden="true"></i> アドミンユーザー管理
      </a>
      <a href="#" class="list-group-item list-group-item-action bg-light" id="category">
       <i class="fa fa-caret-right" aria-hidden="true"></i> カテゴリ管理
      </a>
      <a href="#" class="list-group-item list-group-item-action bg-light" id="article">
        <i class="fa fa-caret-right" aria-hidden="true"></i> 記事一覧管理
      </a>
      <a href="#" class="list-group-item list-group-item-action bg-light" id="image">
        <i class="fa fa-caret-right" aria-hidden="true"></i> 画像管理
      </a>
      <a href="#" class="list-group-item list-group-item-action bg-light" id="member">
        <i class="fa fa-caret-right" aria-hidden="true"></i> メンバー一覧管理
      </a>
      <a href="#" class="list-group-item list-group-item-action bg-light" id="setting">
        <i class="fa fa-caret-right" aria-hidden="true"></i> 設定管理
      </a>
    </div>
  </div>
</template>

<script>
export default {
   
}
</script>

<style>
#sidebar-wrapper {
  min-height: 100vh;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
  padding-top: 50px;
}
#sidebar-wrapper .sidebar-heading {
padding: 0.875rem 1.25rem;
font-size: 1.2rem;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}
.sidebar-heading{
  background-color: #0095ff;
}
.list-group a {
  text-align: left;
  font-weight: bold;
}
.list-group-item{
  border: 0;
}
</style>