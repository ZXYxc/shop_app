/**
 * api接口统一管理
 */
import axios from './http'
import base from './baseURL'; // 导入接口域名列表
// axios.defaults.baseURL = '/goods'; // 请求的默认域名/order e
import qs from 'qs'; // 用来处理参数，可不使用，若要使用，npm安装： npm install qs

const goods = {
//获取商品详细信息
    getList () {
        // console.log(`${base.goods}/ListItem`);
        return axios.get(`${base.goods}/ListItem`);
        },
    getComments(itemid){

        return axios.post(
            `${base.goods}/GetComments/`,
            qs.stringify(itemid)
        );
    }
};

// let _url = `${base.order}/Create/`;
const order = {

    postOrder(data){
        // console.log(data);
        return axios.post(
            `${base.order}/Create/`,
            data,
        );
    },

    Get_Order(userId){
        return axios.post(`${base.order}/GetOrderByInfo/`,
            {'userId':userId}
        );
    },

    Del_Order(userId,orderId){
        return axios.post(`${base.order}/DeleteOrder/`,
            {'userId':userId,'orderId':orderId}
        );
    }

};

const user = {
    GetUserInfo(){
        return axios.get(`${base.user}/GetUserInfo/`);

    }

};

export default  {goods,order,user};

let items = goods.getList();
console.log(items);

// export const getGoods = () =>
//     axios.get("/goods/ListItem");
// export const apiAddress = p =>
//     post('api/v1/users/my_address/address_edit_before', p);
