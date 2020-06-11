<template>
    <div id="home">
        <!--        <CommonFooter footerItem="0"></CommonFooter>-->
<!--        <van-icon class="iconfont icon-cart" style="margin-top: 20px;color: red;font-size: 20px"></van-icon>-->
        <!--顶部区域(√)-->
        <div id="header">
        </div>
        <!--图片轮转播放，直接请求图片，图片的更新由后端完成√-->
        <div id="showPics">
            <img class="topPic" :src="nowPic" />
            <div id="showBox">
                <!--用来显示是哪张图片，还需写个函数-->
                <div class="cycle" id="cycle1" style="left:27%"></div>
                <div class="cycle" id="cycle2" style="left:37%"></div>
                <div class="cycle" id="cycle3" style="left:47%"></div>
                <div class="cycle" id="cycle4" style="left:57%"></div>
            </div>
        </div>
        <!--分类推送√还需看一下relative的div是否正常显示-->
        <div id="classes">
            <div class="title"><p class="titleName">精选主题</p></div>
            <!--四个分类栏分别指向不同类别的产品，对于首页来说主要是样式的定制-->
            <div id="className">
                <div class="class" id="class1">
                    <a class="theme" id="theme1" v-bind:href="theme1">
                        <img class="theme" :src="picPath1"/>
                    </a>
                </div>
                <div class="class" id="class2">
                    <a class="theme" id="theme2" v-bind:href="theme2">
                        <img class="theme" :src="picPath2"/>
                    </a>
                </div>
                <div class="class" id="class3">
                    <a class="theme" id="theme3" v-bind:href="theme3">
                        <img class="theme" :src="picPath3"/>
                    </a>
                </div>
                <div class="class" id="class4">
                    <a class="theme" id="theme4" v-bind:href="theme4">
                        <img class="theme" :src="picPath4"/>
                    </a>
                </div>
            </div>
        </div>
        <!--商品推送-->
        <div id="items">
            <div class="title"><p class="titleName">最近新品</p></div>
<!--             v-for="(item,index) in tabItem" :key="index" -->
            <!--需要定义item的实体，商品id(由后端更新，前端固定请求id范围为1-n) -> 商品图片、商品名、商品价格 -> 前端展示-->
            <div id="showItems">
                <div class="divItem"  v-for="(item,index) in items" :key="index">
                    <img class="imgItem" :src="item.picPath" :href="item.url" />
                    <div class="itemParm">
                        <p class="itemp1">{{item.title}}&nbsp;&nbsp;&nbsp;${{item.price}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="footer">
        </div>
<!--        <script src="../item/module/FPage.js"></script>-->
    </div>


</template>

<script>

    export default {
        name: "home",
        data() {
            return{
                nowPic: "",
                testPic: "./img/email.png",
                pics: [],
                i: 0,
                id: "cycle",
                theme1: "",
                theme2: "",
                theme3: "",
                theme4: "",
                picPath1: "",
                picPath2: "",
                picPath3: "",
                picPath4: "",
                url: "./lookUpItem?itemId=",
                items: [],
            }
        },

        methods: {

            handleRouter() {
                this.$router.push('/item');
            },

        },
        created(){
            this.getItems();
            this.getPics();
            this.play();
        },

        mounted(){
            var screenHeight = document.documentElement.clientHeight;
            var screenWidth = document.documentElement.clientWidth;
            var body = document.getElementsByTagName("body");
            body[0].style.width = screenWidth+"px";
            body[0].style.height = screenHeight+"px";
        }
    }
</script>

<style scoped>

</style>