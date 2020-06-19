<template>
    <!--四个分类栏分别指向不同类别的产品，对于首页来说主要是样式的定制-->
    <div id="className">
        <div class="class" id="class1">
            <a class="theme" id="theme1" v-bind:href="theme1">
                <img class="theme" :src="picPath1" />
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
</template>

<script>
    export default {
        name: "className",
        data() {
            return{
                url:"./getType?type=",
                theme1: "",
                theme2: "",
                theme3: "",
                theme4: "",
                picPath:[
                    "./img/picError.jpg",
                    "./img/picError.jpg",
                    "./img/picError.jpg",
                    "./img/picError.jpg"
                ],
            }
        },
        methods: {
            getTheme(){
                this.$api.goods.getList()
                    .then(function(response){
                    if(response['data']['result']==="success"){
                        var data = response['data']['items'];
                        console.log(data);
                        for(var i=0;i<4;i++){
                            var img = document.getElementById("classPic"+i); // 主题图
                            //console.log("classPic"+i);
                            //console.log(img);
                            //console.log(i);
                            img.setAttribute("src","http://"+data[i]['picPath1']);
                            /*
                             type = data[i]['type'];
                             id = data[i]['itemId'];

                            */
                        }
                        //console.log(className.picPath);
                    }
                })

            }
        },
        created: function(){
            this.getTheme();
        },
    }
</script>

<style scoped>

    #className {
        position: absolute;
        bottom: 0%;
        height: 100%;
        width: 100%;
        background-color: #D3D3D3;
    }

    div .class{
        display: inline-block;
        height: 43%;
        width: 50%;
        position: absolute;
        background-color: whitesmoke;
    }

    a .theme {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    img .theme {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }



</style>