<template>
    <div>
        <Header
            title="订单详情"
            add = "/mine"
        ></Header>
        <form action="/">
            <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入订单关键词"
                    @search="onSearch"
                    @cancel="onCancel"
            />
        </form>

        <van-tabs v-model="active" class="color">
            <van-tab title="全部">
                <div class="myorder"
                     v-for="(items,idx) in show_list"
                     :key="idx">
                    <van-swipe-cell
                            v-for="(item,id) in items.goods"
                            :key="id"
                    >
                        <van-card
                                :num="item.num"
                                :price="item.price"
                                :desc="item.des"
                                :title="item.name"
                                class="goods-card"
                                :thumb="item.pic"
                        >

                        </van-card>
                    </van-swipe-cell>
                    <van-row>
                        <van-col span="8" offset="16" ><span class="total">实际付款 ￥</span>{{items.totalPrice}}</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="1" offset="2" class="myicon">
                            <van-icon name="ellipsis" @click="deleteOrder(items.orderId,idx)"/>
                        </van-col>
                        <van-col span="6" offset="7" class="btn">
                            <van-button size="small">加入购物车</van-button>
                        </van-col>
                        <van-col span="6" class="btn" id="bnt2">
                            <van-button size="small" v-if="items.send=='False'">催促一下</van-button>
                            <van-button size="small" v-else>我已收到</van-button>
                        </van-col>

                    </van-row>
                </div>
            </van-tab>
<!--            未发货-->
            <van-tab title="未发货">
                <div
                     :class="[items.send==='False' ? 'myorder' : '']"
                     v-for="(items,idx) in show_list"
                     :key="idx">
                    <div v-show="items.send==='False'">
                    <van-swipe-cell
                            v-for="(item,id) in items.goods"
                            :key="id"
                    >
                        <van-card
                                :num="item.num"
                                :price="item.price"
                                :desc="item.type"
                                :title="item.name"
                                class="goods-card"
                                :thumb="item.pic"
                        >

                        </van-card>
                    </van-swipe-cell>
                    <van-row>
                        <van-col span="8" offset="16" ><span class="total">实际付款 ￥</span>{{items.totalPrice}}</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="1" offset="2" class="myicon">
                            <van-icon name="ellipsis" @click="deleteOrder(items.orderId,idx)"/>
                        </van-col>
                        <van-col span="6" offset="7" class="btn">
                            <van-button size="small">加入购物车</van-button>
                        </van-col>
                        <van-col span="6" class="btn" id="bnt2">
                            <van-button size="small" >催促一下</van-button>
                        </van-col>

                    </van-row>
                    </div>
                </div>
            </van-tab>
<!--            已经收货-->
            <van-tab title="已收货">
                <div
                     :class="[items.send!=='False' ? 'myorder' : '']"
                     v-for="(items,idx) in show_list"
                     :key="idx">
                    <div v-show="items.send!=='False'">
                        <van-swipe-cell
                                v-for="(item,id) in items.goods"
                                :key="id"
                        >
                            <van-card
                                    :num="item.num"
                                    :price="item.price"
                                    :desc="item.des"
                                    :title="item.name"
                                    class="goods-card"
                                    :thumb="item.pic"
                            >

                            </van-card>
                        </van-swipe-cell>
                        <van-row>
                            <van-col span="8" offset="16" ><span class="total">实际付款 ￥</span>{{items.totalPrice}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="1" offset="2" class="myicon">
                                <van-icon name="ellipsis" @click="deleteOrder(items.orderId,idx)"/>
                            </van-col>
                            <van-col span="6" offset="7" class="btn">
                                <van-button size="small">加入购物车</van-button>
                            </van-col>
                            <van-col span="6" class="btn" id="bnt2">
                                <van-button size="small" >我已收到</van-button>
                            </van-col>

                        </van-row>
                    </div>
                </div>

            </van-tab>
            <van-tab title="待评价">待评价</van-tab>
        </van-tabs>



    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import Header from "@/components/Header"
    export default {
        name: "index",
        components:{Header},
        data() {
            return {
                active: 0,
                order_list: '',
                value:"",
                show_list:[]
            }
        },
        computed:{
            ...mapState({
                list:'Disordered_item', //商品详情信息
                orderList:"orderList"
            }),
            goods:{

            }
        },
        methods: {
            ...mapActions([]
            ),
            init() {
                let userId = 57;
                this.$api.order.Get_Order(userId)
                    .then((res) => {
                            if (res.data.result !== "fail") {
                                this.order_list = res.data.orders;

                                console.log(this.order_list);

                                for (let i = 0; i < this.order_list.length; i++) {
                                    let t = {};
                                    t.totalPrice = this.order_list[i].totalPrice;
                                    t.send = this.order_list[i].orderssend;
                                    t.orderId = this.order_list[i].orderId
                                    t.goods = [];
                                    this.show_list.push(t);
                                    let list = this.order_list[i].oderItems;
                                    for (let j = 0; j < list.length; j++) {
                                        let temp = this.find(list[j].itemId);
                                        let item = {};
                                        item.num = list[j].num;
                                        item.name = temp.name;
                                        item.pic = "http://" + temp.picPath1;
                                        item.price = temp.presentPrice;
                                        item.des = temp.des;
                                        this.show_list[i].goods.push(item);
                                    }
                                }
                                // console.log( this.show_list);
                            }
                        }
                    );
            },
            find(goodsId) {
                let list = this.list;
                for (let i = 0; i < list.length; i++) {
                    if (goodsId === list[i].itemId)
                        return list[i];
                }
            },
            onSearch(val) {
                this.$toast(val);
            },
            onCancel() {
                // this.$toast('取消');
            },
            deleteOrder(OrderId, idx) {
                this.$dialog.confirm({
                    message: '确认删除该订单？',
                })
                    .then(() => {
                        // console.log(this.order_list[idx]);
                        // console.log(this.show_list[idx]);
                        // 删除order_list和show_list的这一个订单
                        this.$api.order.Del_Order(57, OrderId)
                            .then((res) => {
                                if (res.data.result === "fail")
                                    console.log("fail");
                                else {
                                    this.order_list.splice(idx,1);
                                    this.show_list.splice(idx,1);
                                    console.log(this.order_list);
                                    console.log(this.show_list);
                                }

                            })
                            .catch(() => {
                                console.log("取消");
                            });

                    });
            },
        },
        mounted() {
            this.init();
        },


    }
</script>

<style scoped>
    html{
        background-color: rgb(245, 245, 245);
    }
    .myorder{
        margin: 15px;
        border:5px solid rgb(243, 243, 243);
        border-radius:10px;
        box-shadow:rgb(118, 118, 118) 0px 0px 10px;
    }
    .myorder>>>.van-swipe-cell__wrapper{
        border:3px solid rgb(243, 243, 243);
    }

    .goods-card {
        margin: 0;
        background-color:white;
    }

    .delete-button {
        height: 100%;
    }

    .color>>>.van-tabs__line{
        background-color: rgb(94, 173, 252);
    }

    .total{
        font-size: 12px;
        margin-bottom: 10px;
        color: rgb(150, 151, 153);
        font-weight: 300;
    }

    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        color: rgb(94, 173, 252);
    }
    .btn>>>.van-button--default{
        color: rgb(94, 173, 252);
    }
    #bnt2{
        margin-left: 20px;
    }
    .myicon{
        margin-top: 15px;
    }

</style>