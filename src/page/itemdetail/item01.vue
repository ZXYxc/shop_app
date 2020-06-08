<template>
    <div>
<!--      轮播图-->
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
<!--                <img v-lazy="image" />-->
                <van-image
                        width="100%"
                        height="200px"
                        lazy-load
                        :src="image"
                />
            </van-swipe-item>
        </van-swipe>

<!--        顶部的返回上一页和购物车-->
        <i @click="backToItem" class="iconfont icon-sidebar_back_hov back"></i>
        <i @click="tocart" class="iconfont icon-cart1 cart"></i>

<!--        滚动的返回上一页和购物车-->
        <float-icons padding="10 10 60 10" class="icons-warp">
            <div class="float-icon-item">
                <img src="../../assets/images/home-icon.png" alt="" @click="backToItem()">
                <span>返回</span>
            </div>
            <div class="float-icon-item">
                <img src="../../assets/images/cart-icon.png" alt="" @click="tocart()">
                <span>购物车</span>
            </div>
        </float-icons>


<!--短介绍-->
        <shopPanel
            :key = "nums"
            :goodname="item.text"
            :tag="item.tag"
            :sale="item.sale"
            :price="item.price"
            :ori="item.ori_price"
            :tab="this.focus"
            :idx="this.idx"
        >
        </shopPanel>

<!--        详情/评价-->
        <van-tabs v-model="active" class="tabs" color="rgb(25, 137, 250)"  @click="toEvaluate(active)">
            <van-tab title="商品详情" class="dec">
                <p>商品的生产地是：{{item.manufacture}}</p>
                <p>商品的生产日期是：{{item.produce_time}}</p>
                <p>商品的保质期是：{{item.quality_time}}</p>
                <p>商品的库存是：{{item.quantity}}</p>
                <p>商品的运费是：{{item.expense}}</p>
                <p>商品的大小是：{{item.size}}</p>
            </van-tab>

            <van-tab title="商品评价">
                <Evalute :id="item.id"></Evalute>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
    import FloatIcons from '@/components/s-icons'
    import shopPanel from "@/components/shop-panel"
    import Evalute from "./module/evaluate"
    import { mapState,mapActions} from 'vuex'
    export default {
        components: {
            'float-icons': FloatIcons,
            shopPanel,
            Evalute
        },
        computed: mapState({
            items:'items', //商品详情信息
            item(){
                return this.items[this.focus].children[this.idx]
            },
            images(){
                let image = [];
                image.push(this.item.pricture[1]);
                image.push(this.item.pricture[2]);
                return image;
            },
            // $route.query.id
        }),

        watch: {
            // 如果路由有变化，会再次执行该方法
            // "$route": "clear",
            // $route(to){
            //     // console.log( "离开了");
            //     // this.item = [];
            //     // this.clear(to.path);
            // }
        },
        mounted() {
            // this.item = this.items[this.$route.query.taber].children[this.$route.query.index];
            // console.log(this.$route.query.id+" "+this.$route.query.taber);
            let data = {
                "itemId":this.item.id
            };
            this.$api.goods.getComments(data)
                .then(response => {
                    // console.log(this.item.id);
                    this.comments = response.data;
                    this.initComments(this.comments);
                    console.log(this.comments);
                });
            // console.log(this.item);
        },
        name: "item01",
        data() {
            return {
                // images: [
                //     this.item.pricture[1],
                //     'https://img.yzcdn.cn/vant/apple-2.jpg',
                // ],
                active:0,
                // list: [],
                focus:this.$route.query.taber,
                idx:this.$route.query.id,
                nums:this.$route.query.nums,
                comments:"",
            };
        },
        methods:{
            ...mapActions([
                'addCart',
                'initComments'
            ]),
            clear(path) {
                // 使用 axios获取数据
                if(path!="/item/item01/evaluate"){
                    // console.log("从这个页面离开了");
                    this. active=0;
                }

            },
            tocart(){
                this.$router.push("/cart");
            },
            backToItem(){
                // window.history.back();
                this.$router.push("/item");
            },
            toEvaluate(){
                // if (this.active)
                //     this.$router.push("/item/item01/evaluate");
            },
        }
    }
</script>

<style lang="less" scoped>
    body{
        margin: 20px;
    }
    .icon-sidebar_back_hov{
        font-size: 20px;
    }
    .icon-cart1{
        font-size: 25px;
        position: fixed;
        top: 20px;
        right: 10px;
    }
    .back{
        position: fixed;
        top: 20px;
        left: 10px;
    }

    .icons-warp {
        border-radius: 25px;
        .float-icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 50px;
            height: 50px;

            img {
                width: 25px;
                height: 25px;
                margin-bottom: 3px;
            }

            span {
                font-size: 9px;
                color: #666666;
            }
        }
    }

    .tabs{
        margin-top: 30px;
    }

    .dec{
        font-size: 14px;
        text-align: left;
        margin-left: 10px;
        margin-top: -2px;
    }

</style>