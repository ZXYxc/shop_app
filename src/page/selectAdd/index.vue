<template>
    <div>
        <van-nav-bar title="选择其他地址"
                     left-text="返回"
                     left-arrow fixed="true"
                     @click-left="onClickLeft"
                     class="bottom_margin">
        </van-nav-bar>
        <div class="nav--placeholder" style="width:100%;height:46px"></div>
<!--        每一个地址-->
        <AddItem v-for="(add,index) in List"
                 :key="index"
                :username="add.username"
                :usertel="add.usertel"
                :addressInfo="add.addressInfo"
                ref="Item" />
        <div class="btn">
            <van-button type="info" @click="backToOrder" style="margin-right: 5px" size="small">确定</van-button>
            <van-button type="info" @click="deletehandle" style="margin-right: 5px" size="small">删除</van-button>
            <van-button type="info" @click="newadd" size="small">添加新的地址</van-button>
        </div>
    </div>


</template>

<script>
    import AddItem from "@/page/selectAdd/modules/item"
    export default {
        name: "index",
        data(){
            return{
                List:[],
            }
        },
        components:{
            AddItem
        },
        mounted:function () {
            this.List = JSON.parse(localStorage.getItem("address") || '[]');
            // console.log(this.List);
        },
        methods:{

            onClickLeft() {
                // this.$router.push({path:"/order"});
                this.$router.go(-1);
            },
            newadd(){
                this.$router.push({path:"/addedit",query:{from:"/selectAdd"}})
            },
            //删除所有不想要的地址
            deletehandle(){
                let items = this.$refs.Item;
                let flag = [];
                for (let i=0;i<items.length;i++)
                    if (items[i].checked)
                    {
                        flag.push(i);
                    }
                console.log(flag);
                let list = JSON.parse(localStorage.getItem("address") || '[]');
                let count = 0;
                for (let i=0;i<flag.length;i++){
                    list .splice(flag[i]-count,1);
                    count++;
                    // console.log(list);
                }
                localStorage.setItem('address',JSON.stringify(list));
                // this.$dialog.alert({message:"删除成功！"});
                this.$dialog.confirm({
                    title: '删除地址成功',
                }).then(() => {
                    this.$router.push({
                        path:'/order',
                    });
                }).catch(() => {
                    console.log("地址删除失败");
                });
            },
            //选择一个想要的地址
            backToOrder(){
                let items = this.$refs.Item;
                let count = 0;
                let flag = 0;
                for (let i in items)
                    if (items[i].checked)
                    {
                        count++;
                        flag = i;
                    }
                if (count!=1)
                {
                    this.$dialog.alert({message:"您到底想要哪个地址呢~"});
                    console.log(count);
                }
                else {
                    let addDate={
                        'username':items[flag].username,
                        'usertel':items[flag].usertel,
                        'addressInfo':items[flag].addressInfo,
                    };
                        this.$dialog.confirm({
                            title: '选择地址成功',
                        }).then(() => {
                            this.$router.push({
                                path:'/order',
                                query:{
                                    sel:true,
                                    add:addDate
                                }});
                        }).catch(() => {
                            console.log("地址添加失败");
                        });
                    }
                }

            }

    }
</script>

<style scoped>
    .btn{
        left: 0;
        right: 0;
        margin-left: 70px;
    }
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
    }
</style>