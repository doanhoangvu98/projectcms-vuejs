<template>
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <h4 class="mt-4 text-left">新規発売号登録</h4>
        <div id="releasenumber">
          <form>
            <div class="form-group">
              <label for="releasenumber">発売号名</label>
              <input type="text" class="form-control" id="datepicker" v-model="daterelease">
              <input  id="inputEmail" class="form-control" placeholder="メールの入力" v-model="email" autofocus>
            </div>
            <div class="form-group">
              <label for="releasenumber">発売号画像</label>
              <div class="custom-file">
                <form action="/file-upload" class="dropzone dz-clickable">
                  <div class="dz-message d-flex flex-column">
                    <i class="material-icons text-muted">cloud_upload
                    </i>
                    <!-- <input type="file" id="myFile" name="filename2" :v-model="filename" class="dz-message d-flex flex-column"></input> -->
                    ここに画像ドラッグ
                  </div>
                </form>
              </div>
            </div>
            <div class="form-group" id="description">
              <label>形容</label>
              <textarea class="form-control" rows="5" placeholder="形容の入力"></textarea>
            </div>
            <button id="add" type="submit" class="btn btn-primary" @click="uploadimage()">保存</button>
            <button id="cancel" type="submit" class="btn btn-danger">キャンセル</button>
            <!-- <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone> -->
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import vueDropzone from "vue2-dropzone";
export default {
  methods: {
    uploadimage(){

    }
  },
  data() {
    return {
        // filename: '',
        daterelease: 'uhbhbhub',
        email: ''
    }

  }
  // name: 'app',
  // components: {
  //   vueDropzone: vue2Dropzone
  // },
  // data: function () {
  //   return {
  //     dropzoneOptions: {
  //         url: 'https://httpbin.org/post',
  //         thumbnailWidth: 150,
  //         maxFilesize: 0.5,
  //         headers: { "My-Awesome-Header": "header value" }
  //     }
  //   }
  // }
}
</script>

<script>
$(function() {
  $("#my-dropzone").dropzone({
    //url: "/file/post", // If not using a form element
    
  });
  $('#datepicker').datepicker({
    uiLibrary: 'bootstrap4', 
    format: 'yyyy/mm/dd'
  });
});
</script>

<style>
  #add, #cancel, label{
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
    background-color: #0095ff;
  }
  /* upload image - drop zone */
  .dropzone {
    border: 2px solid #dedede;
    border-radius: 5px;
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
</style>