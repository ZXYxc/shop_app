<template>
    <div class="pay">
        <van-nav-bar title="提交订单"
              left-text="返回"
              left-arrow fixed="true"
              @click-left="onClickLeft"
              class="bottom_margin">
        </van-nav-bar>
        <div class="nav--placeholder" style="width:100%;height:46px"></div>
        <div class="pay_content">
            <!-- <cartheader title='提交订单'></cartheader> -->
            <!-- 联系人卡片 -->
            <div class="address_box">
                <div class="stripe-border--bottom index__block address__block">
                    <div class="address-card van-cell van-cell--center van-cell--clickable"  @click="address" v-if="addList.length==0">
                        <div class="van-cell__value van-cell__value--alone">
                            <i class="van-icon van-icon-add2 address-empty__add"></i>
                            <span class="address-empty__text">新建收货地址</span>
                        </div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                    </div>


                    <div class="address-card van-cell van-cell--center van-cell--clickable"  v-else>
                        <div class="van-cell__value van-cell__value--alone">
<!--                            这里是判断是否使用其他地址还是默认地址-->
                            <div class="address__content" v-if="!$route.query.sel">
                                <div class="address__info">
                                    <p class="address__name van-ellipsis">收货人:{{addList[0].username}}</p>
                                    <p class="address__tel van-ellipsis">电话：{{addList[0].usertel}}</p>
                                </div>
                                <i class="van-icon van-icon-location address__location"></i>
                                <p class="address__detail">收货地址:{{addList[0].addressInfo}}</p>
                            </div>
                            <div class="address__content" v-else>
                                <div class="address__info">
                                    <p class="address__name van-ellipsis">收货人:{{$route.query.add.username}}</p>
                                    <p class="address__tel van-ellipsis">电话：{{$route.query.add.usertel}}</p>
                                </div>
                                <i class="van-icon van-icon-location address__location"></i>
                                <p class="address__detail">收货地址:{{$route.query.add.addressInfo}}</p>
                            </div>

                        </div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"  @click="show_address">使用其他地址</i>
<!--                        <van-dialog-->
<!--                                v-model="show"-->
<!--                                title=“添加其他地址”-->
<!--                                show-cancel-button-->
<!--                        >-->
<!--                            <img src=“https://img.yzcdn.cn/vant/apple-3.jpg“>-->
<!--                        </van-dialog>-->
                    </div>
                </div>

            </div>
            <!-- 商品详情信息 -->
            <div type="goods-block">
                <div class="goods-list">
                    <div class="goods-list-header van-cell van-cell--borderless" @click="home" >
                        <i class="van-icon van-icon-shop van-cell__left-icon"></i>
                        <div class="van-cell__value van-cell__value--alone">
                            <a href="">零食商城</a>
                        </div>
                    </div>
<!--                    选中的购物车的商品-->
                    <div class="goods-list-card" v-for="(selectcart,index) in selectcarts" :key="index">
                        <van-card
                                :price="selectcart.price"
                                :desc="selectcart.desc"
                                :title="selectcart.title"
                                :thumb="selectcart.thumb"
                                :origin-price="selectcart.originPrice"
                        >
                            <template #footer>
                                <div class="van-card__origin-price"></div>
                                <div class="van-card__num">x {{selectcart.value}}</div>
                            </template>
                        </van-card>
                    </div>
