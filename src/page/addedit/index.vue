<template>

    <div class="add">
        <van-nav-bar title="增加地址"
                     left-text="返回"
                     left-arrow fixed="true"
                     @click-left="onClickLeft"
                     class="bottom_margin">
        </van-nav-bar>
        <div class="nav--placeholder" style="width:100%;height:46px"></div>
        <van-address-edit
                class="btn"
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
        />
       
    </div>
</template>

<script>
import areaList from "./modules/area"
import { mapState, mapActions} from "vuex";
export default {
    name:"addedit",
    data() {
        return {
            areaList,
            searchResult: [],
            default:false,
            addDate:{},
            toR:false,
        }
    },
    components:{

    },
    computed:mapState({
        List:"addList"
    }),

    methods:{
        ...mapActions([
            'add_addlist'
        ]),
        onClickLeft(){
            window.history.back();
        },

        finalItemDetail() {
            //从localStorage中获取所用的评论
            let list = JSON.parse(localStorage.getItem("address") || '[]')
            if (this.default)
                list.unshift(this.addDate);
            else if (this.addDate != {})
                list.push(this.addDate);
            //重新保存最新的地址
            localStorage.setItem('address',JSON.stringify(list))
        },

        onSave(content) {
             let addDate={
                'username':content.name,
                'usertel':content.tel,
                'province':content.province,
                'city':content.city,
                'county':content.county,
                'addressDetail':content.addressDetail,
                'addressInfo':content.province + content.city + content.county + content.addressDetail,
                'postalCode':content.postalCode
            };
            this.default =content.isDefault;
            this.addDate = addDate;
            //加入localstorage
            this. finalItemDetail();
            if(content.name!=='' && content.tel!=='' && addDate.addressInfo !=='' ){
                this.add_addlist(addDate);
                this.$dialog.confirm({
                    title: '提交地址成功',
                }).then(() => {
                    if (this.$route.query.from=="/selectAdd"){
                        this.$router.push({path:'/selectAdd'});
                    }
                    else {
                        this.$router.push({path:'/order'});
                        console.log('成功');
                    }

                }).catch(() => {
                    console.log("地址添加失败");
                });
            }
        },
        onDelete() {
            this.$toast('地址已删除');
        },

    }
    
}
</script>

<style scoped>
.van-toast{
    top:20%;
}
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
    .btn>>>.van-button--danger{
        border: #3283fa;
        background-color: rgb(99, 137, 250);
    }
</style>
