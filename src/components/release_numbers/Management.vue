<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">発売号一覧管理</h4>
      <!-- <button id="add" type="submit" class="btn btn-primary">新規登録</button> -->
      <router-link :to="{path: '/admin/release/new'}" class="btn btn-primary" id="add">新規登録</router-link>
      <div id="management">
        <table class="table table-bordered">
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td scope="row"><h5 style="vertical-align: middle !important;">2019年04月12日号</h5></td>
              <td>
                <div class="imagerelease">
                  <img v-bind:src="'https://netolink.com/wp-content/uploads/2017/04/Social-Media-Image-Sizes.png'">
                </div>
              </td>
              <td>
                <div class="pull-top">
                  <button id="update" type="submit" class="btn btn-primary">削除</button>
                </div>
                <div class="pull-bottom" style="margin-top: 2%; vertical-align: middle;">
                  <button id="delete" type="submit" class="btn btn-danger">変更</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">前</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">次</a></li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
  #add, label{
    float: left;
    margin: 4px;
    padding-bottom: 10px;
  }
  #update, #delete{
    margin: 5px;
    text-align: center;
  }
  #page-content-wrapper {
    min-width: 100vw;
    padding-top: 50px;
  }
  .container-fluid{
    width: 100%;
    padding-left: 30px;
    padding-right: 80px;
  }
  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
    }
    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }
  }
  #management{
    padding: 20px 0px;
  }
  .table td{
    vertical-align: middle;
  }
  .imagerelease img{
    background: #f5f5f5;
    width: 450px;
    height: 150px;
  }
</style>