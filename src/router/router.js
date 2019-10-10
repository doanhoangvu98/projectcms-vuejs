import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import LoginPage from "./../views/Login.vue"
import DashBoardPage from "./../views/Dashboard.vue"
import EditorPage from "./../views/Editor.vue"
import ContributorPage from "./../views/Contributor.vue"
import CreateRelease from "./../components/release_numbers/Create.vue"
import UpdateRelease from "./../components/release_numbers/Update.vue"
import ReleaseManagement from "./../components/release_numbers/Management"
import CategoryManagement from "./../components/category/Management"
import CreateParent from "./../components/category/CreateParent"
import CreateChild from "./../components/category/CreateChild"
import UpdateCategoryParent from "./../components/category/UpdateCategoryParent"
import UpdateCategoryChild from "./../components/category/UpdateCategoryChild"
import ArticleManagement from "./../components/articles/Management"
import CreateArticle from "./../components/articles/Create"
import UpdateArticle from "./../components/articles/Update"
import UserAdminManagement from "./../components/user_admin/Management"
import Settings from "./../components/settings/Settings"
import MemberManagement from "./../components/member/Management"
import ImageManagement from "./../components/images/Management"
import UploadImage from "./../components/images/Create.vue"
import NotfoundPage from "./../views/404page.vue"
import store from "./../store/index.js"

Vue.use(VueRouter)

const routes = [
    { path: '/', component: LoginPage },
    { 
        path: '/login',
        name: 'login',
        component: LoginPage 
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoardPage,
        alias: 'dashboard',
        children: [
            { 
                path: 'release',
                name: 'release',
                component: ReleaseManagement,
                alias: 'release',
                meta: {
                    requiresAuth: true,
                    releaseAuth: true
                }
            },
            {
                path: 'release/new',
                name: 'release_new',
                component: CreateRelease,
                alias: 'new',
                meta: {
                    requiresAuth: true,
                    releaseAuth: true
                }
            },
            {
                path: 'release/edit/:id',
                name: 'release_edit',
                component: UpdateRelease,
                alias: 'edit',
                meta: {
                    requiresAuth: true,
                    releaseAuth: true
                }
            },
            {
                path: 'category',
                name: 'category',
                alias: 'category',
                component: CategoryManagement,
                meta: {
                    requiresAuth: true,
                    categoryAuth: true,
                }
            },
            {
                path: 'category/parent/edit/:id',
                name: 'category_parent_edit',
                alias: 'category_parent_edit',
                component: UpdateCategoryParent,
                meta: {
                    requiresAuth: true,
                    categoryAuth: true,
                }
            },
            {
                path: 'category/child/edit/:id',
                name: 'category_child_edit',
                alias: 'category_child_edit',
                component: UpdateCategoryChild,
                meta: {
                    requiresAuth: true,
                    categoryAuth: true,
                }
            },
            {
                path: 'category/parent',
                name: 'category_parent',
                component: CreateParent,
                meta: {
                    requiresAuth: true,
                    categoryAuth: true,
                }
            },
            {
                path: 'category/child',
                name: 'category_child',
                component: CreateChild,
                meta: {
                    requiresAuth: true,
                    categoryAuth: true,
                }
            },
            {
                path: 'article',
                name: 'article',
                alias: 'article',
                component: ArticleManagement,
                meta: {
                    requiresAuth: true,
                    articleAuth: true,
                }
            },
            {
                path: 'article/new',
                name: 'article_new',
                alias: 'article_new',
                component: CreateArticle,
                meta: {
                    requiresAuth: true,
                    articleAuth: true,
                }
            },
            {
                path: 'article/edit/:id',
                alias: 'article_edit',
                name: 'article_edit',
                component: UpdateArticle,
                meta: {
                    requiresAuth: true,
                    articleAuth: true,
                }
            },
            {
                path: 'user_admin',
                alias: 'user_admin',
                name: 'user_admin',
                component: UserAdminManagement,
                meta: {
                    requiresAuth: true,
                    useradminAuth: true,
                }
            },
            {
                path: 'member',
                alias: 'member',
                name: 'member',
                component: MemberManagement,
                meta: {
                    requiresAuth: true,
                    memberAuth: true
                }
            },
            {
                path: 'setting',
                alias: 'setting',
                name: 'setting',
                component: Settings,
                meta: {
                    requiresAuth: true,
                    settingsAuth: true,
                }
            },
            {
                path: 'img',
                alias: 'img',
                name: 'img',
                component: ImageManagement,
                meta: {
                    requiresAuth: true,
                    imageAuth: true,
                }
            },
            {
                path: 'img/upload',
                alias: 'img_upload',
                name: 'img_upload',
                component: UploadImage,
                meta: {
                    requiresAuth: true,
                    imageAuth: true,
                }
            }
            
        ],
        meta: {
            requiresAuth: true,
        },
    },
    { path: '*', component: NotfoundPage },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn && store.getters.status) {
            const auth = store.getters.getUserRole
            if (to.meta.articleAuth || to.meta.imageAuth) {
                if (auth == 'superadmin' || auth == 'admin' || auth == 'editor' || auth == 'contributor') {
                    next()
                } else {
                    next('/dashboard')
                }
            }
            if (to.meta.useradminAuth || to.meta.memberAuth || to.meta.settingsAuth) {
                if (auth == 'superadmin') {
                    next()
                } else {
                    next('/dashboard')
                }
            }
            if (to.meta.releaseAuth || to.meta.categoryAuth) {
                if (auth == 'superadmin' || auth == 'admin' || auth == 'editor') {
                    next()
                } else {
                    next('/dashboard')
                }
            }
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})
