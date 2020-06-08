<template>
    <div class="comment">
        <div class="title">
            <van-button block>
                <div class="comment__item">
                    <div class="comment__item__left">
                        <span class="title">评价</span>
                        <span class="content">好评率{{list[id-1].rate}}%</span>
                    </div>
                    <div class="comment__item__right">
                        <span class="text">共{{cart.length}}条评论</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </van-button>
            <div class="comment__line"></div>
        </div>

        <div class="tags">
            <van-tag
                    class="tags__item"
                    color="rgb(25, 137, 250)"
                    plain
                    v-for="(item,idx) in list[id-1].tags"
                    :key="idx"
            >{{item}}</van-tag>
        </div>

        <div class="main">
            <comment-item
                    v-for="(item,idx) in cart"
                    :key="idx"
                    :name="item.name"
                    :time="item.time"
                    :score="item.score"
                    :desc="item.desc"
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
            cart(){
                return this.list[this.id-1].comment
            }
            // $route.query.id
        }),
    }
</script>

<style lang="less" scoped>
    .comment {
        /*margin-top: 24px;*/
        background: #fff;
        .title {
            .comment__item {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .comment__item__left {
                    font-size: small;
                    .title {
                        color: black;
                        margin-right: 16px;
                    }
                    .content {
                        color: rgb(25, 137, 250);
                    }
                }
                .comment__item__right {
                    display: flex;
                    align-items: center;
                    color: gray;
                    font-size: 10px;
                }
            }
            .comment__line {
                width: 700px;
                height: 1px;
                background: #f5f5f5;
                margin: 0 auto;
            }
        }

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
