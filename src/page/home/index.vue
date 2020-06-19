<template>
 <div>
     <!--顶部区域(√)-->
     <div id="header">
     </div>

    <!--图片轮转播放，直接请求图片，图片的更新由后端完成√-->
     <showpics></showpics>

     <!--分类推送√还需看一下relative的div是否正常显示-->
     <div id="classes">
         <div class="title">
             <p class="titleName">精选主题</p>
             <className></className>
         </div>
     </div>

     <!--商品推送-->
     <div id="items">
         <div class="title">
             <p class="titleName">
                最近新品
             </p>
         </div>
             <showItems></showItems>
     </div>

     <div id="footer"/>
</div>


</template>

<script>
    import className from "@/page/home/module/className";
    import showItems from "@/page/home/module/showItems";
    import showpics from "@/page/home/module/showpics";
    export default {
        name: "home",
        components:{
            className,
            showItems,
            showpics
        },
        data() {
            return{

            }
        },

        methods: {
            handleRouter() {
                this.$router.push('/item');
            },
        },
        created(){
            var screenHeight = document.documentElement.clientHeight;
            var screenWidth = document.documentElement.clientWidth;
            var body = document.getElementsByTagName("body");
            body[0].style.width = screenWidth+"px";
            body[0].style.height = screenHeight+"px";

        },
        mounted(){

        }
    }
</script>

<style scoped>
    *{
        margin: 0px;
        padding: 0px;
    }


    div {
        width: 100%;
    }

    #header {
        height: 6%;
        background-color: deepskyblue;
        background-attachment: fixed;
        position: fixed;
        top: 0%;
        z-index: 2;
    }


    #classes {
        height: 45%;
        background-color: aliceblue;
        position: absolute;
        top: 36%;
    }


    .title {
        height: 115px;
        position: absolute;
        background-color: #FFFFFF;
        text-align: center;
    }

    .titleName {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: deepskyblue;
    }

    #footer {
        height: 8%;
        position: fixed;
        top: 95%;
        background-color: deepskyblue;
    }

</style>