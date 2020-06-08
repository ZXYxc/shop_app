<template>
  <div class="card__item">

    <van-checkbox
      icon-size="18px"
      checked-color="blue"
      v-model="checked"
      style="padding:0 10px 0 16px"
    ></van-checkbox>
<!--tag是是否促销，tags是普通标签-->
    <van-swipe-cell style="width:100%" :before-close="beforeClose">
      <van-card
        :tag="tag"
        :price="price"
        :desc="desc"
        :title="title"
        :thumb="thumb"
        :origin-price="originPrice"
      >

        <template #tags>
<!--          <van-tag-->
<!--            plain-->
<!--            type="danger"-->
<!--            style="margin-right:4px"-->
<!--          >{{tags}}</van-tag>-->
        </template>
        <template #footer>
<!--          +1 —-1-->
          <van-stepper v-model="value"
                       input-width="40px"
                       button-size="20px"
                       @change="test"
                       disable-input />
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>


  </div>
</template>

<script>
// import variables from '@/styles/variables.scss'

export default {
  model: {
    prop: 'isChecked'
  },
    //index是这个卡片的序号，nums是商品的序号
    //<!--tags是普通标签，tag是是否促销-->
  props: {
    index: Number,
    thumb: String,
    title: String,
    desc: String,
    tag: Array,
    tags: String,
    originPrice: Number,
    price: Number,
    num: Number,
    isChecked: {
      type: Boolean,
      default: false
    },
      value:Number,
  },
  data() {
    return {
      // value: 1
    }
  },
  computed: {
    //checked属性发生改变时自动触发get,当修改监控的属性时候才会触发set
    //val的值就是指向了checked属性，先set改变checked相关联的属性，再get返回checked的值
    checked: {
      get() {
        return this.isChecked;
      },
      set(val) {
        this.$emit('input', { val, idx: this.index })
      }
    },

  },
  methods: {
      test(){
          // console.log(this.value);
          let val = this.value;
          this.$emit('saleNum', {val, idx: this.index })

      },
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      switch (position) {
        case 'cell':
        case 'outside':
          instance.close()
          break;
        case 'right':
          this.$dialog
            .confirm({
              message: '确定删除吗？'
            })
            .then(() => {
              this.$emit('handleDelete', this.index)
              instance.close()
            })
            .catch(() => {
              instance.close()
            });
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card__item {
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
}
</style>
