//定义对全局数据的操作
// dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)
// commit：同步操作，写法：this.$store.commit('mutations方法名',值)

const ADD_ITEMNUM = 'ADD_ITEMNUM';
// const ALL_SELECT = "ALL_SELECT"
const SET_ADDRESSLIST="SET_ADDRESSLIST";
const ADD_PAY ="ADD_PAY";
const DELETE_ITEM = "DELETE_ITEM";
const ADD_ITEMS = "ADD_ITEMS";
const DEL_CART = "DEL_CART";
const SET_ORDERDETAIL = "SET_ORDERDETAIL";
const INIT_COMMENTS = "INIT_COMMENTS"
// const INITIALDEL_ITEMNUMIZE_DATA = 'INITIALIZE_DATA'

export default {
    //初始化评论
    [INIT_COMMENTS](state, obj){
        let temp = state.comment_list;
        console.log(temp,obj)
    },
    //加入购物车
    [ADD_ITEMNUM](state, obj) {
        console.log(obj);
        let item = state.items[obj.tab].children[obj.id];
        // console.log(obj.id+" "+obj.tab);
        let flag = true;
        let i=0;
        for(i=0;i<state.cart_list.length;i++){
                if (item.id==state.cart_list[i].num)
                {
                    flag = false;
                    break;
                }
        }
        //cart.value:购物车购买这件商品的数量；cart.num：这件商品的id
        //cart.tab:这件商品的分类序号; cart.idx：这件商品在这个分类的序号
        if (flag){
            let cart = {};
            if (item.pricture)
                cart.thumb = item.pricture[0];
            cart.title = item.text;
            cart.desc = item.dec;
            cart.tags = item.tag;
            cart.originPrice = item.ori_price;
            cart.price = item.price;
            cart.num = item.id;
            cart.isChecked = false;
            cart.value = 1;
            cart.tab = obj.tab;
            cart.idx = obj.id;
            let tag=[];
            // <!--tags是普通标签，tag是是否促销-->
            if (item.isNew)
                tag.push("新品");
            if (item.isRecommend)
                tag.push("推荐");
            cart.tag = tag;
            // let cart = {};
            state.cart_list.push(cart);
        }
        else {
            state.cart_list[i].value++;
            console.log("等着数量加一")
        }

    },
    //删除购物车中选中的商品
    [DEL_CART](state, payload) {
        // state.pay_list = payload;
        state.cart_list.splice(payload,1);
    },
//加入订单
    [ADD_PAY](state, payload) {
        state.pay_list = payload;
    },
//加入用户地址
    [SET_ADDRESSLIST](state, payload) {
        state.Add_list.push(payload);
    },

    //删除项目
    [DELETE_ITEM](state, payload) {
        state.addressList = payload;

    },

    //临时加入订单详细信息
    [SET_ORDERDETAIL](state, payload) {
        state.order_list.push(payload);
    },

    //初始化数据
    [ADD_ITEMS](state, payload) {

        for (let i=0;i<payload.length;i++){

            let temp = {};
            temp.text = payload[i].name;
            temp.id =  payload[i].itemId;
            temp.manufacture = payload[i].manufacture;
            if (payload[i].new == "no")
                temp.isNew = false;
            else
                temp.isNew = true;
            temp.ori_price = payload[i].originPrice;
            temp.pricture = [];
            console.log("http://"+payload[i].picPath1);
            temp.pricture.push("http://"+payload[i].picPath1);
            temp.pricture.push("http://"+payload[i].picPath2);
            temp.pricture.push("http://"+payload[i].picPath3);
            temp.price = payload[i].presentPrice;
            temp.produce_time = payload[i].produceTime;
            temp.quality_time = payload[i].qualityTime;
            temp.quantity = payload[i].quantity;
            temp.sale = payload[i].monthCount;
            if (payload[i].recommend == "no")
                temp.isRecommend = false;
            else  temp.isRecommend = true;
            temp.dec = payload[i].remark;
            temp.size = payload[i].size;
            temp.expense = payload[i].tranexpense;

            let t = state.type_list.indexOf(payload[i].type);
            if (t >= 0){
                state.items[t].children.push(temp);
            }
            else {
                let tt = {} ;
                tt.text = payload[i].type;
                tt.children = [];
                tt.children.push({text: "banner", dec: 20});
                tt.children.push(temp);
                state.items.push(tt);
                state.type_list.push(tt.text);
            }
        }

 },

    /*
    初始化信息，
     */
    // [INITIALIZE_DATA](state) {
        // state.itemNum = 1;
    // },
}