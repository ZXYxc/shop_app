<template>
    <div>
        <div id="header">
            <Header title="修改资料"
                    add="/mine"/>
        </div>
        <div class="info" id="info">
            <form action="" method="post">
                <div class="content">
                    <van-row gutter="20">
                        <van-col span="8" class="left_span">昵称</van-col>
                        <van-col span="16">
                            <input class="recvInfo" type="text" name="rickName" :value="nickName" />
                        </van-col>
                    </van-row>
                    <van-row gutter="20">
                        <van-col span="8" class="left_span">性别</van-col>
                        <van-col span="16">
                            <select class="recvInfo">
                                <option :value="sex" style="display: none;">{{sex}}</option>
                                <option style="font-size: 14px">男</option>
                                <option style="font-size: 14px">女</option>
                                <option style="font-size: 14px">保密</option>
                            </select>
                        </van-col>
                    </van-row>
                    <van-row gutter="20">
                        <van-col span="8" class="left_span">生日</van-col>
                        <van-col span="16">
                            <input class="recvInfo" type="date" name="birthday" :value="birthday"/>
                        </van-col>
                    </van-row>
                </div>
                <div class="submitB" >
                    <van-button name="submit" type="info" size="small">提交</van-button>
                </div>
            </form>
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
                nickName: "",
                sex: "",
                birthday: "",
                age: ""
            };
        },
        mounted: function(){
            /*在vuex中存储用户的id用以api请求*/
            this.$api.get('url').then(function(successData){
                var info = JSON.parse(successData);
                /*
                    {
                        nickName: "",
                        sex: "",
                        birthday: "",
                        age: ""
                    }
                */
                this.nickName = info['nickName'];
                this.sex = info['sex'];
                this.birthday = info['birthday'];
                this.age = info['age'];
            })
        }
    }
</script>

<style scoped>
    .content{
        margin: 10px;
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