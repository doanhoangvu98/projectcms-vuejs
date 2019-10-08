<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
        <h4 class="mt-4 text-left">ユーザーアドミン一覧</h4>
        <!-- <button type="button" @click="clearSearch()" class="btn btn-primary" id="clear-search">クリア</button> -->
        <div class="user-admin-management">
            <p if="errors.length">
                <ul>
                    <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
                </ul>
            </p>
            <div class="search-frame">
                <div class="row row1">
                    <label class="col-sm-1 col-form-label">ジューザ名</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="inputKeyword" placeholder="検索内容の入力" v-model="search.username">
                    </div>
                    <label class="col-sm-1 col-form-label">権限</label>
                    <div class="col-sm-2">
                        <select v-model="search.role">
                            <option></option>
                            <option>superadmin</option>
                            <option>admin</option>
                            <option>editor</option>
                            <option>contributor</option>
                        </select>
                    </div>
                    <div class="col-sm-3 btnGroupSearch">
                        <button type="button" class="btn btn-primary" id="btnBack" v-if="page != 1" @click="page--">⇠前</button>
                        <button type="button" class="btn btn-primary" id="btnNext" v-if="page < pages.length" @click="page++">次⇢</button>
                    </div>
                    <div class="col-sm-1">
                        <p class="user_page">{{ page }}件 / {{ numberOfPages }}件</p>
                    </div>
                </div>
                <div class="row row2">
                    <label for="inputKeyword" class="col-sm-1 col-form-label">メール</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="inputKeyword" placeholder="検索内容の入力" v-model="search.email">
                    </div>
                    <label for="inputPassword" class="col-sm-1 col-form-label"></label>
                    <div class="col-sm-2">
                        <button type="button" class="btn btn-primary" id="btnsearch" @click="searchUserAdmin()">検索</button>
                    </div>
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-1">
                    </div>
                </div>
            </div>
            <div class="user-management">
                <table class="table user-table">
                    <thead>
                        <tr class="row m-0">
                            <th class="d-inline-block col-1">#</th>
                            <th class="d-inline-block col-3">ユーザー名</th>
                            <th class="d-inline-block col-2">権限</th>
                            <th class="d-inline-block col-2">メール</th>
                            <th class="d-inline-block col-2">パスワード</th>
                            <th class="d-inline-block col-2">登録・変更。削除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="row m-0" id="validateUserAdmin">
                            <td class="d-inline-block col-1">1</td>
                            <td class="d-inline-block col-3"><input type="text" placeholder="検索内容の入力" v-model="user.username"></td>
                            <td class="d-inline-block col-2">
                                <select v-model="user.role">
                                    <option>superadmin</option>
                                    <option>admin</option>
                                    <option>editor</option>
                                    <option>contributor</option>
                                </select>
                            </td>
                            <td class="d-inline-block col-2"><input type="text" placeholder="メールの入力" v-model="user.email"></td>
                            <td class="d-inline-block col-2"><input type="text" placeholder="パスワードの入力" v-model="user.password"></td>
                            <td class="d-inline-block col-2"><button type="button" class="btn btn-info" id="addUser" @click="createUserAdmin()">登録</button></td>
                        </tr>
                        <tr v-for="(user, index) in displayUserAdmin" :key="user.id" :index="index" 
                            :class="{editing: user == editedUser}" v-cloak id="validateEdit">
                            <td class="d-inline-block col-1">
                                <div class="view">{{index+2+(page*perPage)-perPage}}</div>
                                <div class="edit">
                                    <input type="text" readonly :value="index + 2" class="indexUserAdmin">
                                </div>
                            </td>
                            <td class="d-inline-block col-3">
                                <div class="view">
                                    {{ user.username }}
                                </div>
                                <div class="edit">
                                    <input type="text" v-model="user.username" />
                                </div>
                            </td>
                            <td class="d-inline-block col-2">
                                <div class="view">
                                    {{ user.role }}
                                </div>
                                <div class="edit">
                                    <select v-model="user.role">
                                        <option>superadmin</option>
                                        <option>admin</option>
                                        <option>editor</option>
                                        <option>contributor</option>
                                    </select>
                                </div>
                            </td>
                            <td class="d-inline-block col-2">
                                 <div class="view">
                                    {{ user.email }}
                                </div>
                                <div class="edit">
                                    <input type="text" v-model="user.email" />
                                </div>
                            </td>
                            <td class="d-inline-block col-2">
                                 <div class="view">
                                   ****************
                                </div>
                                <div class="edit">
                                    <input type="text" v-model="user.password" placeholder="**************"/>
                                </div>
                            </td>
                            <td class="d-inline-block col-2">
                                <div class="view">
                                    <button type="button" class="btn btn-info" id="editUser" @click="editData(user)">変更</button>
                                    <button type="button" class="btn btn-danger" data-toggle="modal" 
                                    data-target="#deleteuseradmin" id="deleteUser" @click="setUserAdmin(user)" v-if="user.role != 'superadmin'">削除</button>
                                </div>
                                <div class="edit">
                                    <button type="button" class="btn btn-info" id="saveUser" @click="saveUserAdmin(user)">保存</button>
                                    <button type="button" class="btn btn-danger" id="cancelEdit" @click="cancelEditUser()">キャンセル</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Modal confrim delete user admin -->
            <div class="modal fade" id="deleteuseradmin" tabindex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="Title">ジューザの削除</h5>
                        </div>
                        <div class="modal-body">
                            このユーザーを削除してよろしいですか。
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary mr-auto" @click="removeUserAdmin(u)">はい</button>
                            <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">いいえ</button>
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
            user: {
                username: '',
                role: '',
                email: '',
                password: ''
            },
            user_admin: [],
            search: {
                username: '',
                email: '',
                role: ''
            },
            editedUser: {
                id: '',
                username: '',
                role: '',
                email: '',
                password: ''
            },
            // pagination
            page: 1,
            perPage: '',
            pages: [],
            numberOfPages: '',
            errors: [],
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            errorMessage: {
                // username
                message1: "ユーザー名を入力してください。", // null
                message2: "ユーザー名は１００文字以下の有効です。", // length > 100 
                // role
                message3: "権限を入力してください。", // null
                // user email
                message4: "メール を入力してください。", // null
                message5: "メールは６４文字以下の有効です。", // length > 64
                message6: "無効なメール", // invalid email
                // password
                message7: "パスワードを入力してください。", // null
                message8: "パスワードは７２文字以下の有効です。" // length > 72
            }
        }
    },
    computed: {
        getUserAdmin() { return this.$store.getters.getUserAdmin },
        displayUserAdmin() {
            return this.paginate(this.user_admin);
        }
    },
    watch: {
        user_admin() {
            this.setPages();
        }
    },
    created() {
        // fetch user admin
        this.fetchUserAdmin()
    },
    methods: {
        fetchUserAdmin(){
            this.$store.dispatch('fetchUserAdmin')
            .then((response)=> {
                this.user_admin = this.getUserAdmin.user_admin
                this.perPage = this.getUserAdmin.perpage
            }).catch((error) => {
                this.errors.push(error.response.data.error.message)
            })
        },
        setPages(){
            this.pages.length = 0
            let numberOfPages = Math.ceil(this.user_admin.length / this.perPage);
            this.pages.length = 0
            // console.log("+ So trang hien tai " + numberOfPages)
            // console.log("So index hien tai " + this.pages.length)
            this.numberOfPages = numberOfPages
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
            // console.log("so index sau " + this.pages.length)
        },
        paginate(user_admin) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return user_admin.slice(from, to);
        },
        setUserAdmin(user){
            this.u = user
        },
        validateUserAdmin(){
            if(!this.user.username){
                this.errors.push(this.errorMessage.message1)
            }
            if(this.user.username && this.user.username.length > 10){
                this.errors.push(this.errorMessage.message2)
            }
            if(!this.user.role){
                this.errors.push(this.errorMessage.message3)
            }
            if(!this.user.email){
                this.errors.push(this.errorMessage.message4)
            }
            if(this.user.email){
                if(this.user.email.length > 64){
                    this.errors.push(this.errorMessage.message5)
                }
                if(!this.reg.test(this.user.email)){
                    this.errors.push(this.errorMessage.message6)
                }
            }
            if(!this.user.password){
                 this.errors.push(this.errorMessage.message7)
            }
            if(this.user.password && this.user.password.length > 72){
                 this.errors.push(this.errorMessage.message7)
            }
        },
        validateEdit(){
            if(!this.editedUser.username){
                this.errors.push(this.errorMessage.message1)
            }
            if(this.editedUser.username && this.editedUser.username.length > 10){
                this.errors.push(this.errorMessage.message2)
            }
            if(!this.editedUser.role){
                this.errors.push(this.errorMessage.message3)
            }
            if(!this.editedUser.email){
                this.errors.push(this.errorMessage.message4)
            }
            if(this.editedUser.email){
                if(this.editedUser.email.length > 64){
                    this.errors.push(this.errorMessage.message5)
                }
                if(!this.reg.test(this.editedUser.email)){
                    this.errors.push(this.errorMessage.message6)
                }
            }
            // if(!this.editedUser.password){
            //      this.errors.push(this.errorMessage.message7)
            // }
            // if(this.editedUser.password && this.editedUser.password.length > 72){
            //      this.errors.push(this.errorMessage.message7)
            // }
        },
        createUserAdmin(){
            this.errors = []
            this.validateUserAdmin()
            if(!this.errors.length){
                console.log(this.user)
                this.$store.dispatch('createUserAdmin', {user: this.user})
                .then(() => {
                    this.fetchUserAdmin()
                    this.user.username = '',
                    this.user.email = '',
                    this.user.password = '',
                    this.user.role = ''
                }).catch((error) => {
                    this.errors.push(error.response.data.error.message)
                })
            }
        },
        removeUserAdmin(u){
             axios.delete('v1/admin/user_admin/' + u.id)
            .then(response => {
                this.user_admin.splice(this.user_admin.indexOf(u), 1)
                $("#deleteuseradmin").modal('hide');
                }).catch((e) => {
               this.errors.push(error.response.data.error.message)
            })
        },
        editData(user){
            this.beforEditCache = user
            this.editedUser = user
        },
        cancelEditUser(){
            this.editedUser = null
        },
        saveUserAdmin(){
            this.errors = []
            this.validateEdit()
            console.log(this.editedUser)
            if(!this.errors.length){
                this.$store.dispatch('editUserAdmin', this.editedUser)
                .then(()=>{
                    this.fetchUserAdmin()
                }).catch((error)=>{
                    this.errors.push(error.response.data.error.message)
                })
            }
        },
        searchUserAdmin(){
            axios.get('v1/admin/user_admin/search', {
                params:{
                    q: this.search
                },
                paramsSerializer: function(params) {
                    return Qs.stringify(params, {arrayFormat: 'brackets'})
                }
            })
            .then((response) => {
                this.user_admin = response.data.user_admin
            })
            .catch((error) => {
                this.errors.push(error.response.data.error.message)
            })
        },
        clearSearch(){
            this.search.email = ''
            this.search.role = ''
            this.search.username = ''
            this.fetchUserAdmin()
        }
    }
}
</script>

