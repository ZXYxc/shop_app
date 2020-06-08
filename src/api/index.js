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
        console.log(itemid);
        // let config =JSON.stringify(itemid)
        return axios.post(
            `${base.goods}/GetComments/`,
            qs.stringify(itemid)
        //     {
        //     params: {'itemId':1},
        //     // paramsSerializer:function (params) {
        //     //     return qs.stringify(params, {arrayFormat:'indices'})
        //     // }
        // }
        );
    }
};

// let _url = `${base.order}/Create/`;
const order = {

    postOrder(data){
        return axios.post(
            `${base.order}/Create/`,
            qs.stringify(data)
        );
    }
};

export default  {goods,order};

let items = goods.getList();
console.log(items);

// export const getGoods = () =>
//     axios.get("/goods/ListItem");
// export const apiAddress = p =>
//     post('api/v1/users/my_address/address_edit_before', p);
