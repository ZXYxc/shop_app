import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
    comment_list : [],
    // comment_list: [
    //     {
    //         id:1,
    //         tags:["评论常出现的词语1","评论常出现的词语2"],
    //         rate:98,
    //         comment:[
    //                     {name: "工具人1", time: "2020.05.08", score: 5, desc: "非常满意", imgs: []},
    //                     {name: "工具人2", time: "2020.05.09", score: 4, desc: "啊呀挺好吃的，下次还会买的哈", imgs: []}
    //         ]
    //     },
    //     {
    //         id:2,
    //         tags:["评论常出现的词语1"],
    //         rate:95,
    //         comment:[
    //             {name: "工具人3", time: "2020.05.08", score: 5, desc: "非常满意", imgs: []},
    //             {name: "工具人4", time: "2020.05.09", score: 3.8, desc: "啊呀挺好吃的，下次还会买的哈", imgs: []}
    //         ]
    //     },
    //     {
    //         id:3,
    //         tags:["评论常出现的词语1","评论常出现的词语2"],
    //         rate:92,
    //         comment:[
    //             {name: "工具人5", time: "2020.05.08", score: 5, desc: "非常满意", imgs: []},
    //             {name: "工具人6", time: "2020.05.09", score: 4.5, desc: "啊呀挺好吃的，下次还会买的哈", imgs: []}
    //         ]
    //     },
    //     {
    //         id:4,
    //         tags:["评论常出现的词语1","评论常出现的词语2"],
    //         rate:90,
    //         comment:[
    //             {name: "工具人7", time: "2020.05.08", score: 5, desc: "非常满意", imgs: []},
    //             {name: "工具人8", time: "2020.05.09", score: 4, desc: "啊呀挺好吃的，下次还会买的哈", imgs: []}
    //         ]
    //     },
    //     {
    //         id:5,
    //         tags:["评论常出现的词语1","评论常出现的词语2"],
    //         rate:98,
    //         comment:[
    //             {name: "工具人9", time: "2020.05.08", score: 5, desc: "非常满意", imgs: []},
    //             {name: "工具人10", time: "2020.05.09", score: 4, desc: "啊呀挺好吃的，下次还会买的哈", imgs: []}
    //         ]
    //     },
    //     ],
    //购物车列表
    cart_list:[],
    //结算的商品列表
    pay_list:[],
    Add_list:[],
    // type_list:["点心","水果"],
    type_list:[],
    //我的订单列表
    order_list:[],
    //商品详情列表（从后端导入的消息以及增删查改之后的详情）
    orderList:[],

    //名称、编号、简要描述信息、详细描述信息、现价、原价、原产地、生产日期，保质期，库存量，
    // 图片，运费，尺寸情况，备注，是否新品，是否推荐、销量
    items:[],
    // items: [
    //     { text: '分类1',
    //         children: [
    //             {text:"banner",dec:10},
    //             {   text:'这是商品1',
    //                 id:1,
    //                 dec:"描述信息1.1",
    //                 dec_all:"第一个商品很详细的介绍",
    //                 price:1.5,
    //                 ori_price:2.00,
    //                 manufacture:"商品生产地1",
    //                 produce_time:"2019.12.30",
    //                 quality_time:"2020.12.30",
    //                 quantity:300,
    //                 pricture:["https://img.yzcdn.cn/vant/ipad.jpeg"],
    //                 expense:"运费1",
    //                 size:"500g",
    //                 tag:["tag1","tag2"],
    //                 isNew:true,
    //                 isRecommend:false,
    //                 sale:99,
    //             },
    //             {   text:'这是商品2',
    //                 id:2,
    //                 dec:"描述信息1.2",
    //                 dec_all:"第二个商品很详细的介绍",
    //                 price:2,
    //                 ori_price:4.00,
    //                 manufacture:"商品生产地2",
    //                 produce_time:"2019.8.30",
    //                 quality_time:"2020.12.28",
    //                 quantity:400,
    //                 pricture:["https://img.yzcdn.cn/vant/ipad.jpeg"],
    //                 expense:"运费2",
    //                 size:"500g",
    //                 tag:["tag1"],
    //                 isNew:false,
    //                 isRecommend:true,
    //                 sale:99,
    //             },
    //             {   text:'这是商品3',
    //                 id:3,
    //                 dec:"描述信息1.3",
    //                 dec_all:"第三个商品很详细的介绍",
    //                 price:13,
    //                 ori_price:41,
    //                 manufacture:"商品生产地3",
    //                 produce_time:"2019.8.30",
    //                 quality_time:"2020.12.28",
    //                 quantity:400,
    //                 pricture:["https://img.yzcdn.cn/vant/ipad.jpeg"],
    //                 expense:"运费3",
    //                 size:"500g",
    //                 tag:["tag1"],
    //                 isNew:false,
    //                 isRecommend:false,
    //                 sale:99,
    //             }]
    //     },
    //     {
    //         text: '分类2', children:
    //             [{text: "banner", dec: 20},
    //                 {   text:'这是商品4',
    //                     id:4,
    //                     dec:"描述信息2.1",
    //                     dec_all:"第二个商品很详细的介绍",
    //                     price:18,
    //                     ori_price:41,
    //                     manufacture:"商品生产地4",
    //                     produce_time:"2019.8.30",
    //                     quality_time:"2020.12.28",
    //                     quantity:400,
    //                     pricture:["https://img.yzcdn.cn/vant/ipad.jpeg"],
    //                     expense:"运费4",
    //                     size:"500g",
    //                     tag:["tag1"],
    //                     isNew:false,
    //                     isRecommend:false,
    //                     sale:99,
    //                 },
    //
    //                 {   text:'这是商品5',
    //                     id:5,
    //                     dec:"描述信息2.2",
    //                     dec_all:"第五个商品很详细的介绍",
    //                     price:20,
    //                     ori_price:40,
    //                     manufacture:"商品生产地5",
    //                     produce_time:"2019.8.30",
    //                     quality_time:"2020.12.28",
    //                     quantity:400,
    //                     pricture:["https://img.yzcdn.cn/vant/ipad.jpeg"],
    //                     expense:"运费2",
    //                     size:"500g",
    //                     tag:["tag1"],
    //                     isNew:false,
    //                     isRecommend:false,
    //                     sale:99,
    //                 }]
    //     }
    // ],

    Disordered_item:[],
    answerid: [], //答案id
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})