<!--                    计算价格-->
                    <div class="goods-list-price van-cell">
                        <div class="van-cell__value van-cell__value--alone">
                            <span class="goods-list-price__count">共 {{totalnumber}} 件商品</span>小计：
                            <span class="goods-list-price__amount">¥{{total}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 优惠券单元格 -->
            <!-- <van-coupon-cell
            style="margin: 10px 0;"
            /> -->
            <div class="coupon" style="margin: 10px 0;">
                <van-cell-group >
                    <van-cell title="优惠促销"  value="全场满100减5,满199减10"/>
                </van-cell-group>
            </div>
            <!-- 付款方式 -->
            <van-collapse v-model="activeNames">
                <van-collapse-item name="1">
                    <template #title>
                        <div>支付方式：<van-icon name="question-o" /></div>
                    </template>
                    <van-checkbox-group v-model="result" :max="1">
                        <van-checkbox name="a" icon-size="15px">货到付款</van-checkbox>
                        <van-checkbox name="b" icon-size="15px">微信支付</van-checkbox>
                        <van-checkbox name="c" icon-size="15px">支付宝支付</van-checkbox>
                    </van-checkbox-group>
                </van-collapse-item>
            </van-collapse>
<!--            -->
<!--            <van-popup v-model="pay_type">-->
<!--                <van-checkbox-group v-model="result" :max="1">-->
<!--                    <van-checkbox name="a">货到付款</van-checkbox>-->
<!--                    <van-checkbox name="b">微信支付</van-checkbox>-->
<!--                    <van-checkbox name="c">支付宝支付</van-checkbox>-->
<!--                </van-checkbox-group>-->
<!--            </van-popup>-->
            <!-- 卖家留言 -->
            <div class="van-cell-group van-hairline--top-bottom">
                <div class="van-cell van-field">
                    <div class="van-cell__title"><span>卖家留言</span></div>
                    <div class="van-cell__value">
                        <div class="van-field__body">
                            <textarea placeholder="" rows="1" class="van-field__control" style="height: 24px;"  v-model="remark" >  </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <!-- copyright -->

            <!-- 合计     -->
            <div class="van-submit-bar">
                <div class="van-submit-bar__bar">
                    <div class="van-submit-bar__text">
                        <span>合计：</span>
                        <span class="van-submit-bar__price">¥ {{discount}}</span>
                    </div>
                    <button class="van-button van-button--info van-button--normal van-button--square" @click="submitForm">
                        <span class="van-button__text">提交订单</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState ,mapActions } from "vuex";

    export default {
        name:'pay',
        data() {
            return {
                remark:'',
                show:"",
                addList:"",
                pay_type:false,
                result: [],
                activeNames: [],
                // select_add:false,
            };
        },
        components:{

        },
        mounted:function () {
            this.addList =JSON.parse(localStorage.getItem("address") || '[]')
            // console.log(this.addList);
        },
        //当前路由数据发生变化的时候才会更新
        computed: mapState({
            selectcarts:'pay_list', //商品详情信息
            cart_list:"cart_list",//购物车信息

            //计算中数量
            totalnumber:function(){
                let totalnumber=0;
                for(let i=0;i<this.selectcarts.length;i++){
                    totalnumber+=this.selectcarts[i].value;
                }
                return totalnumber;
            },
            //计算总价格
            total:function(){
                let total = 0;
                for(var i=0;i<this.selectcarts.length;i++){
                    total+=this.selectcarts[i].price*this.selectcarts[i].value;
                    // total = total.toFixed(2);
                    let index = total.toString().indexOf('.');
                    total = Number( total.toString().slice(0, index + 4));
                }
                return total;
            },
            //计算打折后的价钱
            discount:function(){
                let discount=0;
                var total = this.total;
                if( total >= 100 && total < 199 ){
                    console.log("大于等于100并且小于199",total,total-5);
                    discount = total-5
                }else if( total >= 199){
                    console.log("大于等于199",total,total-10);
                    discount = total-10
                }else{
                    console.log("不打折",total);
                    discount=total;
                }
                return discount;
            },
        //现在属于什么付款方式
            paytype:function () {
                let paytype = "货到付款";
                switch(this.result[0])
                {
                    case 'a':
                        paytype = "货到付款";
                        break;
                    case "b":
                        paytype = "微信支付";
                        break;
                    case "c":
                        paytype = "支付宝支付";
                        break;
                }
                return paytype;
            }

        }),

        methods:{

            ...mapActions([
                'clear_setCart',
                "deleteCart",
                "add_orderdetail"
            ]),

            show_address(){
                this.$router.push({path:"/selectAdd"})
            },
            onClickLeft() {
                this.$router.push({path:'/cart'});
            },
            address(){
                this.$router.push({path:'/addedit'});
                this.show=true;
            },
            home(){
                this.$router.push({path:'/'})
            },
            delivery(){
                this.pay_type = true;
                // this.$dialog.alert({
                //     title: '温馨提示',
                //     message: '您所下单的商品采用货到付款的支付方式,满意后签收付款！我们为您提供7天无理由退换货服务'
                // }).then(() => {
                //     // on close
                // });
            },
            submitForm(){
                if(this.addList==''){
                    this.$dialog.alert({
                        title: '请填写您的收货地址',
                    }).then(() => {
                        // on close
                    });
                }else{
                    var item = [];
                    for(let i=0; i<this.selectcarts.length; i++){
                        //价格数量图片
                        let priceAll = this.selectcarts[i].price;
                        let numAll = this.selectcarts[i].value;
                        let imgAll = this.selectcarts[i].thumb;
                        let name = this.selectcarts[i].title;
                        let itemId = this.selectcarts[i].num;
                        console.log(itemId);
                        //获取时间戳

                        // 将当前时间换成时间格式字符串
                        var date = new Date();
                        let Y = date.getFullYear() + '-';
                        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        let D = date.getDate() + ' ';
                        let h = date.getHours() + ':';
                        let m = date.getMinutes() + ':';
                        let s = date.getSeconds();
                        var newDate = Y+M+D+h+m+s;
                        console.log(newDate);
                        // var cur = i + 1
                        //后端数据                 num = item['num']
                        // itemId = item['itemId']；
                        item.push({
                            "itemId": itemId,
                            // "price": priceAll,
                            "num": numAll,
                            // "img": imgAll,
                            // "name":name,
                        });
                        var item_temp = [];
                        item_temp.push({
                            // "itemId": itemId,
                            "price": priceAll,
                            "num": numAll,
                            "img": imgAll,
                            "name":name,
                        });
                    }
                    //卖家留言
                    let remark = this.remark;
                    let price = this.discount;
                    if (!this.$route.query.sel){
                        var user = this.addList[0].username;
                        var mobile = this.addList[0].usertel;
                        var address = this.addList[0].addressInfo;
                    }
                    else{
                        user = this.$route.query.add.username;
                        mobile = this.$route.query.add.usertel;
                        address = this.$route.query.add.addressInfo;
                    }

                    let data= {
                        userId:57,
                        price:price,
                        recieverName:user,
                        reciverPhone:mobile,
                        reciverAddress:address,
                        remark:remark,
                        payState:this.paytype,
                        oderItems:item,
                        generatedTime:newDate,
                        orderssend:false
                    };

                    console.log(data);
                    this.$api.order.postOrder(data)
                        .then((res)=>{
                            let r = res.data;
                            if ( r.result == "success") {
                                var orderId = r.orderId;
                                this.$dialog.alert({
                                    title: '下单成功',
                                    message: '订购成功后我们会尽快发货,请保持电话畅通'
                                }).then(() => {
                                    let data2= {
                                        price:price,
                                        recieverName:user,
                                        reciverPhone:mobile,
                                        reciverAddress:address,
                                        remark:remark,
                                        paytype:this.paytype,
                                        oderItems:item_temp,
                                        generatedTime:newDate,
                                        orderssend:false,
                                        orderId:orderId
                                    };
                                    //临时发送该订单内容方便直接查看
                                    this.add_orderdetail(data2);
                                    //清空掉选中的数据
                                    this.clear_setCart();
                                    //清空掉购物车的数据,为啥不用id呢？就是一样的产品有不同的套餐,但是id是一样的
                                    //思路,根据购物车中的选择checked等于true去删除
                                    let cart = this.cart_list;
                                    let count = 0;
                                    let flag = [];
                                    if (cart.length)
                                        for(let j=0;j<cart.length;j++){
                                            if(cart[j].isChecked){
                                                flag.push(j);
                                            }
                                        }
                                    for (let i=0;i<flag.length;i++){
                                        this.deleteCart(flag[i]-count);
                                        count++;
                                    }
                                    this.$router.push({path:'/paySuccess'});
                                });
                            }
                    })
                }
            }

        },
    }