<style>
    [v-cloak] {
      display: none;
    }
    .edit {
      display: none;
    }
    .editing .edit {
      display: block
    }
    .editing .view {
      display: none;
    }
    input.indexUserAdmin{
        text-align: center;
    }
    .user-table{
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .user-table th{
        background-color: #d1d1d1;
        border: 1px solid #336da0;
    }
    .user-table tr{
        border: none;
    }
    .user-table td{
        position: relative;
        border: 1px solid #336da0;
        height: 50px;
    }
    .user-table td input, .user-table td select{
    position: absolute;
    display: block;
    top:0;
    left:0;
    margin: 0;
    height: 100%;
    width: 100%;
    border: none;
    box-sizing: border-box;
    text-indent: 10px;
    }
    /* article list */
    .article-text{
        text-align: center;
    }
    .search-frame select{
        width: 200px;
        height: 35px;
    }
    #editUser, #deleteUser{
        margin-right: 10px;
        width: 100px;
    }
    #saveUser, #cancelEdit{
        width: 100px;
        margin-right: 10px;
    }
    #cancelEdit{
        background-color: #d1d1d1;
    }
    #saveUser{
        background-color: #bae2cb;
    }
    p.user_page{
        margin-top: 13px;
    }
    .btnGroupSearch{
        padding-top: 10px;
        padding-left: 70px;
    }
    #btnBack{
        float: left;
    }
    #btnBack, #btnNext{
        border: 2px solid #336da0;
    }
    #clear-search{
        float: right;
        margin-top: 10px;
    }
    #btnsearch{
        border: 2px solid #336da0;
        border-radius: 0%;
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
        background-color:#eff2f1;
        border: 2px solid #5b9bd5;
    }
    .article-management{
        width: 100%;
        background-color:#eff2f1;
        border: 1px solid #5b9bd5;
    }
    .user-management{
        background-color:#eff2f1;
        margin-top: 10px;
        margin-left: 2px;
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
    h4.text-left{
        font-weight: bold;
        color: #000000;
    }
</style>