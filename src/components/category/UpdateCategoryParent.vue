<template>
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">親カテゴリ変更</h4>
        <div class="createparent">
        <form class="form-category" id="validateCategoryParent">
          <p if="errors.length">
            <ul>
              <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
            </ul>
          </p>
          <div class="form-group form-input">
            <label for="categoryName" class="lblParentCategory">カテゴリ名</label>
            <input type="text" class="form-control" id="categoryName" v-model="form.name">
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="globalMenu" name="example1" v-model="form.global_menu">
              <label class="custom-control-label lblcheckbox2 lblParentCategory" for="globalMenu">グローバルナビ表示</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="menubar" name="example1" v-model="form.menu_bar">
              <label class="custom-control-label lblcheckbox3 lblParentCategory" for="menubar">メニューバー表示 </label>
            </div>
          </div>
          <div class="form-group btnform">
          <button type="button" class="btn btn-primary addCategory" @click="editParentCategory()">保存</button>
          <button type="button" class="btn btn-secondary cancelCategory" @click="$router.go(-1)">キャンセル</button>
          </div>
        </form>
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
      errors: [],
      errorMessage:{
        // ten category
        message1:  "カテゴリ名を入力してください。", // rong
        message2:  "カテゴリ名は５文字から５０文字まで", // 50 < ki tu < 5, 
      },
      form: {
        id: this.$route.params.id,
        name:'',
        global_menu: false,
        menu_bar: false
      }
    }
  },
  created(){
    axios.get('v1/admin/category/parents/'+ this.form.id).then((response)=> {
      console.log(response.data)
      this.form.name = response.data.parent_category.name
      this.form.global_menu = response.data.parent_category.global_menu
      this.form.menu_bar = response.data.parent_category.menu_bar
    }).catch((e) => {
      console.log('Loi lay du lieu')
    })
  },
  methods: {
    validateCategoryParent(){
      if(!this.form.name){
        this.errors.push(this.errorMessage.message1)
      }
      if(this.form.name && this.form.name.length < 5 || this.form.name.length > 50){
        this.errors.push(this.errorMessage.message2)
      }
    },
    editParentCategory(){
      this.errors = []
      this.validateCategoryParent()
      console.log(this.form)
      if(!this.errors.length){
        axios.patch('v1/admin/category/parents/'+ this.form.id, this.form).then(response=>{
          this.$router.go(-1)
        }).catch(error=>{
          this.errors = error.response.data;
        });
      }
    }
  }
}
</script>

<style>
  .custom-control.custom-checkbox{padding-left: 0;}

  label.custom-control-label {
    position: relative;
    padding-right: 3.7rem;
  }

  label.custom-control-label::before, label.custom-control-label::after{
    right: 0;
    left: auto;
  }
  .createparent{
    padding: 20px 5px;
  }
  .btnform{
    padding-top: 30px;
    float: left;
  }
  .addCategory{
    margin-right: 10px;
    width: 100px;
    background-color: #bad1e7;
  }
  .cancelCategory{
    background-color: #f8c4a1;
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
  .lblParentCategory{
    margin-right: 120px;
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
  input#categoryName{
    border-radius: 0%;
    width: 80%;
  }
  label.lblcheckbox3{
    position: relative;
    padding-right: 5rem;  
  }
  .form-category label{
    color: #6b6767;
  }
</style>