import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "../store/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('@/components/HomePage'),
        meta: { requiresAuth: true }
    },
    {
        path: "/about",
        name: "about",
        component: () => import('@/components/About'),
        meta: { requiresAuth: true }
    },
    {
        path: "/auth",
        name: "auth",
        component: () => import('@/components/Auth'),
        meta: { requiresAuth: false }
    },
    {
        path: "/about",
        name: "about",
        component: () => import('@/components/About'),
        meta: { requiresAuth: true }
    },

]


const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters.isAuthenticated) {
            return next();
        } else {
            return next("/auth");
        }
    }
    return next();
})
export { router };