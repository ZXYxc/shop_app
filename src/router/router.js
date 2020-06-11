import Vue from 'vue'
import VueRouter from 'vue-router'
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
                showTab: true
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
            path: '*',
            redirect: '/index'
        }

]

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
export default router