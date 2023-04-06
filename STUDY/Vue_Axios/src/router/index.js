import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

// router guard
const rejectAuthUser = (to, from, next) => {
    if (store.state.isLogin === true) {
        // 이미 로그인 된 유저 - 페이지 진입 막아야함
        alert('이미 로그인을 하였습니다');
        next('/'); // home으로 리다이렉트
    } else {
        next(); // 입장 허용
    }
};

const onlyAuthUser = (to, from, next) => {
    if (store.state.isLogin === false) {
        // 아직 로그인이 안 된 유저 - 페이지 진입 막아야함
        alert('로그인이 필요한 기능입니다');
        next('/login'); // login 페이지로 리다이렉트
    } else {
        next(); // 입장 허용
    }
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter: rejectAuthUser, // 라우터에 들어오기 전 함수를 실행 시켜 보고 next() 여부를 판단
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/mypage',
        name: 'mypage',
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "mypage" */ '../views/Mypage.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
