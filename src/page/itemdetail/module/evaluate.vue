<template>
    <div class="comment">
        <div class="title">
<!--            <van-button block>-->
<!--                <div class="comment__item">-->
<!--                    <div class="comment__item__left">-->
<!--                        <span class="title">评价</span>-->
<!--                        <span class="content">好评率{{rate}}%</span>-->
<!--                    </div>-->
<!--                    <div class="comment__item__right">-->
<!--                        <span class="text">共{{list.length}}条评论</span>-->
<!--                        <van-icon name="arrow" />-->
<!--                    </div>-->
<!--                </div>-->
<!--            </van-button>-->

            <van-row class="comment__item">
                <van-col span="14" class="title">评价</van-col>
                <van-col span="5" class="content" align="bottom">好评率{{rate}}%</van-col>
                <van-col span="5" class="comment__item__right">
                    <span class="text">共{{list.length}}条评论</span>
                    <van-icon name="arrow" />
                </van-col>
            </van-row>
            <div class="comment__line"></div>

        </div>

        <div class="tags">
            <van-tag
                    class="tags__item"
                    color="rgb(25, 137, 250)"
                    plain
                    v-for="(item,idx) in list.keyword"
                    :key="idx"
            >{{item}}</van-tag>
        </div>

        <div class="main">
            <comment-item
                    v-for="(item,idx) in list"
                    :key="idx"
                    :name="item.userName"
                    :time="item.time"
                    :score="item.score"
                    :desc="item.content"
                    :imgs="item.imgs"
                    style="margin-top:12px"
            />
            <div class="main__btn">
                <van-button color="gray" plain round size="small">查看全部评价</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentItem from '@/components/CommentItem/index'
    import { mapState} from 'vuex'
    //list是每一个用户的评价的合集（图片、ID、时间、分数、评价内容、评价图片；
    //rate好评率，num一共多少评论,tags是评论的标签
    export default {
        props: ['id'],
        components: {
            CommentItem
        },

        data() {
            return {
                // rate: 98,
                // num: 2,
                // tags: ["特别好吃", "价格实惠"],

            }
        },
        computed: mapState({
            list:'comment_list', //商品详情信息
            rate(){
                var temp = 0;
                let len = this.list.length ;
                for (let i=0; i<len;i++){
                    temp += this.list[i].score;
                }
                temp = temp/len/5;
                return temp*100;
            }

        }),
        mounted(){
            for (let i=0; i<this.list.length;i++){
                if (!this.list[i].content){
                    this.list[i].content = "用户默认好评";
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    .content {
        color: rgb(25, 137, 250);
        font-size: 10px;
        margin-top: 10px;
    }
    .comment__item{
        align-items: flex-end;
    }
    .title {
        color: black;
        font-size: 18px;
        text-align: right;
        font-weight: 800;
    }
    .comment__item__right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: gray;
        font-size: 10px;
        margin-top: 10px;

    }

    .comment__line{
        height: 1px;
        background-image: linear-gradient(to right, #ccc, #5588aa, #ccc);
        margin-top: 4px;
    }

    .comment {
        /*margin-top: 24px;*/
        background: #fff;
        /**/

        .tags {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 24px;
            .tags__item {
                margin: 14px 8px 0 0;
            }
        }

        .main {
            padding: 0 24px;
            .main__btn {
                display: flex;
                justify-content: center;
                padding: 24px;
            }
        }
    }
</style>
