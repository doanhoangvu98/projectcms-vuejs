<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">画像一覧管理</h4><br>
      <p if="errors.length">
          <ul>
            <li v-for="error in errors" v-bind:key="error" id="error">{{ error }}</li>
          </ul>
      </p>
      <div class="row">
          <div class="col-md-2">
              <router-link :to="{name: 'img_upload'}" class="btn btn-primary" id="addImage">新規画像追加</router-link>
          </div>
          <div class="col-md-9">
               <input type="text" class="form-control" id="imagekeyword" placeholder="検索内容の入力" v-model="search.file_name">
          </div>
          <div class="col-md-1">
              <button type="button" class="btn btn-danger" id="image-search" @click="searchImage()">検索</button>
          </div>
      </div>
      <div class="management">
        <p if="errors.length">
          <ul>
            <li v-for="error in errors" v-bind:key="error" id="error">{{ error }}</li>
          </ul>
        </p>
        <table class="table image-table">
          <thead>
          </thead>
          <tbody v-for="(image,index) in displayImages" :key="image.id" :image="image" :index="index">
            <tr>
              <td class="colstyle1 image-index">{{index+1+(page*perPage)-perPage}}</td>
              <td class="colstyle2">
                <div class="image-image" @click="showImage(image, index)" data-toggle="modal" data-target="#show-image">
                  <img :src=image.url>
                </div>
                </td>
                <td scope="row" class="colstyle2 image-info">
                  <h5>画像名：{{image.name}}</h5>
                  <h5>作成日：{{ customFormatDate(image.created_at)}}</h5>
                </td>
                <td class="colstyle2">
                    <div class="pull-bottom" style="margin-top: 2%; vertical-align: middle;">
                        <button id="delete" type="submit" class="btn btn-danger img-btn" data-toggle="modal" data-target="#image-delete" @click="setImage(image)">削除</button>
                    </div>
                    <div class="pull-top">
                    <!-- <button type="button" class="btn btn-info img-btn" 
                        data-toggle="modal" data-target="#show-image" @click="showImage(image, index)">表示</button> -->
                        <button type="button" class="btn btn-info img-btn" @click="copyImageLink(image)" >表示</button>
                    </div>
                </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal confrim delete image -->
        <div class="modal fade" id="image-delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">画像の削除</h5>
              </div>
              <div class="modal-body image-delete-body">
                この画像を削除してよろしいですか。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary mr-auto img-btn" @click="removeImage(image)">はい</button>
                <button type="button" class="btn btn-primary mr-auto img-btn" data-dismiss="modal">いいえ</button>
              </div>
            </div>
          </div>
        </div>
        <!-- end popup -->
        <!-- Modal show image -->
        <div class="modal fade" id="show-image" tabindex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header header-image-show">
                        <h5 class="modal-title" id="image-title-show">画像名：{{image.name}}</h5>
                        <button type="button" class="btn btn-info img-btn" data-dismiss="modal">コピー</button>
                        <button type="button" class="btn btn-danger img-btn" data-dismiss="modal">閉じる</button>
                    </div>
                    <div class="modal-body" id="display-image">
                        <img :src="image.url">
                    </div>
                </div>
            </div>
        </div>
        <!-- end popup -->
        <ul class="pagination">
          <li class="page-item" v-if="page != 1" @click="page--"><a class="page-link previous" href="#">前</a></li>
          <li class="page-item" v-for="pageNumber in pages" :key="pageNumber" @click="page = pageNumber" 
            v-bind:class="{'active':(page == pageNumber)}">
            <!-- <a class="page-link" href="#">{{pageNumber}}</a> -->
            <a class="page-link page-link-body">{{pageNumber}}</a>
          </li>
          <li class="page-item" @click="page++" v-if="page < pages.length"><a class="page-link next" href="#">次</a></li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs'
