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
                    releaseAuth: true
                }
            },
            {
                path: 'release/new',
                name: 'release_new',
                component: CreateRelease,
                alias: 'new',
                meta: {
                    releaseCreateAuth: true
                }
            },
            {
                path: 'release/edit/:id',
                name: 'release_edit',
                component: UpdateRelease,
                alias: 'edit',
                meta: {
                    releaseCreateAuth: true
                }
            },
            {
                path: 'category',
                name: 'category',
                alias: 'category',
                component: CategoryManagement,
                meta: {
                    categoryAuth: true
                }
            },
            {
                path: 'category/parent/edit/:id',
                name: 'category_parent_edit',
                alias: 'category_parent_edit',
                component: UpdateCategoryParent
            },
            {
                path: 'category/child/edit/:id',
                name: 'category_child_edit',
                alias: 'category_child_edit',
                component: UpdateCategoryChild
            },
            {
                path: 'category/parent',
                name: 'category_parent',
                component: CreateParent,
            },
            {
                path: 'category/child',
                name: 'category_child',
                component: CreateChild
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

console.log(store.getters.role)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn && store.getters.status) {
            if (to.meta.releaseAuth) {
                const auth = store.getters.role
                if (auth == 'superadmin' || auth == 'admin' || auth == 'editor') {
                    next()
                } else {
                    next('/dashboard')
                }
            }
            if (to.meta.releaseCreateAuth) {
                const auth = store.getters.role
                if (auth == 'superadmin' || auth == 'admin' || auth == 'editor') {
                    next()
                } else {
                    next('/dashboard')
                }
            }
            if (to.meta.categoryAuth) {
                const auth = store.getters.role
                if (auth == 'superadmin' || auth == 'admin') {
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
