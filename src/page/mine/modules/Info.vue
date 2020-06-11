
<template>
  <div class="user-info">
    <image-pic  width="50" height="50" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <div class="main">
      <div class="head_img">
        <van-image width="90" height="90" alt="暂无图像"></van-image>
      </div>
      <div class="main__title">
        <div class="name"> 用户名：57test</div>
      </div>
      <div class="main__id" @click="doCopy(userInfo.id)">
        <span style="color:#fff">
          <svg-icon icon-class="copy" :width="13" :height="13" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

export default {
  computed: {

  },
  methods: {
    doCopy(val) {
      this.$copyText(val).then(
        () => {
          // success
          this.$toast.success('Id复制成功')
        },
        e => {
          // fail
          console.log(e)
        }
      )
    }
  }
}
</script>

<style scoped>
/*@import "../../../styles/variables.scss";*/

.head_img{
  text-align: center;
}

.user-info {
  display: flex;
  flex-direction: row;
  padding: 20px 8px 16px 84px;
  background: rgb(151, 159, 250);
  border-radius: 100% 100% 100% 100% / 0% 0% 16% 16%;

}
.main {
  margin-left: 18px;
}
.main__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;

}
.name {
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  display: inline-block;
  max-width: 350px;
  white-space: nowrap;
  text-align: center;
  margin-right: 20px;
}
.main__id {
  margin-top: 12px;

}

</style>
