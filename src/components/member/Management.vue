<template>
   <div id="page-content-wrapper">
    <div class="container-fluid">
        <h4 class="mt-4 text-left">メンバー一覧</h4>
        <!-- <button type="button" @click="clearSearch()" class="btn btn-primary" id="clear-search">クリア</button> -->
        <p if="errors.length">
            <ul>
                <li v-for="error in errors" v-bind:key="error" id="error">{{ error}}</li>
            </ul>
        </p>
        <div class="member-management">
            <div class="member-search-frame">
                <div class="row row1">
                    <label class="col-sm-1 col-form-label">ジューザ名</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="inputKeyword" placeholder="検索内容の入力" v-model="search.username">
                    </div>
                    <label class="col-sm-1 col-form-label">権限</label>
                    <div class="col-sm-2">
                        <select v-model="search.status">
                            <option value="">すべて</option>
                            <option>アクティブ</option>
                            <option>非アクティブ</option>
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
                        <button type="button" class="btn btn-primary" id="member-search" @click="searchMembers()">検索</button>
                    </div>
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-1">
                    </div>
                </div>
            </div>
            <div class="member-content-management row">
                <div class="col-md-1 member-col1">
                    <div class="row">
                    <div class="col-md-12">＃</div>
                    </div>
                </div>
                <div class="col-md-8 member-col2">
                    <div class="row member-col2-row">
                        <div class="col-md-6 col-sub">ジューザ名</div>
                        <div class="col-md-4 col-sub">メール</div>
                        <div class="col-md-2 col-sub">携帯電話</div>
                    </div>
                    <div class="row member-col2-row">
                        <div class="col-md-3 col-sub">生年月日</div>
                        <div class="col-md-2 col-sub">性別</div>
                        <div class="col-md-4 col-sub">住所</div>
                        <div class="col-md-3 col-sub">稼働状態</div>
                    </div>
                </div>
                <div class="col-md-3 member-col3">
                    <div class="row">
                    <div class="col-md-12">登録・変更。削除</div>
                    </div>
                </div>
            </div>
            <div class="member-content-management row">
                <div class="col-md-1 member-col-index">
                    <div class="row">
                        <div class="col-md-12">1</div>
                    </div>
                </div>
                <div class="col-md-8 member-col2">
                    <div class="row member-col2-row">
                        <div class="col-md-6 col-sub">
                            <input class="input1" type="text" placeholder="ユーザー名の入力" v-model="member.username">
                        </div>
                        <div class="col-md-4 col-sub">
                            <input class="input1" type="text" placeholder="メールの入力" v-model="member.email">
                        </div>
                        <div class="col-md-2 col-sub">
                            <input class="input1" type="text" placeholder="携帯電話の入力" v-model="member.phone">
                        </div>
                    </div>
                    <div class="row member-col2-row">
                        <div class="col-md-3 col-sub edit-birthday">
                            <datepicker name="release_date" input-class="input-class birthday-member"
                                v-model="member.birthday" :format="customFormatter" :language="language"></datepicker>
                        </div>
                        <div class="col-md-2 col-sub gender-box">
                            <div class="check-gender">
                                <label><input type="radio" name="gender" v-bind:value="0" v-model="member.gender">男</label>
                                <label><input type="radio" name="gender" v-bind:value="1" v-model="member.gender">女</label>
                            </div>
                        </div>
                        <div class="col-md-4 col-sub">
                            <input class="input1" type="text" placeholder="住所の入力丁" v-model="member.address">
                        </div>
                        <div class="col-md-3 col-sub">
                            <select v-model="member.status">
                                <option value="">すべて</option>
                                <option>アクティ</option>
                                <option>非アクティブ</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 member-col3">
                    <div class="row">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-info member-btn" id="addMember" @click="addMember()">登録</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="member-content-management row" v-for="(member,index) in displayMembers" :key="member.id" :index="index"
                :class="{editing: member == editedMember}" v-cloak id="validateEditMember">
                <div class="col-md-1 member-col1 view">
                    <div class="row">
                        <div class="col-md-12 view">{{index+2+(page*perPage)-perPage}}</div>
                    </div>
                </div>
                <div class="col-md-1 member-col-index edit">
                    <div class="row">
                        <div class="col-md-12 edit index-member">
                            <input type="text" readonly :value="index + 2" id="indexMember">
                        </div>
                    </div>
                </div>
                <div class="col-md-8 member-col2" id="validateEditMember">
                    <div class="row member-col2-row">
                        <div class="col-md-6 col-sub view">{{ member.username }}</div>
                        <div class="col-md-6 col-sub edit">
                            <input type="text" v-model="member.username" class="input1" />
                        </div>
                        <div class="col-md-4 col-sub view">{{ member.email }}</div>
                        <div class="col-md-4 col-sub edit">
                            <input type="text" v-model="member.email" class="input1" />
                        </div>
                        <div class="col-md-2 col-sub view">{{ member.phone }}</div>
                        <div class="col-md-2 col-sub edit">
                            <input type="text" v-model="member.phone" class="input1" />
                        </div>
                    </div>
                    <div class="row member-col2-row">
                        <div class="col-md-3 col-sub view">{{customFormatDate(member.birthday)}}</div>
                        <div class="col-md-3 col-sub edit edit-birthday">
                            <datepicker :bootstrap-styling="true" name="release_date" input-class="input-class birthday-member"
                                v-model="member.birthday" :format="customFormatter" :language="language"></datepicker>
                        </div>
                        <div class="col-md-2 col-sub view" v-if="member.gender == 0">男</div>
                        <div class="col-md-2 col-sub view" v-if="member.gender == 1">女</div>
                        <div class="col-md-2 col-sub edit edit-gender">
                            <div class="check-gender">
                                <label><input type="radio" name="gender" v-bind:value="0" v-model="member.gender">男</label>
                                <label><input type="radio" name="gender" v-bind:value="1" v-model="member.gender">女</label>
                            </div>
                        </div>
                        <div class="col-md-4 col-sub view">{{ member.address }}</div>
                        <div class="col-md-4 col-sub edit">
                            <input type="text" v-model="member.address" class="input1" />
                        </div>
                        <div class="col-md-3 col-sub view">{{ member.status }}</div>
                        <div class="col-md-3 col-sub edit">
                            <select v-model="member.status">
                                <option>アクティ</option>
                                <option>非アクティブ</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 member-col3">
                    <div class="row">
                    <div class="col-md-12">
                        <div class="view">
                            <button type="button" class="btn btn-info update-btn-article member-btn" @click="editData(member)">変更</button>
                            <button type="button" class="btn btn-danger delete-btn-article member-btn" 
                                data-toggle="modal" data-target="#delete-member" @click="setMember(member)">削除</button>
                        </div>
                        <div class="edit">
                            <button type="button" class="btn btn-info member-btn" id="saveMember" @click="saveMember(member)">保存</button>
                            <button type="button" class="btn btn-danger member-btn" @click="cancelEditMember(member)">キャンセル</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <!-- Modal confrim delete user admin -->
            <div class="modal fade" id="delete-member" tabindex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="Title">ジューザの削除</h5>
                        </div>
                        <div class="modal-body">
                            このユーザーを削除してよろしいですか。
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary mr-auto" @click="removeMember(m)">はい</button>
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
import Datepicker from 'vuejs-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2'
import Qs from 'qs'
export default {
    data(){
        return {
            member: {
                username: '',
                email: '',
                phone: '',
                birthday: '',
                gender: '',
                address: '',
                status: '',
            },
            members: [],
            search: {
                username: '',
                email: '',
                status: ''
            },
            editedMember: {
                id: '',
                username: '',
                email: '',
                phone: '',
                birthday: '',
                gender: '',
                address: '',
                status: '',
            },
            beforeEditMemberCache: [],
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
                // user email
                message3: "メール を入力してください。", // null
                message4: "メールは６４文字以下の有効です。", // length > 64
                message5: "無効なメール", // invalid email
                // phone
                message6: "携帯電話は１２文字以下の有効です。",  // > 12
                // address
                message7: "住所は１００文字以下の有効です。" // > 100
            }
        }
    },
    components: {
        Datepicker
    },
    computed: {
        getMembers() { return this.$store.getters.getMembers },
        displayMembers() {
            return this.paginate(this.members);
        }
    },
    watch: {
        members() {
            this.setPages();
        }
    },
    created() {
        // fetch user admin
        this.fetchMembers()
    },
    methods: {
        customFormatDate(date) {
            return moment(date).format('YYYY年MM月DD日号');
        },
        fetchMembers(){
            this.$store.dispatch('fetchMembers')
            .then((response)=> {
                this.members = this.getMembers.members
                this.perPage = this.getMembers.perpage
            }).catch((error) => {
                this.errors.push(error.response.data.error.message)
            })
        },
        setPages(){
            this.pages.length = 0
            let numberOfPages = Math.ceil(this.members.length / this.perPage);
            this.pages.length = 0
            // console.log("+ So trang hien tai " + numberOfPages)
            // console.log("So index hien tai " + this.pages.length)
            this.numberOfPages = numberOfPages
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
            // console.log("so index sau " + this.pages.length)
        },
        paginate(members) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return members.slice(from, to);
        },
        setMember(member){
            this.m = member
        },
        validateMember(){
            if(!this.member.username){
                this.errors.push(this.errorMessage.message1)
            }
            if(this.member.username && this.member.username.length > 100){
                this.errors.push(this.errorMessage.message2)
            }
            if(!this.member.email){
                this.errors.push(this.errorMessage.message3)
            }
            if(this.member.email){
                if(this.member.email.length > 64){
                    this.errors.push(this.errorMessage.message4)
                }
                // if(!this.reg.test(this.member.email)){
                //     this.errors.push(this.errorMessage.message5)
                // }
            }
            if(this.member.phone.length > 12){
                 this.errors.push(this.errorMessage.message6)
            }
            if(this.member.address.length > 100){
                 this.errors.push(this.errorMessage.message7)
            }
        },
        validateEditMember(){
           if(!this.editedMember.username){
                this.errors.push(this.errorMessage.message1)
            }
            if(this.editedMember.username && this.member.username.length > 100){
                this.errors.push(this.errorMessage.message2)
            }
            if(!this.editedMember.email){
                this.errors.push(this.errorMessage.message3)
            }
            if(this.editedMember.email){
                if(this.editedMember.email.length > 64){
                    this.errors.push(this.errorMessage.message4)
                }
                if(!this.reg.test(this.editedMember.email)){
                    this.errors.push(this.errorMessage.message5)
                }
            }
            if(this.editedMember.phone.length > 12){
                 this.errors.push(this.errorMessage.message6)
            }
            if(this.editedMember.address.length > 100){
                 this.errors.push(this.errorMessage.message7)
            }
        },
        addMember(){
            this.errors = []
            this.validateMember()
            if(!this.errors.length){
                console.log(this.member)
                this.$store.dispatch('createMember', {member: this.member})
                .then(() => {
                    this.fetchMembers()
                    this.member.username = '',
                    this.member.email = '',
                    this.member.phone = '',
                    this.member.address = '',
                    this.member.gender = '',
                    this.member.status = '',
                    this.member.birthday = ''
                }).catch((error) => {
                    this.errors.push(error.response.data.error.message)
                })
            }
        },
        removeMember(m){
            // console.log(m.id)
            this.errors = []
            axios.delete('v1/admin/members/' + m.id)
            .then(response => {
                this.members.splice(this.members.indexOf(m), 1)
                $("#delete-member").modal('hide');
                }).catch((error) => {
               this.errors.push(error.response.data.error.message)
            })
        },
        editData(member){
            this.beforeEditMemberCache = Object.assign({}, member);
            this.editedMember = member
        },
        cancelEditMember(member){
            Object.assign(member, this.beforeEditMemberCache);
            this.editedMember = null
        },
        saveMember(member){
            this.errors = []
            this.validateEditMember()
            // console.log(this.editedMember)
            if(!this.errors.length){
                this.$store.dispatch('editMember', this.editedMember)
                .then(()=>{
                    this.fetchMembers()
                }).catch((error)=>{
                    this.errors.push(error.response.data.error.message)
                })
            }
        },
        searchMembers(){
            axios.get('v1/admin/members/search', {
                params:{
                    q: this.search
                },
                paramsSerializer: function(params) {
                    return Qs.stringify(params, {arrayFormat: 'brackets'})
                }
            })
            .then((response) => {
                this.members = response.data.members
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
    .edit-gender, .edit-birthday{
        background-color: #ffffff;
    }
    input.indexUserAdmin{
        text-align: center;
    }
    .member-btn{
        border: 2px solid #336da0 !important;
    }
    .user-table{
        margin-top: 0px;
        margin-bottom: 0px;
    }
    #addMember{
        /* margin-top: 28px; */
    }
    /* article list */
    .article-text{
        text-align: center;
    }
    .member-search-frame select{
        width: 200px;
        height: 35px;
    }
    #editUser, #deleteUser{
        margin-right: 10px;
        width: 100px;
        padding: 0;
    }
    /* #cancelEdit{
        width: 100px;
        margin-right: 10px;
    } */
    /* #cancelEdit{
        background-color: #d1d1d1;
    } */
    /* #saveUser{
        background-color: #bae2cb;
    } */
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
    #saveMember{
        background-color: rgb(186, 226, 203)
    }
    #btnBack, #btnNext{
        border: 2px solid #336da0;
    }
    #clear-search{
        float: right;
        margin-top: 10px;
    }
    #member-search{
        border: 2px solid #336da0;
        border-radius: 0%;
        background-color: #f7f2b9;
        width: 150px;
    }
    .member-search-frame select, #inputKeyword{
        background-color: #d1d1d1;
        border: 2px solid #336da0;
        border-radius: 0%;
        color: #000000;
        width: 150px;
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
    .member-search-frame{
        width: 100%;
        /* height: 125px; */
        background-color:#eff2f1;
        border: 1px solid #336da0;
        margin-bottom: 20px;
    }
    .member-management{
        width: 100%;
    }
    .member-management-row{
        padding: 10px 5px;
    }
    .user-management{
        background-color:#eff2f1;
        margin-top: 10px;
        margin-left: 2px;
    }
    .row1, .row2{
        padding-top: 10px;
    }
    .member-content-management{
        width: 100%;
        background-color:#eff2f1;
        margin-left: 2px;
        /* min-height: 120px; */
    }
    .row1 label{
        float: left;
        color: #000000;
        padding-right: 0;
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
    .member-col-index{
        border: 2px solid #336da0;
        padding-top: 30px;
        background-color: #ffffff;
    }
    .member-col-index{
        border: 1px solid #336da0;
        padding-top: 40px;
        background-color: #ffffff;
    }
    .member-col1{
        border: 1px solid #336da0;
        padding-top: 40px;
    }
    .member-col3{
        border-right: 1px solid #336da0;
        border-top: 1px solid #336da0;
        border-bottom: 1px solid #336da0;
        padding-top: 30px;
    }
    .member-col3 button{
        width: 100px;
        margin-left: 5px;
    }
    .member-col2-row{
        border-top: 1px solid #336da0;
        border-bottom: 1px solid #336da0;
        min-height: 50px;
    }
     /* tao member */
     .member-content-management .input1, .member-content-management select{
        position: absolute;
        display: block;
        top:0;
        left:0;
        margin: 0;
        height: 100%;
        width: 100%;
        border: none;
        box-sizing: border-box;
        text-align: center;
    }
    .gender-box{
        background-color: #ffffff;
    }
    .check-gender{
        margin-left: 20px;
        font-size: 16px;
    }
    .check-gender label{
        color: #6d6969;
        font-weight: normal;
    }
    .check-gender input{
        border: none;
        box-sizing: border-box;
        text-indent: 10px;
        background-color: #ffffff;
        justify-content: center;
    }
    #indexMember{
        width: 50%;
        text-align: center;
    }
    .index-default{
        background-color: #ffffff;
    }
    .birthday-member{
        background-color: #ffffff !important;
        border: none;
        width: 100%;
        height: 100%;
    }
</style>