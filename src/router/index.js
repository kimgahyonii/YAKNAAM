import { createRouter, createWebHistory } from 'vue-router';
import Register from '..pagse/Register.vue';
import Login from '../pages/Login.vue';
import Profile from '../pages/Profile.vue';

const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: '/login',
        component: Login,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;