<template>
  <div class="user-order" @click="toOrder">
    <div class="order__title">
      <p class="order__title__title">我的订单</p>
      <p class="order__title__navigate">
        <span>全部订单</span>
        <van-icon name="arrow" color="#969799" />
      </p>
    </div>
    <div class="order__bd">
      <div class="order__bd__item" v-for="(item,idx) in orderList" :key="idx">
        <van-icon :name="item.icon" size="25" color="#dab309" :badge="item.count" />
        <span class="name">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [
        {
          icon: 'peer-pay',
          name: '待发货',
          count: ''
        },
        {
          icon: 'logistics',
          name: '待收货',
          count: ''
        },
        {
          icon: 'pending-payment',
          name: '待评价',
          count: 3
        },
        {
          icon: 'chat-o',
          name: '售后',
          count: ''
        }
      ]
    }
  },
  methods:{
    toOrder(){
      this.$router.push("/myOrder");
    }
  }
}
</script>

<style scoped>
  /*@import "../../../styles/variables.scss";*/

.user-order {
  width: 90%;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  margin: 30px auto 0;
}

  .order__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 7px 12px 12px;
    font-weight: 800;
  }

  .order__title__title {
    font-size: 14px;
    font-weight: 800;
    color: black;
  }
  .order__title__navigate {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 6px;

  }

  .order__title__navigate span {
    font-size: 12px;
    font-weight: 400;
    color: gray;
    margin-right: 10px;
  }

  .order__bd {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 18px 10px 10px;
    margin-bottom: 10px;
  }

  .order__bd__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7px;

  }

  .name {
    font-size: 12px;
    color: gray;
    margin-top: 8px;
  }
  .van-info{
    background-color: rgb(151, 159, 250);
  }
</style>
