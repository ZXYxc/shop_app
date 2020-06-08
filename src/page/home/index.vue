<template>
    <div id="home">
<!--        <CommonFooter footerItem="0"></CommonFooter>-->
        <van-icon class="iconfont icon-cart" style="margin-top: 20px;color: red;font-size: 20px"></van-icon>
<!--        <i class="iconfont icon-cart" style="margin-top: 20px;color: red;font-size: 20px"> </i>-->
        <img src="http://127.0.0.1:8000/media/GoodsImage/wuxiangguazi2.jpg">
        <img src="https://img.yzcdn.cn/vant/ipad.jpeg">
    </div>


</template>

<script>

    export default {
        name: "home",
        methods:{
            handleRouter() {
                this.$router.push('/item');
            },

        }
    }
</script>

<style scoped>

</style>