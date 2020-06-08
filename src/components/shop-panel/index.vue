<template>
    <div>
    <h4>{{goodname}}</h4>
        <div class="box">
            <div class="left">
                <span class="tag" v-if="tag"><van-tag v-for="(item,index) in tag" :key="index" class="tag">{{item}}</van-tag></span>
                <span class="sale"> 月销量{{sale}}件</span>
                <span class="price"> ￥{{price}}</span>
            </div>
            <div class="right">
                <van-button type="info"
                            size="small"
                            @click="addToCart"
                            round>加入购物车</van-button>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapActions} from 'vuex'
    export default {
        name: "index",
        props:{
            goodname:String,
            tag:Array,
            sale:Number,
            ori:String,
            price:String,
            tab:Number,
            idx:Number,
        },
        methods:{
            ...mapActions([
                'addCart'
            ]),
            addToCart(){
                let obj = {};
                obj.id = this.idx;
                obj.tab =  Number(this.tab);
                // console.log(this.idx,obj.tab);
                this.addCart(obj);
            },
        }
    }
</script>

<style lang="less" scoped>
    h4{
        text-align: left;
        margin-left: 30px;
    }
    .box{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .left{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 30px;
    }
    .right{
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    .tag{
        margin-top: -15px;
        margin-bottom: 10px;
    }
    .sale{
        font-size: 10px;
        color: #666666;
    }
    .price{
        font-size: 20px;
        font-weight: bold;
        color: rgb(25, 137, 250);
    }
    .tag{
        margin-right: 5px;
    }

</style>