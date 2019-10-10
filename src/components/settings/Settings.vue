<template>
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <h4 class="mt-4 text-left">新規カテゴリ登録</h4>
        <div class="settings">
            <form class="setting-page" id="validateSettingsPage">
                <p if="errors.length">
                    <ul>
                    <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
                    </ul>
                </p>
                <div class="row">
                    <label for="releasepage" class="col-sm-2 col-form-label">発売号一覧のページ</label>
                    <div class="col-sm-1">
                        <input type="number" min="0" @input="filterInput" class="form-control" id="releasepage" v-model="form.page_num_release">
                    </div>
                    <p class="col-sm-2 labelPage">/ 行数</p>
                </div>
                <div class="row">
                    <label for="useradminpage" class="col-sm-2 col-form-label">アドミンジューザのページ</label>
                    <div class="col-sm-1">
                        <input type="number" min="0" @input="filterInput" class="form-control" id="useradminpage" v-model="form.page_num_user_admin">
                    </div>
                    <p class="col-sm-2 labelPage">/ 行数</p>
                </div>
                 <div class="row">
                    <label for="articlepage" class="col-sm-2 col-form-label">記事一覧のページ</label>
                    <div class="col-sm-1">
                        <input type="number" min="0" @input="filterInput" class="form-control" id="articlepage" v-model="form.page_num_article">
                    </div>
                    <p class="col-sm-2 labelPage">/ 行数</p>
                </div>
                <div class="row">
                    <label for="memberpage" class="col-sm-2 col-form-label">メンバーのページ</label>
                    <div class="col-sm-1">
                        <input type="number" min="0" @input="filterInput" class="form-control" id="memberpage" v-model="form.page_num_member">
                    </div>
                    <p class="col-sm-2 labelPage">/ 行数</p>
                </div>
                <div class="row">
                    <label for="imagepage" class="col-sm-2 col-form-label">画像のページ</label>
                    <div class="col-sm-1">
                        <input type="number" min="0" @input="filterInput" class="form-control" id="imagepage" v-model="form.page_num_image">
                    </div>
                    <p class="col-sm-2 labelPage">/ 行数</p>
                </div>
                <!-- <button type="button" class="btn btn-primary" id="saveSettings" @click="saveSettings()">保存</button> -->
                <button type="button" class="btn btn-primary" id="editSettings" @click="editSettings()">保存</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      form: {
          id: '',
          page_num_release: '',
          page_num_user_admin: '',
          page_num_article: '',
          page_num_member: '',
          page_num_image: ''
      },
      errors: [],
    }
  },
  computed: {
        getNumberPage() { return this.$store.getters.getNumberPage },
    },
  created() {
      this.fetchNumberPage()
    },
  methods: {
    fetchNumberPage(){
         this.$store.dispatch('fetchNumberPage')
            .then((response)=> {
                this.form = this.getNumberPage
            }).catch((error) => {
                 this.errors.push(error.response.data.error.message)
            })
    },
    validateSettingsPage(){
        if(!this.form.page_num_release || !this.form.page_num_article 
        || !this.form.page_num_member || !this.form.page_num_image || !this.form.page_num_user_admin){
            this.errors.push("記事内容を入力してください")
        }
    },
    saveSettings(){
      this.errors = []
      this.validateSettingsPage()
      console.log(this.form)
      if(!this.errors.length){
        this.$store.dispatch('createNumberPage', this.form)
        .then(()=> this.fetchNumberPage())
        .catch((e)=>{
        })
      }
    },
    editSettings(){
      this.errors = []
      this.validateSettingsPage()
      this.form.id = 1
      // console.log(this.form.id)
      if(!this.errors.length){
        this.$store.dispatch('editNumberPage', this.form)
        .then(()=> console.log(""))
        .catch((e)=>{
        })
      }
    },
    filterInput(e){
      e.target.value = e.target.value.replace(/[^0-9]+/g, '');
    }
  }
}
</script>

<style>
.setting-page label{
    color: #878383;
    text-align: right;
}
div.settings{
    width: 100%;
    padding-top: 30px;
    float: left;
}
button#saveSettings, button#editSettings{
    margin-top: 40px;
    float:left;
    border: 2px solid #2f58c6;
    margin-left: 100px;
    width: 100px;
}
.labelPage{
    float: left;
    margin-left: 0px;
    margin-left: -100px;
    padding-top: 4px;
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
</style>