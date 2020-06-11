<template>
<div>
    <van-search
            background="#A9BCF5"
            :color="'#0FAFAA'"
            shape="round"
            placeholder="请输入搜索关键词"/>

    <van-tree-select
            class="color"
            height="600px" width="50px"
            :items="items"
            :main-active-index.sync="active"
            @click-nav="onNavClick"
    >
        <template #content>
            <div class="main">
                    <ul class="right-content">
                        <li v-for="(item,index) in tabItem" :key="index" >
<!--                            <img src="item.pricture[0]">-->
<!--                            <img src="http://127.0.0.1:8000/media/GoodsImage/wuxiangguazi2.jpg">-->
                            <div v-if="index>0">
                                <van-card
                                        :price="item.price"
                                        :desc="item.dec"
                                        :title="item.text"
                                        @click="openChild(index,item.id)"
                                        v-if="item.pricture"
                                        :thumb="item.pricture[0]"
                                >
                                    <template #tags>
                                        <van-tag
                                                plain type="danger"
                                                v-for="(it,idx) in item.tag"
                                                :key="idx">
                                            {{it}}
                                        </van-tag>
                                    </template>
                                    <template #footer>
                                        <van-icon
                                                class="iconfont icon-cart1"
                                                style="margin-top: 20px;color: red;font-size: 20px"
                                                @click.stop="addToCart(index)"></van-icon>
<!--                                        <van-button size="mini">按钮</van-button>-->
                                    </template>
                                </van-card>
<!--//当没有图片的时候-->
                                <van-card
                                        :price="item.price"
                                        :desc="item.dec"
                                        :title="item.text"
                                        @click="openChild(index,item.id)"
                                        v-else
                                >
                                    <template #tags>
                                        <van-tag
                                                plain type="danger"
                                                v-for="(it,idx) in item.tag"
                                                :key="idx">
                                            {{it}}
                                        </van-tag>
                                    </template>
                                    <template #footer>
                                        <van-icon
                                                class="iconfont icon-cart1"
                                                style="margin-top: 20px;color: red;font-size: 20px"
                                                @click.stop="addToCart(index)"></van-icon>
                                        <!--                                        <van-button size="mini">按钮</van-button>-->
                                    </template>
                                </van-card>
<!--                                结束-->
                            </div>
                            <van-image
                                    v-else
                                    width="100%"
                                    lazy-load
                                    :src="itemSrc"
                            />
                         </li>
                    </ul>
            </div>
        </template>
    </van-tree-select>
</div>
</template>

<script>
    // import { getCateItems, getCateContent } from '@/api/category'
    import { mapState,mapActions} from 'vuex'
    export default {
        data() {
            return {
                active: 0,
                cate: [],
                banner: '',
                // 左侧高亮元素的index
                focusIndex: 0,
            };
        },
        computed: mapState({
            items:'items', //商品详情信息
            tabItem:function() {
                return this.items[this.focusIndex].children;
            },
            itemSrc:function () {
                return require("../../assets/images/"+ this.tabItem[0].dec +".jpg");
            }
        }),
        mounted() {

        },
        methods: {
            ...mapActions([
                'addCart'
            ]),
            onNavClick(index) {
                this.focusIndex = index;
                // console.log(index);
            },
            //ID是商品的编号
            addToCart(id){
                let obj = {};
                obj.id = id;
                obj.tab =  this.focusIndex;
                this.addCart(obj);
            },
            openChild(index,idx){
                let temp = ""+this.focusIndex;
                // console.log(temp+" "+index)
                this.$router.push({path:"/item/item01",query: {taber:temp,id:index,nums:idx}});
                // this.$router.push({path:"/item/item01",query: {taber:temp,id:index}});
                // this.$router.push({name:'itemdetail',query: {id:'1'}})

            }
        }
    };
</script>

<style scoped>
body{
    margin-top: 10px;
}
    .color>>>.van-sidebar-item--select::before{
        background-color: rgb(169, 188, 245);
    }
</style>