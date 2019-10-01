<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
        <h4 class="mt-4 text-left">記事一覧</h4>
        <router-link to="/dashboard/article/new" class="btn btn-primary" id="add">新規記事追加</router-link>
            <div class="management">
                <div class="search-frame">
                <div class="row row1">
                    <label class="col-sm-1 col-form-label">発売号</label>
                    <div class="col-sm-2">
                         <select v-model="release_date" class="form-control">
                            <option v-for="release_date in release_number_date" :key="release_date.id" 
                            :value="release_date.id">{{customFormatDate(release_date.name)}}</option>
                        </select>
                    </div>
                    <label class="col-sm-1 col-form-label">親カテゴリ</label>
                    <div class="col-sm-2">
                        <select v-model="parent_id">
                            <option v-for="parent_category in parent_categories" :key="parent_category.id" 
                            :value="parent_category.id">{{parent_category.name}}</option>
                        </select>
                    </div>
                    <label class="col-sm-1 col-form-label">子カテゴリ</label>
                    <div class="col-sm-2">
                        <select v-model="children_id">
                            <option v-for="children_category in children_categories" :key="children_category.id" 
                            :value="children_category.id">{{children_category.name}}</option>
                        </select>
                    </div>
                    <p class="col-sm-2 title-margin">3件 / 3件</p>
                </div>
                <div class="row row2">
                    <label class="col-sm-1 col-form-label">ステタース</label>
                    <div class="col-sm-2">
                        <select>
                            <option selected>すべて</option>
                            <option>公開</option>
                            <option>非公開</option>
                            <option>下書き</option>
                        </select>
                    </div>
                    <label for="inputKeyword" class="col-sm-1 col-form-label">キワード</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="inputKeyword" placeholder="結果内容の入力">
                    </div>
                    <label for="inputPassword" class="col-sm-1 col-form-label"></label>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-primary" id="btnsearch">検索</button>
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
          <div class="article-content-management row" v-for="(article, index) in articles" :key="article.id" :index="index">
            <div class="col-md-1 article-col1">
                <div class="row">
                   <div class="col-md-12">{{index+1}}</div>
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
                        <button type="button" class="btn content-btn-article" 
                            data-toggle="modal" data-target="#show-article" @click="showArticle(article, index)">表示</button>
                    </div>
                </div>
            </div>
            <div class="col-md-3 article-col3">
                 <div class="row">
                   <div class="col-md-12">
                        <!-- <button type="button" class="btn btn-info update-btn-article">変更</button> -->
                        <router-link :to="{name: 'article_edit', params: {id: article.id}}" class="btn btn-info update-btn-article">
                        変更
                        </router-link>
                        <button type="button" class="btn btn-danger delete-btn-article" 
                            data-toggle="modal" data-target="#article-delete">削除</button>
                   </div>
                </div>
            </div>
          </div>
        <ul class="pagination">
          <li class="page-item"><a class="page-link previous" href="#">前</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-tem"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link next" href="#">次</a></li>
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
                        <button type="button" class="btn btn-danger" data-dismiss="modal">閉じる</button>
                    </div>
                    <div class="modal-body" id="article-body" v-html="article.content"></div>
                    <div class="modal-footer" id="article-footer">
                        <div><strong>作成者：</strong>{{ article.author }} | <strong>成日:</strong> {{ customFormatDate(article.created_at) }}</div>
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
export default {
    data(){
        return {
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
        }
    },
    computed: {
        getArticles() { return this.$store.getters.getArticles },
        getParentCategory() { return this.$store.getters.getParentCategory },
        getChildrenCategory() { return this.$store.getters.getChildrenCategory },
        getReleaseNumberDate() { return this.$store.getters.getReleaseNumberDate },
        getChildrenCategoryIndi() { return this.$store.getters.getChildrenCategoryIndi }
    },
    created() {
        // fetch articles
        this.$store.dispatch('fetchArticles')
        .then((response)=> {
            this.articles = this.getArticles
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
        // fetch parent category
        this.$store.dispatch('fetchParentCategory')
        .then((response)=> {
            this.parent_categories = this.getParentCategory
        }).catch((e) => {
            console.log(e)
        })
         // fetch children category
        this.$store.dispatch('fetchChildrenCategoryIndi')
        .then((response)=> {
            this.children_categories = this.getChildrenCategoryIndi
            console.log(this.children_categories)
        }).catch((e) => {
            console.log(e)
        })
    },
    methods: {
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
            // console.log(category_parent.id)
            this.article = response.data.article
            this.article.index = index+1
            this.article.author = response.data.user
            }).catch((e) => {
            console.log('Loi lay du lieu')
            })
        },
        
        removeArticle(article){
        // alert(article.id)
        axios.delete('v1/admin/articles/' + article.id)
        .then(response => {
            this.articles.splice(this.articles.indexOf(article), 1)
            $("#categoryparent").modal('hide');
            }).catch((e) => {
            console.log('Loi xoa')
            })
        },
    }
}
</script>

<style>
    /* article list */
    .col-sub {
        padding-top: 10px;
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
    }
    .search-frame select{
        width: 200px;
        height: 35px;
    }
    #add{
        float: left;
        margin-top: 10px;
    }
    .content-btn-article{
        padding-top: 0px;
        background-color: #b3c4d3;
    }
    #btnsearch{
        background-color: #f7f2b9;
        width: 200px;
    }
    .search-frame select, #inputKeyword{
        background-color: #d1d1d1;
        border: 2px solid #336da0;
        border-radius: 0%;
        color: #000000;
        width: 200px;
        text-align: center;
        margin: auto;
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
    .search-frame{
        width: 100%;
        height: 120px;
        background-color:#d1d1d1;
        border: 1px solid #5b9bd5;
    }
    .search-frame, .article-management, .article-content-management{
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
    #article-footer div{
        border: 1px solid #000000;
        box-sizing: border-box;
        width: 500px;
        height: 40px;
        padding: 7px 0px 6px 10px;  
        text-align: left;
        margin-left: -100px;
    }
</style>