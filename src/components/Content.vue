<template>
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <h4 class="mt-4 text-left">新規発売号登録</h4>
        <div id="releasenumber">
          <form>
            <div class="form-group">
              <label for="releasenumber">発売号名</label>
              <input type="text" class="form-control" id="releasenumber" placeholder="2019年04月12日号">
            </div>
            <div class="form-group">
              <label for="releasenumber">発売号画像</label>
              <div class="custom-file">
                <form action="/file-upload" class="dropzone dz-clickable" id="dropzone">
                  <div class="dz-message d-flex flex-column">
                    <i class="material-icons text-muted">cloud_upload</i>
                    ここに画像ドラッグ
                  </div>
                </form>
              </div>
            </div>
            <div class="form-group" id="description">
              <label>形容</label>
              <textarea class="form-control" rows="5" placeholder="形容の入力"></textarea>
            </div>
            <button id="add" type="submit" class="btn btn-primary">保存</button>
            <button id="cancel" type="submit" class="btn btn-danger">キャンセル</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>
<script>
$(function() {
  $("#my-dropzone").dropzone({
    //url: "/file/post", // If not using a form element
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