<template>
  <div>
    <van-submit-bar :price="amount" button-text="提交订单" class="submit-bar" @submit="onSubmit" button-type="info">
      <van-checkbox icon-size="18px" checked-color="blue" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <div class="submit-bar-placeholder" style="width:100%;height:50px"></div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
export default {

  props: {
    amount: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      list:'cart_list', //商品详情信息
    }),
      checked: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
  },


  methods: {
    ...mapActions([
      'addPay'
    ]),
    onSubmit() {
      let pay_list = [];
      // console.log(this.list)
      for (let i=0; i<this.list.length; i++){
          if (this.list[i].isChecked){
            pay_list.push(this.list[i]);
          }
      }
      this.addPay(pay_list);
      this.$router.push({
        path: '/order',
      })
    }
  }
}
</script>

<style scoped>
.submit-bar {
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
}
</style>
