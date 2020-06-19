<template>
    <!--需要定义item的实体，商品id(由后端更新，前端固定请求id范围为1-n) -> 商品图片、商品名、商品价格 -> 前端展示-->
    <div id="showItems">
        <div class="divItem" v-for="(item,index) in items" :key="index">
            <img class="imgItem" :src="item.picPath" :href="item.url" />
            <div class="itemParm">
                <p class="itemp1">{{item.title}}&nbsp;&nbsp;&nbsp;${{item.price}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "showItems",
        data() {
            return{
                url: "./lookUpItem?itemId=",
                items: [],
            }
        },
        methods: {
            getItems(){
                this.$api.goods.getList()
                    .then(function(response) {
                    //this.items = JSON.parse(successData); // [{picPath:"",url:"",title:"",price:""},{},{}]
                    if(response['data']['result'] === "success"){
                        var data=response['data']['items'];
                        for(var i=0; i<data.length; i++){
                            this.items.push({
                                picPath: "path"+data[i]['picPath1'],
                                url: this.url+data[i]['itemId'],
                                title: data[i]['name'],
                                price: data[i]['presentPrice']
                            });
                            if(this.items.length === 10) break;
                        }

                    }else{
                        alert("Load error!");
                    }
                    console.log(this.items);
                })
            }
        },
        created(){
            this.getItems();
        }
    }
</script>

<style scoped>
    #showItems {
        position: absolute;
        top: 115px;
        margin-bottom: 105px;
    }
    .divItem {
        width: 50%;
        height: 400px;
        position: relative;
        display: inline-block;
        background-color: white;
    }

    .imgItem {
        width: 100%;
        height: 90%;
        position: absolute;
    }

    .itemParm {
        width: 100%;
        height: 10%;
        position: absolute;
        left: 0%;
        bottom: 0%;
        text-align: center;
        font-size: 30px;
        font-family: "microsoft sans serif";
    }

</style>