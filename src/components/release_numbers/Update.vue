<template>
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <h4 class="mt-4 text-left">発売号変更</h4>
        <div id="releasenumber">
          <form>
            <div class="form-group">
              <label for="releasenumber">発売号名</label><br>
              <datepicker name="release_date" class="form-control daterelease" input-class="input-class" 
                v-model="form.date_release" :format="customFormatter" :language="language"></datepicker>
            </div>
            <p id="image">発売号画像</p>
            <div class="form-group">
              <div class="row">
                  <div class="col-6">
                    <div class="imageview">
                        <img :src="form.imagelink">
                    </div>
                  </div>
                <div class="col-6">
                  <div class="form-group style1">
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"  
                      @vdropzone-complete="afterComplete"></vue-dropzone>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group" id="description">
              <label>形容</label>
              <textarea class="form-control" rows="3" placeholder="この発売号は天然内容です。" v-model="form.description"></textarea>
            </div>
            <button id="update" type="submit" class="btn btn-primary" @click="editRelease()">保存</button>
            <button id="cancel" type="submit" class="btn btn-danger">キャンセル</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import vue2Dropzone from 'vue2-dropzone'
import SweetAlert from '../../services/SweetAlert';
import axios from 'axios';
export default {
  data() {
    return {
      // imagelink: '',
      form: {
        id: this.$route.params.id,
        date_release: '',
        file: '',
        description: '',
        imagelink: '',
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
          thumbnailWidth: 150,
          maxFilesize: 10,
          headers: { "My-Awesome-Header": "header value" }
      }
    }
  },
  components: {
     vueDropzone: vue2Dropzone,
     Datepicker
  },
  created(){
    axios.get('v1/admin/release_numbers/'+ this.form.id).then((response)=> {
      console.log(response.data)
      // this.form = response.data.release_number
      this.form.date_release = response.data.release_number.name
      this.form.description = response.data.release_number.description
      this.form.imagelink = response.data.image
    }).catch((e) => {
      console.log('Loi lay du lieu')
    })
  },
  methods: {
    beforeMount(){
      this.afterComplete(file)
    },
    // editRelease(){
    //   console(this.form.date_release)
    //   this.$store.dispatch('edit', this.form).then((response) =>{
    //   SweetAlert.success()
    //   }).catch((e) => {
    //     console.log('Loi edit')
    //   })
    // },
    editRelease(){
      axios.patch('v1/admin/release_numbers/'+ this.form.id, this.form).then(response=>{
        // this.form = "";
        this.$router.push('v1/dashboard/release');
      }).catch(error=>{
        this.errors = error.response.data;
      });
    },
    afterComplete(file) {
      this.form.file = file
      console.log(this.form)
    },
  },
}
</script>
<style>
  #update, #cancel, label{
    float: left;
    margin: 4px;
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
    border-radius: 5px;
    background: #f5f5f5;
    height: 195px;
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
    padding-top: 10px;
  }
  #image{
    text-align:left;
    padding-bottom: 10px;
    color: #d1d1d1;
    font-weight: bold;
  }
  .imageview {
    border: 2px solid  #4379a8;
    border-radius: 0%;
    background: #f5f5f5;
    height: 200px;
  }
  .imageview img{
    width: 570px;
    height: 195px;
  }
</style>