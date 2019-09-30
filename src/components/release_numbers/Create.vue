<template>
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <h4 class="mt-4 text-left">新規発売号登録</h4>
        <div id="releasenumber">
          <form>
            <div class="form-group">
              <label for="releasenumber">発売号名</label><br>
              <datepicker name="release_date" class="form-control daterelease" input-class="input-class" 
                v-model="form.date_release" :format="customFormatter" :language="language"></datepicker>
              <!-- <input type="text" class="form-control" id="datepicker" v-model="form.date_release" placeholder="2019年04月12日号"> -->
            </div>
            <div class="form-group style1">
              <vue-dropzone ref="myVueDropzone" id="upload" :options="dropzoneOptions"  
                @vdropzone-complete="afterComplete"></vue-dropzone>
            </div>
            <div class="form-group" id="description">
              <label>形容</label>
              <textarea class="form-control" rows="5" v-model="form.description" placeholder="形容の入力"></textarea>
            </div>
          </form>
            <button id="addcreate" type="submit" class="btn btn-primary style1" @click="createRelease()">保存</button>
            <button id="cancelcreate" type="submit" class="btn btn-danger style1">キャンセル</button>
        </div>
      </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import vue2Dropzone from 'vue2-dropzone'
import SweetAlert from '../../services/SweetAlert';
export default {
  data() {
    return {
    // file: '',
     form: {
        date_release: '2019-04-12',
        file: '',
        description: '',
      },
      customFormatter: 'yyyy年MM月dd日号',
      language:{
        language: 'Japanese', 
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], 
        monthsAbbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], 
        days: ['日', '月', '火', '水', '木', '金', '土'], 
        rtl: false, 
        ymd: 'yyyy-MM-dd', 
        yearSuffix: '年'
     },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        uploadMultiple: false,
        thumbnailWidth: 150,
        maxFilesize: 30,
        paramName: "upload",
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        headers: { "My-Awesome-Header": "header value" },
      }
    }
  },
  components: {
     vueDropzone: vue2Dropzone,
     Datepicker
  },
  methods: {
    beforeMount(){
      this.afterComplete(file)
    },
    createRelease(){
      this.$store.dispatch('create', this.form).then((response)=> {
        SweetAlert.success()
        window.setTimeout(function(){location.reload()},1100)
        console.log(response.data);
      }).catch((e) => {
        
      })
    },
    afterComplete(file) {
      this.form.file = file
      console.log(this.form)
      // let name = this.form.date_release
      // let description = this.form.description
    },
  },
}
</script>

<style>
  label{
    color: #d1d1d1;
    font-weight: bold;
  }
  #addcreate, #cancelcreate, label{
    float: left;
    margin: 4px;
  }
  #addcreate{
    width: 80px;
  }
  #releasenumber{
    padding-top: 20px;
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
  #description {
    padding-top: 70px;
  }
  .daterelease{
    /* float: left; */
    margin-top: 10px;
  }
  input {
    border: none;
  }
  /* border style color */
  .style1, #addcreate, #cancelcreate{
    border: 2px solid #4379a8;
  }
</style>