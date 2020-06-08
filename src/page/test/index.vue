<template>
    <div>     <div>
        <button @click="testAxios">TestAxios</button>
    </div></div>
</template>

<script>
    // import {getList} from '../../api/category'
    export default {
        name: "index",
        data() {
            return {
                temp: "",
            };
        },
        components:{
            // getList
        },
        mounted(){
            // this.test();
            // console.log(this.items)
        },
        methods:{
            //params是添加到url的请求字符串中的，用于get请求, 参数是以id=124&name=jerry的形式附到url的后面
            // 而data是添加到请求体（body）中的， 用于post请求。
            // test(){
            //
            //     this.items = this.$axios({
            //         method: "get",
            //         url: "/api/goods/ListItem", // 接口地址
            //         // data: {
            //         //     keyword: "1"   // 传接口参数
            //         // }
            //     })
            //         .then(response => {
            //             console.log(response, "success");   // 成功的返回
            //         })
            //         .catch(error => console.log(error, "error")); // 失败的返
            // },


            testAxios() {

                // 请求接口 后台的接口为5001 我们本地的接口为8080,所以我们需要去到vue.config.js配置跨域 http://localhost:5001/api/
                this.$axios.post('/api/goods/ListItem')
                    .then(res =>{
                        // 注册成功
                        alert('注册成功!');
                        console.log(res);
                    })//在http全局配置了catch所以这边是不用配置的

            }
                // var api1 = this.HOST + "/list/order";
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
                // 经过 vue.config.js 配置文件的代理设置，会自动转为 https://www.baidu.com/，从而解决跨域问题
                // this.$axios.post("/api/goods/ListItem").then(response => {
                //     if (response.data) {
                //         console.log(response.data)
                //     }
                // }).catch(error => {
                //     alert(error)
                // })
            // }
        }
    }
</script>

<style scoped>

</style>