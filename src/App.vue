<template>
  <div id="app">
    <!--缓存的页面-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <!--不缓存的页面-->
    <router-view v-if="!$route.meta.keepAlive"/>
    <tabbar v-if="$route.meta.showTab" />
  </div>
</template>

<script>
import Tabbar from './components/Tabbar'
import { mapActions} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
      items:"",
      comments:""
    }
  },
  mounted(){
    this.$api.goods.getList()
            .then(response => {
              this.items = response.data;
              this.addItems(this.items);
              this.addDisorder(this.items);
              // console.log(this.items)
            });

  },
  methods:{
    ...mapActions([
      'addItems',
      'addDisorder'
    ]),
  },

  components: {
    Tabbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
