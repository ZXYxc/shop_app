<template>
  <div class="comment-item-component">
    <div class="title">
      <div class="title__left">
<!--        头像-->
<!--        <image-pic-->
<!--          round-->
<!--          fit="contain"-->
<!--          :src="avatar"-->
<!--          width="25"-->
<!--          height="25"-->
<!--          style="margin-right:6px"-->
<!--        />-->
<!--        ID-->
        <span style="margin-right:6px">{{name}}</span>
<!--        评分-->
        <van-rate
          v-model="score"
          :size="15"
          color="rgb(25, 137, 250)"
          void-icon="star"
        />
      </div>
      <div class="title__right">{{time}}</div>
    </div>
<!--评价+图片-->
    <div class="desc">
      <p class="desc__text van-multi-ellipsis--l3">{{desc}}</p>
      <div class="desc_img">
        <image-pic
          v-for="(item,idx) in imgs"
          :key="idx"
          :src="item"
          fit="cover"
          width="60"
          height="70"
          style="margin-right:8px"
        />
      </div>
        <van-divider />
    </div>
  </div>
</template>

<script>
// import variables from '@/styles/variables.scss'

export default {
  props: {
    avatar: String,
    time: String,
    name: String,
    score: {
      type: Number,
      default: 0
    },
    desc: String,
    imgs: Array
  },
  computed: {

  },

}
</script>

<style lang="less" scoped>

.comment-item-component {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title__left {
      display: flex;
      align-items: center;
      color: black;
      font-size: 10px;
    }
    .title__right {
      color: gray;
      font-size: 10px;
    }
  }
  .desc {
    .desc__text {
      font-size: 10px;
      color: black;
      line-height: 38px;
      text-align: justify;
    }
    .desc_img {
      display: flex;
      flex-direction: row;
      margin-top: 8px;
    }
      border-bottom: #5588aa;
  }
}
</style>
