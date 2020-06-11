// import ajax from '../config/ajax'

export default {
    //加入购物车
    addCart({ commit}, obj) {
        // console.log(tab);
        commit('ADD_ITEMNUM', obj);
    },
    //删除购物车的内容,index是要删除的商品在购物车的序号
    deleteCart({ commit}, index) {
        commit('DEL_CART', index);
    },
    //初始化数据
    addItems({ commit}, obj) {
        // console.log(tab);
        commit('ADD_ITEMS', obj.items);
    },
    //无序数据，就是接受后端的数据，方便查找
    addDisorder({ commit}, obj) {
        // console.log(tab);
        commit('DISORDER', obj.items);
    },
    changeSelect({ commit},data){
        commit('ALL_SELECT',data);
    },
    //加入付款页面并且删除购物车的内容
    addPay({ commit},data){
        commit('ADD_PAY',data);
        commit("DELETE_ITEM",data);
    },
    //加入修改的地址
    add_addlist({ commit},data){
        commit('SET_ADDRESSLIST',data);
    },
    //临时存储刚刚购物的商品
    add_orderdetail({ commit},data){
        commit('SET_ORDERDETAIL',data);
    },
    //初始化评论信息
    initComments({ commit},data){
        commit('INIT_COMMENTS',data);
    },
    //初始化详情列表 orderList
    InitOrder({ commit},data){
        commit('INIT_ORDER',data);
    },

    // SET_ADDRESSLIST({ commit},data){
    //     commit('SET_ADDRESSLIST',data);
    // }

}