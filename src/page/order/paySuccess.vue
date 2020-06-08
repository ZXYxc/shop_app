<template>
    <div class="paySuccess">
        <van-nav-bar :title="title"
                     left-text="返回"
                     left-arrow fixed="true"
                     @click-left="onClickLeft"
                     class="bottom_margin">
        </van-nav-bar>
        <div class="nav--placeholder" style="width:100%;height:46px"></div>

        <div class="paySuccessInfo">

            <div class="icon_success">
                <van-icon name="chenggong" />
            </div>

            <h4>购买成功</h4>
            <div class="successBack">
                已收到您的货款,请留意
                <span @click="goOrderDetail">订单详情</span>
                以及
                <router-link to="/order">我的订单</router-link>
                另外祝您生活愉快 感谢您的支持与厚爱
            </div>
        </div>
    </div>
</template>

<script>
    // import Header from '@/components/Header'
    export default{
        data(){
            return{
                title:"结算成功"
            }
        },
        components:{
            // [this.$icon.name]:this.$icon,
        },
        methods:{
            goOrderDetail(){
                this.$router.push({ path: "orderDetail"});
            },
            onClickLeft(){
                this.$router.push({ path: "/cart"});
            }
        }
    }
</script>

<style scoped>
    .paySuccess{
    }
    span{
        color: rgb(25, 137, 250);
    }
    .paySuccessInfo{
        padding-top: 1.45rem;
        text-align: center;
    }
    .icon_success{
        margin-top: 2rem;
        font-size: 2.8rem;
        color: rgb(25, 137, 250);
    }
    .successBack{
        width: 80%;
        margin: .5rem auto;
        text-align: center;
        font-size: .36rem;
    }
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }
</style>