import Swal from 'sweetalert2'
import Vue from 'vue'
import Toasted from 'vue-toasted';
Vue.use(Toasted)
export default {
  data(){
    return {
      images: [],
      image: {
        name: '',
        url: ''
      },
      search: {
        file_name: '',
      },
      error: '',
      page: 1,
      perPage: '',
      pages: [],
      errors: []
    }
  },
  created() {
    this.fetchImages()
  },
  // pagination display
  computed: {
    getImages() { 
        return this.$store.getters.getImages
    },
    displayImages () {
      return this.paginate(this.images);
    }
  },
  watch: {
    images() {
      this.setPages();
    }
  },
  methods: {
    fetchImages(){
      this.$store.dispatch('fetchImages')
        .then((response)=> {
            this.images = this.getImages.images
            this.perPage = this.getImages.perpage
        }).catch((error) => {
            this.errors.push(error.response.data.error.message)
        })
    },
    setPages(){
      this.pages.length = 0
      let numberOfPages = Math.ceil(this.images.length / this.perPage);
    //   console.log(numberOfPages)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(images) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return images.slice(from, to);
    },
    customFormatDate(date) {
      return moment(date).format('YYYY年MM月DD日号');
    },
    setImage(image){
      this.image = image
    },
    removeImage(image){
        axios.delete('v1/admin/images/' + image.id)
        .then(response => {
            this.images.splice(this.images.indexOf(image), 1)
            $("#image-delete").modal('hide');
        }).catch((error) => {
            this.errors.push(error.response.data.error.message)
        })
    },
    showImage(image, index){
        axios.get('v1/admin/images/' + image.id).then((response)=> {
            this.image.name = response.data.name
            this.image.url = response.data.url
        }).catch((error) => {
            this.errors.push(error.response.data.error.message)
        })
    },
    searchImage(){
      console.log(this.search.file_name)
      axios.get('v1/admin/images/search', { params:{ q: this.search },
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        }
      })
      .then((response) => {
          this.images = response.data.images
      })
      .catch((error) => {
          this.errors.push(error.response.data.error.message)
      })
    },
    // copy link image
    copyImageLink(image){
      this.$copyText(image.url).then(function (e) {
        Vue.toasted.show('コピー済です', {
          duration: 2000,
          type: 'success',
        });
        }, function (e) {
          // alert('Can not copy')
          // console.log(e)
        })
    }
  }
}
</script>

<style>
  .img-btn{
    border: 2px solid #336da0 !important;
  }
  .image-info{
    text-align: left;
  }
  #display-image{
    padding: 0px;
  }
  #display-image img{
    width: 800px;
    height: 400px;
    margin: 0 auto;
  }
  .header-image-show button{
    width: 100px;
    margin-left: 5px;
  }
  .header-image-show{
    background-color: #d1d1d1 !important;
  }
  #image-title-show{
      margin-left: 0px;
  }
  #imagekeyword{
    text-align: center;
    border-radius: 0%;
    border: 2px solid #2f6391;
    background-color: #f2f2f2;
    height: 40px;
    margin-left: -30px;
  }
  #image-search{
    width: 140px;
    border: 2px solid #2f6391;
    margin-left: -30px;
  }
  #addImage{
    float: left;
    border: 2px solid #2f6391;
    color: #ffffff;
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
  .image-table{
    border: 2px solid #5b9bd5;
  }
  .image-table tr{
    border: 3px solid #2f6391;
  }
  .image-table td{
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
  .image-image img{
    background: #f5f5f5;
    width: 300px;
    height: 150px;
  }
  .btn-primary{
    background-color: #5b9bd5;
    color: #000000;
  }
  .image-index{
    border-right: 3px solid #2f6391 !important;
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
  }
  .pagination{
    padding-top: 30px;
  }
  .pagination li{
    border: 2px solid #2f6391;
    border-radius: 0%;
  }
  .page-item .page-link-body{
    border-radius: 0%;
    background-color: #ffffff;
    color: #000000 !important;
  }
  .page-item .page-link-body:hover{
    cursor: pointer;
  }
  .page-item.active .page-link{
    background-color: #d7edea;
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
  .image-delete-body{
    border-top: 2px solid #3f85c1;
  }
</style>