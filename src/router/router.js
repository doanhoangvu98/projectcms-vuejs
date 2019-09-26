import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import LoginPage from "./../views/Login.vue"
import AdminPage from "./../views/Admin.vue"
import EditorPage from "./../views/Editor.vue"
import ContributorPage from "./../views/Contributor.vue"
import CreateRelease from "./../components/release_numbers/Create.vue"
import ReleaseManagement from "./../components/release_numbers/Management"
import NotfoundPage from "./../views/404page.vue"
import store from "./../store/index.js"


const routes = [
    { path: '/', component: LoginPage },
    { path: '/login', component: LoginPage },
    {
        path: '/admin',
        component: AdminPage,
        children: [
            { 
                path: 'release',
                name: 'release',
                component: ReleaseManagement,
            },
            {
                path: 'release/new',
                name: 'release_new',
                component: CreateRelease
            }
            
        ],
        name: 'admin',
        meta: {
            requiresAuth: true,
            //role: 'admin'
        }
    },
    {
        path: '/editor',
        component: EditorPage,
        name: 'editor',
        meta: {
            requiresAuth: true,
            //role: 'editor'
        }
    },
    {
        path: '/contributor',
        component: ContributorPage,
        name: 'contributor',
        meta: {
            requiresAuth: true,
            //role: 'contributor'
        }
    },
    { path: '/notfound', component: NotfoundPage },
    { path: '*', redirect: '/admin' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
// console.log(routes)