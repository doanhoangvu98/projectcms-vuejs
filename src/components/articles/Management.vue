<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
        <h4 class="mt-4 text-left">記事一覧</h4>
        <router-link to="/dashboard/article/new" class="btn btn-primary article-btn" id="add">新規記事追加</router-link>
        <!-- <button type="button" @click="clearSearch()" class="btn btn-primary" id="clear-search">クリア</button> -->
            <div class="management">
                <p if="errors.length">
                    <ul>
                        <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
                    </ul>
                </p>
                <div class="article-search-frame">
                    <div class="row row1">
                        <label class="col-sm-1 col-form-label">発売号</label>
                        <div class="col-sm-2">
                            <select v-model="search.release_number" class="form-control">
                                <option></option>
                                <option v-for="release_date in release_number_date" :key="release_date.id" 
                                :value="release_date.id">{{customFormatDate(release_date.name)}}</option>
                            </select>
                        </div>
                        <label class="col-sm-1 col-form-label">親カテゴリ</label>
                        <div class="col-sm-2">
                            <select v-model="search.parent_id" @change="selectParentCategory()">
                                <option></option>
                                <option v-for="parent_category in parent_categories" :key="parent_category.id" 
                                :value="parent_category.id">{{parent_category.name}}</option>
                            </select>
                        </div>
                        <label class="col-sm-1 col-form-label">子カテゴリ</label>
                        <div class="col-sm-2">
                            <select v-model="search.children_id">
                                <option></option>
                                <option v-for="children_category in children_categories" :key="children_category.id" 
                                :value="children_category.id">{{children_category.name}}</option>
                            </select>
                        </div>
                        <p class="col-sm-2 title-margin">{{ this.page }}件 / {{ this.numberOfPages }}件</p>
                    </div>
                    <div class="row row2">
                        <label class="col-sm-1 col-form-label">ステタース</label>
                        <div class="col-sm-2">
                            <select v-model="search.status">
                                <option></option>
                                <option>公開</option>
                                <option>非公開</option>
                                <option>下書き</option>
                            </select>
                        </div>
                        <label for="inputKeyword" class="col-sm-1 col-form-label">キワード</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" id="article-keyword" placeholder="結果内容の入力" v-model="search.keyword">
                        </div>
                        <label for="inputPassword" class="col-sm-1 col-form-label"></label>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary" id="article-search" @click="searchArticles()">検索</button>
                        </div>
                    </div>
                </div>
            <div class="article-management row">
            <div class="col-md-1 article-col1">
                <div class="row">
                   <div class="col-md-12">＃</div>
                </div>
            </div>
            <div class="col-md-8 artilce-col2">
                <div class="row artilce-col2-row">
                    <div class="col-md-5 col-sub">タイトル</div>
                    <div class="col-md-3 col-sub">発売号</div>
                    <div class="col-md-4 col-sub">カテゴリ</div>
                </div>
                <div class="row artilce-col2-row">
                    <div class="col-md-2 col-sub">ステタース</div>
                    <div class="col-md-2 col-sub">作成者</div>
                    <div class="col-md-2 col-sub">更新日</div>
                    <div class="col-md-2 col-sub">公開日</div>
                    <div class="col-md-4 col-sub">記事内容</div>
                </div>
            </div>
            <div class="col-md-3 article-col3">
                 <div class="row">
                   <div class="col-md-12">変更。削除</div>
                </div>
            </div>
          </div>
          <div class="article-content-management row" v-for="(article, index) in displayArticles" :key="article.id" :index="index">
            <div class="col-md-1 article-col1">
                <div class="row">
                   <div class="col-md-12">{{index+1+(page*perPage)-perPage}}</div>
                </div>
            </div>
            <div class="col-md-8 artilce-col2">
                <div class="row artilce-col2-row">
                    <div class="col-md-5 col-sub">{{ article.title }}</div>
                    <div class="col-md-3 col-sub">{{ customFormatDate(article.release_number) }}</div>
                    <div class="col-md-4 col-sub">{{ article.parent_category }} - {{ article.children_category }}</div>
                </div>
                <div class="row artilce-col2-row">
                    <div class="col-md-2 col-sub">{{ article.status }}</div>
                    <div class="col-md-2 col-sub">{{ article.author }}</div>
                    <div class="col-md-2 col-sub">{{ customFormatDate(article.updated_date) }}</div>
                    <div class="col-md-2 col-sub">{{ customFormatDate(article.created_date) }}</div>
                    <div class="col-md-4 col-sub">
                        <button type="button" class="btn content-btn-article article-btn"
                            data-toggle="modal" data-target="#show-article" @click="showArticle(article, index)">表示</button>
                    </div>
                </div>
            </div>
            <div class="col-md-3 article-col3">
                 <div class="row">
                   <div class="col-md-12">
                        <!-- <button type="button" class="btn btn-info update-btn-article">変更</button> -->
                        <router-link :to="{name: 'article_edit', params: { id: article.id }}" class="btn btn-info update-btn-article article-btn">
                        変更
                        </router-link>
                        <button type="button" class="btn btn-danger delete-btn-article article-btn" 
                            data-toggle="modal" data-target="#article-delete">削除</button>
                   </div>
                </div>
            </div>
          </div>
        <ul class="pagination">
          <li class="page-item" v-if="page != 1" @click="page--"><a class="page-link previous" href="#">前</a></li>
          <li class="page-item" v-for="pageNumber in pages" :key="pageNumber" @click="page = pageNumber"
           v-bind:class="{'active':(page == pageNumber)}">
            <a class="page-link page-link-body">{{pageNumber}}</a>
          </li>
          <li class="page-item" @click="page++" v-if="page < pages.length"><a class="page-link next" href="#">次</a></li>
        </ul>
         <!-- Modal confrim delete article  -->
        <div class="modal fade" id="article-delete" tabindex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="Title">発売号の削除</h5>
                </div>
                <div class="modal-body">
                    この発売号を削除してよろしいですか。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary mr-auto" @click="removeArticle(article)">はい</button>
                    <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">いいえ</button>
                </div>
                </div>
            </div>
        </div>
        <!-- end popup -->
         <!-- Modal show article  -->
        <div class="modal fade" id="show-article" tabindex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" id="article-content">
                    <div class="modal-header" id="article-header">
                        <h5 class="modal-title" id="article-title">#{{ article.index }}: {{ article.title }}</h5>
                        <button type="button" class="btn btn-danger article-btn" data-dismiss="modal">閉じる</button>
                    </div>
                    <div class="modal-body" id="article-body" v-html="article.content"></div>
                    <div class="modal-footer" id="article-footer">
                        <div class="note-footer"><strong>作成者：</strong>{{ article.author }} | <strong>成日:</strong> {{ customFormatDate(article.created_at) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end popup -->
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
import Qs from 'qs'
export default {
    data(){
        return {
            search: {
                release_number: '',
                parent_id: '',
                children_id: '',
                status: '',
                keyword: ''
            },
            articles: [],
            article: {
                index: '',
                title: '',
                content: '',
                author: '',
                created_at: '',
                user_id: ''
            },
            release_number_date: [],
            parent_categories: [],
            children_categories: [],
            release_date: '',
            parent_id: '',
            children_id: '',
            // pagination
            page: 1,
            perPage: '',
            pages: [],
            numberOfPages: '',
            errors: []
        }
    },
    computed: {
        getArticles() { return this.$store.getters.getArticles },
        getParentCategory() { return this.$store.getters.getParentCategory },
        getChildrenCategory() { return this.$store.getters.getChildrenCategory },
        getReleaseNumberDate() { return this.$store.getters.getReleaseNumberDate },
        displayArticles(){
            return this.paginate(this.articles)
        }
    },
    watch: {
        articles(){
            this.setPages()
        }
    },
    created() {
        // fetch articles
        this.fetchArticles()
         // fetch release_date from release number
        this.$store.dispatch('fetchReleaseNumberDate')
        .then((response)=> {
            this.release_number_date = this.getReleaseNumberDate
        }).catch((error) => {
            this.errors.push(error.response.data.error.message)
        })
        // fetch parent category
        this.$store.dispatch('fetchParentCategory')
        .then((response)=> {
            this.parent_categories = this.getParentCategory
        }).catch((error) => {
            this.errors.push(error.response.data.error.message)
        })
    },
    methods: {
        fetchArticles(){
            this.$store.dispatch('fetchArticles')
            .then((response)=> {
                this.articles = this.getArticles.articles
                this.perPage = this.getArticles.perpage
            }).catch((error) => {
                this.errors.push(error.response.data.error.message)
            })
        },
        setPages(){
            this.pages.length = 0
            let numberOfPages = Math.ceil(this.articles.length / this.perPage);
            this.pages.length = 0
            // console.log("+ So trang hien tai " + numberOfPages)
            // console.log("So index hien tai " + this.pages.length)
            this.numberOfPages = numberOfPages
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
            // console.log("so index sau " + this.pages.length)
        },
        paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return articles.slice(from, to);
        },
        customFormatDate(date) {
            return moment(date).format('YYYY年MM月DD日号');
        },
        showArticle(article, index){
            // this.article = article
            // this.$store.dispatch('fetchArticleWithID', article.id)
            // .then((response)=> {
            //     this.article = response.data.article
            //     console.log('abkfafd' + this.article)
            // }).catch((e) => {
            //     console.log(e)
            // })
            axios.get('v1/admin/articles/' + article.id).then((response)=> {
                this.article = response.data.article
                this.article.index = index+1
                this.article.author = response.data.user
            }).catch((error) => {
                this.errors.push(error.response.data.error.message)
            })
        },
        removeArticle(article){
            axios.delete('v1/admin/articles/' + article.id)
            .then(response => {
                this.articles.splice(this.articles.indexOf(article), 1)
                $("#categoryparent").modal('hide');
                }).catch((error) => {
                this.errors.push(error.response.data.error.message)
            })
        },
        // load category con theo category cha
        selectParentCategory(){
            this.$store.dispatch('fetchChildrenCategory', this.search.parent_id)
            .then((response)=> {
                this.children_categories = this.getChildrenCategory
            }).catch((error) => {
                 this.errors.push(error.response.data.error.message)
            })
        },
        // searchArticles(){
        //     this.$store.dispatch('searchArticles', this.search )
        //     .then((response)=> {
        //         this.articles = this.getArticles
        //         console.log(this.articles)
        //     }).catch((e) => {
        //         console.log(e)
        //     })
        // }
        searchArticles(){
            axios.get('v1/admin/articles/search', {
                params:{
                    q: this.search
                },
                paramsSerializer: function(params) {
                    return Qs.stringify(params, {arrayFormat: 'brackets'})
                }
            })
            .then((response) => {
                console.log(response);
                this.articles = response.data.articles
            })
            .catch((error) => {
                 this.errors.push(error.response.data.error.message)
            })
        },
        clearSearch(){
            this.search.release_number = ''
            this.search.parent_id = ''
            this.search.children_id = ''
            this.search.status = ''
            this.search.keyword = ''
            this.$store.dispatch('fetchArticles')
            .then((response)=> {
                this.articles = this.getArticles.articles
            }).catch((e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style>
    /* article list */
    .article-btn{
        border: 2px solid #336da0 !important;
    }
    .article-text{
        text-align: center;
    }
    .article-col1{
        border: 2px solid #336da0;
        padding-top: 30px;
    }
    .article-col2{
        border: 2px solid #336da0;
    }
    .article-col3{
        border: 1px solid #336da0;
        padding-top: 30px;
    }
    .article-col3 button{
        width: 150px;
        margin-left: 5px;
    }
    .artilce-col2-row{
        border-top: 2px solid #336da0;
        border-bottom: 1px solid #336da0;
        height: 70px;
    }
    .col-sub{
        border-right: 2px solid #336da0;
        margin: 0 auto;
        padding-top: 15px;
    }
    .article-search-frame select{
        width: 200px;
        height: 35px;
    }
    #add{
        float: left;
        margin-top: 10px;
    }
    #clear-search{
        float: right;
        margin-top: 10px;
    }
    .content-btn-article{
        padding-top: 0px;
        background-color: #b3c4d3;
    }
    #article-search{
        background-color: #f7f2b9;
        width: 200px;
        border: 2px solid #336da0;
    }
    .article-search-frame select, #inputKeyword{
        background-color: #d1d1d1;
        border: 2px solid #336da0;
        border-radius: 0%;
        color: #000000;
        width: 200px;
        text-align: center;
        margin: auto;
    }
    #article-keyword{
        background-color: #d1d1d1;
        border: 2px solid #336da0;
        border-radius: 0%;
        color: #000000;
        width: 200px;
        text-align: center;
        margin: 0 auto;
     }
    p.title-margin{
        padding-top: 15px;
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
    .article-search-frame{
        width: 100%;
        height: 125px;
        background-color:#eff2f1;
        border: 2px solid #5b9bd5;
    }
    .article-management, .article-content-management{
        width: 100%;
        background-color:#eff2f1;
        border: 1px solid #5b9bd5;
    }
    .article-management{
        background-color: #d1d1d1;
        margin-top: 10px;
        margin-left: 2px;
    }
    .article-content-management{
        margin-top: 1px;
        margin-left: 2px;
        min-height: 140px;
    }
    .row1, .row2{
        padding-top: 10px;
    }
    .row1 label{
        float: left;
        color: #000000;
        padding-bottom: 10px;
        font-weight: normal;
    }
    .row2 label{
        float: left;
        color: #000000;
        font-weight: normal;
    }
    .article-table{
        margin-top: 0px;
        border: 1px solid #5b9bd5;
        border-collapse: separate;
    }
    .pagination{
        padding-top: 20px;
    }
    .pagination li{
        border: 1px solid #5b9bd5;
        border-radius: 0%;
    }
    .previous, .next{
        background-color: #d1d1d1;
    }
    /* modal popup */
    .modal-dialog {
        min-height: calc(100vh - 60px);
        justify-content: center;
    }
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
    .modal-body img{
        width: 800px;
        height: auto;
    }
    .modal-title{
        margin: auto;
    }
    .modal-content  {
        -webkit-border-radius: 0px !important;
        -moz-border-radius: 0px !important;
        border-radius: 0px !important; 
        border: 2px solid #3f85c1;
        width: 1000px;
    }
    /* dropdown */
    .dropdown button{
        width: 200px;
        background-color: #d1d1d1;
    }
    #article-content{
        background-color: #ffffff;
    }
    #article-header{
        background-color: #d1d1d1;
        float: left;
    }
    #article-body, #article-footer{
        background-color: #ffffff;
    }
    #article-title{
        background-color: #d1d1d1;
        font-size: 15px;
        font-weight: bold;
        margin-left: 0px;
    }
    #article-footer{
        min-width: 850px;
    }
    #article-footer p{
        border: 1px solid #000000;
        box-sizing: border-box;
        width: 450px;
        height: 40px;
        padding: 7px 0px 6px 10px;  
    }
    .note-footer{
        margin-right: 35%;
    }
</style>