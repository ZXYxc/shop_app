<template>
    <div>
        <van-nav-bar :title="title"
                     :add="add"
                     left-text="返回"
                     left-arrow fixed="true"
                     @click-left="onClickLeft"
                     class="bottom_margin">
        </van-nav-bar>
        <div class="nav--placeholder" style="width:100%;height:46px"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            title:String,
            add:String,
        },
        methods:{
            onClickLeft(){
                this.$router.push(this.add);
            }
        }
    }
</script>

<style scoped>
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }

</style>