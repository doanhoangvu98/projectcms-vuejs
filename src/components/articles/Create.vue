<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
        <h4 class="mt-4 text-left">新規記事登録</h4>
        <!-- <router-link to="/dashboard/article/new" class="btn btn-primary" id="add">新規記事追加</router-link> -->
        <div class="article-mana-create">
            <p if="errors.length">
                <ul>
                    <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
                </ul>
            </p>
            <form id="validateArticle">
                <div class="row">
                    <div class="leftform col-md-9 box1">
                        <div class="col-md-11">
                            <div class="form-group row">
                                <label for="inputTitle" class="col-sm-2 col-form-label">タイトル</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control input-article" id="inputTitle" v-model="form.title">
                                </div>
                            </div>
                            <!-- <div class="form-group row">
                                <label for="inputPublishDate" class="col-sm-2 col-form-label">公開日</label>
                                <div class="col-sm-9">
                                    <datepicker name="release_date" class="form-control" input-class="input-class" 
                                     :format="customFormatter" :language="language" 
                                    id="inputPublishDate"></datepicker>
                                </div>
                            </div> -->
                            <div class="form-group row">
                                <label for="inputReleaseDate" class="col-sm-2 col-form-label">発売号</label>
                                <div class="col-sm-9">
                                    <!-- <datepicker name="release_date" class="form-control" input-class="input-class" 
                                    v-model="form.release_date" :format="customFormatter" :language="language" 
                                    id="inputReleaseDate"></datepicker> --> 
                                    <select v-model="form.release_date" class="form-control input-article">
                                        <option v-for="release_date in release_number_date" :key="release_date.id" 
                                        :value="release_date.id">{{customFormatDate(release_date.name)}}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- article content -->
                            <div class="row" id="article-content">
                                <!-- <ckeditor :editor="editor" v-model="form.content" :config="editorConfig"></ckeditor> -->
                                <vue-editor v-model="form.content" />
                            </div>
                        </div>
                        <div class="space col-md-1">

                        </div>
                    </div>
                    <!-- category, status -->
                    <div class="rightform col-md-3 box2">
                        <div class="col-md-12">
                            <!-- select parent category -->
                            <div class="row">
                                <div class="dropdown">
                                    <p class="title-drop-create">親カテゴリ</p>
                                    <select v-model="form.parent_id" @change="selectParentCategory()">
                                        <option v-for="parent_category in parent_categories" :key="parent_category.id" 
                                        :value="parent_category.id">{{parent_category.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- select child category -->
                            <div class="row">
                                <div class="dropdown">
                                    <p class="title-drop-create">親カテゴリ</p>
                                    <select v-model="form.children_id">
                                            <option v-for="children_category in children_categories" :key="children_category.id" 
                                            :value="children_category.id">{{children_category.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- article status -->
                            <div class="row">
                                <div class="dropdown">
                                    <p class="title-drop-create">子カテゴリ</p>
                                    <select v-model="form.status">
                                            <option selected>公開</option>
                                            <option>非公開</option>
                                            <option>下書き</option>
                                    </select>
                                </div>
                            </div>
                            <!-- upload image -->
                            <p class="title-upload-create">サムネイル</p>
                            <div class="row">
                                <div class="imageArticle">
                                <vue-dropzone ref="myVueDropzone" id="upload" :options="dropzoneOptions"  
                                    @vdropzone-complete="afterComplete" @vdropzone-removed-file="removeFile"></vue-dropzone>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row btnArticle">
                    <button type="button" class="btn btn-primary" id="addArticle" @click="addArticle()">保存</button>
                    <button type="button" class="btn btn-secondary" id="backArticle" @click="$router.go(-1)">キャンセル</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Datepicker from 'vuejs-datepicker';
import { mapState } from 'vuex'

export default {
    data(){
        return {
            parent_categories: [],
            children_categories: [],
            release_number_date: [],
            form: {
                title: '',
                content: '',
                status:'',
                release_date: '',
                // publish_date: '',
                children_id: '',
                parent_id: '',
                file: ''
            },
            editor: ClassicEditor,
                content: '',
                editorConfig: {

            },
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                uploadMultiple: false,
                thumbnailWidth: 150,
                addRemoveLinks: true,
                // maxFilesize: 30,
                paramName: "upload",
                dictDefaultMessage: "<i class='fa fa-upload'></i><br>ここに画像ドラッグ",
                headers: { "My-Awesome-Header": "header value" },
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
            errors: [],
            errrorMessage: {
                //title
                message1:  "タイトルを入力してください。" , // null
                message2: 'タイトルは10文字から300文字まで入力してください。', //  300 < do dai title < 10
                //publish_date
                message3: '公開日を入力してください。', // null
                message4: '公開日は14文字以下み有効です。', // > 14 ki tu
                //release_date
                message5: '公開日を入力してください。', // null
                //content
                message6: '記事内容を入力してください。', // null
                //parent category
                message7: '親カテゴリを入力してください', // null
                //child category
                message8: '子カテゴリを入力してください。', // null
                // thumbnail
                message9: 'サムネイルのファイルは「png」、「jpg」のみ有効です。' // khong phai png, jpg
            }
        }
    },
    components:{
        vueDropzone: vue2Dropzone,
        Datepicker
    },
    computed: {
        getParentCategory() { return this.$store.getters.getParentCategory},
        getChildrenCategory() { return this.$store.getters.getChildrenCategory},
        getReleaseNumberDate() { return this.$store.getters.getReleaseNumberDate}
    },
    created() {
        // fetch parent category
        this.$store.dispatch('fetchParentCategory')
        .then((response)=> {
            this.parent_categories = this.getParentCategory
        }).catch((e) => {
            console.log(e)
        })
        // fetch release_date from release number
        this.$store.dispatch('fetchReleaseNumberDate')
        .then((response)=> {
            this.release_number_date = this.getReleaseNumberDate
        }).catch((e) => {
            console.log(e)
        })
    },
    methods: {
        customFormatDate(date) {
            return moment(date).format('YYYY年MM月DD日号');
        },
        afterComplete(file) {
            this.form.file = file
            // console.log(this.form)
        },
        removeFile(){
            this.form.file = ''
        },
        validateArticle(){
            if(!this.form.title){
                this.errors.push(this.errrorMessage.message1)
            }
            if(this.form.title && this.form.title.length > 300 || this.form.title.length < 10){
                this.errors.push(this.errrorMessage.message2)
            }
            if(!this.form.release_date){
                this.errors.push(this.errrorMessage.message3)
            }
            // if(!this.form.publish_date || !this.form.release_date){
            //     this.errors.push(this.errrorMessage.message3)
            // }
            // if(this.form.publish_date && this.form.publish_date.length > 14){
            //     this.errors.push(this.errrorMessage.message4)
            // }
            if(!this.form.content){
                this.errors.push(this.errrorMessage.message6)
            }
            if(!this.form.parent_id){
                this.errors.push(this.errrorMessage.message7)
            }
            if(!this.form.children_id){
                this.errors.push(this.errrorMessage.message8)
            }
            if (this.form.file && this.form.file.type != "image/jpg" && this.form.file.type != "image/png") {
                this.errors.push(this.errrorMessage.message9)
            }
        },
        addArticle(){
            this.errors = []
            this.validateArticle()
            console.log(this.form)
            if(!this.errors.length){
                this.$store.dispatch('createArticle', this.form)
                .then(() => this.$router.push({name: 'article'}))
                .catch(error => this.errors.push(error.response.data.error.message))
            }
        },
        // load category con theo category cha
        selectParentCategory(){
            this.$store.dispatch('fetchChildrenCategory', this.form.parent_id)
            .then((response)=> {
                this.children_categories = this.getChildrenCategory
            }).catch((e) => {
                console.log(e)
            })
        },
        removeFile(){
            this.form.file = ''
        }
    }
}
</script>

<style>
    .input-article{
        border-radius: 0%;
    }
    .quillWrapper{
        width: 100%;
    }
    .btnArticle{
        padding-top: 40px;
    }
    /* editor */
    .ql-editor{
        max-height: 200px;
    }
    #addArticle{
        margin-right: 20px;
        width: 90px;
        background-color: #bad1e7;
    }
    #backArticle{
        background-color: #f9f490;
    }
    .rightform .dropdown button{
        background-color: #ffffff;
    }
    .rightform .dropdown select{
        height: 30px;
        width: 300px;
    }
    #add{
        float: left;
        margin-top: 10px;
    }
    .imageArticle{
        padding-top: 40px;
        padding-bottom: 10px;
        margin-left: 13%;
    }
    .title-drop-create{
        margin-left: 10px;
    }
    .title-upload-create{
        padding-top: 10px;
        float: left;
        padding-bottom: 20px;
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
    .article-mana-create{
        padding: 20px 5px;
        /* background-color: #f2f2f2; */
        height: 400px;
    }
    #article-content{
        margin-left: 20px;
        /* padding-bottom: 100px; */
    }
    .ck.ck-editor {
        width: 100%;
    }
    .ck-editor__editable_inline {
        min-height: 200px;
    }
    .leftform{
        padding-top: 10px;
        height: 400px;;
    }   
    .rightform{
        background-color: #f2f2f2;
    }
    .rightform .dropdown{
        width: 100%;
    }
    .title-drop-create{
        margin-top: 5px;
        text-align: left;
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
</style>