<template>
    <div>
        <van-nav-bar title="购物车"
                     left-text="返回"
                     left-arrow fixed="true"
                     @click-left="onClickLeft"
                    class="bottom_margin">
        </van-nav-bar>
        <div class="nav--placeholder" style="width:100%;height:46px"></div>

<!--每一个添加的商品，list里面是购物车的全部的数据，这里的index则是加入购物车的商品的序列号-->
        <Item
                v-for="(item,idx) in list"
                :key="idx"
                :index="idx"
                :num="item.num"
                :thumb="item.thumb"
                :title="item.title"
                :desc="item.desc"
                :tag="item.tag"
                :tags="item.tags"
                :originPrice="item.originPrice"
                :price="item.price"
                :isChecked="item.isChecked"
                :value="item.value"
                @input="handleItemSelect"
                @handleDelete="handleDelete"
                @saleNum="handleAdd"
                @click.native="toitemDetail"
        />

        <div class="cartImg" v-if="!list.length">
            <img src="http://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png">
            <h1>购物车是空的哦，快去购物吧</h1>
            <router-link :to="{name:'item'}">逛一逛</router-link>
        </div>

        <Tabbar :amount="amount" :value="isAllSelect" @input="handleAllSelect" />
<!--        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" button-type="info"/>-->
    </div>

</template>


<script>
    import Item from './modules/Item'
    import Tabbar from './modules/Tabbar'
    import {mapState,mapActions} from 'vuex'

    export default {
        computed: mapState({
            list:'cart_list', //商品详情信息
        }),

        data() {
            return {
                amount: 0,
                isAllSelect: false,
            }
        },
        components: {
            Item,
            Tabbar
        },
        watch: {
            list(newval) {
                console.log(newval);
                this.ComAmount(newval);
            }
        },

        methods: {
            ...mapActions([
                'deleteCart'
            ]),
            toitemDetail(){
                // console.log("触发了单机");
                // this.$router.push({path:"/item/item01",
                //                 query: {
                //                     taber:this.cart_list.tab,
                //                     id:this.cart_list.idx,
                //                     nums:this.cart_list.tab.num
                // }});
            },
            //计算总价
            ComAmount(newval){
                let num = 0;
                newval.forEach(item => {
                    if (item.nums==undefined)
                        item.nums = 1;
                    if (item.isChecked)
                        num += item.price * item.nums;
                });
                this.isAllSelect = newval.every(item => {
                    return item.isChecked === true
                });
                this.amount = num * 100;
            },
            onClickLeft() {
                this.$router.push({path:'/item'})
            },
            onSubmit() {

            },
            // 单选
            handleItemSelect(playload) {
                const {val, idx} = playload;
                const newval = this.list[idx];
                newval.isChecked = val;
                this.$set(this.list, idx, newval);
            },
            //  全选
            handleAllSelect(value) {
                for(let i=0;i<this.list.length;i++){
                    this.list[i].isChecked = value;
                    this.$set(this.list, i,this.list[i]);
                }
            },
            //删除
            handleDelete(value) {
                this.deleteCart(value);
            },
            //现在每个单元的购买数量
            handleAdd(value){
                const {val, idx} = value
                // console.log(value);
                this.$set(this.list[idx],"nums", val);
                this.ComAmount(this.list);
            }
        }
    }

</script>


<style lang="less">
    .goods-card {
        margin: 0;
        background-color: white;
    }

    .delete-button {
        height: 100%;
    }

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }

    .cartImg img {
        width: 140px;
        height: 140px;
        display: block;
        margin:0 auto;
        margin-top:80px;
    }
    .cartImg h1 {
        margin-top: 20px;
        text-align: center;
        color: #959595;
        font-size: 14px;
    }
    .cartImg a {
        display: block;
        text-align: center;
        margin: 20px auto;
        width: 110px;
        height: 37px;
        line-height: 37px;
        border-radius: 4px;
        text-align: center;
        background: rgb(25, 137, 250);
        color: white;
        font-weight: 800;
        font-size: 12px;
    }

</style>