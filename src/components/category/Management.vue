<template>
  <div id="page-content-wrapper">
    <div class="container-fluid">
        <h4 class="mt-4 text-left">発売号一覧管理</h4>
        <router-link to="/dashboard/category/parent" class="btn btn-primary" id="addParent">新規カテゴリ登録</router-link>
        <router-link to="/dashboard/category/child" class="btn btn-primary" id="addChild">新子カテゴリ登録</router-link>
        <div class="management">
            <div class="row">
                <div class="category-parent category">
                    <p class="category-parent">親カテゴリ</p>
                    <table class="table table-bordered">
                        <thead>
                        </thead>
                        <tbody>
                            <tr v-for="(category_parent, index) in category_parents" :key="category_parent.id" 
                              :category_parent="category_parent" :index="index" @click="showChildCategory(category_parent)" 
                                :class="{'highlight': (category_parent.id == selected)}">
                                <td class="col1">{{category_parent.name}}</td>
                                <td id="col2">
                                  <router-link :to="{name: 'category_parent_edit', params: {id: category_parent.id}}" class="btn btn-primary btn-updateCategory">変更</router-link>
                                  <button type="button" class="btn btn-danger btn-deleteCategory" data-toggle="modal" data-target="#categoryparent" @click="setParentCategory(category_parent)">削除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Modal confrim delete parent category  -->
                    <div class="modal fade" id="categoryparent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                              <!-- {{category_parent.id}} -->
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">発売号の削除</h5>
                            </div>
                            <div class="modal-body">
                                この発売号を削除してよろしいですか。
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary mr-auto" @click="removeParentCategory(category_p)">はい</button>
                                <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">いいえ</button>
                            </div>
                          </div>
                        </div>
                    </div>
                    <!-- end popup -->
                </div>
                <p class="space"></p>
                <div class="category-child category">
                    <p class="category-child">子カテゴリ</p>
                    <table class="table table-bordered">
                        <thead>
                        </thead>
                        <tbody>
                            <tr v-for="(category_child, index) in category_children" :key="category_child.id" 
                              :category_child="category_child" :index="index" >
                                <td class="col1">{{category_child.name}}</td>
                                <td id="col2">
                                    <router-link :to="{name: 'category_child_edit', params: {id: category_child.id}}" class="btn btn-primary btn-updateCategory">変更</router-link>
                                    <button type="button" class="btn btn-danger btn-deleteCategory" data-toggle="modal" data-target="#categorychild" @click="setChildCategory(category_child)">削除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Modal confrim delete child category popup -->
                    <div class="modal fade" id="categorychild" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">発売号の削除</h5>
                            </div>
                            <div class="modal-body">
                                この発売号を削除してよろしいですか。
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary mr-auto" @click="removeChildCategory(category_c)">はい</button>
                                <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">いいえ</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- end popup -->
                </div>
            </div>
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
      category_parents: [],
      category_children: [],
      error: '',
      selected: null
    }
  },
  // mounted() {
    created(){
    axios.get('v1/admin/category/parents').then((response)=> {
      this.category_parents = response.data.category_parents
      console.log(response)
    }).catch((e) => {
      console.log('Loi lay du lieu')
    })
    axios.get('v1/admin/category/children').then((response)=> {
      this.category_children = response.data.category_children
      console.log(response)
    }).catch((e) => {
      console.log('Loi lay du lieu')
    })
  },
  methods: {
    setChildCategory(category_child){
      this.category_c = category_child
    },
    setParentCategory(category_parent){
      this.category_p = category_parent
    },
    removeParentCategory(category_p){
      // alert(category_p.id)
      axios.delete('v1/admin/category/parents/' + category_p.id)
      .then(response => {
        this.category_parents.splice(this.category_parents.indexOf(category_p), 1)
        // window.location.reload()
        $("#categoryparent").modal('hide');
      }).catch((e) => {
      console.log('Loi xoa')
      })
    },
    removeChildCategory(category_c){
      // alert(category_c.id)
      axios.delete('v1/admin/category/children/' + category_c.id)
      .then(response => {
        this.category_children.splice(this.category_children.indexOf(category_c), 1)
        // window.location.reload()
        $("#categorychild").modal('hide');
      }).catch((e) => {
      console.log('Loi xoa')
      })
    },
    showChildCategory(category_parent){ // click parent category => hien thi child category 
      this.selected = category_parent.id
      axios.get('v1/admin/category/parents/' + category_parent.id).then((response)=> {
        // console.log(category_parent.id)
        this.category_children = response.data.category_children
        console.log(response)
      }).catch((e) => {
        console.log('Loi lay du lieu')
      })
    }
  }
}
</script>

<style>
  .space {
      -ms-flex: 0 0 8.333333%;
      -webkit-box-flex: 0;
      flex: 0 0 8.333333%;
      max-width: 1.333333%;
  }
  .category{
      background-color: #e9e9e9;
      width: 650px;
      border: 2px solid #d1d1d1;
  }
  .category-parent, .category-child{
      font-weight: bold;
      font-size: 20px;
  }
  #addParent, #addChild{
    float: left;
  }
  #addChild{
    margin-left: 10px;
  }
  .table{
      margin-top: 30px;
      border: 1px solid #000000;
  }
  .table tr {
      border: 2px solid #000000;  
  }
  .table-title{
    padding-top: 20px;
  }
  #col2{
      float: right;
  }
  .col1{
    font-weight: normal;
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
    width: 300px;
    height: 150px;
  }
  .btn{
    border-radius: 0%;
    color: #000000;
    width: 150px;
  }
  .btn-deleteCategory{
      margin-left: 10px;
      background-color:  #fce1cf;
  }
  .btn-updateCategory{
      background-color: #d7edea;;
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
  .highlight{
    background-color: #ffffff;
  }
  tr:hover{
    cursor: pointer;
  }
</style>