<template>
    <div>
        <div id="header">
            <Header title="修改资料"
                    add="/mine"/>
        </div>
        <div class="info" id="info">
                <div class="content">
                    <van-row gutter="20">
                        <van-col span="8" class="left_span">昵称</van-col>
                        <van-col span="16">
                            <input v-model="nickName" class="recvInfo" type="text" ref="nickName"/>
                        </van-col>
                    </van-row>
                    <van-row gutter="20">
                        <van-col span="8" class="left_span">性别</van-col>
                        <van-col span="16">
                            <select class="recvInfo" v-model="sex">
                                <option value="" style="display: none;">请选择</option>
                                <option style="font-size: 14px">男</option>
                                <option style="font-size: 14px">女</option>
                                <option style="font-size: 14px">保密</option>
                            </select>
                        </van-col>
                    </van-row>
                    <van-row gutter="20">
                        <van-col span="8" class="left_span">生日</van-col>
                        <van-col span="16">
                            <input class="recvInfo" type="date" v-model="birthday"/>
                        </van-col>
                    </van-row>
                </div>
                <div class="submitB" >
                    <van-button name="submit" type="info" size="small" @click="sub">提交</van-button>
                </div>

        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header"
    export default {
        name: "changeInfo",
        components:{
            Header
        },
        data() {
            return{
                value: '',
                nickName: '',
                sex: "",
                birthday: "",
                age: ""
            };
        },
        methods:{
            sub(){
                console.log(this.nickName);
                console.log(this.sex);
                console.log(this.birthday);
                if (this.nickName!=null && this.sex!=null && this.birthday!=null)
                    this.$toast("请输入完整信息");
                else {
                    this.$api.user.GetUserInfo(57,this.nickName,this.sex,this.birthday).
                    then((res)=>{
                        var info = res.data.result;
                        if (info==="success"){
                            this.$toast("提交成功");
                        }
                    })
                }
                }



        },
        mounted: function(){

        }
    }
</script>

<style scoped>
    .content{
        margin: 30px 10px 10px;
    }
    .content>>>.van-row{
        margin: 10px;
    }
    .left_span{
        text-align: center;
        font-weight: 600;
    }
    .submitB{
        text-align: center;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
    }

</style>