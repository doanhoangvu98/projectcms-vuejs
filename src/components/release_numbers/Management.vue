<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">発売号一覧管理</h4>
      <div class="row">
          <button id="add" type="submit" class="btn btn-primary">新規登録</button>
      </div>
      <div id="management">
        <table class="table table-bordered">
          <thead>
          </thead>
          <tbody>
            <tr class="row">
              <td class="col-md-1">1</td>
              <td class="col-md-4">
                <h5 style="vertical-align: middle !important;">2019年04月12日号</h5>
              </td>
              <td class="col-md-5">
                <div class="imagerelease">
                  <img v-bind:src="'https://netolink.com/wp-content/uploads/2017/04/Social-Media-Image-Sizes.png'">
                </div>
              </td>
              <td class="col-md-2">
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
    /* background-color: #0095ff; */
    padding: 10px 0px;
  }
  nav {
    background-color: #0095ff;
  }
  .table td{
    text-align: center;
    width: 300px;
    vertical-align: center;
  }
  .imagerelease img{
    background: #f5f5f5;
    width: 450px;
    height: 150px;
  }
</style>