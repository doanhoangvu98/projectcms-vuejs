<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">発売号一覧管理</h4>
      <!-- <button id="add" type="submit" class="btn btn-primary">新規登録</button> -->
      <router-link to="/dashboard/release/new" class="btn btn-primary" id="add">新規登録</router-link>
      <div class="management">
        <table class="table table-bordered">
          <thead>
          </thead>
          <tbody v-for="(release,index) in release_numbers" :key="release.id" :release="release" :index="index">
            <tr>
              <td class="colstyle1 id">{{index+1}}</td>
              <td scope="row" class="colstyle2"><h5>{{ customFormatDate(release.name)  }}</h5></td>
              <td class="colstyle2">
                <div class="imagerelease">
                  <img :src=release.image>
                </div>
              </td>
              <td class="colstyle2">
                <div class="pull-bottom" style="margin-top: 2%; vertical-align: middle;">
                  <button id="delete" type="submit" class="btn btn-danger" data-toggle="modal" data-target="#releaseModal" @click="setReleaseNumber(release)">削除</button>
                </div>
                <div class="pull-top">
                  <!-- <button type="submit" class="btn btn-info" @click="moveToEditPage(release)">変更</button> -->
                  <router-link :to="{name: 'release_edit', params: {id: release.id}}" class="btn btn-info">
                    変更
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal confrim delete release -->
        <div class="modal fade" id="releaseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">発売号の削除</h5>
              </div>
              <div class="modal-body">
                この発売号を削除してよろしいですか。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-auto" @click="removeRelease(release)">はい</button>
                <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">いいえ</button>
              </div>
            </div>
          </div>
        </div>
        <!-- end popup -->
        <ul class="pagination">
          <li class="page-item"><a class="page-link previous" href="#">前</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link next" href="#">次</a></li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  data(){
    return {
      release_numbers: [],
      error: ''
    }
  },
  mounted() {
   axios.get('v1/admin/release_numbers').then((response)=> {
      this.release_numbers = response.data.release_number
      console.log(response)
    }).catch((e) => {
      console.log('Loi lay du lieu')
    })
  },
  methods: {
    customFormatDate(date) {
      return moment(date).format('YYYY年MM月DD日号');
    },
    setReleaseNumber(release){
      this.release = release
    },
    removeRelease(release){
      // alert(release.id)
      axios.delete('v1/admin/release_numbers/' + release.id)
      .then(response => {
        this.release_numbers.splice(this.release_numbers.indexOf(release), 1)
        // window.location.reload()
        $("#releaseModal").modal('hide');
      }).catch((e) => {
      console.log('Loi xoa')
      })
    }
  }
}
</script>

<style>
  #add{
    float: left;
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
  .management{
    padding: 80px 5px;
  }
  .table{
     border: 1px solid #5b9bd5;
  }
  .table td{
    vertical-align: middle;
    border: 0px;
    padding: 2px 10px;
  }
  .colstyle1{
    background-color: #cfe1f1;
  }
  .colstyle2{
    background-color: #f2f2f2;
  }
  .imagerelease img{
    background: #f5f5f5;
    width: 450px;
    height: 150px;
  }
  .btn-primary{
    background-color: #5b9bd5;
    color: #000000;
  }
  .btn-danger{
    background-color: #fce1cf;
  }
  .btn-info{
    background-color: #d7edea;
  }
  .btn{
    border: 1px solid #5b9bd5;
    border-radius: 0%;
    color: #000000;
    width: 150px;
  }
  .pagination{
    padding-top: 20px;
  }
  .pagination li{
    border: 1px solid #5b9bd5;
    border-radius: 0%;
  }
  .previous, .next{
    background-color: #d1d1d1;
  }
  /* modal popup delete */
  .modal-footer{
    border-top: 0;
    padding: 3rem;
  }
  .modal-footer .btn-secondary{
    background-color: #bad1e7;
  }
  .modal-footer .btn-primary{
    background-color: #f9f490;
  }
  .modal-footer .btn {
    border: 2px solid #5b9bd5;
    border-radius: 0%;
  }
  .modal-header{
    background-color: #b8ddd0;
  }
  .modal-body, .modal-footer{
    background-color: #f2f2f2;
  }
  .modal-title{
    margin: auto;
  }
  .modal-content  {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 0px !important; 
    border: 2px solid #3f85c1;
  }
</style>