</script>

<style>
    .pay_content{
        height: 100%;
        margin-bottom: 100px
    }
    .goods-list {
        background: #fff;
    }
    .goods-list-card+{
        margin-top: 6px;
    }
    .goods-list-price .van-cell__value {
        text-align: right;
    }
    .goods-list-price__count {
        color: #999;
        font-size: 12px;
        margin-right: 6px;
    }
    .goods-list-price__amount {
        color:rgb(25, 137, 250);
        font-weight: 700;
    }
    .copyright {
        width: 100%;
        color: #999;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        position: relative;
        top: 20px;
        bottom: 0px;
        left: 0;
    }
    .copyright a{
        color: #bfbfc3;
    }
    /* 收货地址 */
    .address-card {
        padding: 15px;
    }
    .address-empty__add {
        font-size: 40px;
        color: rgb(25, 137, 250);;
        vertical-align: middle;
    }
    .address-empty__text {
        line-height: 40px;
        margin-left: 10px;
        /*display: inline-block;*/
        vertical-align: middle;
    }
    .stripe-border--bottom,

    .index__block {
        margin:0 0 10px 0;
    }
    .address__block {
        padding-bottom: 2px;
    }
    .stripe-border--bottom:after {
        bottom: 0;
    }
    .stripe-border--bottom:after,
    .stripe-border--top:before {
        left: 0;
        right: 0;
        content: "";
        height: 2px;
        position: absolute;
        background: -webkit-repeating-linear-gradient(135deg,#ff6d6d,#ff6d6d 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
        background: repeating-linear-gradient(-45deg,#ff6d6d,#ff6d6d 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
        background-size: 80px;
    }
    .index-view .van-icon {
        min-width: 1em;
    }
    .address__location {
        float: left;
        font-size: 16px;
        margin: 3px 5px 0 0;
    }
    .van-icon, .van-icon:before {
        display: inline-block;
    }
    .address__content, .address__content>div {
        overflow: hidden;
    }
    .address__info {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        flex-direction:column;
        align-items:flex-start;
        /*justify-content: center;*/
    }
    .address__name, .address__tel {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        max-width: 60%;
        font-size: 14px;
        font-weight: 200;

    }
    .address__tel {
        text-align: right;
    }
    .address__detail {
        color: #666;
        margin-top: 3px;
        font-size: 12px;
        line-height: 16px;
        word-break: break-all;
    }
    .van-cell__right-icon {
        color: #999;
        font-size: 12px;
        line-height: 24px;
    }
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }

</style>
