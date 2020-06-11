<template>
  <div class="user-tools">
    <van-cell title="个人信息" is-link @click="info"/>
    <van-cell title="修改地址" is-link @click="add"/>
    <van-cell title="版本说明" is-link />
    <van-cell title="退出登录" is-link />
  </div>
</template>

<script>
export default {
  methods:{
    add(){
      this.$router.push('/selectAdd');
    },
    info(){
      console.log("111");
      this.$router.push('/changeInfo');
    }
  }
}
</script>

<style scoped>
.user-tools {
  width: 90%;
  background: rgba(255, 255, 255, 1);
  margin: 34px auto 0;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.09);
  border-radius: 24px;
  overflow: hidden;
}
</style>
