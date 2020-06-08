<template>
    <div class="tabbar">
        <van-tabbar v-model="tabBarSelect"  @change="onChange">
            <van-tabbar-item icon="gem-o" url="/home">精选</van-tabbar-item>
            <van-tabbar-item icon="shop-o">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "index",
        watch: {

        },
        computed: {
            color(){
                return "#1c99e2c0";
            }

        },
        data() {
            return {
                tabBarSelect: 0,
            };
        },
        methods: {
            onChange(index) {
                const routerArray = [
                    "/index",
                    "/item",
                    "/cart",
                    "/mine"
                ];
                this.$router.push(routerArray[index])
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .tabbar {
        width: 100vw;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 2px solid #f5f5f5;
    }
</style>
