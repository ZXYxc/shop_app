import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';

// import App from '../App.vue'
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const routes = [
    // path: '/',
    // name:"main",
    // // component: App,
    // component: (resolve) => require(['../page/mainpage/index'], resolve),
    //父路由是APP.vue，子路由在副路由中出现
        {
            path: '/index',
            name:'home',
            meta: {
                title: '首页',
                keepAlive: true,
                showTab: true
            },
            component: (resolve) => require(['../page/home'], resolve)
        },
        {
            path: '/item',
            name:'item',
            meta: {
                title: '分类',
                keepAlive: true,
                showTab: true
            },
            component: (resolve) => require(['../page/item'], resolve),
        },
        {
            path: '/cart',
            name:'cart',
            meta: {
                title: '购物车',
                keepAlive: true,
                showTab: true
            },
            component: (resolve) => require(['../page/cart'], resolve)
        },
        {
            path: '/mine',
            name:'mine',
            meta: {
                title: '我的',
                keepAlive: true,
                showTab: true,
                requireAuth:true
            },
            component: (resolve) => require(['../page/mine'], resolve)
        },
    {
        path: '/item/item01',
        name:'itemdetail',
        meta: {
            title: '商品1',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/itemdetail/item01.vue'], resolve)
    },
    {
        path: '/order',
        name:'order',
        meta: {
            title: '付款页面',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/order'], resolve)
    },
    {
        path:'/addedit',
        name:'addedit',
        meta: {
            title: '添加地址',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/addedit'], resolve)
    },
    {
        path:'/selectAdd',
        name:'selectAdd',
        meta: {
            title: '选择其他地址',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/selectAdd'], resolve)
    },
    {
        path:'/test',
        name:'test',
        meta: {
            title: '测试axios',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/test'], resolve)
    },
    {
        path:'/register',
        name:'register',
        meta: {
            title: 'register',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/register'], resolve)
    },
    {
        path:'/myOrder',
        name:'myOrder',
        meta: {
            title: 'myOrder',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/myOrder/index'], resolve)
    },
    {
        path:'/paySuccess',
        name:'paySuccess',
        meta: {
            title: 'paySuccess',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/order/paySuccess'], resolve)
    },
    {
        path:'/orderDetail',
        name:'orderDetail',
        meta: {
            title: 'orderDeta',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/order/orderDetail'], resolve)
    },
    {
        path:'/changeInfo',
        name:'changeInfo',
        meta: {
            title: 'orderDeta',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/mine/modules/changeInfo'], resolve)
    },
    {
        path:'/login',
        name:'login',
        meta: {
            title: 'login',
            keepAlive: false,
            showTab: false
        },
        component: (resolve) => require(['../page/auth/login'], resolve)
    },
        {
            path: '*',
            redirect: '/index'
        }

];

Vue.use(VueRouter);

const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: routes
};
const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach(() => {
    window.scrollTo(0, 0);
});

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
        // console.log(store.state.login_flag);
        // store.state.flag = 0;
        // if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
        if (store.state.login_flag) { // 判断当前的token是否存在 ； 登录存入的token
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});


export default router