<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
        <div class="box rainbow">
            <van-checkbox class="left" v-model="checked" shape="square" @change="select"></van-checkbox>
            <div class="address right">
                <div class="address__name "><span>收货人:</span>{{username}}</div>
                <div class="address__tel"><span>电话：</span>{{usertel}}</div>
                <div class="address__detail"><span>收货地址:</span>{{addressInfo}}</div>
            </div>
        </div>
<!--        <van-divider-->
<!--                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"-->
<!--        />-->
    </div>
</template>

<script>
    import "./modules/style.css"
    export default {
        name: "index",
        data(){
            return{
                checked:false,
                count:0,
            }
        },
        props:{
            username:String,
            usertel:String,
            addressInfo:String,
        },
        methods:{

            select(checked){
                // this.$emit("nmsl",{checked});
                if (checked){
                    this.count+=1;
                    // this.emit("select",checked);
                }
                else{
                    this.count-=1;
                }
                // console.log(this.count);

            }
        },
        computed: {
            //checked属性发生改变时自动触发get,当修改监控的属性时候才会触发set
            //val的值就是指向了checked属性，先set改变checked相关联的属性，再get返回checked的值
            // checked: {
            //     get() {
            //         return this;
            //     },
            //     set(val) {
            //         this.$emit('input', { val })
            //     }
            // },

        },
    }
</script>

<style scoped>

    .box{
        display: flex;
        margin: 5px;
    }
    .left{
        flex-grow:2;
        justify-content:center;
    }
    .right{
        flex-grow: 2;
    }

    .address{
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        flex-direction:column;
        align-items:flex-start;
        margin-left: 15px;
        padding-top: 10px;
        /*justify-content: center;*/
    }

    span{
        line-height: 25px;
        font-weight: bolder;
    }

    .address__detail {
        color: #666;
        font-size: 14px;
        line-height: 14px;
        word-break: break-all;
        margin-top: 5px;
    }

</style>