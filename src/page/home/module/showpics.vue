<template>
        <!--图片轮转播放，直接请求图片，图片的更新由后端完成√-->
        <div id="showpics">
            <img class="topPic" :src="nowPic" />
            <div id="showBox">
                <!--用来显示是哪张图片，还需写个函数-->
                <div class="cycle" id="cycle1" style="left:27%"></div>
                <div class="cycle" id="cycle2" style="left:37%"></div>
                <div class="cycle" id="cycle3" style="left:47%"></div>
                <div class="cycle" id="cycle4" style="left:57%"></div>
            </div>
        </div>
    
</template>

<script>
    export default {
        name: "showpics",
        data() {
            return{
                nowPic: "",
                testPic: "./img/email.png",
                pics: [],
                i: 0,
                id: "cycle"
            }
        },
        methods: {
            show() {
                this.nowPic = this.pics[this.i%4];
                //console.log(this.nowPic);
                for(let j=1; j<=4; j++){
                    if((this.i%4+1) === j){
                        document.getElementById(this.id+j).setAttribute("class","cycle1");
                    }else{
                        document.getElementById(this.id+j).setAttribute("class","cycle");
                    }
                }
                this.i += 1;
            },
            play() {
                setInterval(this.show, 2000);
            },
            getPics() {
                this.$api.goods.getList()
                    .then(function(response){
                        let data = response['data']['items'];
                        console.log(data[0]);
                        for(let i=0; i<data.length; i++){
                            this.pics.push(data[i]['picPath1']);
                            if(this.pics.length === 4) break;
                    }
                    console.log(this.pics);
                })
            }
        },
        created(){
            this.getPics();
            this.play();
        }
    }
</script>

<style scoped>
    #showpics {
        height: 28%;
        position: absolute;
        top: 8%;
    }

    #showBox {
        height: 30px;
        width: 250px;
        position: absolute;
        top: 93%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

</style>