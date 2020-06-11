<template>
    <div class="orderDetail">
        <OrderDetailHeader title="订单详情" add="/cart"></OrderDetailHeader>
        <div class="orderDetails">

            <div class="currentAddressList">
                <p>
                    <span class="name">收货人:{{currentOrder.recieverName}}</span>
                    <span  class="tel">电话:{{currentOrder.reciverPhone}}</span>
                </p>
                <p>
                    <em>收货地址:</em>
                    <span class="addressDetail">{{currentOrder.reciverAddress}}</span>
                </p>
            </div>

            <div class="payGoodsList">
                <h4>
                    商品清单
                </h4>
                <van-divider
                        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                />
                <ul>
                    <li class="ordersList" v-for="(item,index) in currentOrder.oderItems" :key="index">
					<span class="orderImg">
                        <van-image :src="item.img"></van-image>
					</span>
                        <div class="orderNum">
                            ×{{item.num}}
                        </div>
                        <div class="orderDetail">
                            <span>{{item.name}}</span>
                            <span>￥{{item.price}}</span>
                        </div>
                    </li>
                    <li class="expanse">
                        <span>配送费 ￥0</span>
                    </li>
                    <li class="priceAll">
                        <span > 实际付款 ￥{{currentOrder.price}}</span>
                    </li>
                </ul>
                <van-divider
                        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                />

                <div class="orderRemarks">
                    <van-cell-group>
                        <van-cell title="支付方式" :value="currentOrder.paytype"/>
                        <van-cell title="订单生成时间" :value="currentOrder.generatedTime"/>
                        <van-cell title="订单编号" :value="currentOrder.orderId"/>
                        <van-cell title="订单留言" :value="currentOrder.remark"/>
                    </van-cell-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderDetailHeader from '@/components/Header'
    import { mapState } from 'vuex'
    export default{
        data(){
            return{
                currentOrder:""
            }
        },
        components:{
            OrderDetailHeader,
        },
        computed:{
            ...mapState([
                "order_list",
            ])
        },
        mounted:function(){
        },
        created(){
            this.currentOrder = this.order_list[this.order_list.length-1];
        }
    }
</script>

<style scoped lang="less">
    .priceAll{
        text-align: right;
        color:rgb(25, 137, 250);
        font-weight: 700;
        margin-top: 6px;
        margin-right: 6px;
    }
    .currentAddressList{
        padding: 0.5em;
        border: 0.6em solid transparent;
        border-image:12
        repeating-linear-gradient(-45deg, red 0, red 1em, transparent 0, transparent 2em,
        #58a 0, #58a 3em, transparent 0, transparent 4em);

        font: 100%/1.6 Baskerville, Palatino, serif;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        p{
            margin-top: 5px;
            font-size: 15px;
            margin-block-start:-2px;
            margin-left: 15px;
            span{
                flex-direction: row;
                justify-content: space-between;
                margin-right: 60px;
            }
            em{
                margin-right: 60px;
            }
        }

    }
    .expanse{
        font-size: 0.8rem;
        margin-top: .5rem;
        text-align: right;
        margin-right: 2%;
        color: #969799;
    }
    .payGoodsList{
        background: #fff;
        margin-top: .5rem;
        h4{
            /*border-bottom:1px solid #eaeaea;*/
            font-size: 0.8rem;
            margin-block-end: -0.5em;
            padding: .5rem 4%;
        }
    }
    .ordersList{
        padding: 0 2%;
        font-size: 0.8rem;
        margin-top: .5rem;
        border-bottom:1px solid #eaeaea;
        .orderImg{
            display: inline-block;
            width: 26%;
        }
        .orderNum{
            display: inline-block;
            margin-right: 2%;
            margin-top: .35rem;
            float: right;
        }
        .orderDetail{
            width: 65%;
            display: inline-block;
            text-align: right;
        }
    }
    .orderDetail span{
        display: inline-block;
    }
    .payStylesNav{
        padding: 0 4% .5rem 4%;
        margin-top: .4rem;
    }
    .payStyleBox{
        border: 1px solid #eaeaea;
        border-radius: 5px;
        margin-top: 20px;
        height: 1.4rem;
        font-size: .4rem;
        padding: .2rem 4%;
    }
    .orderMessage{
        padding: 0 4% .5rem 4%;
        margin-top: .4rem;
        textarea{
            width: 100%;
            font-size: .4rem;
            padding: 2px;
        }
    }
    .invoiceInfo{
        padding: 0 4% .5rem 4%;
        margin-top: .4rem;
        p{
            font-size: .4rem;
        }
    }
    .invoiceInfo input{
        height: 1.18rem;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        width: 98%;
        padding-left: 2%;
        font-size: .4rem;
        margin-top: .3rem;
    }
</style>