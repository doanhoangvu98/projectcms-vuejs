<template>
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">新規カテゴリ登録</h4>
        <div class="createparent">
        <form class="form-category" id="validateCategoryChild">
          <p if="errors.length">
            <ul>
              <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
            </ul>
          </p>
          <div class="form-group form-input">
            <label for="categoryChildName" id="lbl1">カテゴリ名</label>
            <input type="text" class="form-control" id="categoryChildName" v-model="form.name">
          </div>
           <div class="form-group form-input">
            <label id="lbl2">親カテゴリ名</label>
            <select class="form-control" id="categoryParentName" v-model="form.parent_id">
              <option v-for="category_parent in category_parents" :key="category_parent.id" :value="category_parent.id">{{category_parent.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="globalMenu" name="example1" v-model="form.global_menu">
              <label class="custom-control-label lblcheckbox2" for="globalMenu">グローバルナビ表示</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="menubar" name="example1" v-model="form.menu_bar">
              <label class="custom-control-label lblcheckbox3" for="menubar">メニューバー表示 </label>
            </div>
          </div>
          <div class="form-group btnform">
          <button type="button" class="btn btn-primary addCategory" @click="addCategoryChild()">保存</button>
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
      category_parents: [],
      errors: [],
      errorMessage:{
        // ten category con
        message1: "カテゴリ名を入力してください。" , // rong
        message2: "カテゴリ名は５文字から５０文字まで", // 50 < ki tu < 5, 
        // ten category cha
        message3:  "親カテゴリ名を入力してください。" // rong
      },
      form: {
        name: '',
        parent_id: '',
        global_menu: false,
        menu_bar: false
      }
    }
  },
  mounted() {
   axios.get('v1/admin/category/parents').then((response)=> {
      this.category_parents = response.data.category_parents
      console.log(response)
      }).catch((e) => {
      console.log('Loi lay du lieu category cha')
      })
    },
  methods: {
    validateCategoryChild(){
        if(!this.form.name){
            this.errors.push(this.errorMessage.message1)
        }
        if(!this.form.parent_id){
            this.errors.push(this.errorMessage.message3)
        }
        if(this.form.name && this.form.name.length < 5 || this.form.name.length > 50){
            this.errors.push(this.errorMessage.message2)
        }
    },
    addCategoryChild(){
      this.errors = []
      this.validateCategoryChild()
      console.log(this.form)
      if(!this.errors.length){
        this.$store.dispatch('createChildCategory', this.form)
        .then(()=> this.$router.push({ name: "category"}))
        .catch((e)=>{
        })
      }
    },
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
  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
    }
    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }
  }
  input#categoryChildName{
    border-radius: 0%;
    width: 80%;
  }
  select#categoryParentName{
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
  label#lbl1{
    margin-right: 115px;
  }
  label#lbl2{
    margin-right: 100px;
  }
</style>