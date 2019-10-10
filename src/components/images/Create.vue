<template>
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <h4 class="mt-4 text-left">新規発売号登録</h4>
        <div id="image-upload">
          <form id="validateImage">
            <p if="errors.length">
              <ul>
                <li v-for="error in errors" v-bind:key="error" id="error">{{ error }}</li>
              </ul>
            </p>
            <div class="form-group style1">
              <vue-dropzone ref="myVueDropzone" id="upload" :options="dropzoneOptions"  
                @vdropzone-complete="afterComplete" @vdropzone-removed-file="removeThisFile"></vue-dropzone>
            </div>
            <router-link :to="{name: 'img'}" class="btn btn-danger style1" id="cancel-add-image" v-on:click.native="resetState()">キャンセル</router-link>
            <!-- <button @click="resetState()" type="button">dafadf</button> -->
          </form>
        </div>
        <div class="form-group" id="list-image">
          <div class="" v-for="image in imagesList" :key="image.id" :image="image">
              <div class="item">
                <img :src="'http://localhost:3000/'+image.url">
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import vue2Dropzone from 'vue2-dropzone'
import SweetAlert from './../../services/SweetAlert'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  data() {
    return {
      errors:[],
      errormessage: {
        // anh so phat hanh
        message1:  "発売号画像が10mb以下のみ有効", // hon 10mb
        message2:  "発売号画像は「png」「jpg」のみ有効です。",  // khac dinh dang png - jpg
      },
      form: {
        file: '',
      },
      imagesList: [],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        uploadMultiple: false,
        thumbnailWidth: 150,
        addRemoveLinks: true,
        // maxFilesize: 10,
        paramName: "upload",
        dictDefaultMessage: "<i class='fa fa-upload'></i><br>ここに画像ドラッグ",
        headers: { "My-Awesome-Header": "header value" },
      }
    }
  },
  components: {
    vueDropzone: vue2Dropzone,
    Datepicker
  },
  computed: {
    getImageList(){
      return this.$store.getters.getImageList
    }
  },
  created(){
    this.fetchImageList()
  },
  methods: {
    validateImage(){
      if(this.form.file.size > 10000000){
        this.errors.push(this.errormessage.message1)
      }
      if (this.form.file.type != "image/jpg" && this.form.file.type != "image/png") {
        this.errors.push(this.errormessage.message2)
      }
    },
    fetchImageList(){
      this.imagesList = this.getImageList
      // console.log(this.imagesList)
    },
    createRelease(){
      this.errors = [];
      this.validateImage()
      if(!this.errors.length){
        this.$store.dispatch('createImage', this.form)
        .then(()=> this.fetchImageList())
        .catch((error)=>{
          this.errors.push(error.response.data.error.message)
        })
      } 
    },
    afterComplete(file) {
      this.form.file = file
      console.log(this.form)
      this.createRelease()
    },
    removeThisFile(file){
      let urlFile = file.url
      console.log(urlFile)
    },
    resetState(){
      this.$store.dispatch('resetImageList')
      .then(()=> console.log(""))
        .catch((error)=>{
        })
    }
  },
}
</script>

<style>
  label{
    color: #aaa2a2;
    font-weight: bold;
  }
  #cancel-add-image, label{
    float: left;
  }
  #image-upload{
    padding-top: 20px;
    padding-right: 80px;
    width: 84%;
    margin: 0 auto;
  }
  #list-image{
    width: 85%;
    margin: 0 auto;
  }
  #list-image .item{
    float: left;
    width: 247px;
    height: 200px;
    margin-left: 10px;
    background-color: #ffffff;
    border: 3px solid #2f6391;
    margin-top: 10px;
  }
   #list-image .item img{
      width: 99%;
      height: 99%;
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
  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }
  @media (min-width: 768px) {
    #sidebar-wrapper {
    margin-left: 0;
    }
    #page-content-wrapper {
    min-width: 0;
    width: 100%;
    }
    #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
    }
  }
  nav {
    background-color: #5B9BD5;
  }
  /* upload image - drop zone */
  .dropzone {
    border: 2px solid #dedede;
    border-radius: 0%;
    background: #f5f5f5;
  }

  .dropzone i{
    font-size: 5rem;
  }

  .dropzone .dz-message {
    color: rgba(0,0,0,.54);
    font-weight: 500;
    font-size: initial;
    text-transform: uppercase;
  }
  #list-image {
    padding-top: 70px;
  }
  input {
    border: none;
  }
  /* border style color */
  .style1, #addcreate, #cancelcreate{
    border: 3px solid #4379a8;
  }
</style>